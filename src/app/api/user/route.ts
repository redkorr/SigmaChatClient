import { auth0 } from '@/lib/auth0';
import { getAccessToken } from '@auth0/nextjs-auth0';

export const GET = async () => {
    const accessToken = await auth0.getAccessToken({
        audience: 'SigmaChatBackend',
        scope: 'openid profile offline_access'
    });
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`
        , { headers: { authorization: `Bearer ${accessToken.token}` } })

    return response
}

export const PATCH = async (request: Request) => {
    const json = await request.text();
    const accessToken = await auth0.getAccessToken({
        audience: 'SigmaChatBackend',
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`
        , {
            method: 'PATCH',
            body: json,
            headers: { authorization: `Bearer ${accessToken.token}` }
        })

    return response
}

