/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['unavatar.io', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com']
  },
  swcMinify: true
}

module.exports = nextConfig
