import type { Metadata } from "next";
import Link from "next/link";
import {
  Stethoscope,
  BookOpen,
  ShieldCheck,
  Heart,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Search,
  Users,
  TrendingUp,
  Syringe,
  MapPin,
  Calculator,
  ClipboardCheck,
  Activity,
  Building2,
  User,
  GraduationCap,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "すくすくナビとは",
  description:
    "すくすくナビは、愛育病院の小児科医おかもんが運営する子育て情報サイトです。エビデンスに基づいた医療・育児情報をお届けします。",
};

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
] as const;

const PROBLEMS = [
  {
    icon: Search,
    stat: "75.1%",
    label: "の母親がSNSで子育て情報を検索",
    description:
      "しかし68.3%が「正確な情報の判別が難しい」と回答。医療デマが拡散しやすい環境で、根拠ある情報源が不足しています。",
    color: "bg-red-50 text-red-500",
  },
  {
    icon: AlertTriangle,
    stat: "82%",
    label: "の小児救急搬送が軽症",
    description:
      "小児救急相談#8000には年間124万件超の相談。適切な受診判断ができれば、不要な救急受診を減らし、本当に必要な子どもに医療資源を集中できます。",
    color: "bg-orange-50 text-orange-500",
  },
  {
    icon: Users,
    stat: "28.4%",
    label: "しか行政支援制度を認知していない",
    description:
      "港区だけでも20以上の子育て支援制度がありますが、約半数の家庭が一度も利用したことがありません。知らないだけで、受け取れるはずの支援を逃しています。",
    color: "bg-blue-50 text-blue-500",
  },
  {
    icon: Heart,
    stat: "74.2%",
    label: "の母親が子育てに孤立感を感じている",
    description:
      "産後うつの発症率は10〜15%。孤立した育児環境で正しい情報と適切な支援につながる導線が求められています。",
    color: "bg-purple-50 text-purple-500",
  },
] as const;

const FEATURES_DETAIL = [
  {
    icon: BookOpen,
    text: "小児科医が執筆した60本以上のQ&A記事（参考文献付き）",
  },
  {
    icon: Syringe,
    text: "20種以上の予防接種ガイド（スケジュール・副反応・港区助成）",
  },
  {
    icon: Activity,
    text: "乳幼児健診ガイド（1ヶ月〜5歳、準備物・チェックポイント）",
  },
  {
    icon: Calculator,
    text: "給付金シミュレーター（20以上の制度を世帯情報から一括検索）",
  },
  {
    icon: Stethoscope,
    text: "受診判断トリアージ（17症状、4段階の緊急度判定）",
  },
  {
    icon: MapPin,
    text: "港区小児科マップ（夜間・休日対応を含む12以上のクリニック）",
  },
  {
    icon: Building2,
    text: "保育園検索（80以上の施設を種別・エリアで絞り込み）",
  },
  {
    icon: ClipboardCheck,
    text: "手続きチェックリスト（出産前から入園まで、子どもごとに進捗管理）",
  },
  {
    icon: User,
    text: "マイページ（タイムライン・予防接種記録・成長マイルストーン）",
  },
] as const;

