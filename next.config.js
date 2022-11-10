/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'crislombardo.com',
      }
    ]
  },
  env: {
    userSessionId: new Date().getTime()
  }
}

module.exports = nextConfig
