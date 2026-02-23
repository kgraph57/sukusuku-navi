import type { Metadata } from "next";
import { WatercolorIcon } from "@/components/icons/watercolor-icon";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  getArticleBySlug,
  getArticleSlugs,
  getRelatedArticles,
} from "@/lib/content";
import { CATEGORY_LABELS, AGE_GROUP_LABELS } from "@/lib/types";
import { extractCitations } from "@/lib/extract-citations";
import { createMdxComponents } from "@/components/article/mdx-components";
import { KeyPointsBox } from "@/components/article/key-points-box";
import { CitationList } from "@/components/article/citation-list";
import { ArticleCard } from "@/components/article/article-card";
import { CategoryBadge } from "@/components/article/article-card";
import { DoctorByline } from "@/components/article/doctor-byline";
import { BookmarkButton } from "@/components/article/bookmark-button";

interface ArticlePageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const { title, description } = article.frontmatter;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { frontmatter, content } = article;
  const { vol, title, description, category, publishedAt } = frontmatter;
  const ageGroups = frontmatter.ageGroups ?? [];
  const keyPoints = frontmatter.keyPoints ?? [];

  const citations = extractCitations(content);
  const relatedArticles = getRelatedArticles(slug, 3);

  const contentWithoutCitations = content.split(/##\s*参考文献/)[0] ?? content;

  const mdxComponents = createMdxComponents();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
      {/* Breadcrumb */}
      <nav className="mb-10">
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-sage-600"
        >
          <WatercolorIcon name="arrow_right" size={16} />
          記事一覧に戻る
        </Link>
      </nav>

      {/* Article header */}
      <header className="mb-10 border-b border-border pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-sage-600 px-3 py-1 text-xs font-bold text-white">
            Vol.{vol}
          </span>
          <CategoryBadge category={category} />
        </div>

        <h1 className="mt-5 font-heading text-2xl font-semibold leading-[1.45] text-foreground sm:text-3xl sm:leading-[1.4]">
          {title}
        </h1>

        <p className="mt-4 text-base leading-[1.85] text-muted">
          {description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted">
          <div className="flex items-center gap-1">
            <WatercolorIcon name="calendar" size={12} className=".5 .5" />
            <time dateTime={publishedAt}>
              {new Date(publishedAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <WatercolorIcon name="tag" size={12} className=".5 .5" />
            <Link
              href={`/articles/category/${category}`}
              className="hover:text-sage-600 hover:underline"
            >
              {CATEGORY_LABELS[category]}
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <WatercolorIcon name="user" size={12} className=".5 .5" />
            <span>
              {ageGroups.map((ag) => AGE_GROUP_LABELS[ag]).join("・")}
            </span>
          </div>
          <BookmarkButton articleSlug={frontmatter.slug} />
        </div>
      </header>

      {/* Doctor byline */}
      <DoctorByline
        qaCount={frontmatter.qaCount}
        referenceCount={frontmatter.referenceCount}
      />

      {/* Key points */}
      <KeyPointsBox points={keyPoints} />

      {/* MDX content */}
      <div className="article-content">
        <MDXRemote
          source={contentWithoutCitations}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </div>

      {/* Citations */}
      <CitationList citations={citations} />

      {/* Disclaimer */}
      <div className="mt-8 rounded-lg bg-ivory-100 p-4 text-xs leading-relaxed text-muted">
        ※
        この記事は一般的な医学情報の提供を目的としており、個別の診断・治療を行うものではありません。お子さんの症状が心配な場合は、かかりつけの小児科医にご相談ください。
      </div>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-12 border-t border-border pt-10">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            関連記事
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((ra) => (
              <ArticleCard
                key={ra.frontmatter.slug}
                frontmatter={ra.frontmatter}
              />
            ))}
          </div>
        </section>
      )}

      {/* Back to list */}
      <div className="mt-12 text-center">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 rounded-full border border-sage-200 bg-white px-6 py-3 text-sm font-medium text-sage-700 transition-colors hover:bg-sage-50"
        >
          <WatercolorIcon name="arrow_right" size={16} />
          記事一覧に戻る
        </Link>
      </div>
    </article>
  );
}