export default function AboutPage() {
  const allArticles = getAllArticles();

  return (
    <div className="px-4 py-12 sm:py-16">
      {/* Introduction */}
      <section className="mx-auto max-w-3xl text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-sage-100/70 px-4 py-1.5 text-sm font-medium text-sage-700">
          <Stethoscope className="h-3.5 w-3.5" />
          About
        </p>
        <h1 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          すくすくナビとは
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          すくすくナビは、愛育病院の小児科医「おかもん」が運営する子育て情報サイトです。
          診察室では伝えきれない情報を、エビデンスに基づいてわかりやすくお届けします。
        </p>
      </section>

      {/* Mission Statement */}
      <section className="mx-auto mt-16 max-w-3xl sm:mt-24">
        <div className="rounded-xl border-l-4 border-sage-500 bg-sage-50/50 p-6 sm:p-8">
          <p className="font-heading text-lg font-semibold text-sage-800 sm:text-xl">
            港区で子どもが生まれた日から卒業まで伴走するパートナー。
          </p>
          <p className="mt-3 text-sm leading-relaxed text-sage-700">
            医療の信頼性、行政サービスへのアクション、地域に特化した情報。この3つを1つのサービスに統合した子育て支援プラットフォームは、日本にまだありません。すくすくナビはその空白を埋めるために生まれました。
          </p>
        </div>
      </section>

      {/* Why This Service Is Needed */}
      <section className="mx-auto mt-16 max-w-4xl sm:mt-24">
        <SectionHeading subtitle="子育て家庭を取り巻く4つの課題">
          なぜ、すくすくナビが必要なのか
        </SectionHeading>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {PROBLEMS.map((problem) => (
            <div
              key={problem.stat}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${problem.color}`}
                >
                  <problem.icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-foreground">
                    {problem.stat}
                  </span>
                  <span className="ml-1 text-sm text-muted">
                    {problem.label}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted">
          出典：厚生労働省「乳幼児等に関する調査」、総務省消防庁「救急搬送統計」、内閣府「子育て支援制度調査」
        </p>
      </section>

      {/* What sukusuku-navi solves */}
      <section className="mx-auto mt-16 max-w-4xl sm:mt-24">
        <SectionHeading subtitle="すくすくナビが変えること">
          3つの価値
        </SectionHeading>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-sage-50 text-sage-600">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
              医療の信頼性
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              現役小児科医がエビデンスに基づいて執筆。すべての記事に参考文献を明記し、SNSの医療デマに対抗する「根拠のある安心」を届けます。
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blush-50 text-blush-500">
              <TrendingUp className="h-7 w-7" />
            </div>
            <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
              行政アクション
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              「読んで終わり」ではなく、給付金申請・手続き・受診まで具体的なアクションにつなげます。認知率28%の制度を、知らないまま終わらせません。
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
              <MapPin className="h-7 w-7" />
            </div>
            <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
              地域特化
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              港区のクリニック、保育園、行政制度に完全対応。全国一律の情報ではなく、「あなたの街」の具体的な情報を提供します。
            </p>
          </div>
        </div>
      </section>

      {/* What You Can Do */}
      <section className="mx-auto mt-16 max-w-3xl rounded-xl border border-border bg-card p-8 sm:mt-24">
        <SectionHeading>すくすくナビでできること</SectionHeading>
        <ul className="mt-8 space-y-4">
          {FEATURES_DETAIL.map((feature) => (
            <li
              key={feature.text}
              className="flex items-start gap-3 text-sm text-foreground"
            >
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-sage-500">
                <feature.icon className="h-4 w-4" />
              </div>
              <span>{feature.text}</span>
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
          <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sage-400 to-sage-600 shadow-lg">
            <Stethoscope className="h-14 w-14 text-white" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold text-foreground">
              岡本 賢
            </h3>
            <p className="mt-1 text-sm font-medium text-sage-600">
              愛育病院 小児科 / すくすくナビ開発者
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground">
              順天堂大学医学部卒業。順天堂大学附属練馬病院にて初期研修を修了後、国立成育医療研究センターにて小児医療の最前線で研鑽を積む。現在は社会福祉法人恩賜財団母子愛育会
              愛育病院小児科に勤務し、新生児から思春期まで幅広い年齢の子どもたちの診療にあたる。
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              日々の診療を通じて、保護者が正確な医療情報にアクセスできず不安を抱えている現状に直面。「診察室の外でも、エビデンスに基づいた安心を届けたい」という思いから、メルマガ「おかもんの小児科通信」を創刊し60号を超える連載を重ねる。その知見を基盤に、医療情報と行政サービスを統合した子育て支援プラットフォーム「すくすくナビ」を開発。
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              臨床医としての知見とテクノロジーを掛け合わせ、医療情報の非対称性を解消する社会実装に取り組んでいる。
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
              <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700">
                愛育病院小児科
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto mt-16 max-w-3xl rounded-xl bg-ivory-100 p-6 sm:mt-24">
        <h3 className="font-heading text-base font-semibold text-foreground">
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
          className="inline-flex items-center gap-2 rounded-full bg-sage-600 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-sage-600/25 transition-all hover:bg-sage-700 hover:shadow-xl"
        >
          記事を読んでみる
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
