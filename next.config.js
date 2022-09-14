/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['unavatar.io']
  },
  swcMinify: true
}

module.exports = nextConfig
