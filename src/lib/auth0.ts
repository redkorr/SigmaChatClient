import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { Auth0ClientOptions } from '@auth0/nextjs-auth0/types';

export const auth0 = new Auth0Client(
    {
        session: {
            // as per https://auth0.com/docs/manage-users/sessions/session-lifecycle max 3 days :[[
            inactivityDuration: 60 * 30 * 72, 
        }

    } as Auth0ClientOptions
);
