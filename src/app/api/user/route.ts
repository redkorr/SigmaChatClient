import { getAccessToken } from "@auth0/nextjs-auth0";

export const GET = async () => {
    const accessToken = await getAccessToken(
        {
            authorizationParams: {
                audience: 'SigmaChatBackend',
            }
        }
    );
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`
        , { headers: { authorization: `Bearer ${accessToken.accessToken}` } })

    return response
}

export const PATCH = async (request: Request) => {
    const json = await request.text();

    const accessToken = await getAccessToken(
        {
            authorizationParams: {
                audience: 'SigmaChatBackend',
            }
        }
    );
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`
        , {
            method: "PATCH",
            body: json,
            headers: { authorization: `Bearer ${accessToken.accessToken}` }
        })

    return response
}