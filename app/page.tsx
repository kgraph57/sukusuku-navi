import Link from "next/link";
import Image from "next/image";
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
  User,
  Syringe,
  Building2,
  Activity,
} from "lucide-react";
import { getAllArticles } from "@/lib/content";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardTitle, CardDescription } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { WeeklyDigest } from "@/components/home/weekly-digest";
import { OnboardingBanner } from "@/components/home/onboarding-banner";
import { EmergencyFab } from "@/components/home/emergency-fab";
import type { ArticleCategory } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

const FEATURES = [
  {
    href: "/articles",
    icon: BookOpen,
    title: "記事を読む",
    description:
      "小児科医が書いた60本以上のQ&A記事。感染症、アレルギー、予防接種など。",
    color: "bg-sage-50 text-sage-600",
    illustration: "/characters/illustrations/usagi_reading.png",
  },
  {
    href: "/vaccines",
    icon: Syringe,
    title: "予防接種ガイド",
    description:
      "定期接種・任意接種のスケジュール、港区での接種手順、科学的エビデンス。",
    color: "bg-sage-100 text-sage-500",
    illustration: "/characters/illustrations/category_vaccine.png",
  },
  {
    href: "/checkups",
    icon: Activity,
    title: "乳幼児健診ガイド",
    description: "各月齢の健診内容・準備物・医師のチェックポイントを解説。",
    color: "bg-sage-50 text-sage-500",
    illustration: "/characters/illustrations/feature_checkups.png",
  },
  {
    href: "/simulator",
    icon: Calculator,
    title: "給付金シミュレーター",
    description:
      "お子さんの年齢と世帯情報から、受けられる行政サービス・助成金を一括検索。",
    color: "bg-blush-50 text-blush-500",
    illustration: "/characters/illustrations/pankun_calculator.png",
  },
  {
    href: "/triage",
    icon: Stethoscope,
    title: "受診判断ガイド",
    description: "お子さんの症状から、いま病院に行くべきか判断をサポート。",
    color: "bg-red-50 text-red-500",
    illustration: "/characters/illustrations/konkon_clinic.png",
  },
  {
    href: "/clinics",
    icon: MapPin,
    title: "小児科マップ",
    description: "港区の小児科を地図で探せます。夜間・休日対応の医療機関も。",
    color: "bg-sage-100 text-sage-600",
    illustration: "/characters/illustrations/konkon_map.png",
  },
  {
    href: "/nurseries",
    icon: Building2,
    title: "保育園探し",
    description:
      "港区の認可保育園・認証保育所を種別・エリアで検索。保活ガイドも。",
    color: "bg-sage-50 text-sage-600",
    illustration: "/characters/illustrations/kids_nursery.png",
  },
  {
    href: "/checklists",
    icon: ClipboardCheck,
    title: "手続きガイド",
    description: "出産前から入園まで、必要な手続きをチェックリストで管理。",
    color: "bg-blush-100 text-blush-600",
    illustration: "/characters/illustrations/feature_checklist.png",
  },
  {
    href: "/my",
    icon: User,
    title: "マイページ",
    description:
      "お子さんのプロフィールを登録して、手続き進捗・給付金をまとめて管理。",
    color: "bg-ivory-100 text-gold-600",
    illustration: "/characters/illustrations/boys_studying.png",
  },
] as const;

