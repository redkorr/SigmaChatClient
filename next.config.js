/** @type {import('next').NextConfig} */
const nextConfig = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disableDevLogs: true,
});

module.exports = nextConfig
