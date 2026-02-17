import type { Metadata } from "next"
import { Zen_Maru_Gothic, Noto_Sans_JP } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import "./globals.css"

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "すくすくナビ | 小児科医が届ける子育て情報",
    template: "%s | すくすくナビ",
  },
  description:
    "愛育病院の小児科医おかもんが、エビデンスに基づく子育て・医療情報をお届けします。メルマガ記事、給付金シミュレーター、受診判断ガイドなど。",
  metadataBase: new URL("https://sukusuku-navi.vercel.app"),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "すくすくナビ",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body
        className={`${zenMaruGothic.variable} ${notoSansJP.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
