import type { Metadata } from "next"
import Link from "next/link"
import {
  ClipboardCheck,
  Baby,
  FileText,
  Heart,
  School,
  GraduationCap,
  ArrowRight,
} from "lucide-react"
import { getAllChecklists } from "@/lib/checklists"

export const metadata: Metadata = {
  title: "手続きチェックリスト",
  description:
    "出産前から小学校入学まで、港区で必要な手続きをステップごとにガイド。妊娠届、出生届、児童手当、保育園申込など。",
}

const ICON_MAP: Record<string, typeof Baby> = {
  baby: Baby,
  "file-text": FileText,
  heart: Heart,
  school: School,
  "graduation-cap": GraduationCap,
}

const ORDER_COLORS: readonly string[] = [
  "bg-pink-500",
  "bg-sage-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-orange-500",
]

export default function ChecklistsPage() {
  const checklists = getAllChecklists()

  return (
    <>
      <section className="bg-gradient-to-b from-sage-50 to-ivory-50 px-4 pb-12 pt-12 sm:pb-16 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            <ClipboardCheck className="mr-2 inline-block h-8 w-8 text-sage-600" />
            手続きチェックリスト
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            出産前から小学校入学まで、必要な手続きをステップごとにガイドします。
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            <div className="absolute left-5 top-0 hidden h-full w-0.5 bg-ivory-200 sm:block" />

            <div className="space-y-6">
              {checklists.map((checklist, index) => {
                const IconComponent =
                  ICON_MAP[checklist.icon] ?? ClipboardCheck
                const color = ORDER_COLORS[index % ORDER_COLORS.length]

                return (
                  <Link
                    key={checklist.slug}
                    href={`/checklists/${checklist.slug}`}
                    className="group relative flex gap-4 sm:gap-6"
                  >
                    <div
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${color}`}
                    >
                      {checklist.order}
                    </div>

                    <div className="flex-1 rounded-xl border border-border bg-card p-5 transition-all group-hover:border-sage-200 group-hover:shadow-md">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-sage-600" />
                        <h2 className="font-heading text-lg font-semibold text-card-foreground">
                          {checklist.name}
                        </h2>
                        <span className="rounded-full bg-ivory-100 px-2 py-0.5 text-xs font-medium text-muted">
                          {checklist.items.length}項目
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {checklist.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-sage-600 opacity-0 transition-opacity group-hover:opacity-100">
                        チェックリストを開く
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
