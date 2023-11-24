"use client";

import { useEffect, useState } from "react";
import { Chat } from "../models/chat";
import { getChat, getMockedChat } from "../logic/api";

export default function Chat() {
  const [model, setModel] = useState<Chat | null>();

  useEffect(() => {
    const dataFetch = async () => {
      const chat = await getMockedChat();
      // const chat = await getChat();

      if (chat === null) {
        alert("Errror");
      }

      setModel(chat);
    };

    dataFetch();
  }, []);

  return (
    <div className="flex flex-col justify-start w-full p-2 gap-2">
      {model?.messages.map((msg, i) => (
        <div key={i} className="flex flex-col">
          <span className="text-sm opacity-50 m-left">{msg.sender}</span>
          <span className="ml-4">{msg.text}</span>
        </div>
      ))}
    </div>
  );
}
