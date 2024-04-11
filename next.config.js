
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
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
    },
    // Probably doesnt matter, left for auth0 for now TODO test if auth asks BFF
    async headers() {
        return [{
            source: '/api/:path*',
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
        }]
    }
}

const withPwa = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
})


module.exports = withPwa({
    ...nextConfig
});
