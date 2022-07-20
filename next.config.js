/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  trailingSlash: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
};
