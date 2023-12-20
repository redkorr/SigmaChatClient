import { MessageModel } from "@/app/models/chat";
import { getAccessToken } from "@auth0/nextjs-auth0";

export const GET = async () => {
    const accessToken = await getAccessToken(
        {
            authorizationParams: {
                audience: 'SigmaChatBackend',
            }
        }
    );
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/1`
        , { headers: { authorization: `Bearer ${accessToken.accessToken}` } })

    return response
}
export const POST = async (request: Request) => {
    const json = await request.text();

    const accessToken = await getAccessToken(
        {
            authorizationParams: {
                audience: 'SigmaChatBackend',
            }
        }
    );

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`
        , {
            method: "POST",
            body: json,
            headers: { authorization: `Bearer ${accessToken.accessToken}` }
        })

    return response
}
