import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { revalidatePath } from 'next/cache';
import { db } from '~/db';
import type { Chat, Settings } from '~/types';
import { StreamingTextResponse, type Message } from 'ai';
import { eq } from 'drizzle-orm';
import { PromptTemplate } from 'langchain/prompts';
import { BytesOutputParser } from 'langchain/schema/output_parser';

import { chatMessages } from '~/db/schema';
import { getChatModel } from '~/lib/chat-model';
import { similaritySearch } from '~/lib/vector-store';

const formatMessage = (message: Message) => {
  return `${message.role}: ${message.content}`;
};

const sentimentAnalysis = async (text: string, chatId: string) => {
  const response = await fetch('http://localhost:8001/predict', {
    method: 'POST',
    body: JSON.stringify({ texts: [text] }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = (await response.json()) as { predictions: string[] };
  const sentiment = {
    chatId,
    question: text,
    emotion: data.predictions[0],
    timestamp: new Date().toISOString(),
  };
  const filePath = 'src/assets/sentiment.json';
  if (!existsSync(filePath)) {
    await writeFile(filePath, JSON.stringify([sentiment], null, 2));
    return;
  }
  const fileContent = await readFile(filePath, 'utf-8');
  const newContent = JSON.stringify([...(JSON.parse(fileContent) as unknown[]), sentiment], null, 2);
  await writeFile(filePath, newContent);
};

export async function POST(request: Request) {
  try {
    const { messages, chat, settings } = (await request.json()) as {
      messages: Message[];
      chat: Chat;
      settings: Settings;
    };
    const chatModel = getChatModel({ model: settings.chat_model_name, baseUrl: settings.chat_model_base_url });
    const chatHistory = await db.query.chatMessages.findMany({
      where: eq(chatMessages.chatId, chat.id),
      columns: {
        content: true,
        role: true,
      },
    });
    let chat_history = chatHistory
      .map(message => `${message.role === 'system' ? 'Assistant' : 'User'}: ${message.content}`)
      .join('\n');
    if (!chat.save) {
      const previousMessages = messages.slice(0, -1).map(formatMessage).join('\n');
      chat_history = `${chat_history}\n${previousMessages}`;
    }
    const question = messages.at(-1)?.content ?? '';
    const context = await similaritySearch({ text: question, collectionName: chat.id, k: chat.k });
    console.log('---CONTEXT START---');
    console.log(context);
    console.log('---CONTEXT END---');

    const template = `
        ---
        You are a helpful assistant with the primary task of providing accurate responses only based on the given context and chat history. Format your reply using markdown.

        **Context:**
        {context}

        **Chat History:**
        {chat_history}

        **Question:**
        {question}
        ---
    `;

    const prompt = PromptTemplate.fromTemplate(template);
    const outputParser = new BytesOutputParser();
    const chain = prompt
      .pipe(chatModel)
      .pipe(outputParser)
      .withListeners({
        async onEnd(run) {
          if (chat.save) {
            // eslint-disable-next-line
            const answer = run.child_runs.at(-1)!.inputs.lc_kwargs?.content as string;
            await db.insert(chatMessages).values({
              chatId: chat.id,
              content: answer,
              role: 'system',
            });
            revalidatePath(`/${chat.id}`);
          }
          await sentimentAnalysis(question, chat.id);
        },
      });
    const stream = await chain.stream({
      chat_history,
      context,
      question,
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong, please try again later.');
  }
}
