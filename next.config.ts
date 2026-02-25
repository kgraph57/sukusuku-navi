import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPages && { output: "export" as const }),
  basePath: isGitHubPages ? "/sukusuku-navi" : "",
  compress: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? "/sukusuku-navi" : "",
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  typescript: {
    // posthog-js が @posthog/core/src/*.ts を同梱し内部 @/ パスが本プロジェクトの paths と衝突
    // 自プロジェクトは tsc --noEmit | grep -v node_modules でエラー0件を確認済み
    ignoreBuildErrors: true,
  },
  experimental: {
    mdxRs: false,
  },
};

export default nextConfig;
