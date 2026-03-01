import type { Metadata } from "next"
import { PlayClient } from "./play-client"

export const metadata: Metadata = {
  title: "おやこトークカード | すくすくナビ",
  description:
    "カードを引いて親子で会話しよう。レベル別の100問で、日常の話題から深い対話まで。",
}

export default function OyakoTalkPlayPage() {
  return (
    <main className="min-h-screen bg-ivory-50 pb-24">
      <PlayClient />
    </main>
  )
}
