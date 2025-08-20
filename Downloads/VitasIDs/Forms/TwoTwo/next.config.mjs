/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable PWA features
  experimental: {
    webpackBuildWorker: true,
  },
  // Optimize for offline usage
  trailingSlash: true,
  // Enable static export for better offline support
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Add headers for PWA
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
    ];
  },
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
