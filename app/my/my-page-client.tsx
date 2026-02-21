"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Baby,
  CheckCircle2,
  Circle,
  ArrowRight,
  Calculator,
  ClipboardList,
  User,
  Syringe,
  Calendar,
  Bookmark,
  FileText,
  LogOut,
  Cloud,
  Shield,
  Sparkles,
} from "lucide-react";
import { FamilyProfileSetup } from "@/components/family/family-profile-setup";
import { MigrationDialog } from "@/components/auth/migration-dialog";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth/auth-provider";
import type { FamilyProfile, ChildProfile } from "@/lib/store";
import { getChildAge } from "@/lib/utils/age";
import { getAllChecklists } from "@/lib/checklists";

interface MyPageClientProps {
  readonly articleTitles: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Account status banner
// ---------------------------------------------------------------------------

function AccountBanner() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-white p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100">
            <Cloud className="h-5 w-5 text-teal-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-sm font-bold text-card-foreground">
              ログインでデータをクラウド保存
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              ログインすると、お子さんのデータがクラウドに保存され、どのデバイスからでもアクセスできます。
            </p>
            <Link
              href="/auth/login"
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-teal-700"
            >
              <Shield className="h-3.5 w-3.5" />
              ログイン / 新規登録
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
            {user.email?.charAt(0).toUpperCase() ?? "U"}
          </div>
          <div>
            <p className="text-sm font-medium text-card-foreground">
              {user.email}
            </p>
            <p className="flex items-center gap-1 text-xs text-teal-600">
              <Cloud className="h-3 w-3" />
              クラウド同期オン
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => signOut()}
          className="rounded-lg p-2 text-muted transition-colors hover:bg-warm-50 hover:text-foreground"
          aria-label="ログアウト"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Checklist progress card
// ---------------------------------------------------------------------------

