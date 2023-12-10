"use client";

import { useEffect, useState } from "react";
import { ChatModel, MessageModel } from "../models/chat";
import MessageList from "../components/messageList";
import { useChat } from "../hooks/useChat";
import MessageInput from "../components/messageInput";
import { Context, Hub } from "react-signalr/src/signalr/types";
import Login from "../components/login";
import { useUser } from "../hooks/useUser";

export default function Chat({ signalRContext }: Props) {
  const { user, setUserAndSave } = useUser();
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
    <div className="flex flex-col w-full min-h-screen p-2 gap-2 justify-center items-center">
      {user === null && <Login setUser={setUserAndSave}></Login>}
      {chat && user && (
        <div className="w-full md:w-4/5 md:mb-5 flex flex-col gap-5">
          <MessageList
            messages={chat.messages}
            currentUser={user}
          ></MessageList>
          <MessageInput sendMessage={sendMessage}></MessageInput>
        </div>
      )}
    </div>
  );
}

interface Props {
  signalRContext: Context<Hub<string, string>>;
}
