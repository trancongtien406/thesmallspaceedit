/** @type {import('next').NextConfig} */
// Served by Vercel as a normal Next.js app: every public page is still pre-rendered as static HTML at build time,
// plus the Keystatic admin (/keystatic) and its API routes (/api/keystatic/*). `output: 'export'` was removed for the CMS.
const nextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/admin', destination: '/keystatic/', permanent: false },
      { source: '/admin/:path*', destination: '/keystatic/:path*', permanent: false },
    ];
  },
};
export default nextConfig;
