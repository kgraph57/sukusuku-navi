import type { Metadata } from "next"
import Link from "next/link"
import {
  Stethoscope,
  BookOpen,
  ShieldCheck,
  Heart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { getAllArticles } from "@/lib/content"

export const metadata: Metadata = {
  title: "すくすくナビとは",
  description:
    "すくすくナビは、愛育病院の小児科医おかもんが運営する子育て情報サイトです。エビデンスに基づいた医療・育児情報をお届けします。",
}

const VALUES = [
  {
    icon: ShieldCheck,
    title: "エビデンスに基づく情報",
    description:
      "すべての記事は医学論文やガイドラインに基づいて執筆。参考文献を明記し、根拠のある安心を届けます。",
  },
  {
    icon: Heart,
    title: "保護者に寄り添う解説",
    description:
      "専門用語をかみ砕き、Q&A形式で疑問に答えます。「うちの子は大丈夫？」という不安に応えるサイトです。",
  },
  {
    icon: BookOpen,
    title: "無料で、誰でもアクセス可能",
    description:
      "会員登録なしですべての記事を閲覧できます。子育てに必要な情報は、すべての家庭に届くべきだと考えています。",
  },
] as const

const FEATURES_DETAIL = [
  "小児科医が執筆した50本以上のQ&A記事",
  "感染症、アレルギー、予防接種、発達など幅広いテーマ",
  "港区の行政サービス・給付金シミュレーター",
  "症状から受診の緊急度を判断するトリアージガイド",
  "港区の小児科をマップで検索",
  "出産・入園に必要な手続きチェックリスト",
] as const

export default function AboutPage() {
  const allArticles = getAllArticles()

  return (
    <div className="px-4 py-12 sm:py-16">
      {/* Introduction */}
      <section className="mx-auto max-w-3xl text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/70 px-4 py-1.5 text-sm font-medium text-teal-700">
          <Stethoscope className="h-3.5 w-3.5" />
          About
        </p>
        <h1 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
          すくすくナビとは
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          すくすくナビは、愛育病院の小児科医「おかもん」が運営する子育て情報サイトです。
          診察室では伝えきれない情報を、エビデンスに基づいてわかりやすくお届けします。
        </p>
      </section>

      {/* Values */}
      <section className="mx-auto mt-16 max-w-4xl sm:mt-24">
        <SectionHeading>大切にしていること</SectionHeading>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <value.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-foreground">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What You Can Do */}
      <section className="mx-auto mt-16 max-w-3xl rounded-xl border border-border bg-card p-8 sm:mt-24">
        <SectionHeading>
          すくすくナビでできること
        </SectionHeading>
        <ul className="mt-8 space-y-3">
          {FEATURES_DETAIL.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-foreground"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-sm text-muted">
          現在 {allArticles.length} 本の記事を無料で公開中
        </p>
      </section>

      {/* About the Doctor */}
      <section className="mx-auto mt-16 max-w-4xl sm:mt-24">
        <SectionHeading>運営者について</SectionHeading>
        <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
          <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg">
            <Stethoscope className="h-14 w-14 text-white" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground">
              おかもん（岡本 光平）
            </h3>
            <p className="mt-1 text-sm font-medium text-teal-600">
              愛育病院 小児科医
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              港区の愛育病院小児科に勤務。日々の診療の中で、保護者の方が正しい情報にアクセスできず不安を抱えている現状を目の当たりにし、すくすくナビを開設しました。
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              「根拠のある安心」をモットーに、すべての記事に参考文献を明記。Q&amp;A形式でよくある疑問に答えています。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
                小児科専門医
              </span>
              <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
                エビデンス重視
              </span>
              <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
                港区在住
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto mt-16 max-w-3xl rounded-xl bg-warm-100 p-6 sm:mt-24">
        <h3 className="font-heading text-base font-bold text-foreground">
          医療情報に関する免責事項
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          本サイトの情報は一般的な医学知識の提供を目的としており、個別の診断・治療を行うものではありません。お子さんの具体的な症状や治療については、必ずかかりつけ医にご相談ください。緊急時は迷わず119番に電話してください。
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-12 max-w-3xl text-center">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-700 hover:shadow-xl"
        >
          記事を読んでみる
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}
