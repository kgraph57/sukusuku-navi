import type { Metadata } from "next";
import { getAllArticles } from "@/lib/content";
import { MyPageClient } from "./my-page-client";

export const metadata: Metadata = {
  title: "マイページ",
  description:
    "お子さんの情報管理、タイムライン、予防接種記録、成長マイルストーンをまとめて確認できます。",
};

export default function MyPage() {
  const allArticles = getAllArticles();

  const articleTitles: Record<string, string> = {};
  for (const article of allArticles) {
    articleTitles[article.frontmatter.slug] = article.frontmatter.title;
  }

  return <MyPageClient articleTitles={articleTitles} />;
}
