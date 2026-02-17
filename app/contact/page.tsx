import type { Metadata } from "next"
import { Mail, Clock, MessageCircle, ShieldCheck } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "すくすくナビに関するお問い合わせはこちらから。メールでご連絡ください。",
}

const GUIDELINES = [
  {
    icon: ShieldCheck,
    title: "個人情報の保護",
    description:
      "お問い合わせの際は、お子さまの氏名や具体的な症状など、個人を特定できる情報の記載はお控えください。",
  },
  {
    icon: MessageCircle,
    title: "お問い合わせの範囲",
    description:
      "サイトの内容に関するご質問、記事のリクエスト、誤りのご指摘、メルマガに関するお問い合わせ等を受け付けています。",
  },
  {
    icon: Clock,
    title: "回答について",
    description:
      "お問い合わせへの回答は通常3〜5営業日以内にメールで行います。内容によっては回答にお時間をいただく場合があります。",
  },
] as const

export default function ContactPage() {
  return (
    <div className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <SectionHeading subtitle="ご質問・ご意見をお待ちしています">
          お問い合わせ
        </SectionHeading>

        {/* Important Notice */}
        <div className="mt-10 rounded-xl border-2 border-red-100 bg-red-50/50 p-5">
          <p className="text-sm font-medium text-red-800">
            個別の医療相談にはお答えできません
          </p>
          <p className="mt-1 text-sm leading-relaxed text-red-700/80">
            お子さまの具体的な症状や治療に関するご質問は、かかりつけの小児科にご相談ください。緊急時は迷わず119番に電話してください。
          </p>
        </div>

        {/* Email Contact */}
        <div className="mt-10 rounded-xl border border-border bg-card p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50">
            <Mail className="h-8 w-8 text-teal-600" />
          </div>
          <h2 className="mt-5 font-heading text-xl font-bold text-foreground">
            メールでのお問い合わせ
          </h2>
          <p className="mt-2 text-sm text-muted">
            以下のメールアドレスまでお気軽にご連絡ください。
          </p>
          <a
            href="mailto:contact@sukusuku-navi.jp"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-700 hover:shadow-xl"
          >
            <Mail className="h-4 w-4" />
            contact@sukusuku-navi.jp
          </a>
          <p className="mt-4 text-xs text-muted">
            件名に「すくすくナビ」と記載いただけると助かります。
          </p>
        </div>

        {/* Guidelines */}
        <div className="mt-10">
          <h2 className="font-heading text-lg font-bold text-foreground">
            お問い合わせの際のお願い
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {GUIDELINES.map((guideline) => (
              <div key={guideline.title}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                  <guideline.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-heading text-sm font-bold text-foreground">
                  {guideline.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {guideline.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ-like section */}
        <div className="mt-10 rounded-xl bg-warm-100 p-6">
          <h2 className="font-heading text-base font-bold text-foreground">
            よくあるお問い合わせ
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Q. メルマガの配信停止はどうすればよいですか？
              </p>
              <p className="mt-1 text-sm text-muted">
                A. メルマガ下部の「配信停止」リンクから、いつでも解除できます。解除後24時間以内に配信が停止されます。
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Q. 記事の内容について質問したいのですが。
              </p>
              <p className="mt-1 text-sm text-muted">
                A. 記事の医学的内容に関するご質問はメールでお送りください。今後の記事の参考にさせていただきます。ただし、個別の医療相談にはお答えできません。
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Q. 取り上げてほしいテーマのリクエストはできますか？
              </p>
              <p className="mt-1 text-sm text-muted">
                A. はい、ぜひリクエストをお送りください。読者の皆さまの声を参考に、今後のテーマを検討しています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
