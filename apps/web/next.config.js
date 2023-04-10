/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["cdn.sanity.io"],
  },

  // transpilePackages: ["@omfj.no/ui"],
};

module.exports = nextConfig;
