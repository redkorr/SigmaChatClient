import { useEffect, useState } from "react";

export function useUser() {
    const [user, setUser] = useState<string | null>();

    useEffect(() => {
        const userName = localStorage.getItem("userName");
        setUser(userName);
    }, [])

    const setUserAndSave = (user: string) => {
        localStorage.setItem("userName", user);
        setUser(user);
    }

    return { user, setUserAndSave }
}