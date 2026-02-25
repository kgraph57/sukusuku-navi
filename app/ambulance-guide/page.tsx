import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { WatercolorIcon } from "@/components/icons/watercolor-icon";
import { SectionHeading } from "@/components/shared/section-heading";
import { SpeechBubble } from "@/components/vaccination/speech-bubble";
import { withBasePath } from "@/lib/image-path";

export const metadata: Metadata = {
  title: "救急車の呼び方ガイド",
  description:
    "子どもの急病・けがで救急車を呼ぶときの手順。119番の伝え方、持ち物チェックリスト、到着までにやること。",
};

const WHEN_TO_CALL = [
  "意識がない・もうろうとしている",
  "呼吸が止まっている・ゼーゼーして苦しそう",
  "けいれんが5分以上止まらない",
  "大量の出血がある",
  "アナフィラキシー（全身のじんましん＋呼吸困難）",
  "高所からの転落・交通事故",
  "水に溺れた",
] as const;

const WHAT_TO_TELL = [
  { label: "救急です", detail: "「火事ですか？救急ですか？」と聞かれます" },
  { label: "住所", detail: "「港区○○○、△△マンション□号室」できるだけ正確に" },
  { label: "お子さんの年齢", detail: "「1歳6ヶ月の子どもです」" },
  {
    label: "今の状態",
    detail: "「38℃の熱があり、けいれんして5分経っても止まりません」",
  },
  {
    label: "あなたの名前と電話番号",
    detail: "折り返し連絡が来ることがあります",
  },
] as const;

const CHECKLIST_ITEMS = [
  "母子健康手帳",
  "健康保険証",
  "乳幼児医療証（マル乳・マル子）",
  "お薬手帳（あれば）",
  "着替え・おむつ",
  "タオル・ビニール袋",
  "保護者の身分証",
] as const;

export default function AmbulanceGuidePage() {
  return (
    <main className="pb-20">
      {/* Hero: 巨大119ボタン */}
      <section className="bg-red-50 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            救急車の呼び方ガイド
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            お子さんの急病やけがで救急車を呼ぶときの手順をまとめました。
          </p>

          <a
            href="tel:119"
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-red-600 px-10 py-5 text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl active:scale-[0.98]"
          >
            <WatercolorIcon name="phone" size={28} className="text-white" />
            <span className="text-3xl font-bold tracking-wider sm:text-4xl">
              119
            </span>
          </a>
          <p className="mt-3 text-xs text-red-600/80">
            タップで発信します（通話料無料）
          </p>
        </div>
      </section>

      {/* こんなときは迷わず119 */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <SectionHeading subtitle="以下の症状があるときは、ためらわずに救急車を呼んでください">
            こんなときは迷わず119
          </SectionHeading>

          <ul className="mt-8 space-y-3">
            {WHEN_TO_CALL.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border-2 border-red-100 bg-white p-4"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                  <WatercolorIcon
                    name="alert"
                    size={14}
                    className="text-red-600"
                  />
                </span>
                <span className="text-sm font-medium leading-relaxed text-foreground sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="flex items-start gap-2 text-sm leading-relaxed text-amber-800">
              <WatercolorIcon
                name="alert"
                size={16}
                className="mt-0.5 shrink-0 text-amber-600"
              />
              <span>
                <strong>迷ったら#7119へ</strong>
                ：救急車を呼ぶか迷うときは、24時間対応の
                <a
                  href="tel:#7119"
                  className="font-bold text-amber-900 underline"
                >
                  #7119（救急安心センター東京）
                </a>
                に電話して相談できます。
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* 119番でのやりとり */}
      <section className="border-t border-border bg-ivory-50/50 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <SectionHeading subtitle="落ち着いて、以下の順番で伝えてください">
            119番での伝え方
          </SectionHeading>

          <ol className="mt-8 space-y-4">
            {WHAT_TO_TELL.map((item, i) => (
              <li
                key={item.label}
                className="flex items-start gap-4 rounded-xl border border-border bg-white p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-600">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{item.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-xl border border-sage-200 bg-sage-50 p-5">
            <p className="text-sm leading-relaxed text-sage-700">
              <strong>電話中のポイント：</strong>
              スピーカーフォンにして、指示に従いながらお子さんのそばにいてください。電話を切らないでください。
            </p>
          </div>
        </div>
      </section>

      {/* 到着までにやること */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <SectionHeading subtitle="到着まで平均8〜10分。その間にできること">
            救急車が来るまで
          </SectionHeading>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-border bg-white p-5">
              <h3 className="flex items-center gap-2 font-semibold text-foreground">
                <WatercolorIcon
                  name="heart"
                  size={18}
                  className="text-red-500"
                />
                お子さんのそばにいる
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                声をかけ続けてください。嘔吐している場合は横向き（回復体位）にします。
              </p>
            </div>

            <div className="rounded-xl border border-border bg-white p-5">
              <h3 className="flex items-center gap-2 font-semibold text-foreground">
                <WatercolorIcon
                  name="clipboard"
                  size={18}
                  className="text-teal-600"
                />
                玄関の鍵を開けておく
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                オートロックの場合は解錠しておくか、家族に開けてもらうよう頼みましょう。
              </p>
            </div>

            <div className="rounded-xl border border-border bg-white p-5">
              <h3 className="flex items-center gap-2 font-semibold text-foreground">
                <WatercolorIcon
                  name="users"
                  size={18}
                  className="text-purple-600"
                />
                きょうだいの預け先を確認
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                他のお子さんがいる場合、近隣や家族に連絡しておくと安心です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 持ち物チェックリスト */}
      <section className="border-t border-border bg-ivory-50/50 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <SectionHeading subtitle="余裕があれば以下を持っていきましょう">
            持ち物チェックリスト
          </SectionHeading>

          <div className="mt-8 rounded-xl border border-border bg-white p-5">
            <ul className="space-y-3">
              {CHECKLIST_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-sage-300">
                    <WatercolorIcon
                      name="check"
                      size={12}
                      className="text-sage-400"
                    />
                  </span>
                  <span className="text-sm text-foreground sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-center text-xs text-muted">
            ※
            持ち物が揃わなくても、お子さんの状態が優先です。何も持っていなくても大丈夫です。
          </p>
        </div>
      </section>

      {/* おかもん先生のメッセージ */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <SpeechBubble
            character="konkon"
            pose="konkon_teaching"
            name="こんこん先生"
            size="large"
          >
            <p>
              「呼んでよかった」はたくさんありますが、
              <br className="hidden sm:inline" />
              「呼ばなきゃよかった」はほとんどありません。
            </p>
            <p className="mt-3">
              迷ったら呼んでください。
              <br />
              それがお子さんを守る一番確実な方法です。
            </p>
          </SpeechBubble>
        </div>
      </section>

      {/* 関連リンク */}
      <section className="border-t border-border px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-lg font-semibold text-foreground">
            あわせて確認
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/emergency"
              className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-all hover:border-sage-200 hover:shadow-sm"
            >
              <WatercolorIcon
                name="phone"
                size={20}
                className="shrink-0 text-red-500"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  緊急連絡先・夜間休日診療
                </p>
                <p className="text-xs text-muted">
                  #7119、中毒110番、夜間診療所
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
                <p className="text-xs text-muted">症状から緊急度をチェック</p>
              </div>
            </Link>
            <Link
              href="/consultation"
              className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-all hover:border-sage-200 hover:shadow-sm"
            >
              <WatercolorIcon
                name="heart"
                size={20}
                className="shrink-0 text-coral-500"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  相談窓口一覧
                </p>
                <p className="text-xs text-muted">港区の子育て相談先まとめ</p>
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
