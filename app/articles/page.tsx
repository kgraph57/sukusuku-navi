import type { Metadata } from "next"
import { WatercolorIcon } from "@/components/icons/watercolor-icon";
import { getAllArticles } from "@/lib/content"
import { ArticleFilter } from "@/components/article/article-filter"

export const metadata: Metadata = {
  title: "記事一覧",
  description:
    "小児科医おかもんが書いたQ&A形式の子育て・医療記事。感染症、アレルギー、予防接種、発達など50本以上。",
}

export default function ArticlesPage() {
  const articles = getAllArticles()
  const frontmatters = articles.map((a) => a.frontmatter)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-50">
          <WatercolorIcon name="book" size={20} className="text-sage-600" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            記事一覧
          </h1>
          <p className="mt-1 text-sm text-muted">
            小児科医おかもんのQ&A記事（全{frontmatters.length}本）
          </p>
        </div>
      </div>

      <div className="mt-8">
        <ArticleFilter articles={frontmatters} />
      </div>
    </div>
  )
}
