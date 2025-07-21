import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['fakestoreapi.com'], // ✅ Add allowed image host
  },
};

export default nextConfig;
