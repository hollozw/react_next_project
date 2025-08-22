/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/public': require('path').resolve(__dirname, 'public'),
    };
    return config;
  },
}

module.exports = nextConfig
