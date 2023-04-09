/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["cdn.sanity.io"],
  },

  eslint: {ignoreDuringBuilds: !!process.env.CI},
  typescript: {ignoreBuildErrors: !!process.env.CI},
};

module.exports = nextConfig;
