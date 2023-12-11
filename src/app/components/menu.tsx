import { useUser } from "@auth0/nextjs-auth0/client";

export default function Menu({}: Props) {
  const { user, isLoading } = useUser();

  const handleLogout = () => {};

  return (
    <>
      <a
        href="/api/auth/logout"
        className="text-2xl opacity-50 rounded-md"
        onClick={() => {
          handleLogout();
        }}
      >
        LOGOUT
      </a>
    </>
  );
}

interface Props {}
