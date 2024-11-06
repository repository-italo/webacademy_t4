import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ranekiapi.origamid.dev"
      }
    ]
  }
};

export default nextConfig;
