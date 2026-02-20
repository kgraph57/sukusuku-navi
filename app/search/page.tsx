import type { Metadata } from "next";
import { SearchPageClient } from "./search-client";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "記事を検索",
  description: "すくすくナビの記事をキーワードで検索できます。",
};

interface QaPair {
  readonly question: string;
  readonly answer: string;
}

interface SearchArticleData {
  readonly slug: string;
  readonly vol: number;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly publishedAt: string;
  readonly keyPoints: readonly string[];
  readonly qaCount: number;
  readonly qaPairs: readonly QaPair[];
}

function extractQaPairs(content: string): readonly QaPair[] {
  const lines = content.split("\n");
  const pairs: QaPair[] = [];
  let currentQuestion: string | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const speakerMatch =
      trimmed.match(/^\*\*(.+?)\*\*[「『](.+)[」』]$/) ??
      trimmed.match(/^\*\*(.+?)\*\*(.+)$/);

    if (speakerMatch) {
      const speaker = speakerMatch[1];
      const text = speakerMatch[2];
      const isDoctor = speaker.includes("おかもん") || speaker.includes("先生");

      if (!isDoctor) {
        currentQuestion = text;
      } else if (currentQuestion) {
        pairs.push({ question: currentQuestion, answer: text.slice(0, 120) });
        currentQuestion = null;
      }
    }
  }

  return pairs.slice(0, 12);
}

export default function SearchPage() {
  const allArticles = getAllArticles();

  const articlesData: readonly SearchArticleData[] = allArticles.map(
    (article) => ({
      slug: article.frontmatter.slug,
      vol: article.frontmatter.vol,
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      category: article.frontmatter.category,
      publishedAt: article.frontmatter.publishedAt,
      keyPoints: article.frontmatter.keyPoints,
      qaCount: article.frontmatter.qaCount,
      qaPairs: extractQaPairs(article.content),
    }),
  );

  return <SearchPageClient articles={articlesData} />;
}
