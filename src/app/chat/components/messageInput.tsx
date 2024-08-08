import {
  useState,
  KeyboardEvent,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from 'emoji-picker-react';

export default function MessageInput({ sendMessage, setIsMessageSend }: Props) {
  const [text, setText] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiPickerButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (!textAreaRef.current) return;
    if (textAreaRef.current.scrollHeight <= 160) {
      textAreaRef.current.style.height = '0px';
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + 'px';
    } else {
      textAreaRef.current.style.height = '160px';
    }
  }, [textAreaRef, text]);

  const handleSendMessage = () => {
    if (text.trim().length === 0) return;
    sendMessage(text);
    setText('');
    setIsMessageSend(true);
    textAreaRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        emojiPickerButtonRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        !emojiPickerButtonRef.current.contains(event.target as Node)
      ) {
        setIsEmojiPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emojiPickerRef]);

  return (
    <div className='fixed bottom-0 left-0 w-full flex flex-col justify-center items-center'>
      <div
        className='absolute z-10 h-24 w-full'
        style={{
          backdropFilter: 'blur(3px)',
          maskImage:
            'linear-gradient(to top, rgba(0,0,0, 1) 50%, rgba(0,0,0, 0.1))',
        }}
      ></div>
      <div
        ref={emojiPickerRef}
        className='fixed bottom-20 right-16 md:right-[10%] md:mr-16'
      >
        <EmojiPicker
          open={isEmojiPickerOpen}
          theme={Theme.DARK}
          width={window.screen.width < 768 ? 310 : 350}
          searchDisabled={window.screen.height < 1024}
          autoFocusSearch={false}
          lazyLoadEmojis={true}
          emojiStyle={EmojiStyle.NATIVE}
          onEmojiClick={(emojiData: EmojiClickData) => {
            setText((prev) => prev + emojiData.emoji);
          }}
        />
      </div>

      <div className='relative z-20 w-full md:w-4/5 mx-3 flex items-end gap-2 pb-5 pt-2 px-2'>
        <div className='rounded-3xl w-full flex items-end bg-primary'>
          <textarea
            className='text-primary-foreground bg-primary py-2 px-4 my-auto w-full rounded-3xl resize-none focus-visible:outline-none'
            name='message-input'
            value={text}
            ref={textAreaRef}
            rows={1}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className='text-primary-foreground rounded-3xl h-[30px] m-2'
            ref={emojiPickerButtonRef}
            onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
          >
            <FontAwesomeIcon className='text-3xl' icon={faFaceSmile} />
          </button>
        </div>
        <button
          className='bg-primary text-primary-foreground rounded-3xl'
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
interface Props {
  sendMessage: (s: string) => void;
  setIsMessageSend: Dispatch<SetStateAction<boolean>>;
}
