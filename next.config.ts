import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://epuwdqkitbqtfernuzbd.supabase.co/**')],
  },
};

export default nextConfig;
