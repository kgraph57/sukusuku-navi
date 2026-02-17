import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_PAGES === "true" ? "/sukusuku-navi" : "",
  images: {
    unoptimized: true,
  },
  experimental: {
    mdxRs: false,
  },
};

export default nextConfig;
