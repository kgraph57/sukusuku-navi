"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Baby, User } from "lucide-react";

const NAV_ITEMS = [
  { href: "/articles", label: "記事一覧" },
  { href: "/vaccines", label: "予防接種" },
  { href: "/checkups", label: "健診ガイド" },
  { href: "/simulator", label: "給付金シミュレーター" },
  { href: "/triage", label: "受診判断" },
  { href: "/clinics", label: "小児科マップ" },
  { href: "/nurseries", label: "保育園探し" },
  { href: "/checklists", label: "手続きガイド" },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600">
            <Baby className="h-5 w-5 text-white" />
          </div>
          <span className="font-heading text-xl font-bold text-teal-800">
            すくすくナビ
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-teal-50 hover:text-teal-700"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/my"
            className="ml-1 rounded-lg p-2 text-muted transition-colors hover:bg-teal-50 hover:text-teal-700"
            aria-label="マイページ"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/search"
            className="rounded-lg p-2 text-muted transition-colors hover:bg-teal-50 hover:text-teal-700"
            aria-label="検索"
          >
            <Search className="h-5 w-5" />
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-muted md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-border bg-white px-4 pb-4 md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-teal-50 hover:text-teal-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/my"
            className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-teal-50 hover:text-teal-700"
            onClick={() => setIsMenuOpen(false)}
          >
            <User className="h-5 w-5" />
            マイページ
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-teal-50 hover:text-teal-700"
            onClick={() => setIsMenuOpen(false)}
          >
            <Search className="h-5 w-5" />
            検索
          </Link>
        </nav>
      )}
    </header>
  );
}
