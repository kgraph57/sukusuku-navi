"use client"

import type { AgeMode } from "@/lib/oyako-talk/types"

interface AgeModeToggleProps {
  readonly ageMode: AgeMode
  readonly onToggle: () => void
}

export function AgeModeToggle({ ageMode, onToggle }: AgeModeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex min-h-[44px] items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm transition-colors hover:bg-gray-50"
      aria-label={`現在のモード: ${ageMode === "kids" ? "よみきかせ" : "よめるよ"}。タップで切替`}
    >
      <span aria-hidden="true">{ageMode === "kids" ? "👶" : "📖"}</span>
      <span className="font-medium">
        {ageMode === "kids" ? "よみきかせ" : "よめるよ"}
      </span>
    </button>
  )
}
