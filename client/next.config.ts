import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/wikipedia/commons/**',
      },
      {
        protocol: 'https',
        hostname: 'www.svgrepo.com',
        pathname: '/show/**',
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
        pathname: '/v2/resize:fit:1400/**',
      },
      {
        protocol: 'https',
        hostname: 'www.uber-assets.com',
        pathname: '/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/images**',
      },
      {
        protocol: 'https',
        hostname: 'images.cnbctv18.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.uber-assets.com',
        pathname: '/image/upload/**',
      },
    ],
  },
};

export default nextConfig;
