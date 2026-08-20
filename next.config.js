/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    // Sanity serves product images from its CDN; next/image refuses remote
    // hosts that aren't listed here.
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
    ],
  },
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config) => {
    // Handle framer-motion SSR issues
    config.externals = [...config.externals, { canvas: 'canvas' }];
    return config;
  },
};

module.exports = nextConfig;
