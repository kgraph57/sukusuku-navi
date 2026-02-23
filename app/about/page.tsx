import type { Metadata } from "next";
import Image from "next/image";
import { WatercolorIcon } from "@/components/icons/watercolor-icon";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { getAllArticles } from "@/lib/content";
import { withBasePath } from "@/lib/image-path";

export const metadata: Metadata = {
  title: "すくすくナビとは",
  description:
    "すくすくナビは、愛育病院の小児科医おかもんが運営する子育て情報サイトです。エビデンスに基づいた医療・育児情報をお届けします。",
};

const VALUES = [
  {
    iconName: "shield" as const,
    title: "エビデンスに基づく情報",
    description:
      "すべての記事は医学論文やガイドラインに基づいて執筆。参考文献を明記し、根拠のある安心を届けます。",
  },
  {
    iconName: "heart" as const,
    title: "保護者に寄り添う解説",
    description:
      "専門用語をかみ砕き、Q&A形式で疑問に答えます。「うちの子は大丈夫？」という不安に応えるサイトです。",
  },
  {
    iconName: "book" as const,
    title: "無料で、誰でもアクセス可能",
    description:
      "会員登録なしですべての記事を閲覧できます。子育てに必要な情報は、すべての家庭に届くべきだと考えています。",
  },
];

const FEATURES_DETAIL = [
  "小児科医が執筆した50本以上のQ&A記事",
  "感染症、アレルギー、予防接種、発達など幅広いテーマ",
  "港区の行政サービス・給付金シミュレーター",
  "症状から受診の緊急度を判断するトリアージガイド",
  "港区の小児科をマップで検索",
  "出産・入園に必要な手続きチェックリスト",
] as const;

export default function AboutPage() {
  const allArticles = getAllArticles();

  return (
    <div className="px-4 py-12 sm:py-16">
      {/* ─── おかもん先生プロフィール（最上部） ─── */}
      <section className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50/60 via-white to-warm-50/40 p-8 sm:p-10">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            <div className="shrink-0">
              <Image
                src={withBasePath(
                  "/characters/illustrations/about_konkon_doctor.png",
                )}
                alt="おかもん先生（コンコン先生）"
                width={160}
                height={180}
                className="drop-shadow-lg"
                unoptimized
              />
            </div>
            <div>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/70 px-3 py-1 text-xs font-medium text-teal-700">
                <WatercolorIcon name="stethoscope" size={14} />
                すくすくナビ開発者
              </p>
              <h1 className="mt-3 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                岡本 賢（おかもん先生）
              </h1>
              <p className="mt-2 text-sm font-medium leading-relaxed text-teal-600">
                愛育病院 小児科医 / 港区在住・2児の父
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
                  小児科専門医
                </span>
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
                  順天堂大学医学部卒
                </span>
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
                  国立成育医療研究センター出身
                </span>
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
                  愛育病院小児科
                </span>
              </div>
            </div>
          </div>

          {/* なぜ作ったか */}
          <div className="mt-8 border-t border-teal-100 pt-8">
            <h2 className="font-heading text-lg font-bold text-foreground">
              なぜ、すくすくナビを作ったのか
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground">
              愛育病院の外来で毎日たくさんのご家族と接するなかで、ひとつの構造的な矛盾に気づきました。
              産後、親がもっとも疲弊している時期に、もっとも複雑な届出・手続き・予防接種スケジュールが集中するということです。
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              限られた診察時間では伝えきれない情報がある。ネットで検索しても、根拠のない情報や不安を煽る記事ばかりが目に入る。「正しい情報に、正しいタイミングで、手間なくアクセスできる仕組み」が必要だと感じました。
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              まずメルマガ「おかもんの小児科通信」として60号を超える連載を重ね、その知見を基盤に、医療情報と行政サービスを統合した子育て支援プラットフォーム「すくすくナビ」を開発しました。
              臨床医としての知見とテクノロジーを掛け合わせ、医療情報の非対称性を解消する取り組みを続けています。
            </p>
          </div>
        </div>
      </section>

      {/* ─── ミッション ─── */}
      <section className="mx-auto mt-12 max-w-3xl sm:mt-16">
        <div className="rounded-xl border border-teal-200/60 bg-teal-50/50 px-6 py-8 text-center sm:px-10">
          <p className="text-xs font-medium uppercase tracking-widest text-teal-600">
            Mission
          </p>
          <p className="mt-3 font-heading text-lg font-bold leading-relaxed text-foreground sm:text-xl">
            産後の親が最も疲弊している時期に、
            <br className="hidden sm:inline" />
            最も複雑な手続きを求められるという
            <br className="hidden sm:inline" />
            構造的矛盾を解決する。
          </p>
        </div>
      </section>

      {/* ─── Introduction ─── */}
      <section className="mx-auto mt-16 max-w-3xl text-center sm:mt-24">
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          すくすくナビとは
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          すくすくナビは、愛育病院の小児科医「おかもん」が運営する子育て情報サイトです。
          診察室では伝えきれない情報を、エビデンスに基づいてわかりやすくお届けします。
        </p>
      </section>

      {/* ─── Values ─── */}
      <section className="mx-auto mt-16 max-w-4xl sm:mt-24">
        <SectionHeading>大切にしていること</SectionHeading>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50">
                <WatercolorIcon name={value.iconName} size={40} />
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

      {/* ─── What You Can Do ─── */}
      <section className="mx-auto mt-16 max-w-3xl rounded-xl border border-border bg-card p-8 sm:mt-24">
        <SectionHeading>すくすくナビでできること</SectionHeading>
        <ul className="mt-8 space-y-3">
          {FEATURES_DETAIL.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-foreground"
            >
              <WatercolorIcon
                name="check"
                size={16}
                className="mt-0.5 shrink-0 text-teal-500"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-sm text-muted">
          現在 {allArticles.length} 本の記事を無料で公開中
        </p>
      </section>

      {/* ─── Disclaimer ─── */}
      <section className="mx-auto mt-16 max-w-3xl rounded-xl bg-warm-100 p-6 sm:mt-24">
        <h3 className="font-heading text-base font-bold text-foreground">
          医療情報に関する免責事項
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          本サイトの情報は一般的な医学知識の提供を目的としており、個別の診断・治療を行うものではありません。お子さんの具体的な症状や治療については、必ずかかりつけ医にご相談ください。緊急時は迷わず119番に電話してください。
        </p>
      </section>

      {/* ─── CTA ─── */}
      <section className="mx-auto mt-12 max-w-3xl text-center">
        <Link
          href="/my"
          className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-700 hover:shadow-xl"
        >
          生年月日を登録して始める
          <WatercolorIcon name="arrow_right" size={16} />
        </Link>
      </section>
    </div>
  );
}
