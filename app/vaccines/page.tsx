import type { Metadata } from "next";
import Link from "next/link";
import { Syringe, ArrowRight, CheckCircle2, Info } from "lucide-react";
import {
  getAllVaccines,
  getRoutineVaccines,
  getOptionalVaccines,
  VACCINE_TYPE_LABELS,
  VACCINE_TYPE_COLORS,
  formatAgeMonths,
} from "@/lib/vaccines";
import type { Vaccine } from "@/lib/types";

export const metadata: Metadata = {
  title: "予防接種スケジュール",
  description:
    "港区の乳幼児期の予防接種スケジュール一覧。定期接種・任意接種の種類、接種時期、港区の助成制度をまとめています。",
};

function VaccineCard({ vaccine }: { readonly vaccine: Vaccine }) {
  const colorClass =
    VACCINE_TYPE_COLORS[vaccine.type] ?? "bg-gray-50 text-gray-700 border-gray-200";
  const firstDose = vaccine.doses[0];
  const lastDose = vaccine.doses[vaccine.doses.length - 1];

  return (
    <Link
      href={`/vaccines/${vaccine.slug}`}
      className="group flex gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-teal-200 hover:shadow-md"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${colorClass}`}
      >
        <Syringe className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-heading text-base font-bold text-card-foreground">
            {vaccine.name}
          </h3>
          <span
            className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${colorClass}`}
          >
            {VACCINE_TYPE_LABELS[vaccine.type]}
          </span>
          {vaccine.relatedProgramSlug && (
            <span className="inline-flex rounded-full border border-coral-200 bg-coral-50 px-2 py-0.5 text-xs font-medium text-coral-700">
              港区助成あり
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-muted">{vaccine.disease}</p>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
          {vaccine.description}
        </p>
        {firstDose && (
          <p className="mt-2 text-xs font-medium text-teal-600">
            接種時期:{" "}
            {vaccine.doses.length === 1
              ? formatAgeMonths(firstDose.ageMonthsStandard)
              : `${formatAgeMonths(firstDose.ageMonthsStandard)}〜${formatAgeMonths(lastDose.ageMonthsStandard)}`}{" "}
            ／ 計{vaccine.doses.length}回
          </p>
        )}
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-teal-600 opacity-0 transition-opacity group-hover:opacity-100">
          詳細・接種スケジュール
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}

export default function VaccinesPage() {
  const routineVaccines = getRoutineVaccines();
  const optionalVaccines = getOptionalVaccines();
  const allVaccines = getAllVaccines();

  return (
    <>
      <section className="bg-gradient-to-b from-teal-50 to-warm-50 px-4 pb-12 pt-12 sm:pb-16 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            予防接種スケジュール
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            全{allVaccines.length}種類のワクチン情報と接種時期をまとめました。
            港区独自の助成制度も確認できます。
          </p>
        </div>
      </section>

      <section className="px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl space-y-10">
          <div className="rounded-xl border border-teal-200 bg-teal-50 p-5">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
              <div className="space-y-1.5">
                <p className="text-sm font-bold text-teal-800">
                  予防接種の基本ルール
                </p>
                <ul className="space-y-1 text-sm text-teal-700">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-500" />
                    生後2ヶ月から開始。五種混合・肺炎球菌・B型肝炎・ロタを同時接種するのが標準的なスタートです
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-500" />
                    同時接種は安全です。複数のワクチンを1回の来院でまとめて受けることで、早く免疫をつけられます
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-500" />
                    定期接種は公費（無料）で受けられます。対象年齢・期間内に接種しましょう
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100">
                <Syringe className="h-3.5 w-3.5 text-teal-700" />
              </span>
              <h2 className="font-heading text-xl font-bold text-foreground">
                定期接種
                <span className="ml-2 text-sm font-normal text-muted">
                  （公費・無料）
                </span>
              </h2>
              <span className="rounded-full bg-warm-200 px-2 py-0.5 text-xs font-medium text-muted">
                {routineVaccines.length}種
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {routineVaccines.map((vaccine) => (
                <VaccineCard key={vaccine.slug} vaccine={vaccine} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                <Syringe className="h-3.5 w-3.5 text-orange-700" />
              </span>
              <h2 className="font-heading text-xl font-bold text-foreground">
                任意接種
                <span className="ml-2 text-sm font-normal text-muted">
                  （原則自費・一部港区助成あり）
                </span>
              </h2>
              <span className="rounded-full bg-warm-200 px-2 py-0.5 text-xs font-medium text-muted">
                {optionalVaccines.length}種
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {optionalVaccines.map((vaccine) => (
                <VaccineCard key={vaccine.slug} vaccine={vaccine} />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-warm-50 p-5">
            <p className="text-xs leading-relaxed text-muted">
              ※ 接種時期は標準的な目安です。お子さんの体調やかかりつけ医の方針によって前後することがあります。
              詳細なスケジュールはかかりつけの小児科医にご相談ください。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
