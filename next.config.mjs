/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    API_NINJA: "Tslhr/CBrX41krGc1gKKvA==os3kleuQIXFpWliA",
    UNSPLASH_ACCESS_KEY: "f5WTMLK7AMH_OYHS5UHXRgRO9dqwil1fFA-82vswbjU",
    NEWS_API: "d91f18d87b3b4379b660d2c7319fdeb5",
    Country_State_City_API: "SE5XSnZYQ1p6cmVZM3E0WDlRMG5BVUx4WTR4WGcwMTgxOWwxVTZUZA==",
    GEOAPIFY_API:"ec24f097f4254612b8a0bd5fdd475d6e",
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
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
    ],
  },
  poweredByHeader: false,
};

export default nextConfig;
