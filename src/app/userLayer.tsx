import { Inter } from 'next/font/google';
import { createContext, useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { UserModel } from './models/user';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { UserContext } from './shared/userContext';
import { registerNotificationWorker } from './utils/registerWorker';

const inter = Inter({ subsets: ['latin'] });
export const UserContextInstance = createContext<UserContext | null>(null);

export default function UserLayer({ children }: { children: React.ReactNode }) {
  const [errors, setErrors] = useState<boolean>();
  const { user: authzUser, isLoading } = useUser();
  const [user, setUser] = useState<UserModel | null>(null);
  const router = useRouter();

  const [lastFetchedUser, setLastFetchedUser] = useState<string | null>(null);
  useEffect(() => {
    const apiCall = async () => {
      setLastFetchedUser(authzUser!.sub!);
      const response = await fetch('api/user');
      if (response.status !== 200) {
        setErrors(true);
        return;
      }

      const user = (await response.json()) as UserModel;
      setUser(user);

      registerNotificationWorker();

      if (!user.nickname) router.push('/profile');
    };

    //there's issue with auth0 double fetching user causing all dependent hooks to re-render
    if (!authzUser || lastFetchedUser === authzUser.sub) {
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
