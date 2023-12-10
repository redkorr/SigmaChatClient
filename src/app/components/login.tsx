import { useState, KeyboardEvent } from "react";

export default function Login({ setUser }: Props) {
  const [name, setName] = useState("");

  const handleNameChange = (name: string) => {
    setName(name);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (name.length === 0) return;
    setUser(name);
  };

  return (
    <div className="flex flex-col items-center text-xl gap-5">
      <input
        className="text-black p-3"
        placeholder="Nickname"
        onChange={(e) => handleNameChange(e.target.value)}
        value={name}
        onKeyDown={handleKeyDown}
      ></input>
      <button
        className="text-3xl rounded-md"
        onClick={() => {
          handleSubmit();
        }}
      >
        Enter Sigma
      </button>
    </div>
  );
}
interface Props {
  setUser: (user: string) => void;
}
