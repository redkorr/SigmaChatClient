import Message from "./message";
import { MessageModel } from "../../models/chat";
import { createRef, useContext, useEffect, useRef } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function MessageList({ messages }: Props) {
  const { user } = useUser(); // <- broken

  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageListRef.current) {
      {
        let scrollConfig = {
          behavior: "instant",
        } as ScrollIntoViewOptions;

        messageListRef.current.children[messages.length - 1]?.scrollIntoView(
          scrollConfig
        );
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
          className={`${msg.userNickname == user?.name && "flex justify-end"}`}
        >
          <Message
            message={msg}
            fromCurrentUser={msg.userNickname == user?.name}
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
}
