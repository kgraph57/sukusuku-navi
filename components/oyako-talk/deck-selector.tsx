"use client"

import type { TalkLevel } from "@/lib/oyako-talk/types"
import { LEVELS, isLevelUnlocked } from "@/lib/oyako-talk/constants"

interface DeckSelectorProps {
  readonly selectedLevel: TalkLevel
  readonly totalCardsDrawn: number
  readonly onSelectLevel: (level: TalkLevel) => void
}

export function DeckSelector({
  selectedLevel,
  totalCardsDrawn,
  onSelectLevel,
}: DeckSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2" role="radiogroup" aria-label="レベル選択">
      {LEVELS.map((config) => {
        const unlocked = isLevelUnlocked(config.level, totalCardsDrawn)
        const isSelected = config.level === selectedLevel

        return (
          <button
            key={config.level}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={!unlocked}
            onClick={() => onSelectLevel(config.level)}
            className={`flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all ${
              isSelected
                ? `${config.bgClass} ${config.borderClass} ${config.colorClass}`
                : unlocked
                  ? `border-gray-200 bg-white text-gray-600 hover:${config.bgClass} hover:${config.borderClass}`
                  : "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300"
            }`}
          >
            {!unlocked && <span aria-hidden="true">🔒</span>}
            <span>Lv.{config.level}</span>
            <span className="hidden sm:inline">{config.name}</span>
          </button>
        )
      })}
    </div>
  )
}
