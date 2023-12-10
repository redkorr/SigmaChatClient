"use client";
import Image from "next/image";
import { createSignalRContext } from "react-signalr/signalr";
import Chat from "./pages/chat";

const SignalRContext = createSignalRContext();

export default function Home() {
  const token = "";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <SignalRContext.Provider
        connectEnabled={true}
        withCredentials={false}
        url={process.env.NEXT_PUBLIC_API_HUB!}
      >
        <Chat signalRContext={SignalRContext}></Chat>
      </SignalRContext.Provider>
    </main>
  );
}
