import Link from 'next/link';
import type { Chat, Settings } from '~/types';

import { ScrollArea } from '~/components/ui/scroll-area';
import { AddChatFile } from '~/components/add-chat-file';
import { ChatFile } from '~/components/chat-file';
import { ChatSettings } from '~/components/chat-settings';
import { Icons } from '~/components/icons';

type Props = {
  chat: Chat;
  chatFiles: {
    id: string;
    name: string;
    path: string;
  }[];
  settings: Settings;
  hideFiles?: boolean;
};

export function ChatSidebar({ chat, chatFiles, settings, hideFiles }: Props) {
  return (
    <>
      <Link href='/' className='flex items-center space-x-2 rounded-lg p-2 hover:bg-muted'>
        <Icons.logo />
        <span className='font-semibold'>{hideFiles ? 'IST Chatbot' : 'ChatDocs'}</span>
      </Link>
      {!hideFiles ? (
        <>
          <AddChatFile chatId={chat.id} />
          <ScrollArea className='h-[calc(100dvh-158px-40px)]'>
            {chatFiles.map(file => (
              <ChatFile key={file.id} file={file} chatId={chat.id} />
            ))}
          </ScrollArea>
        </>
      ) : (
        <div className='h-[calc(100dvh-145px)]'></div>
      )}
      <ChatSettings chat={chat} settings={settings} hideName={hideFiles} />
    </>
  );
}
