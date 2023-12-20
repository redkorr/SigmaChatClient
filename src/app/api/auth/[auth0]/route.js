import { handleAuth, handleCallback, handleLogin, login, getAccessToken } from '@auth0/nextjs-auth0';

const afterCallback = (_, sesh) => {
    const token = sesh.accessToken
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/callback`
        , { headers: { authorization: `Bearer ${token}` } })
    return sesh
}

export const GET = handleAuth({
    async login(req, res) {
        // Pass custom parameters to login
        return await handleLogin(req, res, {
            authorizationParams: {
                audience: "SigmaChatBackend"
            }
        });
    },

    async callback(req, res) {
        return await handleCallback(req, res, { afterCallback });
    }
});