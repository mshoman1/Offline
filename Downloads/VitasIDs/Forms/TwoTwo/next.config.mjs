// next.config.mjs
import withPWAInit from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false,
  runtimeCaching,
  swDest: "sw.js",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: { webpackBuildWorker: true },
};

export default withPWA(nextConfig);
