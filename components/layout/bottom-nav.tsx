"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WatercolorIcon } from "@/components/icons/watercolor-icon";
import type { WatercolorIconName } from "@/components/icons/watercolor-icon";

/** ボトムナビの1タブ定義（モバイルでよく使う入口のみ） */
interface NavTab {
  readonly href: string;
  readonly label: string;
  readonly icon: WatercolorIconName;
  readonly ariaLabel?: string;
}

const TABS: readonly NavTab[] = [
  { href: "/", label: "ホーム", icon: "home" },
  {
    href: "/my/timeline",
    label: "タイムライン",
    icon: "calendar",
    ariaLabel: "予定・タイムライン",
  },
  { href: "/articles", label: "記事", icon: "book", ariaLabel: "記事一覧" },
  {
    href: "/triage",
    label: "受診判断",
    icon: "stethoscope",
    ariaLabel: "受診判断ガイド",
  },
  { href: "/my", label: "マイページ", icon: "user" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-stretch md:hidden"
      aria-label="メインナビゲーション"
    >
      {/* スマホ: 浮かせたバー（左右マージン・角丸・影） */}
      <div className="mx-3 max-w-lg sm:mx-auto sm:w-full">
        <div className="flex min-h-[64px] items-stretch overflow-hidden rounded-t-2xl border border-b-0 border-sage-200 bg-white/98 shadow-[0_-4px_20px_rgba(13,148,136,0.08)] backdrop-blur-md">
          {TABS.map((tab, index) => {
            const active = isActive(pathname, tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-3 text-center transition-colors touch-manipulation select-none active:bg-sage-100 ${
                  active
                    ? "bg-sage-50/90 text-teal-700"
                    : "text-muted hover:bg-sage-50/60 hover:text-sage-700"
                } ${index > 0 ? "border-l border-sage-100" : ""}`}
                aria-current={active ? "page" : undefined}
                aria-label={tab.ariaLabel ?? tab.label}
              >
                {/* アクティブ時の上ライン */}
                {active && (
                  <span
                    className="absolute left-1/2 top-0 h-1 w-10 -translate-x-1/2 rounded-b-full bg-teal-600"
                    aria-hidden
                  />
                )}
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
                  <WatercolorIcon
                    name={tab.icon}
                    size={26}
                    className={active ? "opacity-100" : "opacity-80"}
                    alt=""
                  />
                </span>
                <span
                  className={`max-w-full truncate px-0.5 text-[11px] leading-tight whitespace-nowrap ${
                    active ? "font-bold text-teal-800" : "font-medium"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      {/* ノッチ・ホームインジケータ用の安全領域 */}
      <div className="h-[env(safe-area-inset-bottom,0px)] bg-white/80" />
    </nav>
  );
}
