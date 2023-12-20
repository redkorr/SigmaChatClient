/** @type {import('next').NextConfig} */
const nextConfig = {
    ...require("next-pwa")({
        dest: "public",
        register: true,
        skipWaiting: true,
        disableDevLogs: true,
    }),
    productionBrowserSourceMaps: true,
    async redirects() {
        return [
            {
                source: '/',
                has: [
                    {
                        type: 'cookie',
                        key: 'appSession'
                    }
                ],
                permanent: false,
                destination: '/chat',
            },
            {
                source: '/',
                missing: [
                    {
                        type: 'cookie',
                        key: 'appSession'
                    }
                ],
                permanent: false,
                destination: '/api/auth/login',
            },
            {
                source: '/:slug',
                missing: [
                    {
                        type: 'cookie',
                        key: 'appSession'
                    }
                ],
                permanent: false,
                destination: '/api/auth/login',
            }
        ]
    }
}

module.exports = nextConfig
