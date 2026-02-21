import type { Metadata } from "next";
import Link from "next/link";
import {
  Stethoscope,
  Thermometer,
  Droplets,
  Wind,
  CircleDot,
  Frown,
  AlertTriangle,
  AlertOctagon,
  ArrowRight,
  BrainCircuit,
  Ear,
  Megaphone,
  Brain,
  Eye,
  Flame,
  Zap,
} from "lucide-react";
import { getAllSymptoms } from "@/lib/triage/engine";
import type { TriageSymptom } from "@/lib/triage/engine";
import { GuidedTriageFlow } from "@/components/triage/guided-triage-flow";

export const metadata: Metadata = {
  title: "症状チェック（トリアージ）",
  description:
    "お子さんの症状から受診の緊急度を判断します。質問に答えていくだけで、受診の目安がわかります。発熱・嘔吐・咳・発疹・腹痛・頭部外傷・呼吸困難・けいれん・誤飲・鼻血など17症状に対応。",
};

const ICON_MAP: Record<string, typeof Thermometer> = {
  Thermometer,
  Droplets,
  Wind,
  CircleDot,
  Frown,
  BrainCircuit,
  Ear,
  Megaphone,
  Brain,
  Eye,
  Flame,
  Zap,
  AlertTriangle,
  AlertOctagon,
};

const SYMPTOM_COLORS: readonly string[] = [
  "bg-red-50 text-red-600 border-red-200",
  "bg-orange-50 text-orange-600 border-orange-200",
  "bg-blue-50 text-blue-600 border-blue-200",
  "bg-pink-50 text-pink-600 border-pink-200",
  "bg-purple-50 text-purple-600 border-purple-200",
];

function SymptomCard({
  symptom,
  index,
}: {
  readonly symptom: TriageSymptom;
  readonly index: number;
}) {
  const IconComponent = ICON_MAP[symptom.icon] ?? Stethoscope;
  const colorClass = SYMPTOM_COLORS[index % SYMPTOM_COLORS.length];

  return (
    <Link
      href={`/triage/${symptom.slug}`}
      className="group flex gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-sage-200 hover:shadow-md"
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${colorClass}`}
      >
        <IconComponent className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-heading text-lg font-bold text-card-foreground">
          {symptom.name}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          {symptom.description}
        </p>
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-sage-600 opacity-0 transition-opacity group-hover:opacity-100">
          チェックを始める
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}

export default function TriagePage() {
  const symptoms = getAllSymptoms();

  return (
    <>
      <section className="bg-gradient-to-b from-sage-50 to-ivory-50 px-4 pb-12 pt-12 sm:pb-16 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            <Stethoscope className="mr-2 inline-block h-8 w-8 text-sage-600" />
            症状チェック
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            質問に答えていくだけで、受診の緊急度を判断します。
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-yellow-50 px-4 py-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-600" />
            <div className="text-sm leading-relaxed text-yellow-800">
              <p className="font-medium">
                このチェックは医師の診断に代わるものではありません。
              </p>
              <p className="mt-1">
                あくまで受診の目安としてご利用ください。心配な場合はいつでも#8000（小児救急電話相談）にお電話ください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guided Triage Flow - Primary UX */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-xl font-bold text-foreground">
            質問に答えて症状をチェック
          </h2>
          <p className="mt-2 text-sm text-muted">
            緊急性の確認 → 年齢の選択 → 症状の選択の順にご案内します
          </p>
          <div className="mt-6">
            <GuidedTriageFlow />
          </div>
        </div>
      </section>

      {/* Existing Symptom List - Alternative/Direct Access */}
      <section className="border-t border-border bg-ivory-50 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-xl font-bold text-foreground">
            症状から直接選ぶ
          </h2>
          <p className="mt-2 text-sm text-muted">
            チェックしたい症状がわかっている方はこちらからどうぞ
          </p>
          <div className="mt-6 space-y-3">
            {symptoms.map((symptom, index) => (
              <SymptomCard key={symptom.slug} symptom={symptom} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-red-50 px-4 py-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-red-700">
            <AlertTriangle className="h-5 w-5" />
            緊急連絡先
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-red-200 bg-white p-3">
              <p className="text-sm font-medium text-red-700">救急車</p>
              <a href="tel:119" className="text-xl font-bold text-red-600">
                119
              </a>
              <p className="text-xs text-muted">意識がない、呼吸困難など</p>
            </div>
            <div className="rounded-lg border border-red-200 bg-white p-3">
              <p className="text-sm font-medium text-red-700">救急相談</p>
              <a href="tel:#7119" className="text-xl font-bold text-red-600">
                #7119
              </a>
              <p className="text-xs text-muted">救急車を呼ぶか迷ったら</p>
            </div>
            <div className="rounded-lg border border-red-200 bg-white p-3">
              <p className="text-sm font-medium text-red-700">
                小児救急電話相談
              </p>
              <a href="tel:#8000" className="text-xl font-bold text-red-600">
                #8000
              </a>
              <p className="text-xs text-muted">夜間・休日の子どもの急病</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
