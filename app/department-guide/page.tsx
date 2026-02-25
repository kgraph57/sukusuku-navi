import type { Metadata } from "next";
import Link from "next/link";
import { WatercolorIcon } from "@/components/icons/watercolor-icon";
import { SectionHeading } from "@/components/shared/section-heading";
import { SpeechBubble } from "@/components/vaccination/speech-bubble";
import { DepartmentFlow } from "@/components/department-guide/department-flow";
import departmentData from "@/data/department-guide.json";

export const metadata: Metadata = {
  title: "どこを受診すればいい？── 受診科選択ガイド",
  description:
    "お子さんの症状から、小児科・耳鼻科・皮膚科・眼科など適切な受診先を小児科医がアドバイス。迷ったらまず小児科へ。",
};

export default function DepartmentGuidePage() {
  return (
    <main className="pb-20">
      {/* Hero */}
      <section className="bg-sage-50/50 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            どこを受診すればいい？
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            お子さんの症状・状況から、適切な受診先をご案内します。
          </p>
        </div>
      </section>

      {/* おかもん先生のメッセージ */}
      <section className="px-4 py-10 sm:py-12">
        <div className="mx-auto max-w-2xl">
          <SpeechBubble
            character="konkon"
            pose="konkon_teaching"
            name="こんこん先生"
            size="large"
          >
            <p>{departmentData.doctorNote}</p>
          </SpeechBubble>
        </div>
      </section>

      {/* 受診科選択フロー */}
      <section className="border-t border-border px-4 py-10 sm:py-12">
        <div className="mx-auto max-w-2xl">
          <SectionHeading subtitle="タップして詳しい説明とリンクを表示">
            症状・状況から探す
          </SectionHeading>
          <div className="mt-8">
            <DepartmentFlow situations={departmentData.situations} />
          </div>
        </div>
      </section>

      {/* まとめカード */}
      <section className="border-t border-border bg-sage-50/30 px-4 py-10 sm:py-12">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border-2 border-sage-200 bg-white p-6 text-center sm:p-8">
            <WatercolorIcon
              name="stethoscope"
              size={32}
              className="mx-auto text-sage-500"
            />
            <h2 className="mt-3 text-lg font-bold text-foreground">
              迷ったらまず小児科
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              小児科医は子どもの「総合内科医」です。
              <br />
              専門科への紹介が必要な場合は、小児科医が適切にご案内します。
            </p>
            <Link
              href="/clinics"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sage-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sage-700"
            >
              <WatercolorIcon name="mappin" size={16} />
              港区の小児科を探す
            </Link>
          </div>
        </div>
      </section>

      {/* 注意事項 */}
      <section className="px-4 py-6">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs leading-relaxed text-muted">
            このガイドはあくまで目安です。お子さんの状態に不安がある場合は、
            <a href="tel:#7119" className="font-bold text-sage-600 underline">
              #7119（救急安心センター東京）
            </a>
            に電話して相談してください。
          </p>
        </div>
      </section>

      {/* 関連リンク */}
      <section className="border-t border-border px-4 py-10 sm:py-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-lg font-semibold text-foreground">
            あわせて確認
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/triage"
              className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-all hover:border-sage-200 hover:shadow-sm"
            >
              <WatercolorIcon
                name="stethoscope"
                size={20}
                className="shrink-0 text-red-500"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  受診判断ガイド
                </p>
                <p className="text-xs text-muted">症状の緊急度をチェック</p>
              </div>
            </Link>
            <Link
              href="/consultation"
              className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-all hover:border-sage-200 hover:shadow-sm"
            >
              <WatercolorIcon
                name="phone"
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
              href="/emergency"
              className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-all hover:border-sage-200 hover:shadow-sm"
            >
              <WatercolorIcon
                name="alert"
                size={20}
                className="shrink-0 text-red-500"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  緊急連絡先
                </p>
                <p className="text-xs text-muted">夜間・休日の救急連絡先</p>
              </div>
            </Link>
            <Link
              href="/ambulance-guide"
              className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-all hover:border-sage-200 hover:shadow-sm"
            >
              <WatercolorIcon
                name="phone"
                size={20}
                className="shrink-0 text-red-500"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  救急車の呼び方
                </p>
                <p className="text-xs text-muted">119番の手順と持ち物</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
