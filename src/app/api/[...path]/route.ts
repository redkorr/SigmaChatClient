import { getAccessToken } from '@auth0/nextjs-auth0';
import { RequestOptions } from 'https';
import { NextApiRequest, NextApiResponse } from 'next';

// this is basically a middleware for redirecting to backend with bearer; maybe use next config redirects or even return redirect here with set bearer?
const withAuth = async (request: Request, options: any) => {
    const accessToken = await getAccessToken({
        authorizationParams: {
            audience: 'SigmaChatBackend',
        }
    });

    const headers = {
        ...options.headers,
        authorization: `Bearer ${accessToken.accessToken}`
    };

    return { ...options, headers };
}

const handleRequest = async (req: Request) => {
    const options = await withAuth(req, {
        headers: {
            'content-type': req.headers.get('content-type')!,
        },
        method: req.method,
        duplex: 'half',
    } as RequestOptions);

    const { readable, writable } = new TransformStream();
    req.body?.pipeTo(writable)

    if (req.body) options.body = readable;

    const serverPath = req.url!.split('/api/').pop();

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${serverPath}`, options);
}

// export every like this, find a way to do it better
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
