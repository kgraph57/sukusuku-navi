import type { Metadata } from "next"
import Link from "next/link"
import { LEVELS } from "@/lib/oyako-talk/constants"

export const metadata: Metadata = {
  title: "おやこトークカード | すくすくナビ",
  description:
    "1日1枚カードを引いて、親子の会話のきっかけに。5段階のレベルで日常の質問から深い対話まで自然にステップアップ。全100問。",
}

export default function OyakoTalkPage() {
  return (
    <main className="min-h-screen bg-ivory-50 pb-24">
      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-50 to-ivory-50 px-4 pb-12 pt-10 text-center">
        <p className="mb-3 text-5xl" aria-hidden="true">
          🃏
        </p>
        <h1 className="font-heading text-3xl font-bold tracking-wide text-sage-800">
          おやこトークカード
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-muted">
          1日1枚、カードを引いて親子で話そう。
          <br />
          答えるたび、もっと好きになる。
        </p>
        <Link
          href="/oyako-talk/play?level=1"
          className="mt-6 inline-flex min-h-[48px] items-center rounded-full bg-sage-600 px-8 py-3 font-heading text-lg font-semibold text-white shadow-md transition-all hover:bg-sage-700 hover:shadow-lg active:scale-95"
        >
          カードを引く
        </Link>
      </section>

      {/* How to play */}
      <section className="mx-auto max-w-lg px-4 py-10">
        <h2 className="mb-6 text-center font-heading text-xl font-bold text-sage-800">
          あそびかた
        </h2>
        <div className="grid gap-4">
          {[
            {
              step: "1",
              emoji: "🎴",
              title: "カードを引く",
              description: "レベルを選んでカードを1枚引きます",
            },
            {
              step: "2",
              emoji: "💬",
              title: "お題について話す",
              description:
                "出てきた質問について親子で話し合いましょう。正解はありません",
            },
            {
              step: "3",
              emoji: "⬆️",
              title: "レベルアップ",
              description:
                "カードを引くほど新しいレベルが解放。だんだん深い会話に",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm"
            >
              <span className="text-3xl" aria-hidden="true">
                {item.emoji}
              </span>
              <div>
                <h3 className="font-heading text-base font-semibold">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Levels overview */}
      <section className="mx-auto max-w-lg px-4 py-8">
        <h2 className="mb-6 text-center font-heading text-xl font-bold text-sage-800">
          5つのレベル
        </h2>
        <div className="grid gap-3">
          {LEVELS.map((level) => (
            <div
              key={level.level}
              className={`flex items-center gap-4 rounded-xl border-2 p-4 ${level.bgClass} ${level.borderClass}`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-heading text-lg font-bold ${level.colorClass}`}
              >
                {level.level}
              </span>
              <div>
                <h3
                  className={`font-heading text-base font-semibold ${level.colorClass}`}
                >
                  {level.name}
                </h3>
                <p className="text-sm text-muted">{level.description}</p>
              </div>
              {level.unlockThreshold > 0 && (
                <span className="ml-auto shrink-0 text-xs text-muted">
                  {level.unlockThreshold}枚で解放
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="mx-auto max-w-lg px-4 py-8">
        <div className="rounded-2xl bg-blush-50 p-6">
          <h2 className="mb-3 font-heading text-lg font-bold text-blush-600">
            たのしむコツ
          </h2>
          <ul className="space-y-2 text-sm leading-relaxed text-gray-700">
            <li>
              <strong>正解はありません。</strong>
              どんな答えも「そうなんだ！」と受け止めましょう
            </li>
            <li>
              <strong>親も一緒に答えよう。</strong>
              子どもが質問したら、大人も同じ質問に答えてみて
            </li>
            <li>
              <strong>無理せず、1日1〜3枚。</strong>
              毎日のルーティンに加えると自然に続きます
            </li>
            <li>
              <strong>小さいお子さんには「よみきかせモード」。</strong>
              ひらがな中心のやさしい表現に切り替えられます
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-8 text-center">
        <Link
          href="/oyako-talk/play"
          className="inline-flex min-h-[48px] items-center rounded-full bg-sage-600 px-8 py-3 font-heading text-lg font-semibold text-white shadow-md transition-all hover:bg-sage-700 hover:shadow-lg active:scale-95"
        >
          さっそく始める
        </Link>
      </section>
    </main>
  )
}
