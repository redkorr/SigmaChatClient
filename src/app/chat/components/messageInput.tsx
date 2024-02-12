import { useState, KeyboardEvent, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFaceSmile } from '@fortawesome/free-solid-svg-icons';

export default function MessageInput({ sendMessage }: Props) {
  const [text, setText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useAutosizeTextArea(textAreaRef.current, text);

  const handleSendMessage = () => {
    if (text.trim().length > 0) {
      sendMessage(text);
      setText('');
    }
  };

  return (
    <div className='fixed bottom-0 left-0 w-full flex flex-col justify-center items-center'>
      <div className='w-full md:w-4/5 mx-3 flex items-end gap-2 pb-5 pt-3 bg-black'>
        <div className='rounded-3xl w-full flex items-end bg-zinc-800'>
          <textarea
            className='text-gray-100 bg-zinc-800 p-2 my-auto w-full rounded-3xl resize-none focus-visible:outline-none'
            name='message-input'
            value={text}
            ref={textAreaRef}
            rows={1}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className='text-gray-100 rounded-3xl h-[30px] m-2'>
            <FontAwesomeIcon className='text-3xl' icon={faFaceSmile} />
          </button>
        </div>
        <button
          className=' bg-zinc-800 text-gray-100 rounded-3xl'
          onClick={handleSendMessage}
        >
          <FontAwesomeIcon
            className='text-2xl pt-[12px] pb-2 pl-[10px] pr-[14px]'
            icon={faPaperPlane}
          />
        </button>
      </div>
    </div>
  );
}
const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = '0px';
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef, value]);
};

interface Props {
  sendMessage: (s: string) => any;
}
