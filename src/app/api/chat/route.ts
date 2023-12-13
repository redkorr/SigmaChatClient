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