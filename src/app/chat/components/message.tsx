import { MessageModel } from "../../models/chat";

export default function Message({ message, fromCurrentUser }: Props) {
  return (
    <div className="flex flex-col pr-2 md:max-w-[50%] max-w-[80%]">
      <span
        className={`${
          fromCurrentUser ? "self-end" : "self-start"
        } text-sm opacity-50`}
      >
        {message.userNickname}
      </span>
      <span
        className={`${fromCurrentUser ? "mr-4 self-end" : "ml-4"} break-words`}
      >
        {message.text}
      </span>
    </div>
  );
}

interface Props {
  message: MessageModel;
  fromCurrentUser: boolean;
}
