import type { Metadata } from "next"
import { SearchPageClient } from "./search-client"
import { getAllArticles } from "@/lib/content"

export const metadata: Metadata = {
  title: "記事を検索",
  description: "すくすくナビの記事をキーワードで検索できます。",
}

interface SearchArticleData {
  readonly slug: string
  readonly vol: number
  readonly title: string
  readonly description: string
  readonly category: string
  readonly publishedAt: string
  readonly keyPoints: readonly string[]
  readonly qaCount: number
}

export default function SearchPage() {
  const allArticles = getAllArticles()

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
    })
  )

  return <SearchPageClient articles={articlesData} />
}
