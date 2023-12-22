"use client";
import Menu from "../shared/components/menu";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="border-b-4 border-gray-950 fixed left-0 top-0 right-0  bg-black z-10 p-2 md:border-b-0 md:p-0 md:right-auto md:left-2 md:top-2 md:block">
        <Menu></Menu>
      </div>
      <main>{children}</main>
    </>
  );
}
