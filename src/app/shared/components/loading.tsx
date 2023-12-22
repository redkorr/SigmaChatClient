import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center">
      <Image alt="Loading" src="/cc.svg" width={500} height={500}></Image>
    </div>
  );
}
