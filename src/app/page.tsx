import Image from "next/image";
import Chat from "./pages/chat";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Chat></Chat>
    </main>
  );
}
