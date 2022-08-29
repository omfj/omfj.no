/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA({
  nextConfig,
  trailingSlash: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
});
