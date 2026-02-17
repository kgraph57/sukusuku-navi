"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, ArrowRight, Calendar, FileText } from "lucide-react"
import { Badge } from "@/components/shared/badge"
import { SectionHeading } from "@/components/shared/section-heading"
import type { ArticleCategory } from "@/lib/types"
import { CATEGORY_LABELS } from "@/lib/types"
import { useDebounce } from "@/lib/hooks/use-debounce"

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

interface SearchPageClientProps {
  readonly articles: readonly SearchArticleData[]
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}年${month}月${day}日`
}

function searchArticles(
  articles: readonly SearchArticleData[],
  query: string
): readonly SearchArticleData[] {
  const lower = query.toLowerCase()
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(lower) ||
      a.description.toLowerCase().includes(lower) ||
      a.keyPoints.some((kp) => kp.toLowerCase().includes(lower))
  )
}

export function SearchPageClient({ articles }: SearchPageClientProps) {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 300)

  const results = useMemo(() => {
    if (debouncedQuery.length === 0) return []
    return searchArticles(articles, debouncedQuery)
  }, [articles, debouncedQuery])

  const hasQuery = debouncedQuery.length > 0

  return (
    <div className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <SectionHeading subtitle="キーワードで記事を検索できます">
          記事を検索
        </SectionHeading>

        <div className="relative mt-8">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder="例: 発熱、アレルギー、予防接種..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-white py-4 pl-12 pr-4 text-base text-foreground shadow-sm outline-none transition-all placeholder:text-muted/60 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
            autoFocus
          />
        </div>

        {hasQuery && (
          <p className="mt-4 text-sm text-muted">
            {results.length > 0
              ? `「${debouncedQuery}」の検索結果: ${results.length}件`
              : `「${debouncedQuery}」に一致する記事が見つかりませんでした`}
          </p>
        )}

        {hasQuery && results.length > 0 && (
          <div className="mt-6 space-y-4">
            {results.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group block rounded-xl border border-border bg-white p-5 transition-all hover:border-teal-200 hover:shadow-md"
              >
                <div className="flex items-center gap-2">
                  <Badge category={article.category as ArticleCategory} />
                  <span className="text-xs text-muted">
                    Vol.{article.vol}
                  </span>
                </div>
                <h3 className="mt-2 font-heading text-base font-bold text-card-foreground group-hover:text-teal-700 sm:text-lg">
                  {article.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
                  {article.description}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    Q&amp;A {article.qaCount}問
                  </span>
                  <span className="ml-auto flex items-center gap-1 text-teal-600 opacity-0 transition-opacity group-hover:opacity-100">
                    読む
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {hasQuery && results.length === 0 && (
          <div className="mt-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-warm-100">
              <Search className="h-7 w-7 text-muted" />
            </div>
            <p className="mt-4 text-base text-muted">
              別のキーワードで検索してみてください
            </p>
          </div>
        )}

        {!hasQuery && (
          <div className="mt-12">
            <p className="text-center text-sm font-medium text-muted">
              人気のキーワード
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setQuery(label)}
                  className="rounded-full border border-border bg-white px-4 py-2 text-sm text-foreground transition-colors hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
