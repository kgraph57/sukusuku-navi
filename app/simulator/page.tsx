import type { Metadata } from "next"
import Link from "next/link"
import {
  Calculator,
  ArrowRight,
  Clock,
  Shield,
  CheckCircle2,
} from "lucide-react"

export const metadata: Metadata = {
  title: "給付金シミュレーター",
  description:
    "お子さんの年齢と世帯情報を入力するだけで、港区で受けられる給付金・助成制度を一括検索。約2分で結果がわかります。",
}

const FEATURES = [
  {
    icon: Clock,
    title: "約2分で完了",
    description: "4ステップの簡単な質問に答えるだけ。",
  },
  {
    icon: Shield,
    title: "個人情報不要",
    description: "入力内容はサーバーに保存されません。",
  },
  {
    icon: CheckCircle2,
    title: "17制度を一括チェック",
    description: "港区の子育て支援制度をまとめて確認。",
  },
] as const

export default function SimulatorPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-coral-50 to-warm-50 px-4 pb-16 pt-12 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-coral-500 text-white">
            <Calculator className="h-8 w-8" />
          </div>

          <h1 className="mt-6 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            給付金シミュレーター
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            お子さんの年齢と世帯の情報から、港区で受けられる
            <strong className="text-foreground">
              給付金・助成・子育て支援制度
            </strong>
            を一括検索します。
          </p>

          <Link
            href="/simulator/start"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-coral-500 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-coral-600"
          >
            シミュレーションを始める
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-heading text-2xl font-bold text-foreground">
            かんたん3つのポイント
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-warm-100/50 px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs leading-relaxed text-muted">
            本シミュレーターの結果は概算です。実際の受給額や対象要件は、制度ごとの詳細条件により異なる場合があります。正確な情報は港区の窓口またはウェブサイトでご確認ください。入力された情報はブラウザ上でのみ処理され、サーバーに送信・保存されることはありません。
          </p>
        </div>
      </section>
    </>
  )
}
