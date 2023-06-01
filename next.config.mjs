/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    domains: ["cdn.sanity.io"],
  },
};

export default nextConfig;