function ChecklistProgressCard({ child }: { readonly child: ChildProfile }) {
  const checklists = getAllChecklists();
  const { years, months } = getChildAge(child.birthDate);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100">
          <Baby className="h-5 w-5 text-teal-600" />
        </div>
        <div>
          <h3 className="font-heading text-base font-bold text-card-foreground">
            {child.nickname}
          </h3>
          <p className="text-xs text-muted">
            {years}歳{months}ヶ月
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {checklists.map((checklist) => {
          const totalItems = checklist.items.length;
          const completedCount = checklist.items.filter((item) =>
            child.completedItems.includes(item.id),
          ).length;
          const percentage =
            totalItems > 0
              ? Math.round((completedCount / totalItems) * 100)
              : 0;
          const isComplete = completedCount === totalItems;

          return (
            <Link
              key={checklist.slug}
              href={`/checklists/${checklist.slug}`}
              className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-teal-200 hover:bg-teal-50/50"
            >
              {isComplete ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-500" />
              ) : (
                <Circle className="h-5 w-5 shrink-0 text-gray-300" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-card-foreground">
                  {checklist.name}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-warm-100">
                    <div
                      className="h-full rounded-full bg-teal-500 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted">
                    {completedCount}/{totalItems}
                  </span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Saved articles section
// ---------------------------------------------------------------------------

function SavedArticlesSection({
  savedSlugs,
  articleTitles,
}: {
  readonly savedSlugs: readonly string[];
  readonly articleTitles: Record<string, string>;
}) {
  if (savedSlugs.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
        <Bookmark className="h-5 w-5 text-teal-600" />
        保存した記事
        <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-700">
          {savedSlugs.length}件
        </span>
      </h2>
      <div className="mt-4 space-y-2">
        {savedSlugs.map((slug) => (
          <Link
            key={slug}
            href={`/articles/${slug}`}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-teal-200 hover:bg-teal-50/50"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50">
              <FileText className="h-4 w-4 text-teal-600" />
            </div>
            <p className="min-w-0 flex-1 truncate text-sm font-medium text-card-foreground">
              {articleTitles[slug] ?? slug}
            </p>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted" />
          </Link>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Quick actions
// ---------------------------------------------------------------------------

function QuickActions() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Link
        href="/simulator/start"
        className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-teal-200 hover:shadow-md"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-teal-200 bg-teal-50">
          <Calculator className="h-5 w-5 text-teal-600" />
        </div>
        <div>
          <h3 className="font-heading text-sm font-bold text-card-foreground">
            給付金シミュレーション
          </h3>
          <p className="text-xs text-muted">受給額を確認する</p>
        </div>
      </Link>
      <Link
        href="/checklists"
        className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-teal-200 hover:shadow-md"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-coral-200 bg-coral-50">
          <ClipboardList className="h-5 w-5 text-coral-600" />
        </div>
        <div>
          <h3 className="font-heading text-sm font-bold text-card-foreground">
            手続きガイド
          </h3>
          <p className="text-xs text-muted">やることを確認する</p>
        </div>
      </Link>
      <Link
        href="/my/vaccinations"
        className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-teal-200 hover:shadow-md"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-purple-200 bg-purple-50">
          <Syringe className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-heading text-sm font-bold text-card-foreground">
            予防接種記録
          </h3>
          <p className="text-xs text-muted">接種記録を管理する</p>
        </div>
      </Link>
      <Link
        href="/my/timeline"
        className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-teal-200 hover:shadow-md"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-teal-200 bg-teal-50">
          <Calendar className="h-5 w-5 text-teal-600" />
        </div>
        <div>
          <h3 className="font-heading text-sm font-bold text-card-foreground">
            タイムライン
          </h3>
          <p className="text-xs text-muted">
            今やるべき手続き・健診・予防接種を時系列で確認
          </p>
        </div>
      </Link>
      <Link
        href="/my/milestones"
        className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-teal-200 hover:shadow-md"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-rose-200 bg-rose-50">
          <Sparkles className="h-5 w-5 text-rose-500" />
        </div>
        <div>
          <h3 className="font-heading text-sm font-bold text-card-foreground">
            成長マイルストーン
          </h3>
          <p className="text-xs text-muted">「はじめて」の記録をつける</p>
        </div>
      </Link>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function MyPageClient({ articleTitles }: MyPageClientProps) {
  const store = useStore();
  const { user } = useAuth();
  const [profile, setProfile] = useState<FamilyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMigration, setShowMigration] = useState(false);

  const loadProfile = useCallback(async () => {
    const loaded = await store.getFamilyProfile();
    setProfile(loaded);
    setIsLoading(false);
  }, [store]);

  useEffect(() => {
    loadProfile();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "sukusuku-family") {
        loadProfile();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [loadProfile]);

  // Show migration dialog when user just logged in and has local data
  useEffect(() => {
    if (!user) return;
    try {
      const raw = localStorage.getItem("sukusuku-family");
      if (raw) {
        const data = JSON.parse(raw);
        if (data.children && data.children.length > 0) {
          setShowMigration(true);
        }
      }
    } catch {
      // Ignore
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-50 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="h-8 w-48 animate-pulse rounded bg-warm-200" />
          <div className="mt-6 h-64 animate-pulse rounded-xl bg-warm-200" />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Migration dialog */}
      {showMigration && (
        <MigrationDialog
          onComplete={() => {
            setShowMigration(false);
            loadProfile();
          }}
        />
      )}

      <section className="bg-gradient-to-b from-teal-50 to-warm-50 px-4 pb-8 pt-8 sm:pb-12 sm:pt-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            <User className="mr-2 inline-block h-7 w-7 text-teal-600" />
            マイページ
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            お子さんの登録と手続きの進捗管理ができます。
          </p>
        </div>
      </section>

      <section className="px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Account status */}
          <AccountBanner />

          {/* Family profile */}
          <div>
            <h2 className="font-heading text-lg font-bold text-foreground">
              お子さんの登録
            </h2>
            <div className="mt-4">
              <FamilyProfileSetup />
            </div>
          </div>

          {/* Checklist progress */}
          {profile && profile.children.length > 0 && (
            <div>
              <h2 className="font-heading text-lg font-bold text-foreground">
                手続きの進捗
              </h2>
              <div className="mt-4 space-y-4">
                {profile.children.map((child) => (
                  <ChecklistProgressCard key={child.id} child={child} />
                ))}
              </div>
            </div>
          )}

          {/* Saved articles */}
          {profile != null && profile.savedArticles.length > 0 && (
            <SavedArticlesSection
              savedSlugs={profile.savedArticles}
              articleTitles={articleTitles}
            />
          )}

          {/* Quick actions */}
          <div>
            <h2 className="font-heading text-lg font-bold text-foreground">
              クイックアクション
            </h2>
            <div className="mt-4">
              <QuickActions />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
