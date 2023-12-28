import { handleAuth, handleCallback, handleLogin, login, getAccessToken } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

const afterCallback = async (_, sesh) => {
    const token = sesh.accessToken
    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/callback`
            , { headers: { authorization: `Bearer ${token}` } })
    } catch (error) {
        redirect("/api/auth/logout");
    }

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

    async callback(req, res) {
        return await handleCallback(req, res, { afterCallback });
    }
});