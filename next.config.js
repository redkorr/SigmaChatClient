/** @type {import('next').NextConfig} */
const nextConfig = {
    ...require("next-pwa")({
        dest: "public",
        register: true,
        skipWaiting: true,
        disableDevLogs: true,
    }),
    productionBrowserSourceMaps: true
}

module.exports = nextConfig
