/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔹 نطلب من Next.js يعمل Static Export
  output: 'export',

  // 🔹 نخلي الروابط تنتهي بـ / (مهم للـ static files)
  trailingSlash: true,

  // 🔹 إيقاف Image Optimization (لأنه مش مدعوم مع export)
  images: {
    unoptimized: true,
  },

  // 🔹 نتجاهل مشاكل ESLint/TypeScript أثناء build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // 🔹 إعداد تجريبي (مش ضروري بس بيساعد بالـ build)
  experimental: {
    webpackBuildWorker: true,
  },

  // ⚠️ ملاحظة: Vercel بيتجاهل headers بالـ static export
  // مفيدة لو رح تستضيف الملفات بمكان آخر (Apache/Nginx مثلاً)
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          { key: 'Content-Type', value: 'application/manifest+json' },
        ],
      },
    ];
  },
};

export default nextConfig;
