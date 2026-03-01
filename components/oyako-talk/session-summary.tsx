"use client"

import Link from "next/link"

interface SessionSummaryProps {
  readonly cardsDrawn: number
  readonly favoritesCount: number
  readonly onPlayAgain: () => void
}

export function SessionSummary({
  cardsDrawn,
  favoritesCount,
  onPlayAgain,
}: SessionSummaryProps) {
  const getMessage = () => {
    if (cardsDrawn >= 10) return "たくさん話せたね！すごい！"
    if (cardsDrawn >= 5) return "いい時間だったね！"
    return "また明日もやろうね！"
  }

  return (
    <div className="mx-auto max-w-sm text-center">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <p className="mb-4 text-4xl" aria-hidden="true">
          🎉
        </p>
        <h2 className="mb-2 font-heading text-xl font-bold text-sage-800">
          おつかれさま！
        </h2>
        <p className="mb-6 text-muted">{getMessage()}</p>

        <div className="mb-6 flex justify-center gap-8">
          <div className="text-center">
            <p className="font-heading text-3xl font-bold text-sage-600">
              {cardsDrawn}
            </p>
            <p className="text-xs text-muted">枚引いた</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-3xl font-bold text-coral-500">
              {favoritesCount}
            </p>
            <p className="text-xs text-muted">お気に入り</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onPlayAgain}
            className="min-h-[44px] rounded-full bg-sage-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sage-700"
          >
            もう一回あそぶ
          </button>
          <Link
            href="/oyako-talk"
            className="min-h-[44px] rounded-full border border-gray-200 px-6 py-3 text-sm text-muted transition-colors hover:bg-gray-50"
          >
            もどる
          </Link>
        </div>
      </div>
    </div>
  )
}
