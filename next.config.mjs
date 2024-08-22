/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    API_NINJA: "Tslhr/CBrX41krGc1gKKvA==os3kleuQIXFpWliA",
    UNSPLASH_ACCESS_KEY: "f5WTMLK7AMH_OYHS5UHXRgRO9dqwil1fFA-82vswbjU",
  },
  experimental: {
    optimizePackageImports: ["zod", "sharp", "next-auth", "framer-motion", "@nextui-org/react"],
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  poweredByHeader: false,
};

export default nextConfig;
