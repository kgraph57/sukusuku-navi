import Link from "next/link"
import { Stethoscope } from "lucide-react"

interface DoctorBylineProps {
  readonly qaCount: number
  readonly referenceCount: number
}

export function DoctorByline({ qaCount, referenceCount }: DoctorBylineProps) {
  return (
    <Link
      href="/about"
      className="group mb-8 flex items-center gap-4 rounded-xl border border-teal-100 bg-teal-50/50 p-4 transition-colors hover:border-teal-200 hover:bg-teal-50"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-600 shadow-sm">
        <Stethoscope className="h-6 w-6 text-white" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-heading text-sm font-bold text-foreground">
            おかもん先生
          </span>
          <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-700">
            小児科専門医
          </span>
          <span className="rounded-full bg-white border border-teal-100 px-2 py-0.5 text-xs text-muted">
            愛育病院 小児科
          </span>
        </div>
        <p className="mt-1 text-xs text-muted">
          参考文献 {referenceCount}件
          <span className="mx-1.5 text-border">·</span>
          Q&amp;A {qaCount}問収録
        </p>
      </div>

      <span className="shrink-0 text-xs text-teal-600 group-hover:text-teal-700 group-hover:underline">
        プロフィール →
      </span>
    </Link>
  )
}
