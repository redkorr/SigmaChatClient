import Message from './message';
import { MessageModel } from '../../models/chat';
import { Dispatch, SetStateAction, createRef, useContext, useEffect, useRef, useState } from 'react';
import { useIntersectionTrigger } from '../hooks/useIntersectionTrigger';

const PAGINATION_PAGE_SIZE = 30;

export default function MessageList({ messages, paginationTrigger, isMessageSend, setIsMessageSend }: Props) {
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageListRef.current) {
      {
        let scrollConfig = {
          behavior: 'instant',
        } as ScrollIntoViewOptions;
        if (messageListRef.current.children.length > PAGINATION_PAGE_SIZE && !isMessageSend) {
          messageListRef.current.children[PAGINATION_PAGE_SIZE]?.scrollIntoView(
            scrollConfig
          );
          console.log(messageListRef.current.children[PAGINATION_PAGE_SIZE]);
          return;
        }
        messageListRef.current.children[messages.length - 1]?.scrollIntoView(
          scrollConfig
        );
        setIsMessageSend(false);

      }
    }
  }, [messages]);

  return (
    <div
      className="h-full overflow-y-auto overflow-x-hidden mb-16 md:mb-12 relative flex flex-col"
      ref={messageListRef}
    >
      {paginationTrigger}
      {messages.map((msg) => (
        <div
          key={msg.messageId}
        // className={`${msg.userNickname == user?.name && "flex justify-end"}`}
        >
          <Message
            message={msg}
            fromCurrentUser={false}
          // fromCurrentUser={msg.userNickname == user?.name}
          ></Message>
        </div>
      ))}
      <div
        className="fixed z-[-1] inset-0 opacity-5"
        style={{
          backgroundImage: 'url(\'/cc.svg\')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '40%',
          backgroundPosition: 'center',
        }}
      ></div>
    </div>
  );
}

interface Props {
  messages: MessageModel[];
  paginationTrigger: JSX.Element;
  isMessageSend: boolean;
  setIsMessageSend: Dispatch<SetStateAction<boolean>>;
}
