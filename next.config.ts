import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPages && { output: "export" as const }),
  basePath: isGitHubPages ? "/sukusuku-navi" : "",
  images: {
    unoptimized: true,
  },
  experimental: {
    mdxRs: false,
  },
};

export default nextConfig;
