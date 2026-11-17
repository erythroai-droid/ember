/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR || '.next',   // lets a verification build run without touching a running dev server
  async headers() {
    // gallery / video / poster names are not versioned: cache a week and revalidate in the background (was max-age=0 → a 304 round trip per file on every visit)
    const media = [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=2592000' }];
    return [
      { source: '/frames/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/gallery/:path*', headers: media },
      { source: '/video/:path*', headers: media },
      { source: '/poster.webp', headers: media },
    ];
  },
};
export default nextConfig;
