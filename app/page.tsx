import Link from "next/link";
import {
  BookOpen,
  Calculator,
  Stethoscope,
  MapPin,
  ClipboardCheck,
  ArrowRight,
  Mail,
  Calendar,
  Heart,
  GraduationCap,
} from "lucide-react";
import { getAllArticles } from "@/lib/content";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardTitle, CardDescription } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import type { ArticleCategory } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

const FEATURES = [
  {
    href: "/articles",
    icon: BookOpen,
    title: "記事を読む",
    description:
      "小児科医が書いた50本以上のQ&A記事。感染症、アレルギー、予防接種など。",
    color: "bg-teal-50 text-teal-600",
  },
  {
    href: "/simulator",
    icon: Calculator,
    title: "給付金シミュレーター",
    description:
      "お子さんの年齢と世帯情報から、受けられる行政サービス・助成金を一括検索。",
    color: "bg-coral-50 text-coral-500",
  },
  {
    href: "/triage",
    icon: Stethoscope,
    title: "受診判断ガイド",
    description: "お子さんの症状から、いま病院に行くべきか判断をサポート。",
    color: "bg-red-50 text-red-500",
  },
  {
    href: "/clinics",
    icon: MapPin,
    title: "小児科マップ",
    description: "港区の小児科を地図で探せます。夜間・休日対応の医療機関も。",
    color: "bg-blue-50 text-blue-500",
  },
  {
    href: "/checklists",
    icon: ClipboardCheck,
    title: "手続きガイド",
    description: "出産前から入園まで、必要な手続きをチェックリストで管理。",
    color: "bg-purple-50 text-purple-500",
  },
] as const;

const RECOMMENDED_CATEGORIES: readonly {
  readonly category: ArticleCategory;
  readonly icon: typeof Heart;
  readonly description: string;
}[] = [
  {
    category: "infectious-disease",
    icon: Stethoscope,
    description: "RSウイルス、インフルエンザ、手足口病など季節の感染症対策",
  },
  {
    category: "allergy",
    icon: Heart,
    description: "食物アレルギー、アトピー、花粉症の最新エビデンス",
  },
  {
    category: "vaccination",
    icon: ClipboardCheck,
    description: "定期接種・任意接種のスケジュールと副反応の正しい知識",
  },
  {
    category: "development",
    icon: GraduationCap,
    description: "ことば・運動・社会性の発達マイルストーン",
  },
] as const;

function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute -right-20 -top-20 h-[500px] w-[500px] opacity-[0.06]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle
          cx="200"
          cy="200"
          r="180"
          stroke="currentColor"
          strokeWidth="2"
          className="text-teal-600"
        />
        <circle
          cx="200"
          cy="200"
          r="140"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-teal-500"
        />
        <circle
          cx="200"
          cy="200"
          r="100"
          stroke="currentColor"
          strokeWidth="1"
          className="text-teal-400"
        />
        <circle
          cx="150"
          cy="150"
          r="20"
          fill="currentColor"
          className="text-coral-400"
        />
        <circle
          cx="280"
          cy="120"
          r="12"
          fill="currentColor"
          className="text-teal-400"
        />
        <circle
          cx="120"
          cy="280"
          r="16"
          fill="currentColor"
          className="text-teal-300"
        />
        <circle
          cx="300"
          cy="260"
          r="10"
          fill="currentColor"
          className="text-coral-300"
        />
      </svg>
      <svg
        className="absolute -bottom-10 -left-16 h-[350px] w-[350px] opacity-[0.05]"
        viewBox="0 0 300 300"
        fill="none"
      >
        <path
          d="M150 30 C200 30, 270 80, 270 150 C270 220, 200 270, 150 270 C100 270, 30 220, 30 150 C30 80, 100 30, 150 30Z"
          stroke="currentColor"
          strokeWidth="2"
          className="text-coral-500"
        />
        <circle
          cx="80"
          cy="100"
          r="14"
          fill="currentColor"
          className="text-teal-300"
        />
        <circle
          cx="220"
          cy="200"
          r="18"
          fill="currentColor"
          className="text-coral-300"
        />
      </svg>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

