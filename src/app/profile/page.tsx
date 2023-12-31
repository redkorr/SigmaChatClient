"use client";
import { useContext, useEffect, useState } from "react";
import { UpdateUserModel } from "../models/user";
import { useRouter } from "next/navigation";
import { UserContextInstance } from "../userLayer";

export default function Profile() {
  const userContext = useContext(UserContextInstance);
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    setNickname(userContext?.user.nickname ?? "");
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
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createMessageModel),
      };
      const response = await fetch(`api/user`, requestOptions);
      if (response.status != 200) {
        setErrors(response.status + " - " + (await response.text()));
        return;
      }

      userContext!.setUser((u) => (u ? { ...u, nickname: nickname } : null));
      router.push("/");
    };

    apiRequest();
  };

  return errors ? (
    <span>Errors updating profile - {errors}</span>
  ) : (
    <div className="flex justify-center min-h-svh items-center flex-col gap-5">
      Nickname:
      <input
        className="text-black p-3 rounded-sm"
        placeholder="Nickname"
        onChange={(e) => handleNameChange(e.target.value)}
        value={nickname}
      />
      <button
        className="text-2xl opacity-50 rounded-md p-6"
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  );
}
