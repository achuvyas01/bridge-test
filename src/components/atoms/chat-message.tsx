import { cn } from '@/lib/utils';
import { chatMessageType } from '@/types/global';
import React from 'react';
import Markdown from 'markdown-to-jsx';

const ChatMessage: React.FC<chatMessageType> = ({
  messageFrom,
  text,
  time,
}) => {
  return (
    <div
      className={cn(
        'message w-full flex first:mt-0 my-[10px]',
        messageFrom === 'Sender' ? 'justify-end' : 'justify-start'
      )}
    >
      <Markdown
        className={cn(
          'relative max-w-[90%] lg:max-w-[80%] text-xs lg:text-sm py-2 px-4 rounded-[23.5px] min-h-[40px] whitespace-pre-wrap break-words',
          messageFrom === 'Sender'
            ? 'bg-primary rounded-tr-none'
            : 'bg-secondary rounded-tl-none'
        )}
        options={{
          overrides: {
            a: {
              component: CustomLink,
            },
          },
        }}
      >
        {text}
      </Markdown>
      <div className='pt-1 lg:pl-2 flex self-end items-end justify-end shrink-0 text-[10px] opacity-50 lg:h-full'>
        {time}
      </div>
    </div>
  );
};

const CustomLink: React.FC<React.PropsWithChildren<{ href: string }>> = ({
  children,
  href,
}) => (
  <a
    className='text-blue-400 hover:text-blue-500 underline'
    href={href}
    rel='noopener noreferrer'
    target='_blank'
  >
    {children}
  </a>
);

export default ChatMessage;
