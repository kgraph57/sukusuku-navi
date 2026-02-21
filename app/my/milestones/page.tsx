"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Baby,
  ArrowLeft,
  Star,
  Activity,
  MessageCircle,
  Heart,
  Sparkles,
  Check,
  Circle,
  Users,
  ChevronDown,
  ChevronUp,
  Calendar,
} from "lucide-react";
import { useStore } from "@/lib/store";
import type { FamilyProfile, ChildProfile, MilestoneRecord } from "@/lib/store";
import { getChildAge, formatAge } from "@/lib/utils/age";
import {
  getAllMilestones,
  MILESTONE_CATEGORY_LABELS,
  MILESTONE_CATEGORY_COLORS,
} from "@/lib/milestones";
import type { MilestoneDefinition, MilestoneCategory } from "@/lib/milestones";

// ---------------------------------------------------------------------------
// Category icon
// ---------------------------------------------------------------------------

const CATEGORY_ICONS: Record<MilestoneCategory, typeof Activity> = {
  motor: Activity,
  language: MessageCircle,
  social: Heart,
  daily: Star,
};

// ---------------------------------------------------------------------------
// Child selector
// ---------------------------------------------------------------------------

function ChildSelector({
  children,
  selectedId,
  onSelect,
}: {
  readonly children: readonly ChildProfile[];
  readonly selectedId: string;
  readonly onSelect: (id: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {children.map((child) => {
        const isActive = child.id === selectedId;
        return (
          <button
            key={child.id}
            type="button"
            onClick={() => onSelect(child.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-sage-500 text-white"
                : "bg-ivory-100 text-muted hover:bg-ivory-200"
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>{child.nickname}</span>
            <span className="text-xs opacity-80">
              ({formatAge(child.birthDate)})
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Progress summary
// ---------------------------------------------------------------------------

function ProgressSummary({
  milestones,
  records,
}: {
  readonly milestones: readonly MilestoneDefinition[];
  readonly records: readonly MilestoneRecord[];
}) {
  const achievedCount = records.filter((r) => r.achievedDate != null).length;
  const total = milestones.length;
  const percent = total > 0 ? Math.round((achievedCount / total) * 100) : 0;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-card-foreground">
          達成: {achievedCount}/{total}項目
        </span>
        <span className="font-medium text-sage-600">{percent}%</span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-ivory-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sage-400 to-sage-600 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Milestone row
// ---------------------------------------------------------------------------

function MilestoneRow({
  milestone,
  record,
  childAgeMonths,
  onToggle,
}: {
  readonly milestone: MilestoneDefinition;
  readonly record: MilestoneRecord | null;
  readonly childAgeMonths: number;
  readonly onToggle: (milestoneId: string) => void;
}) {
  const isAchieved = record?.achievedDate != null;
  const isInRange =
    childAgeMonths >= milestone.ageMonthsRange[0] &&
    childAgeMonths <= milestone.ageMonthsRange[1];
  const isPast = childAgeMonths > milestone.ageMonthsRange[1];
  const colorClass = MILESTONE_CATEGORY_COLORS[milestone.category];

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border p-3 transition-all ${
        isAchieved
          ? "border-sage-200 bg-sage-50/50"
          : isInRange
            ? "border-sage-100 bg-white"
            : "border-border"
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(milestone.id)}
        className="mt-0.5 shrink-0"
        aria-label={isAchieved ? "未達成に戻す" : "達成にする"}
      >
        {isAchieved ? (
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-sage-500 bg-sage-500 text-white">
            <Check className="h-3.5 w-3.5" />
          </div>
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
            <Circle className="h-3.5 w-3.5 text-gray-300" />
          </div>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={`text-sm font-medium ${
              isAchieved ? "text-sage-700 line-through" : "text-card-foreground"
            }`}
          >
            {milestone.title}
          </p>
          {isInRange && !isAchieved && (
            <span className="rounded-full bg-sage-100 px-2 py-0.5 text-[10px] font-medium text-sage-700">
              今の時期
            </span>
          )}
          {isPast && !isAchieved && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
              目安を過ぎています
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted">{milestone.description}</p>
        <p className="mt-1 text-[10px] text-muted">
          目安: {milestone.ageMonthsRange[0]}〜{milestone.ageMonthsRange[1]}ヶ月
          （典型: {milestone.ageMonthsTypical}ヶ月）
        </p>
      </div>

      {isAchieved && record?.achievedDate && (
        <div className="flex shrink-0 items-center gap-1 text-xs text-sage-600">
          <Calendar className="h-3 w-3" />
          <span>{record.achievedDate}</span>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Category section
// ---------------------------------------------------------------------------

function CategorySection({
  category,
  milestones,
  records,
  childAgeMonths,
  onToggle,
}: {
  readonly category: MilestoneCategory;
  readonly milestones: readonly MilestoneDefinition[];
  readonly records: readonly MilestoneRecord[];
  readonly childAgeMonths: number;
  readonly onToggle: (milestoneId: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const IconComponent = CATEGORY_ICONS[category];
  const colorClass = MILESTONE_CATEGORY_COLORS[category];
  const achievedCount = milestones.filter((m) =>
    records.some((r) => r.milestoneId === m.id && r.achievedDate != null),
  ).length;

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2"
      >
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${colorClass}`}
        >
          <IconComponent className="h-4 w-4" />
        </div>
        <span className="flex-1 text-left font-heading text-sm font-bold text-card-foreground">
          {MILESTONE_CATEGORY_LABELS[category]}
        </span>
        <span className="text-xs text-muted">
          {achievedCount}/{milestones.length}
        </span>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-2 pl-1">
          {milestones.map((milestone) => {
            const record =
              records.find((r) => r.milestoneId === milestone.id) ?? null;
            return (
              <MilestoneRow
                key={milestone.id}
                milestone={milestone}
                record={record}
                childAgeMonths={childAgeMonths}
                onToggle={onToggle}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function MilestonesPage() {
  const store = useStore();
  const [profile, setProfile] = useState<FamilyProfile | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [records, setRecords] = useState<readonly MilestoneRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const milestones = getAllMilestones();

  useEffect(() => {
    let cancelled = false;
    store.getFamilyProfile().then((loaded) => {
      if (cancelled) return;
      setProfile(loaded);
      if (loaded && loaded.children.length > 0) {
        setSelectedChildId(loaded.children[0].id);
      }
      setIsLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [store]);

  useEffect(() => {
    if (!selectedChildId) return;
    let cancelled = false;
    store.getMilestoneRecords(selectedChildId).then((loaded) => {
      if (!cancelled) {
        setRecords(loaded);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [selectedChildId, store]);

  const handleToggle = useCallback(
    async (milestoneId: string) => {
      if (!selectedChildId) return;

      const existing = records.find((r) => r.milestoneId === milestoneId);
      const isCurrentlyAchieved = existing?.achievedDate != null;
      const today = new Date().toISOString().split("T")[0];

      await store.upsertMilestoneRecord({
        childId: selectedChildId,
        milestoneId,
        achievedDate: isCurrentlyAchieved ? null : today,
        notes: existing?.notes ?? null,
      });

      const updated = await store.getMilestoneRecords(selectedChildId);
      setRecords(updated);
    },
    [selectedChildId, records, store],
  );

  const selectedChild =
    profile?.children.find((c) => c.id === selectedChildId) ?? null;

  const childAgeMonths = useMemo(() => {
    if (!selectedChild) return 0;
    const { years, months } = getChildAge(selectedChild.birthDate);
    return years * 12 + months;
  }, [selectedChild]);

  const categories: readonly MilestoneCategory[] = [
    "motor",
    "language",
    "social",
    "daily",
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-ivory-50 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="h-8 w-48 animate-pulse rounded bg-ivory-200" />
          <div className="mt-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 animate-pulse rounded-xl bg-ivory-200"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!profile || profile.children.length === 0) {
    return (
      <div className="min-h-screen bg-ivory-50 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/my"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            マイページに戻る
          </Link>
          <div className="mt-8 rounded-2xl border-2 border-dashed border-sage-200 bg-white/60 p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-100">
              <Baby className="h-7 w-7 text-sage-600" />
            </div>
            <h1 className="mt-4 font-heading text-lg font-bold text-foreground">
              お子さんを登録してください
            </h1>
            <p className="mt-2 text-sm text-muted">
              成長マイルストーンを記録するには、まずお子さんの登録が必要です。
            </p>
            <Link
              href="/my"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-sage-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sage-700"
            >
              <Baby className="h-4 w-4" />
              お子さんを登録する
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-b from-rose-50 to-ivory-50 px-4 pb-6 pt-8 sm:pb-8 sm:pt-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/my"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            マイページ
          </Link>
          <h1 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
            <Sparkles className="mr-2 inline-block h-7 w-7 text-rose-500" />
            成長マイルストーン
          </h1>
          <p className="mt-2 text-sm text-muted">
            お子さんの「はじめて」を記録しましょう。発達の目安も確認できます。
          </p>
        </div>
      </section>

      <section className="px-4 py-6 sm:py-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {profile.children.length > 1 && selectedChildId && (
            <ChildSelector
              children={profile.children}
              selectedId={selectedChildId}
              onSelect={setSelectedChildId}
            />
          )}

          {selectedChild && (
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100">
                <Baby className="h-5 w-5 text-rose-500" />
              </div>
              <div>
                <p className="font-heading text-base font-bold text-card-foreground">
                  {selectedChild.nickname}
                </p>
                <p className="text-xs text-muted">
                  {formatAge(selectedChild.birthDate)}
                </p>
              </div>
            </div>
          )}

          <ProgressSummary milestones={milestones} records={records} />

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-800">
            <p className="font-medium">
              発達の目安について
            </p>
            <p className="mt-1">
              各マイルストーンの月齢はあくまで目安です。お子さんの発達ペースはそれぞれ異なり、範囲内であれば心配いりません。気になることがあれば、かかりつけの小児科医にご相談ください。
            </p>
          </div>

          <div className="space-y-6">
            {categories.map((category) => {
              const categoryMilestones = milestones.filter(
                (m) => m.category === category,
              );
              return (
                <CategorySection
                  key={category}
                  category={category}
                  milestones={categoryMilestones}
                  records={records}
                  childAgeMonths={childAgeMonths}
                  onToggle={handleToggle}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
