/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // static export — deploys cleanly to Vercel (or any static host)
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