const RECOMMENDED_CATEGORIES: readonly {
  readonly category: ArticleCategory;
  readonly icon: typeof Heart;
  readonly description: string;
  readonly illustration: string;
}[] = [
  {
    category: "infectious-disease",
    icon: Stethoscope,
    description: "RSウイルス、インフルエンザ、手足口病など季節の感染症対策",
    illustration: "/characters/illustrations/category_infection.png",
  },
  {
    category: "allergy",
    icon: Heart,
    description: "食物アレルギー、アトピー、花粉症の最新エビデンス",
    illustration: "/characters/illustrations/category_allergy.png",
  },
  {
    category: "vaccination",
    icon: ClipboardCheck,
    description: "定期接種・任意接種のスケジュールと副反応の正しい知識",
    illustration: "/characters/illustrations/category_vaccine.png",
  },
  {
    category: "development",
    icon: GraduationCap,
    description: "ことば・運動・社会性の発達マイルストーン",
    illustration: "/characters/illustrations/category_development.png",
  },
] as const;

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
      <section className="relative overflow-hidden bg-gradient-to-b from-ivory-50 via-sage-50/30 to-ivory-50 px-4 pb-0 pt-16 sm:pt-24">
        {/* 背景の装飾キャラ（右側） */}
        <div className="pointer-events-none absolute bottom-0 right-0 hidden w-72 select-none lg:block xl:w-96">
          <Image
            src="/characters/illustrations/konkon_waving.png"
            alt=""
            width={384}
            height={686}
            className="h-auto w-full object-contain"
            priority
          />
        </div>
        {/* 背景の装飾キャラ（左側） */}
        <div className="pointer-events-none absolute bottom-0 left-0 hidden w-48 select-none lg:block xl:w-64">
          <Image
            src="/characters/illustrations/usagi_jumping.png"
            alt=""
            width={256}
            height={457}
            className="h-auto w-full object-contain"
            priority
          />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-sage-500">
            愛育病院 小児科
          </p>
          <h1 className="mt-6 font-heading text-3xl font-semibold leading-tight tracking-wide text-foreground sm:text-5xl">
            診察室の外でも、
            <br />
            <span className="text-sage-700">お子さんのそばに。</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            小児科医がエビデンスに基づいて書いた記事、給付金シミュレーター、受診判断ガイド。
            <br className="hidden sm:block" />
            子育てに必要な情報を、ひとつの場所に。
          </p>
          <div
            className="mx-auto mt-10 h-px w-16 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
            aria-hidden="true"
          />
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 rounded-full bg-sage-600 px-8 py-4 text-sm font-medium tracking-wide text-white shadow-md shadow-sage-600/15 transition-all hover:bg-sage-700 hover:shadow-lg hover:shadow-sage-600/20"
            >
              記事を読む
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/simulator"
              className="inline-flex items-center gap-2 rounded-full border border-sage-200 bg-white px-8 py-4 text-sm font-medium tracking-wide text-sage-700 transition-colors hover:bg-sage-50"
            >
              給付金を調べる
            </Link>
          </div>
          <p className="mt-8 text-xs tracking-wider text-muted">
            {allArticles.length}本以上の記事を無料で公開中
          </p>
        </div>

        {/* ヒーロー下部の全キャラ集合バナー */}
        <div className="relative mx-auto mt-12 max-w-5xl">
          <Image
            src="/characters/illustrations/all_characters_banner.png"
            alt="すくすくナビのキャラクターたち"
            width={1376}
            height={768}
            className="h-auto w-full object-contain"
            priority
          />
        </div>
      </section>

      {/* Personalized Weekly Digest (registered users) */}
      <WeeklyDigest />

      {/* Onboarding Banner (new users) */}
      <OnboardingBanner />

      {/* Features Section */}
      <section className="px-4 py-20 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:gap-10">
            <div className="flex-1">
              <SectionHeading subtitle="子育てに必要な情報を、ワンストップで">
                すくすくナビでできること
              </SectionHeading>
            </div>
            <div className="hidden w-32 shrink-0 sm:block">
              <Image
                src="/characters/illustrations/konkon_presenting.png"
                alt=""
                width={192}
                height={343}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group rounded-xl border border-border bg-card transition-all duration-200 hover:border-sage-200 hover:shadow-md hover:-translate-y-0.5 overflow-hidden"
              >
                {/* イラスト部分 */}
                <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-sage-50/60 to-ivory-100/60">
                  <Image
                    src={feature.illustration}
                    alt={feature.title}
                    fill
                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {/* テキスト部分 */}
                <div className="p-6">
                  <div
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${feature.color}`}
                  >
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-3 font-heading text-base font-semibold tracking-wide text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-sage-600 opacity-0 transition-opacity group-hover:opacity-100">
                    詳しく見る
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 中間バナー：コンコン先生と子どもたちの教室シーン */}
      <section className="overflow-hidden bg-sage-50/40 px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <Image
            src="/characters/illustrations/konkon_teaching.png"
            alt="おかもん先生が子どもたちに説明しているシーン"
            width={1376}
            height={768}
            className="h-auto w-full rounded-2xl object-cover shadow-sm"
          />
        </div>
      </section>

      {/* Latest Articles Section */}
      {latestArticles.length > 0 && (
        <section className="border-t border-border bg-ivory-100/50 px-4 py-20 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:gap-10">
              <div className="flex-1">
                <SectionHeading subtitle="小児科医おかもんが書き下ろした最新の記事">
                  最新の記事
                </SectionHeading>
              </div>
              <div className="hidden w-28 shrink-0 sm:block">
                <Image
                  src="/characters/illustrations/usagi_jumping.png"
                  alt=""
                  width={192}
                  height={343}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  <CardTitle className="mt-3 line-clamp-2 group-hover:text-sage-700">
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
            <div className="mt-10 text-center">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 rounded-full border border-sage-200 bg-white px-7 py-3.5 text-sm font-medium tracking-wide text-sage-700 transition-colors hover:bg-sage-50"
              >
                すべての記事を見る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recommended by Category Section */}
      <section className="px-4 py-20 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <SectionHeading subtitle="気になるテーマから記事を探せます">
            いま読まれている記事
          </SectionHeading>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {recommendedByCategory.map((rec) => (
              <div
                key={rec.category}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                {/* カテゴリーイラスト */}
                <div className="relative h-36 w-full overflow-hidden bg-gradient-to-br from-sage-50/60 to-ivory-100/60">
                  <Image
                    src={rec.illustration}
                    alt={CATEGORY_LABELS[rec.category]}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-50 text-sage-600">
                      <rec.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-semibold tracking-wide text-card-foreground">
                        {CATEGORY_LABELS[rec.category]}
                      </h3>
                      <p className="text-xs text-muted">{rec.description}</p>
                    </div>
                  </div>
                  {rec.articles.length > 0 ? (
                    <ul className="mt-5 divide-y divide-border">
                      {rec.articles.map((article) => (
                        <li key={article.frontmatter.slug}>
                          <Link
                            href={`/articles/${article.frontmatter.slug}`}
                            className="group flex items-center gap-2 py-3 text-sm text-foreground transition-colors hover:text-sage-700"
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
                    <p className="mt-5 text-sm text-muted">記事を準備中です</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ピクニックシーン中間バナー */}
      <section className="overflow-hidden bg-ivory-50/60 px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <Image
            src="/characters/illustrations/picnic_scene.png"
            alt="みんなでピクニック"
            width={1376}
            height={768}
            className="h-auto w-full rounded-2xl object-cover shadow-sm"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="border-t border-border bg-sage-50/30 px-4 py-20 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <SectionHeading>運営者について</SectionHeading>
          <div className="mt-12 flex flex-col items-center gap-10 sm:flex-row sm:items-start">
            {/* コンコン先生イラスト */}
            <div className="relative h-40 w-40 shrink-0">
              <Image
                src="/characters/illustrations/about_konkon_doctor.png"
                alt="おかもん先生（コンコン）"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold tracking-wide text-foreground">
                岡本 賢
              </h3>
              <p className="mt-1 text-sm font-medium text-sage-600">
                愛育病院 小児科 / すくすくナビ開発者
              </p>
              <div
                className="mt-3 h-px w-12 bg-gradient-to-r from-gold-500 to-transparent"
                aria-hidden="true"
              />
              <p className="mt-4 text-base leading-relaxed text-muted">
                順天堂大学医学部卒業。順天堂大学附属練馬病院にて初期研修修了後、国立成育医療研究センターにて研鑽を積み、現在は愛育病院小児科に勤務。臨床医としての知見とテクノロジーを掛け合わせ、医療情報の非対称性を解消する社会実装に取り組んでいる。
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700">
                  小児科専門医
                </span>
                <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700">
                  順天堂大学医学部卒
                </span>
                <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700">
                  国立成育医療研究センター出身
                </span>
              </div>
              <Link
                href="/about"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-sage-600 transition-colors hover:text-sage-700"
              >
                詳しいプロフィールを見る
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sage-700 to-sage-800 px-6 py-14 text-center shadow-xl sm:px-12">
            {/* CTAイラスト（右下装飾） */}
            <div className="pointer-events-none absolute -bottom-4 -right-4 w-40 select-none opacity-30 sm:opacity-40">
              <Image
                src="/characters/illustrations/cta_mail_scene.png"
                alt=""
                width={320}
                height={180}
                className="h-auto w-full object-contain"
              />
            </div>
            {/* CTAイラスト（左下装飾） */}
            <div className="pointer-events-none absolute -bottom-2 -left-4 w-28 select-none opacity-25 sm:opacity-35">
              <Image
                src="/characters/illustrations/usagi_phone.png"
                alt=""
                width={200}
                height={200}
                className="h-auto w-full object-contain"
              />
            </div>

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                <Mail className="h-7 w-7 text-white" />
              </div>
              <h2 className="mt-6 font-heading text-2xl font-semibold tracking-wide text-white sm:text-3xl">
                メルマガに登録しませんか？
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-sage-200">
                おかもん先生が月2回、最新の小児医療トピックをわかりやすく解説します。登録は無料、いつでも解除できます。
              </p>
              <div
                className="mx-auto mt-6 h-px w-12 bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
                aria-hidden="true"
              />
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium tracking-wide text-sage-700 shadow-lg transition-all hover:bg-sage-50 hover:shadow-xl"
                >
                  <Mail className="h-4 w-4" />
                  メルマガ登録はこちら
                </Link>
              </div>
              <p className="mt-5 text-xs tracking-wider text-sage-300">
                現在 {allArticles.length} 号まで配信中
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* フッター前：全キャラ集合ウォーキングシーン */}
      <section className="overflow-hidden border-t border-border/50 bg-ivory-50/40 px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <Image
            src="/characters/illustrations/konkon_usagi_walking.png"
            alt="コンコンとうさぎーさんが歩いているシーン"
            width={1376}
            height={768}
            className="h-auto w-full rounded-xl object-cover"
          />
        </div>
      </section>

      {/* Emergency Floating Action Button */}
      <EmergencyFab />
    </>
  );
}
