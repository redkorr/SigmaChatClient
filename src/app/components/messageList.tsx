"use client";
import Message from "./message";
import { MessageModel } from "../models/chat";
import { createRef, useEffect, useRef } from "react";

export default function MessageList({ messages, currentUser }: Props) {
  const messageListRef = useRef<HTMLDivElement>(null);
  const isInitialMountScroll = useRef(true);

  useEffect(() => {
    if (messageListRef.current) {
      {
        let scrollConfig = {
          behavior: isInitialMountScroll.current ? "instant" : "smooth",
        } as ScrollIntoViewOptions;

        messageListRef.current.children[messages.length - 1]?.scrollIntoView(
          scrollConfig
        );
        isInitialMountScroll.current = false;
      }
    }
  }, [messages]);

  return (
    <div
      className="h-full overflow-y-auto overflow-x-hidden relative flex flex-col"
      ref={messageListRef}
    >
      {messages.map((msg) => (
        <div
          key={msg.messageId}
          className={`max-w-lg ${msg.sender == currentUser && "self-end"}`}
        >
          <Message
            message={msg}
            fromCurrentUser={msg.sender == currentUser}
          ></Message>
        </div>
      ))}
      <div
        className="fixed z-[-1] inset-0 opacity-5"
        style={{
          backgroundImage: `url('/cc.svg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "40%",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
}

interface Props {
  messages: MessageModel[];
  currentUser: string;
}
