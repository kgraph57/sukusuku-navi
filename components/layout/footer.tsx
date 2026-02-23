import Link from "next/link";
import { WatercolorIcon } from "@/components/icons/watercolor-icon";

const FOOTER_LINKS = {
  コンテンツ: [
    { href: "/articles", label: "記事一覧" },
    { href: "/vaccines", label: "予防接種ガイド" },
    { href: "/programs", label: "支援制度一覧" },
    { href: "/simulator", label: "給付金シミュレーター" },
    { href: "/checkups", label: "乳幼児健診ガイド" },
    { href: "/triage", label: "受診判断ガイド" },
    { href: "/clinics", label: "小児科マップ" },
    { href: "/nurseries", label: "保育園探し" },
    { href: "/checklists", label: "手続きガイド" },
  ],
  サイトについて: [
    { href: "/about", label: "すくすくナビとは" },
    { href: "/contact", label: "お問い合わせ" },
    { href: "/privacy", label: "プライバシーポリシー" },
  ],
} as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-700">
                <WatercolorIcon name="baby" size={16} className="text-white" />
              </div>
              <span className="font-heading text-lg tracking-wide text-foreground">
                すくすくナビ
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              愛育病院の小児科医おかもんが、エビデンスに基づく子育て・医療情報をお届けします。
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-heading text-sm font-semibold tracking-wide text-foreground">
                {category}
              </h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-sage-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted">
            本サイトの情報は一般的な医学知識の提供を目的としており、個別の診断・治療を行うものではありません。お子さんの症状についてはかかりつけ医にご相談ください。
          </p>
          <p className="mt-2 text-center text-xs text-muted">
            &copy; {new Date().getFullYear()} すくすくナビ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
