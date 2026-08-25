import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "pet-shop";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.GITHUB_ACTIONS ? `/${repoName}` : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }]
  },
  poweredByHeader: false,
};

export default nextConfig;

