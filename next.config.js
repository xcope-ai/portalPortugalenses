/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/plataforma' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/plataforma/' : '',
}

module.exports = nextConfig;
