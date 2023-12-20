"use client";

import { useContext, useEffect, useState } from "react";
import { Context, Hub } from "react-signalr/src/signalr/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useChat } from "../hooks/useChat";
import { MessageModel } from "../models/chat";
import MessageList from "./components/messageList";
import MessageInput from "./components/messageInput";
import { createSignalRContext } from "react-signalr";

const signalRContext = createSignalRContext();

export default function Chat() {
  const { user } = useUser();
  const { chat, setChat, sendMessage } = useChat(user ?? null);

  signalRContext.useSignalREffect(
    "ReceiveMessage",
    (message: MessageModel) => {
      setChat((chat) => {
        if (chat?.messages.some((m) => m.messageId == message.messageId))
          return chat;

        return chat ? { ...chat, messages: [...chat.messages, message] } : chat;
      });
    },
    []
  );

  return (
    <signalRContext.Provider
      connectEnabled={process.env.NEXT_PUBLIC_API_HUB !== undefined}
      withCredentials={false}
      url={process.env.NEXT_PUBLIC_API_HUB!}
    >
      <div className="flex flex-col w-full min-h-screen p-2 gap-2 justify-center items-center">
        {chat && user && (
          <div className="w-full md:w-4/5 md:mb-5 flex flex-col gap-5">
            <MessageList messages={chat.messages}></MessageList>
            <MessageInput sendMessage={sendMessage}></MessageInput>
          </div>
        )}
      </div>
    </signalRContext.Provider>
  );
}
