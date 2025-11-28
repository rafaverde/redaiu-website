import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.redaiu.com.uy",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "redaiu",
        port: "8890",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
