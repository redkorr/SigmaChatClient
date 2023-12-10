"use client";
import { MessageModel } from "../models/chat";

export default function Message({ message, fromCurrentUser }: Props) {
  return (
    <div className="flex flex-col pr-2">
      <span
        className={`${
          fromCurrentUser ? "self-end" : "self-start"
        } text-sm opacity-50`}
      >
        {message.sender}
      </span>
      <span className={`${fromCurrentUser ? "mr-4" : "ml-4"} text-ellipsis`}>
        {message.text}
      </span>
    </div>
  );
}

interface Props {
  message: MessageModel;
  fromCurrentUser: boolean;
}
