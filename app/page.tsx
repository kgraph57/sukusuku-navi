import Link from "next/link";
import Image from "next/image";
import { WatercolorIcon } from "@/components/icons/watercolor-icon";
import { getAllArticles } from "@/lib/content";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardTitle, CardDescription } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import type { ArticleCategory } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { withBasePath } from "@/lib/image-path";

const FEATURES = [
  {
    href: "/articles",
    iconName: "book" as const,
    title: "記事を読む",
    description:
      "小児科医が書いた50本以上のQ&A記事。感染症、アレルギー、予防接種など。",
    color: "bg-teal-50",
  },
  {
    href: "/simulator",
    iconName: "calculator" as const,
    title: "給付金シミュレーター",
    description:
      "お子さんの年齢と世帯情報から、受けられる行政サービス・助成金を一括検索。",
    color: "bg-coral-50",
  },
  {
    href: "/triage",
    iconName: "stethoscope" as const,
    title: "受診判断ガイド",
    description: "お子さんの症状から、いま病院に行くべきか判断をサポート。",
    color: "bg-red-50",
  },
  {
    href: "/clinics",
    iconName: "mappin" as const,
    title: "小児科マップ",
    description: "港区の小児科を地図で探せます。夜間・休日対応の医療機関も。",
    color: "bg-blue-50",
  },
  {
    href: "/checklists",
    iconName: "clipboard" as const,
    title: "手続きガイド",
    description: "出産前から入園まで、必要な手続きをチェックリストで管理。",
    color: "bg-purple-50",
  },
];

const RECOMMENDED_CATEGORIES = [
  {
    category: "infectious-disease" as ArticleCategory,
    iconName: "stethoscope" as const,
    description: "RSウイルス、インフルエンザ、手足口病など季節の感染症対策",
  },
  {
    category: "allergy" as ArticleCategory,
    iconName: "heart" as const,
    description: "食物アレルギー、アトピー、花粉症の最新エビデンス",
  },
  {
    category: "vaccination" as ArticleCategory,
    iconName: "syringe" as const,
    description: "定期接種・任意接種のスケジュールと副反応の正しい知識",
  },
  {
    category: "development" as ArticleCategory,
    iconName: "lightbulb" as const,
    description: "ことば・運動・社会性の発達マイルストーン",
  },
];

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
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-warm-50 to-coral-50/30 px-4 pb-0 pt-12 sm:pt-20">
        {/* 背景装飾の丸 */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal-100/40 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-coral-100/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-8">
            {/* 中央テキスト */}
            <div className="flex-1 pb-4 text-center">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/70 px-4 py-1.5 text-sm font-medium text-teal-700">
                <WatercolorIcon name="stethoscope" size={18} />
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
                  <WatercolorIcon name="arrow_right" size={18} />
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
            {/* 集合イラスト */}
            <Image
              src={withBasePath("/characters/illustrations/hero_all_characters.png")}
              alt="すくすくナビのキャラクターたち"
              width={900}
              height={501}
              className="mx-auto w-full max-w-3xl"
              unoptimized
              priority
            />
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
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
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-teal-200 hover:shadow-md"
              >
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${feature.color}`}
                >
                  <WatercolorIcon name={feature.iconName} size={40} />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-600 opacity-0 transition-opacity group-hover:opacity-100">
                  詳しく見る
                  <WatercolorIcon name="arrow_right" size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Latest Articles Section ─── */}
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
                      <WatercolorIcon name="calendar" size={14} />
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
                <WatercolorIcon name="arrow_right" size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── Recommended by Category Section ─── */}
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
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50">
                    <WatercolorIcon name={rec.iconName} size={40} />
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
                          <WatercolorIcon name="arrow_right" size={16} className="ml-auto shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
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

      {/* ─── About Section ─── */}
      <section className="border-t border-border bg-teal-50/50 px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionHeading>運営者について</SectionHeading>
          <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            {/* コンコン先生イラスト */}
            <div className="shrink-0">
              <Image
                src={withBasePath("/characters/illustrations/about_konkon_doctor.png")}
                alt="コンコン先生"
                width={160}
                height={180}
                className="drop-shadow-lg"
                unoptimized
              />
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
                <WatercolorIcon name="arrow_right" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="border-t border-border bg-warm-100/50 px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-teal-100 bg-white px-6 py-12 text-center shadow-sm sm:px-12">
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              メルマガに登録しませんか？
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
              おかもん先生が月2回、最新の小児医療トピックをわかりやすく解説します。登録は無料、いつでも解除できます。
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-700 hover:shadow-xl"
              >
                <WatercolorIcon name="mail" size={20} />
                メルマガ登録はこちら
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted">
              現在 {allArticles.length} 号まで配信中
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
