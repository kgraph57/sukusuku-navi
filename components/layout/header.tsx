"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  Baby,
  User,
  ChevronDown,
  BookOpen,
  Syringe,
  Stethoscope,
  ClipboardList,
  Calculator,
  MapPin,
  Building2,
  AlertTriangle,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";

interface NavGroup {
  readonly label: string;
  readonly items: readonly {
    readonly href: string;
    readonly label: string;
    readonly icon: typeof BookOpen;
    readonly description: string;
  }[];
}

const NAV_GROUPS: readonly NavGroup[] = [
  {
    label: "調べる",
    items: [
      {
        href: "/articles",
        label: "記事一覧",
        icon: BookOpen,
        description: "小児科医監修の子育て情報",
      },
      {
        href: "/vaccines",
        label: "予防接種",
        icon: Syringe,
        description: "接種スケジュールと詳細",
      },
      {
        href: "/checkups",
        label: "健診ガイド",
        icon: Stethoscope,
        description: "乳幼児健診の時期と内容",
      },
    ],
  },
  {
    label: "手続き",
    items: [
      {
        href: "/programs",
        label: "制度一覧",
        icon: ClipboardList,
        description: "助成金・給付金・支援制度",
      },
      {
        href: "/simulator",
        label: "給付金シミュレーター",
        icon: Calculator,
        description: "受給額をかんたん計算",
      },
      {
        href: "/checklists",
        label: "手続きガイド",
        icon: ClipboardList,
        description: "出産前後のやることリスト",
      },
    ],
  },
  {
    label: "探す",
    items: [
      {
        href: "/clinics",
        label: "小児科マップ",
        icon: MapPin,
        description: "港区の小児科・夜間対応",
      },
      {
        href: "/nurseries",
        label: "保育園探し",
        icon: Building2,
        description: "認可・認証保育園の情報",
      },
    ],
  },
] as const;

const STANDALONE_NAV = {
  href: "/triage",
  label: "受診判断",
  icon: AlertTriangle,
} as const;

function DropdownMenu({
  group,
  isOpen,
  onOpen,
  onClose,
}: {
  readonly group: NavGroup;
  readonly isOpen: boolean;
  readonly onOpen: () => void;
  readonly onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onOpen();
  }, [onOpen]);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(onClose, 150);
  }, [onClose]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isOpen
            ? "bg-teal-50 text-teal-700"
            : "text-muted hover:bg-teal-50 hover:text-teal-700"
        }`}
        onClick={isOpen ? onClose : onOpen}
        aria-expanded={isOpen}
      >
        {group.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-xl border border-border bg-white p-2 shadow-lg">
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-teal-50"
              onClick={onClose}
            >
              <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.label}
                </p>
                <p className="text-xs text-muted">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mobile auth links
// ---------------------------------------------------------------------------

function MobileAuthLinks({ onClose }: { readonly onClose: () => void }) {
  const { user, loading, signOut, configured } = useAuth();

  if (!configured) {
    return (
      <Link
        href="/my"
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-teal-50 hover:text-teal-700"
        onClick={onClose}
      >
        <User className="h-4 w-4 text-teal-600" />
        マイページ
      </Link>
    );
  }

  if (loading) {
    return <div className="h-10 animate-pulse rounded-lg bg-warm-50" />;
  }

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-teal-600 transition-colors hover:bg-teal-50"
        onClick={onClose}
      >
        <User className="h-4 w-4" />
        ログイン
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/my"
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-teal-50 hover:text-teal-700"
        onClick={onClose}
      >
        <User className="h-4 w-4 text-teal-600" />
        マイページ
      </Link>
      <button
        type="button"
        onClick={async () => {
          await signOut();
          onClose();
        }}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-muted transition-colors hover:bg-warm-50 hover:text-foreground"
      >
        <LogOut className="h-4 w-4" />
        ログアウト
      </button>
    </>
  );
}

// ---------------------------------------------------------------------------
// Desktop user menu (auth-aware)
// ---------------------------------------------------------------------------

function UserMenu() {
  const { user, loading, signOut, configured } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!configured) {
    return (
      <Link
        href="/my"
        className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-teal-50 hover:text-teal-700"
      >
        マイページ
      </Link>
    );
  }

  if (loading) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-warm-100" />;
  }

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="rounded-lg px-3 py-2 text-sm font-medium text-teal-600 transition-colors hover:bg-teal-50 hover:text-teal-700"
      >
        ログイン
      </Link>
    );
  }

  const initial = user.email?.charAt(0).toUpperCase() ?? "U";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700 transition-colors hover:bg-teal-200"
        aria-label="ユーザーメニュー"
        aria-expanded={isOpen}
      >
        {initial}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-border bg-white p-2 shadow-lg">
          <Link
            href="/my"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-teal-50"
            onClick={() => setIsOpen(false)}
          >
            <User className="h-4 w-4 text-teal-600" />
            マイページ
          </Link>
          <button
            type="button"
            onClick={async () => {
              await signOut();
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-warm-50 hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main header
// ---------------------------------------------------------------------------

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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

        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV_GROUPS.map((group) => (
            <DropdownMenu
              key={group.label}
              group={group}
              isOpen={openDropdown === group.label}
              onOpen={() => setOpenDropdown(group.label)}
              onClose={() => setOpenDropdown(null)}
            />
          ))}
          <Link
            href={STANDALONE_NAV.href}
            className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
          >
            {STANDALONE_NAV.label}
          </Link>
          <div className="mx-1 h-5 w-px bg-border" />
          <UserMenu />
          <Link
            href="/search"
            className="rounded-lg p-2 text-muted transition-colors hover:bg-teal-50 hover:text-teal-700"
            aria-label="検索"
          >
            <Search className="h-5 w-5" />
          </Link>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <Link
            href="/search"
            className="rounded-lg p-2 text-muted"
            aria-label="検索"
          >
            <Search className="h-5 w-5" />
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-muted"
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
      </div>

      {isMenuOpen && (
        <nav className="border-t border-border bg-white px-4 pb-4 md:hidden">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="mt-3 first:mt-1">
              <p className="px-3 pb-1 text-xs font-bold uppercase tracking-wider text-muted">
                {group.label}
              </p>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-teal-50 hover:text-teal-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4 text-teal-600" />
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="mt-3 border-t border-border pt-3">
            <Link
              href={STANDALONE_NAV.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-red-600 transition-colors hover:bg-red-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <STANDALONE_NAV.icon className="h-4 w-4" />
              {STANDALONE_NAV.label}
            </Link>
            <MobileAuthLinks onClose={() => setIsMenuOpen(false)} />
          </div>
        </nav>
      )}
    </header>
  );
}
