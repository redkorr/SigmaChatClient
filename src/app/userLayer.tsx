import { Inter } from "next/font/google";
import { createContext, useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { UserModel } from "./models/user";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { UserContext } from "./shared/userContext";

const inter = Inter({ subsets: ["latin"] });
export const UserContextInstance = createContext<UserContext | null>(null);

export default function UserLayer({ children }: { children: React.ReactNode }) {
  const [errors, setErrors] = useState<string>();
  const { user: authzUser, isLoading } = useUser();
  const [user, setUser] = useState<UserModel | null>(null);
  const router = useRouter();

  useEffect(() => {
    const apiCall = async () => {
      const response = await fetch(`api/user`);

      if (response.status !== 200) {
        setErrors(response.status + " - " + (await response.text()));
        return;
      }

      const user = (await response.json()) as UserModel;
      setUser(user);

      if (!user.nickname) router.push("/profile");
    };

    if (!authzUser) {
      setUser(null);
      return;
    }

    apiCall();
  }, [authzUser, router]);

  if (errors) redirect(process.env.NEXT_PUBLIC_UNTHINKABLE!);

  return (
    <>
      {errors ? (
        <span>{errors}</span>
      ) : (
        <UserContextInstance.Provider
          value={user ? { user: user, setUser: setUser } : null}
        >
          <body className={inter.className}>{children}</body>
        </UserContextInstance.Provider>
      )}
    </>
  );
}
