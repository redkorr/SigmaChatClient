'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import { Context, Hub } from 'react-signalr/src/signalr/types';
import { useChat } from '../hooks/useChat';
import { MessageModel } from '../models/chat';
import MessageList from './components/messageList';
import MessageInput from './components/messageInput';
import { createSignalRContext } from 'react-signalr';
import Loading from '../shared/components/loading';
import { UserContextInstance } from '../userLayer';
import { useIntersectionTrigger } from './hooks/useIntersectionTrigger';

const signalRContext = createSignalRContext();

export default function Chat() {
  const user = useContext(UserContextInstance);
  const { chat, loadMoreMessages, setChat, sendMessage, loading } = useChat(
    user?.user ?? null
  );
  const { triggerElement } = useIntersectionTrigger({
    loadCallback: loadMoreMessages,
    loading: loading,
  });

  signalRContext.useSignalREffect(
    'ReceiveMessage',
    (message: MessageModel) => {
      setChat((chat) => {
        if (chat?.messages.some((m) => m.messageId == message.messageId))
          return chat;

        return chat ? { ...chat, messages: [...chat.messages, message] } : chat;
      });
    },
    []
  );

  if (!user)
    return (
      <div className="absolute h-full w-full flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <signalRContext.Provider
      withCredentials={false}
      url={process.env.NEXT_PUBLIC_API_HUB!}
    >
      <div className='min-h-svh flex flex-col w-full p-2 gap-2 justify-end items-center'>
        {chat && user && (
          <div className="w-full md:w-4/5 md:mb-5 flex flex-col gap-5">
            <MessageList
              messages={chat.messages}
              paginationTrigger={triggerElement}
            ></MessageList>
            <MessageInput sendMessage={sendMessage}></MessageInput>
          </div>
        )}
      </div>
    </signalRContext.Provider>
  );
}
