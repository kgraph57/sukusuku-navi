import type { Metadata } from "next";
import { Zen_Maru_Gothic, Noto_Sans_JP } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "./providers";
import "./globals.css";

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "すくすくナビ | 小児科医が届ける子育て情報",
    template: "%s | すくすくナビ",
  },
  description:
    "愛育病院の小児科医おかもんが、エビデンスに基づく子育て・医療情報をお届けします。メルマガ記事、給付金シミュレーター、受診判断ガイドなど。",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "https://kgraph57.github.io/sukusuku-navi"),
  ),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "すくすくナビ",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "すくすくナビ",
    title: "すくすくナビ | 小児科医が届ける子育て情報",
    description:
      "愛育病院の小児科医おかもんが、エビデンスに基づく子育て・医療情報をお届けします。給付金シミュレーター、受診判断ガイド、予防接種スケジュールなど。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "すくすくナビ - 港区の子育て、もう迷わない",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "すくすくナビ | 小児科医が届ける子育て情報",
    description:
      "愛育病院の小児科医おかもんが、エビデンスに基づく子育て・医療情報をお届けします。",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="theme-color" content="#3D4859" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body
        className={`${zenMaruGothic.variable} ${notoSansJP.variable} antialiased`}
      >
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
