import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'back.crosshair.workers.dev'
      }
    ]
  }
}

export default nextConfig
