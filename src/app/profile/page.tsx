'use client';
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { UpdateUserModel } from '../models/user';
import { useRouter } from 'next/navigation';
import { UserContextInstance } from '../userLayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faCamera,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
  const userContext = useContext(UserContextInstance);
  const [nickname, setNickname] = useState('');
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const formData = new FormData();

  useEffect(() => {
    setNickname(userContext?.user.nickname ?? '');
  }, [userContext]);

  const [errors, setErrors] = useState<string>();

  const router = useRouter();

  const handleNameChange = (name: string) => {
    setNickname(name);
  };

  const handleSubmit = () => {
    if (nickname.length === 0) return;

    const apiRequest = async () => {
      const createMessageModel = {
        nickname: nickname,
      } as UpdateUserModel;

      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createMessageModel),
      };
      const response = await fetch('api/user', requestOptions);
      if (response.status != 200) {
        setErrors(response.status + ' - ' + (await response.text()));
        return;
      }
      userContext!.setUser((u) => (u ? { ...u, nickname: nickname } : null));
    };

    apiRequest();
  };

  const handleUpdatePictureSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (fileInput.current?.files) {
      for (const file of fileInput.current.files) {
        formData.append('files', file);
      }

      fetch('http://localhost:3000/api/user/me/profile-picture', {
        method: 'POST',
        body: formData,
      }).catch((error) => error);
    }

    console.log(e.currentTarget.files);
  };

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  return errors ? (
    <span>Errors updating profile - {errors}</span>
  ) : (
    <div className='h-screen flex justify-center items-center relative'>
      <button onClick={() => router.push('/')}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className='text-2xl absolute top-10 left-7 md:top-20 md:left-20'
        />
      </button>
      <div className='flex justify-center min-h-svh items-center flex-col gap-10 '>
        <button
          onMouseEnter={() => setIsAvatarHovered(true)}
          onMouseLeave={() => setIsAvatarHovered(false)}
          className='relative flex items-center justify-center w-28 h-28 bg-secondary rounded-full'
        >
          <div className=' w-[108px] h-[108px] bg-black rounded-full'></div>
          <div
            onClick={handleClick}
            className='absolute z-10 flex justify-center items-center w-28 h-28 p-2 text-lg font-semibold  rounded-full'
            style={{
              transition: 'all .2s',
              backgroundColor: isAvatarHovered
                ? 'rgb(255,255,255,0.2)'
                : 'rgb(255,255,255,0)',
              color: isAvatarHovered
                ? 'rgb(255,255,255,1)'
                : 'rgb(255,255,255,0)',
              visibility: isAvatarHovered ? 'visible' : 'hidden',
            }}
          >
            Upload image
          </div>
          <div className='absolute z-20 right-0 bottom-0 flex justify-center items-center w-5 h-5 m-2 bg-black rounded-full'>
            <FontAwesomeIcon
              className='text-primary-foreground text-2xl'
              icon={faCamera}
            />
          </div>
        </button>
        <input
          type='file'
          ref={fileInput}
          multiple
          onChange={(e) => handleUpdatePictureSubmit(e)}
          className='hidden'
        />
        <div className='relative flex flex-col gap-5 border-primary-foreground border-2 rounded-2xl p-6 md:px-20'>
          <div className='absolute -top-[18px] left-4 bg-black p-1 text-primary-foreground'>
            Profile Details
          </div>
          <input
            className='text-primary-foreground p-2 bg-primary text-center rounded-xl'
            placeholder='Nickname'
            onChange={(e) => handleNameChange(e.target.value)}
            value={nickname}
          />
          <button
            className=' text-secondary-foreground rounded-xl p-2 bg-secondary flex justify-center items-center gap-3'
            onClick={handleSubmit}
          >
            <FontAwesomeIcon className='' icon={faUser} />
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
