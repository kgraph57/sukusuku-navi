import type { Metadata } from "next";
import Link from "next/link";
import { WatercolorIcon } from "@/components/icons/watercolor-icon";
import type { WatercolorIconName } from "@/components/icons/watercolor-icon";
import { SectionHeading } from "@/components/shared/section-heading";
import { SpeechBubble } from "@/components/vaccination/speech-bubble";
import { ResourceCard } from "@/components/consultation/resource-card";
import consultationData from "@/data/consultation-resources.json";

export const metadata: Metadata = {
  title: "相談窓口一覧 ── 港区の子育て相談・支援先",
  description:
    "港区のお子さん・子育てに関する相談窓口を目的別にまとめました。救急、保健相談、子育て支援、発達相談、産後うつ、外国語対応など。",
};

const COLOR_MAP: Record<string, string> = {
  red: "border-red-200 bg-red-50",
  teal: "border-teal-200 bg-teal-50",
  coral: "border-coral-200 bg-coral-50",
  purple: "border-purple-200 bg-purple-50",
  blush: "border-blush-200 bg-blush-50",
  amber: "border-amber-200 bg-amber-50",
  blue: "border-blue-200 bg-blue-50",
};

const TEXT_COLOR_MAP: Record<string, string> = {
  red: "text-red-700",
  teal: "text-teal-700",
  coral: "text-coral-700",
  purple: "text-purple-700",
  blush: "text-blush-600",
  amber: "text-amber-700",
  blue: "text-blue-700",
};

export default function ConsultationPage() {
  return (
    <main className="pb-20">
      {/* Hero */}
      <section className="bg-ivory-50 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            相談窓口一覧
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            港区のお子さん・子育てに関する相談先を
            <br className="sm:hidden" />
            目的別にまとめました。
          </p>
          <p className="mt-2 text-xs text-muted/70">
            掲載情報は{consultationData.lastUpdated}時点のものです
          </p>
        </div>
      </section>

      {/* ジャンプリンク */}
      <section className="border-b border-border px-4 py-6">
        <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2">
          {consultationData.categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors hover:opacity-80 ${COLOR_MAP[cat.color] ?? "border-border bg-ivory-50"} ${TEXT_COLOR_MAP[cat.color] ?? "text-muted"}`}
            >
              <WatercolorIcon
                name={cat.icon as WatercolorIconName}
                size={14}
              />
              {cat.label}
            </a>
          ))}
        </div>
      </section>

      {/* こんこん先生メッセージ */}
      <section className="px-4 py-10 sm:py-12">
        <div className="mx-auto max-w-2xl">
          <SpeechBubble
            character="konkon"
            pose="konkon_teaching"
            name="こんこん先生"
          >
            <p>
              相談は早めが一番です。
              <br />
              「こんなことで電話していいのかな」と思わず、
              <br className="hidden sm:inline" />
              気軽に使ってくださいね。
            </p>
          </SpeechBubble>
        </div>
      </section>

      {/* カテゴリ別セクション */}
      {consultationData.categories.map((category) => (
        <section
          key={category.id}
          id={category.id}
          className="scroll-mt-20 border-t border-border px-4 py-10 sm:py-12"
        >
          <div className="mx-auto max-w-2xl">
            <h2
              className={`flex items-center gap-2 text-lg font-bold ${TEXT_COLOR_MAP[category.color] ?? "text-foreground"}`}
            >
              <WatercolorIcon
                name={category.icon as WatercolorIconName}
                size={22}
              />
              {category.label}
            </h2>

            <div className="mt-5 space-y-3">
              {category.resources.map((resource) => (
                <ResourceCard
                  key={resource.number}
                  name={resource.name}
                  number={resource.number}
                  description={resource.description}
                  hours={resource.hours}
                  note={"note" in resource ? (resource.note as string) : undefined}
                  address={
                    "address" in resource
                      ? (resource.address as string)
                      : undefined
                  }
                  url={"url" in resource ? (resource.url as string) : undefined}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* 注意事項 */}
      <section className="border-t border-border bg-ivory-50/50 px-4 py-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs leading-relaxed text-muted">
            掲載情報は{consultationData.lastUpdated}
            時点のものです。最新の情報は各機関の公式サイトでご確認ください。
            <br />
            緊急時は迷わず
            <a href="tel:119" className="font-bold text-red-600 underline">
              119
            </a>
            に電話してください。
          </p>
        </div>
      </section>

      {/* 関連リンク */}
      <section className="px-4 py-10 sm:py-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-lg font-semibold text-foreground">
            あわせて確認
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/ambulance-guide"
              className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-all hover:border-sage-200 hover:shadow-sm"
            >
              <WatercolorIcon
                name="alert"
                size={20}
                className="shrink-0 text-red-500"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  救急車の呼び方
                </p>
                <p className="text-xs text-muted">
                  119番の手順と持ち物
                </p>
              </div>
            </Link>
            <Link
              href="/triage"
              className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-all hover:border-sage-200 hover:shadow-sm"
            >
              <WatercolorIcon
                name="stethoscope"
                size={20}
                className="shrink-0 text-teal-600"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  受診判断ガイド
                </p>
                <p className="text-xs text-muted">
                  症状から緊急度をチェック
                </p>
              </div>
            </Link>
            <Link
              href="/department-guide"
              className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-all hover:border-sage-200 hover:shadow-sm"
            >
              <WatercolorIcon
                name="stethoscope"
                size={20}
                className="shrink-0 text-purple-500"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  受診科選択ガイド
                </p>
                <p className="text-xs text-muted">
                  どこを受診すればいいの？
                </p>
              </div>
            </Link>
            <Link
              href="/clinics"
              className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-all hover:border-sage-200 hover:shadow-sm"
            >
              <WatercolorIcon
                name="mappin"
                size={20}
                className="shrink-0 text-blue-500"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  小児科マップ
                </p>
                <p className="text-xs text-muted">港区の小児科を地図で探す</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
