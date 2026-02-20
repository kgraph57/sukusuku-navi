import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  ArrowRight,
  Calendar,
  FileText,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { getAllNurseries, NURSERY_TYPE_LABELS } from "@/lib/nurseries";
import type { NurseryType } from "@/lib/types";
import { NurseryFilter } from "@/components/nursery/nursery-filter";

export const metadata: Metadata = {
  title: "港区の保育園を探す｜保活ガイド",
  description:
    "港区の認可保育園・認証保育所・小規模保育・認定こども園を一覧で検索。エリア・種別・年齢でフィルタリング。保活のスケジュール・必要書類・利用調整指数も解説。",
};

const HOKATSU_STEPS = [
  {
    month: "4〜8月",
    title: "情報収集・見学",
    description:
      "港区のホームページで保育施設一覧を確認。気になる園に電話して見学予約。複数園を比較しましょう。",
  },
  {
    month: "9〜10月",
    title: "申込書類の準備",
    description:
      "就労証明書・収入証明書等を準備。港区役所の子ども家庭支援部で相談も可能です。",
  },
  {
    month: "11月",
    title: "4月入園の一次申込",
    description:
      "例年11月中旬〜12月上旬が締切。港区役所窓口またはオンラインで提出。希望園は最大20園まで記入可能。",
  },
  {
    month: "2月",
    title: "一次選考結果通知",
    description:
      "内定の場合は面接・健康診断へ。不承諾の場合は二次募集（2月下旬締切）に申込可能。",
  },
  {
    month: "3月",
    title: "入園準備",
    description:
      "内定園の入園説明会に参加。持ち物の準備、慣らし保育のスケジュール確認。",
  },
] as const;

const REQUIRED_DOCS = [
  {
    name: "教育・保育給付認定申請書",
    note: "港区HPからダウンロード可",
  },
  {
    name: "保育の利用申込書",
    note: "希望園を優先順位で記入",
  },
  {
    name: "就労証明書",
    note: "勤務先に作成依頼（自営業の場合は確定申告書の写し等）",
  },
  {
    name: "収入を証明する書類",
    note: "課税証明書または源泉徴収票",
  },
  {
    name: "家庭状況を確認する書類",
    note: "ひとり親の場合は戸籍謄本等が追加で必要",
  },
] as const;

const INDEX_EXAMPLES = [
  { condition: "両親フルタイム（月20日以上・週40h以上）", points: "各20点" },
  { condition: "ひとり親世帯", points: "+3〜5点" },
  { condition: "きょうだい在園", points: "+2点" },
  { condition: "港区保育室在籍", points: "+2点" },
  { condition: "認証保育所に有償で預けている", points: "+2点" },
  { condition: "育休明け復帰", points: "+1点" },
] as const;

function TypeSummaryCard({
  type,
  count,
}: {
  readonly type: NurseryType;
  readonly count: number;
}) {
  const descriptions: Record<NurseryType, string> = {
    licensed:
      "国の基準を満たした保育施設。保育料は世帯所得に応じて決定。最も一般的な選択肢。",
    certified:
      "東京都独自の基準で認証された施設。0〜2歳が中心。認可より小規模で延長保育が充実。",
    "small-scale":
      "定員6〜19名の小規模施設。0〜2歳対象。家庭的な雰囲気できめ細やかな保育。",
    kodomoen:
      "教育と保育を一体的に行う施設。幼稚園の教育機能と保育園の保育機能を併せ持つ。",
    "minato-room":
      "港区独自の保育施設。認可園に入れなかった方の受け皿。認可園申込時に加点あり。",
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-sm font-bold text-card-foreground">
          {NURSERY_TYPE_LABELS[type]}
        </h3>
        <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-700">
          {count}園
        </span>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        {descriptions[type]}
      </p>
    </div>
  );
}

export default function NurseriesPage() {
  const allNurseries = getAllNurseries();

  const countByType = (type: NurseryType) =>
    allNurseries.filter((n) => n.type === type).length;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-50 to-warm-50 px-4 pb-12 pt-12 sm:pb-16 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            <Building2 className="mr-2 inline-block h-8 w-8 text-teal-600" />
            港区の保育園を探す
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            港区内の保育施設を種別・エリア・年齢で検索できます。全
            {allNurseries.length}
            施設の情報と、保活のスケジュール・必要書類も解説。
          </p>
        </div>
      </section>

      {/* Type Summary */}
      <section className="border-b border-border px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-lg font-bold text-foreground">
            保育施設の種類
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <TypeSummaryCard type="licensed" count={countByType("licensed")} />
            <TypeSummaryCard type="certified" count={countByType("certified")} />
            <TypeSummaryCard
              type="small-scale"
              count={countByType("small-scale")}
            />
            <TypeSummaryCard type="kodomoen" count={countByType("kodomoen")} />
            <TypeSummaryCard
              type="minato-room"
              count={countByType("minato-room")}
            />
          </div>
        </div>
      </section>

      {/* Nursery List with Filters */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-xl font-bold text-foreground">
            保育施設一覧
          </h2>
          <div className="mt-4">
            <NurseryFilter nurseries={allNurseries} />
          </div>
        </div>
      </section>

      {/* 保活ガイド */}
      <section className="border-t border-border bg-teal-50/50 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-foreground">
            <Calendar className="h-6 w-6 text-teal-600" />
            保活ガイド：4月入園までのスケジュール
          </h2>
          <p className="mt-2 text-sm text-muted">
            港区で4月入園を目指す場合の一般的なスケジュールです。年度により変動があるため、必ず港区HPで最新情報をご確認ください。
          </p>

          <div className="mt-6 space-y-4">
            {HOKATSU_STEPS.map((step, i) => (
              <div
                key={step.month}
                className="flex gap-4 rounded-xl border border-border bg-card p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                      {step.month}
                    </span>
                    <h3 className="font-heading text-base font-bold text-card-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 必要書類 */}
      <section className="border-t border-border px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-foreground">
            <FileText className="h-6 w-6 text-teal-600" />
            申込に必要な書類
          </h2>
          <div className="mt-6 space-y-2">
            {REQUIRED_DOCS.map((doc) => (
              <div
                key={doc.name}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    {doc.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{doc.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">
            ※上記は一般的な必要書類です。世帯の状況により追加書類が必要な場合があります。詳しくは港区役所にお問い合わせください。
          </p>
        </div>
      </section>

      {/* 利用調整指数 */}
      <section className="border-t border-border bg-warm-100/50 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-foreground">
            <HelpCircle className="h-6 w-6 text-teal-600" />
            利用調整指数（選考のしくみ）
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            認可保育園の選考は「利用調整指数」に基づいて行われます。基本指数（保育の必要性）と調整指数（加点・減点）の合計が高い順に内定が決まります。
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted">
                    条件
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted">
                    指数（目安）
                  </th>
                </tr>
              </thead>
              <tbody>
                {INDEX_EXAMPLES.map((item) => (
                  <tr
                    key={item.condition}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-4 py-3 text-sm text-card-foreground">
                      {item.condition}
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-teal-600">
                      {item.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm leading-relaxed text-amber-800">
              <strong>ポイント：</strong>
              港区は比較的倍率が高いエリアです。両親フルタイム（基本指数40点）に加え、認証保育所の利用実績や港区保育室在籍などの加点があると有利になります。最新の指数表は港区HPで確認してください。
            </p>
          </div>

          <div className="mt-6 text-center">
            <a
              href="https://www.city.minato.tokyo.jp/kodomo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-700"
            >
              港区 子ども家庭支援部のページ
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
