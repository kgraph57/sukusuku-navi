import type { Metadata } from "next";
import { WatercolorIcon } from "@/components/icons/watercolor-icon";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ArticleCategory } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { getArticlesByCategory } from "@/lib/content";
import { ArticleCard } from "@/components/article/article-card";
import { SITE_URL } from "@/lib/constants";

const VALID_CATEGORIES = Object.keys(CATEGORY_LABELS) as ArticleCategory[];

interface CategoryPageProps {
  readonly params: Promise<{ cat: string }>;
}

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((cat) => ({ cat }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { cat } = await params;
  const label = CATEGORY_LABELS[cat as ArticleCategory];
  if (!label) return {};

  return {
    title: `${label}の記事一覧`,
    description: `小児科医おかもんの「${label}」に関するQ&A記事の一覧です。`,
    openGraph: {
      title: `${label}の記事一覧 | すくすくナビ`,
      description: `小児科医おかもんの「${label}」に関するQ&A記事の一覧です。`,
      type: "website",
    },
  };
}

function BreadcrumbJsonLd({
  category,
  label,
}: {
  readonly category: string;
  readonly label: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "記事一覧",
        item: `${SITE_URL}/articles`,
      },
      { "@type": "ListItem", position: 3, name: label },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { cat } = await params;
  const category = cat as ArticleCategory;

  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  const label = CATEGORY_LABELS[category];
  const articles = getArticlesByCategory(category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
      <BreadcrumbJsonLd category={category} label={label} />

      {/* Breadcrumb */}
      <nav aria-label="パンくずリスト" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          <li>
            <Link href="/" className="transition-colors hover:text-sage-600">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">
            <WatercolorIcon
              name="chevron_down"
              size={12}
              className="-rotate-90"
            />
          </li>
          <li>
            <Link
              href="/articles"
              className="transition-colors hover:text-sage-600"
            >
              記事一覧
            </Link>
          </li>
          <li aria-hidden="true">
            <WatercolorIcon
              name="chevron_down"
              size={12}
              className="-rotate-90"
            />
          </li>
          <li aria-current="page" className="text-foreground">
            {label}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-50">
          <WatercolorIcon name="tag" size={20} className="text-sage-600" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            {label}
          </h1>
          <p className="mt-1 text-sm text-muted">{articles.length}件の記事</p>
        </div>
      </div>

      {/* Category navigation */}
      <div className="mt-6 flex flex-wrap gap-2">
        {VALID_CATEGORIES.map((c) => (
          <Link
            key={c}
            href={`/articles/category/${c}`}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              c === category
                ? "bg-sage-600 text-white"
                : "border border-border bg-card text-muted hover:border-sage-200 hover:text-sage-600"
            }`}
          >
            {CATEGORY_LABELS[c]}
          </Link>
        ))}
      </div>

      {/* Articles grid */}
      {articles.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.frontmatter.slug} frontmatter={a.frontmatter} />
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center">
          <p className="text-base font-medium text-foreground">
            このカテゴリにはまだ記事がありません
          </p>
          <Link
            href="/articles"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-sage-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-sage-700"
          >
            記事一覧へ
          </Link>
        </div>
      )}
    </div>
  );
}
