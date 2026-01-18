import Image from 'next/image';
import { CSSProperties } from 'react';

// todo make this resizable and fix hard coded heights and animations
// this is quick solution, make it reusable
export default function Loading() {
  const animateLeft = {
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationName: 'leftArm',
  } as CSSProperties;

  const animateRight = {
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationName: 'rightArm',
  } as CSSProperties;

  const size = { width: 250, height: 343 };

  return (
    <div className="relative h-[343px] w-[400px]">
      <Image
        alt="Loading"
        src="/marek_left.gif"
        style={animateLeft}
        className="absolute left-[calc(50%-150px)]"
        {...size}
      ></Image>
      <Image
        alt="Loading"
        className="absolute left-[calc(50%-150px)]"
        src="/marek_body.gif"
        {...size}
      ></Image>
      <Image
        alt="Loading"
        src="/marek_right.gif"
        style={animateRight}
        className="absolute left-[calc(50%-150px)]"
        {...size}
      ></Image>
    </div>
  );
}
