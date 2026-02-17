import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Users,
  MapPin,
  Banknote,
  AlertCircle,
  Calculator,
  Heart,
  Baby,
  HandHeart,
} from "lucide-react"
import { getAllPrograms, getProgramBySlug, PROGRAM_CATEGORY_LABELS } from "@/lib/programs"
import type { Program } from "@/lib/types"

interface PageProps {
  readonly params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const programs = getAllPrograms()
  return programs.map((program) => ({
    slug: program.slug,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const program = getProgramBySlug(slug)
  if (!program) return { title: "制度が見つかりません" }

  return {
    title: program.name,
    description: program.description,
  }
}

const CATEGORY_ICON_MAP: Record<string, typeof Heart> = {
  medical: Heart,
  financial: Banknote,
  childcare: Baby,
  support: HandHeart,
}

const CATEGORY_COLOR_MAP: Record<string, string> = {
  medical: "bg-red-50 text-red-600 border-red-200",
  financial: "bg-teal-50 text-teal-600 border-teal-200",
  childcare: "bg-blue-50 text-blue-600 border-blue-200",
  support: "bg-purple-50 text-purple-600 border-purple-200",
}

function formatAgeRange(program: Program): string {
  const { minAge, maxAge } = program.eligibility
  if (minAge === null && maxAge === null) return "制限なし"
  if (minAge === null && maxAge !== null) return `${maxAge}歳まで`
  if (minAge !== null && maxAge === null) return `${minAge}歳以上`
  return `${minAge}歳〜${maxAge}歳`
}

function formatResidency(residency: string): string {
  switch (residency) {
    case "minato":
      return "港区在住"
    case "tokyo":
      return "東京都在住"
    case "japan":
      return "日本国内"
    default:
      return residency
  }
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params
  const program = getProgramBySlug(slug)

  if (!program) {
    notFound()
  }

  const categoryLabel = PROGRAM_CATEGORY_LABELS[program.category]
  const colorClass =
    CATEGORY_COLOR_MAP[program.category] ??
    "bg-gray-50 text-gray-600 border-gray-200"
  const IconComponent = CATEGORY_ICON_MAP[program.category] ?? Heart

  return (
    <>
      <section className="bg-gradient-to-b from-teal-50 to-warm-50 px-4 pb-8 pt-8 sm:pb-12 sm:pt-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-teal-600"
          >
            <ArrowLeft className="h-4 w-4" />
            制度一覧に戻る
          </Link>

          <div className="mt-4 flex items-start gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${colorClass}`}
            >
              <IconComponent className="h-6 w-6" />
            </div>
            <div>
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}
              >
                {categoryLabel}
              </span>
              <h1 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                {program.name}
              </h1>
            </div>
          </div>

          <p className="mt-4 text-base leading-relaxed text-muted">
            {program.description}
          </p>
        </div>
      </section>

      <section className="px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-card-foreground">
              <Users className="h-5 w-5 text-teal-600" />
              対象者
            </h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <span className="shrink-0 text-sm font-medium text-muted">
                  年齢
                </span>
                <span className="text-sm text-card-foreground">
                  {formatAgeRange(program)}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 text-sm font-medium text-muted">
                  居住要件
                </span>
                <span className="text-sm text-card-foreground">
                  {formatResidency(program.eligibility.residency)}
                </span>
              </div>
              {program.eligibility.incomeLimit !== null && (
                <div className="flex items-start gap-3">
                  <span className="shrink-0 text-sm font-medium text-muted">
                    所得制限
                  </span>
                  <span className="text-sm text-card-foreground">
                    {program.eligibility.incomeLimit.toLocaleString()}円
                  </span>
                </div>
              )}
              {program.eligibility.incomeLimit === null && (
                <div className="flex items-start gap-3">
                  <span className="shrink-0 text-sm font-medium text-muted">
                    所得制限
                  </span>
                  <span className="text-sm font-medium text-teal-600">
                    なし
                  </span>
                </div>
              )}
              {program.eligibility.conditions.length > 0 && (
                <div className="flex items-start gap-3">
                  <span className="shrink-0 text-sm font-medium text-muted">
                    条件
                  </span>
                  <ul className="space-y-1">
                    {program.eligibility.conditions.map((condition) => (
                      <li
                        key={condition}
                        className="text-sm text-card-foreground"
                      >
                        ・{condition}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-card-foreground">
              <Banknote className="h-5 w-5 text-teal-600" />
              支給額・内容
            </h2>
            <div className="mt-4">
              <p className="text-sm leading-relaxed text-card-foreground">
                {program.amount.description}
              </p>
              {program.amount.value !== null && program.amount.value > 0 && (
                <div className="mt-3 inline-flex items-baseline gap-1 rounded-lg bg-teal-50 px-4 py-2">
                  <span className="text-sm text-teal-700">
                    {program.amount.unit === "yen-per-month"
                      ? "月額"
                      : "金額"}
                  </span>
                  <span className="font-heading text-2xl font-bold text-teal-700">
                    {program.amount.value.toLocaleString()}円
                  </span>
                  {program.amount.unit === "yen-per-month" && (
                    <span className="text-sm text-teal-600">/月</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {program.deadline && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-card-foreground">
                <Calendar className="h-5 w-5 text-teal-600" />
                申請期限
              </h2>
              <p className="mt-3 text-sm text-card-foreground">
                {program.deadline}
              </p>
            </div>
          )}

          {program.notes && (
            <div className="rounded-xl border border-coral-200 bg-coral-50 p-6">
              <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-coral-700">
                <AlertCircle className="h-5 w-5" />
                注意事項
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-coral-800">
                {program.notes}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={program.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-teal-700"
            >
              申請ページを開く
              <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href="/simulator/start"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-teal-200 bg-white px-6 py-3 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50"
            >
              <Calculator className="h-4 w-4" />
              シミュレーションする
            </Link>
          </div>

          <div className="pt-4">
            <Link
              href="/programs"
              className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-teal-600"
            >
              <ArrowLeft className="h-4 w-4" />
              制度一覧に戻る
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
