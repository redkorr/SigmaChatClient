import { useState, KeyboardEvent } from "react";

export default function MessageInput({ sendMessage }: Props) {
  const [text, setText] = useState("");

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    sendMessage(text);
    setText("");
  };

  return (
    <div className="rounded-md border-2 p-1 flex justify-between">
      <input
        className="text-black w-full p-2"
        name="message-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="p-2" onClick={handleSendMessage}>
        send
      </button>
    </div>
  );
}

interface Props {
  sendMessage: (s: string) => any;
}
