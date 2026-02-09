import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';

import { db } from '.';
import { loadDocument } from '../lib/document-loader';
import { indexDocument } from '../lib/vector-store';
import { chatFiles, chats } from './schema';

async function run() {
  const name = 'ist';
  const files = await readdir('src/assets/ist-documents');
  const save = true;
  const k = 1;
  const [chat] = await db.insert(chats).values({ name, save, k }).returning({ id: chats.id });
  if (!chat) {
    throw new Error('Unable to create chat, please try again later');
  }
  const content = (await Promise.all(files.map(file => readFile(`src/assets/ist-documents/${file}`, 'utf-8')))).join(
    '\n'
  );
  const basePath = `public/${chat.id}`;
  await mkdir(basePath, { recursive: true });
  await writeFile(`${basePath}/ist-data.txt`, content);
  await db.insert(chatFiles).values({ chatId: chat.id, name: 'ist-data.txt', path: `${basePath}/ist-data.txt` });
  const docs = await loadDocument(`${basePath}/ist-data.txt`);
  await indexDocument({ docs, collectionName: chat.id });
}

run()
  .then(() => console.log('Done'))
  .catch(err => console.error(err));
