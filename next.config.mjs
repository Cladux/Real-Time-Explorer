/** @type {import('next').NextConfig} */

const nextConfig = {
  crossOrigin: "anonymous",
  env: {
    NEXTAUTH_SECRET: "ME+Etr124dsIWsx0oXWqpgG0YCmehNlMzfsMCO5gqPI=",
    // DATABASE_URL:
    //   "mongodb+srv://EWList:AinckLydrJ4ciwIW@cladux.cia3nci.mongodb.net/EWList?retryWrites=true&w=majority&appName=Cladux",
  },
  experimental: {
    optimizePackageImports: ["zod", "sharp", "next-auth", "framer-motion", "@nextui-org/react"],
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  poweredByHeader: false,
};

export default nextConfig;
