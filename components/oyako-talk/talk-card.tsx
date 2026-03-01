"use client"

import { useEffect, useState } from "react"
import type { TalkQuestion, AgeMode } from "@/lib/oyako-talk/types"
import { getLevelConfig } from "@/lib/oyako-talk/constants"

interface TalkCardProps {
  readonly question: TalkQuestion
  readonly ageMode: AgeMode
  readonly isFavorited: boolean
  readonly onFavorite: () => void
  readonly onNext: () => void
  readonly onEnd: () => void
  readonly hasMore: boolean
}

export function TalkCard({
  question,
  ageMode,
  isFavorited,
  onFavorite,
  onNext,
  onEnd,
  hasMore,
}: TalkCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const levelConfig = getLevelConfig(question.level)

  useEffect(() => {
    setIsFlipped(false)
    setAnimationKey((k) => k + 1)
    const timer = setTimeout(() => setIsFlipped(true), 400)
    return () => clearTimeout(timer)
  }, [question.id])

  const displayText =
    ageMode === "kids" ? question.textKids : question.text

  return (
    <div
      key={animationKey}
      className="animate-card-entrance mx-auto w-full max-w-xs"
    >
      <div className="talk-card-perspective">
        <div
          className={`talk-card-inner relative aspect-[3/4] w-full ${isFlipped ? "flipped" : ""}`}
        >
          {/* Back */}
          <div
            className={`talk-card-face absolute inset-0 rounded-2xl ${levelConfig.bgClass} ${levelConfig.borderClass} border-2 flex flex-col items-center justify-center gap-4 shadow-lg`}
          >
            <span className="text-5xl">{question.emoji}</span>
            <span
              className={`font-heading text-lg font-semibold ${levelConfig.colorClass}`}
            >
              Lv.{question.level} {levelConfig.name}
            </span>
            <span className="text-sm text-muted">タップでめくる</span>
          </div>

          {/* Front */}
          <div
            className={`talk-card-front talk-card-face absolute inset-0 rounded-2xl bg-white ${levelConfig.borderClass} border-2 flex flex-col shadow-lg`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between rounded-t-2xl px-4 py-3 ${levelConfig.bgClass}`}
            >
              <span
                className={`text-xs font-semibold ${levelConfig.colorClass}`}
              >
                Lv.{question.level} {levelConfig.name}
              </span>
              <span className="text-2xl">{question.emoji}</span>
            </div>

            {/* Question */}
            <div className="flex flex-1 flex-col items-center justify-center px-5 py-4">
              <p
                className={`text-center font-heading leading-relaxed ${
                  ageMode === "kids"
                    ? "text-xl font-bold"
                    : "text-lg font-semibold"
                }`}
              >
                {displayText}
              </p>
            </div>

            {/* Follow-up */}
            <div className="border-t border-gray-100 px-5 py-3">
              <p className="text-center text-xs leading-relaxed text-muted">
                {question.followUp}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions (below card) */}
      {isFlipped && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onFavorite}
            className={`flex min-h-[44px] items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isFavorited
                ? "bg-coral-100 text-coral-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            aria-label={isFavorited ? "お気に入り解除" : "お気に入り登録"}
          >
            {isFavorited ? "♥" : "♡"} お気に入り
          </button>

          {hasMore ? (
            <button
              type="button"
              onClick={onNext}
              className="flex min-h-[44px] items-center gap-1.5 rounded-full bg-sage-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-sage-700"
            >
              次のカード
            </button>
          ) : (
            <span className="text-sm text-muted">
              このレベルのカードは全部引きました
            </span>
          )}

          <button
            type="button"
            onClick={onEnd}
            className="flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm text-muted transition-colors hover:bg-gray-100"
          >
            終わる
          </button>
        </div>
      )}
    </div>
  )
}
