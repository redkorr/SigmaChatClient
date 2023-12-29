import { handleAuth, handleCallback, handleLogin, login, getAccessToken } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

const afterCallback = async (_, sesh) => {
    const token = sesh.accessToken

    if (!sesh.accessToken)
        throw ("Empty access token on callback")

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/callback`
        , { headers: { authorization: `Bearer ${token}` } })
        .then({
            error: (_) =>
                redirect("/api/auth/logout")
        })

    return sesh
}

export const GET = handleAuth({
    async login(req, res) {
        // Pass custom parameters to login
        return await handleLogin(req, res, {
            authorizationParams: {
                audience: "SigmaChatBackend",
                scope: 'openid profile offline_access'
            }
        });
    },
    callback: handleCallback({ afterCallback })
});