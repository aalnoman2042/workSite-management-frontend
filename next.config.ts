import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["localhost", 'images.unsplash.com','share.google'],
  },
};

export default nextConfig;