export default function HomePage() {
  const allArticles = getAllArticles();
  const latestArticles = allArticles.slice(-5).reverse();

  const recommendedByCategory = RECOMMENDED_CATEGORIES.map((rec) => {
    const articles = allArticles.filter(
      (a) => a.frontmatter.category === rec.category,
    );
    return {
      ...rec,
      articles: articles.slice(0, 3),
    };
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-warm-50 to-coral-50/30 px-4 pb-16 pt-12 sm:pb-24 sm:pt-20">
        <HeroBackground />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/70 px-4 py-1.5 text-sm font-medium text-teal-700">
            <Stethoscope className="h-3.5 w-3.5" />
            愛育病院 小児科おかもん
          </p>
          <h1 className="mt-5 font-heading text-3xl font-bold leading-tight text-foreground sm:text-5xl">
            診察室の外でも、
            <br />
            <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
              お子さんのそばに。
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            小児科医がエビデンスに基づいて書いた記事、給付金シミュレーター、受診判断ガイド。
            子育てに必要な情報を、ひとつの場所に。
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-600/30"
            >
              記事を読む
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/simulator"
              className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-7 py-3.5 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50"
            >
              給付金を調べる
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted">
            {allArticles.length}本以上の記事を無料で公開中
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHeading subtitle="子育てに必要な情報を、ワンストップで">
            すくすくナビでできること
          </SectionHeading>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-teal-200 hover:shadow-md"
              >
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${feature.color}`}
                >
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-600 opacity-0 transition-opacity group-hover:opacity-100">
                  詳しく見る
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      {latestArticles.length > 0 && (
        <section className="border-t border-border bg-warm-100/50 px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <SectionHeading subtitle="小児科医おかもんが書き下ろした最新の記事">
              最新の記事
            </SectionHeading>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latestArticles.map((article) => (
                <Card
                  key={article.frontmatter.slug}
                  href={`/articles/${article.frontmatter.slug}`}
                  variant="elevated"
                >
                  <div className="flex items-center gap-2">
                    <Badge category={article.frontmatter.category} />
                    <span className="text-xs text-muted">
                      Vol.{article.frontmatter.vol}
                    </span>
                  </div>
                  <CardTitle className="mt-3 line-clamp-2 group-hover:text-teal-700">
                    {article.frontmatter.title}
                  </CardTitle>
                  <CardDescription className="mt-2 line-clamp-2">
                    {article.frontmatter.description}
                  </CardDescription>
                  <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(article.frontmatter.publishedAt)}
                    </span>
                    <span>Q&amp;A {article.frontmatter.qaCount}問</span>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-6 py-3 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50"
              >
                すべての記事を見る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recommended by Category Section */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHeading subtitle="気になるテーマから記事を探せます">
            いま読まれている記事
          </SectionHeading>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {recommendedByCategory.map((rec) => (
              <div
                key={rec.category}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                    <rec.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-card-foreground">
                      {CATEGORY_LABELS[rec.category]}
                    </h3>
                    <p className="text-xs text-muted">{rec.description}</p>
                  </div>
                </div>
                {rec.articles.length > 0 ? (
                  <ul className="mt-4 divide-y divide-border">
                    {rec.articles.map((article) => (
                      <li key={article.frontmatter.slug}>
                        <Link
                          href={`/articles/${article.frontmatter.slug}`}
                          className="group flex items-center gap-2 py-3 text-sm text-foreground transition-colors hover:text-teal-700"
                        >
                          <span className="shrink-0 text-xs font-medium text-muted">
                            Vol.{article.frontmatter.vol}
                          </span>
                          <span className="line-clamp-1 group-hover:underline">
                            {article.frontmatter.title}
                          </span>
                          <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-muted">記事を準備中です</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section — 経歴は /about の詳しいプロフィールで */}
      <section className="border-t border-border bg-teal-50/50 px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionHeading>運営者について</SectionHeading>
          <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg">
              <Stethoscope className="h-12 w-12 text-white" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold tracking-wide text-foreground">
                岡本 賢
              </h3>
              <p className="mt-1 text-sm font-medium text-teal-600">
                愛育病院 小児科 / すくすくナビ開発者
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                診察室の外でも、お子さんと家族の役に立てたらと思い、すくすくナビを開発・運営しています。
              </p>
              <Link
                href="/about"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
              >
                詳しいプロフィールを見る
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 px-6 py-12 text-center shadow-xl sm:px-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
              <Mail className="h-7 w-7 text-white" />
            </div>
            <h2 className="mt-5 font-heading text-2xl font-bold text-white sm:text-3xl">
              メルマガに登録しませんか？
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-teal-100">
              おかもん先生が月2回、最新の小児医療トピックをわかりやすく解説します。登録は無料、いつでも解除できます。
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-teal-700 shadow-lg transition-all hover:bg-teal-50 hover:shadow-xl"
              >
                <Mail className="h-4 w-4" />
                メルマガ登録はこちら
              </Link>
            </div>
            <p className="mt-4 text-xs text-teal-200">
              現在 {allArticles.length} 号まで配信中
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
