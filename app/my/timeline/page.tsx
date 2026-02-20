"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  Building2,
  Stethoscope,
  Syringe,
  Heart,
  Lightbulb,
  Baby,
  List,
} from "lucide-react";
import { getFamilyProfile, getChildAge } from "@/lib/family-store";
import type { FamilyProfile, ChildProfile } from "@/lib/family-store";
import {
  generateTimeline,
  groupTimelineByUrgency,
} from "@/lib/timeline-engine";
import type { TimelineItem, TimelineUrgency } from "@/lib/timeline-engine";
import { CalendarView } from "@/components/timeline/calendar-view";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const URGENCY_STYLES: Record<
  TimelineUrgency,
  {
    readonly accentBar: string;
    readonly headerBg: string;
    readonly badgeBg: string;
    readonly badgeText: string;
  }
> = {
  overdue: {
    accentBar: "border-l-red-500",
    headerBg: "bg-red-50",
    badgeBg: "bg-red-100",
    badgeText: "text-red-700",
  },
  urgent: {
    accentBar: "border-l-orange-400",
    headerBg: "bg-orange-50",
    badgeBg: "bg-orange-100",
    badgeText: "text-orange-700",
  },
  soon: {
    accentBar: "border-l-amber-400",
    headerBg: "bg-amber-50",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
  },
  upcoming: {
    accentBar: "border-l-teal-400",
    headerBg: "bg-teal-50",
    badgeBg: "bg-teal-100",
    badgeText: "text-teal-700",
  },
  future: {
    accentBar: "border-l-gray-300",
    headerBg: "bg-gray-50",
    badgeBg: "bg-gray-100",
    badgeText: "text-gray-600",
  },
} as const;

// ---------------------------------------------------------------------------
// Category icon component
// ---------------------------------------------------------------------------

function CategoryIcon({
  category,
}: {
  readonly category: TimelineItem["category"];
}) {
  switch (category) {
    case "admin":
      return <Building2 className="h-5 w-5 text-blue-600" />;
    case "medical":
      return <Stethoscope className="h-5 w-5 text-teal-600" />;
    case "vaccination":
      return <Syringe className="h-5 w-5 text-purple-600" />;
    case "support":
      return <Heart className="h-5 w-5 text-rose-500" />;
  }
}

// ---------------------------------------------------------------------------
// Deadline badge helper
// ---------------------------------------------------------------------------

function computeDeadlineDays(item: TimelineItem, today: Date): number | null {
  if (
    item.deadlineDaysFromBirth == null ||
    !["overdue", "urgent", "soon"].includes(item.urgency)
  ) {
    return null;
  }
  // We cannot know the exact birth date here, so we rely on the engine having
  // already placed the item in the correct urgency bucket. We expose the raw
  // deadline field and let the card show a generic "期限あり" badge if we
  // cannot compute it precisely. Since `generateTimeline` receives the birth
  // date we expose the deadline as a formatted label using the field directly.
  return item.deadlineDaysFromBirth;
}

// ---------------------------------------------------------------------------
// TimelineItemCard
// ---------------------------------------------------------------------------

function TimelineItemCard({ item }: { readonly item: TimelineItem }) {
  const styles = URGENCY_STYLES[item.urgency];
  const isExternal =
    item.actionUrl.startsWith("https://") ||
    item.actionUrl.startsWith("http://");

  const showDeadlineBadge =
    item.deadlineDaysFromBirth != null &&
    ["overdue", "urgent", "soon"].includes(item.urgency);

  return (
    <div
      className={`flex gap-0 rounded-xl border border-border bg-card shadow-sm overflow-hidden border-l-4 ${styles.accentBar}`}
    >
      <div className="flex-1 p-4">
        {/* Header row */}
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warm-100">
            <CategoryIcon category={item.category} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-heading text-sm font-bold text-card-foreground">
                {item.title}
              </h3>
              {showDeadlineBadge && (
                <span
                  className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles.badgeBg} ${styles.badgeText}`}
                >
                  期限: {item.deadlineDaysFromBirth}日以内
                </span>
              )}
            </div>

            <p className="mt-1 text-xs leading-relaxed text-muted">
              {item.description}
            </p>

            {item.tip != null && (
              <p className="mt-2 flex items-start gap-1 text-xs italic text-teal-600">
                <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{item.tip}</span>
              </p>
            )}
          </div>
        </div>

        {/* Action button */}
        <div className="mt-3 flex justify-end">
          {isExternal ? (
            <a
              href={item.actionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-teal-600 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-teal-700"
            >
              {item.actionLabel}
            </a>
          ) : (
            <Link
              href={item.actionUrl}
              className="inline-flex items-center rounded-full bg-teal-600 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-teal-700"
            >
              {item.actionLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section header types
// ---------------------------------------------------------------------------

type SectionKey = "overdueUrgent" | "soon" | "upcoming" | "future";

interface SectionConfig {
  readonly key: SectionKey;
  readonly label: string;
  readonly icon: React.ReactNode;
  readonly headerTextColor: string;
  readonly headerBg: string;
  readonly collapsible: boolean;
}

const SECTIONS: readonly SectionConfig[] = [
  {
    key: "overdueUrgent",
    label: "今すぐやること",
    icon: <AlertTriangle className="h-5 w-5" />,
    headerTextColor: "text-red-700",
    headerBg: "bg-red-50",
    collapsible: false,
  },
  {
    key: "soon",
    label: "今月中に",
    icon: <Clock className="h-5 w-5" />,
    headerTextColor: "text-amber-700",
    headerBg: "bg-amber-50",
    collapsible: false,
  },
  {
    key: "upcoming",
    label: "この3ヶ月で",
    icon: <Calendar className="h-5 w-5" />,
    headerTextColor: "text-teal-700",
    headerBg: "bg-teal-50",
    collapsible: false,
  },
  {
    key: "future",
    label: "今後の予定",
    icon: <ChevronDown className="h-5 w-5" />,
    headerTextColor: "text-gray-600",
    headerBg: "bg-gray-50",
    collapsible: true,
  },
] as const;

// ---------------------------------------------------------------------------
// Grouped items type (mirrors what groupTimelineByUrgency returns, plus a
// convenience merged key for overdue+urgent)
// ---------------------------------------------------------------------------

interface GroupedSections {
  readonly overdueUrgent: readonly TimelineItem[];
  readonly soon: readonly TimelineItem[];
  readonly upcoming: readonly TimelineItem[];
  readonly future: readonly TimelineItem[];
}

function buildGroupedSections(items: readonly TimelineItem[]): GroupedSections {
  const grouped = groupTimelineByUrgency(items);
  return {
    overdueUrgent: [...(grouped.overdue ?? []), ...(grouped.urgent ?? [])],
    soon: grouped.soon ?? [],
    upcoming: grouped.upcoming ?? [],
    future: grouped.future ?? [],
  };
}

// ---------------------------------------------------------------------------
// TimelineSection
// ---------------------------------------------------------------------------

function TimelineSection({
  config,
  items,
}: {
  readonly config: SectionConfig;
  readonly items: readonly TimelineItem[];
}) {
  const [isExpanded, setIsExpanded] = useState(!config.collapsible);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div
        className={`flex items-center gap-2 rounded-lg px-4 py-2.5 ${config.headerBg} ${config.headerTextColor}`}
      >
        {config.collapsible ? (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="flex w-full items-center gap-2 font-heading text-sm font-bold"
            aria-expanded={isExpanded}
          >
            {config.icon}
            <span className="flex-1 text-left">{config.label}</span>
            <span className="text-xs opacity-70">{items.length}件</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        ) : (
          <div className="flex w-full items-center gap-2">
            {config.icon}
            <span className="font-heading text-sm font-bold flex-1">
              {config.label}
            </span>
            <span className="text-xs opacity-70">{items.length}件</span>
          </div>
        )}
      </div>

      {/* Cards */}
      {isExpanded && (
        <div className="space-y-3 pl-0">
          {items.map((item) => (
            <TimelineItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Child selector tabs
// ---------------------------------------------------------------------------

function ChildTabs({
  children,
  selectedId,
  onSelect,
}: {
  readonly children: readonly ChildProfile[];
  readonly selectedId: string;
  readonly onSelect: (id: string) => void;
}) {
  if (children.length <= 1) {
    return null;
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {children.map((child) => {
        const isSelected = child.id === selectedId;
        return (
          <button
            key={child.id}
            type="button"
            onClick={() => onSelect(child.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              isSelected
                ? "bg-teal-600 text-white"
                : "bg-warm-100 text-muted hover:bg-teal-50 hover:text-teal-700"
            }`}
          >
            <Baby className="h-3.5 w-3.5" />
            {child.nickname}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Age badge
// ---------------------------------------------------------------------------

function ChildAgeBadge({ child }: { readonly child: ChildProfile }) {
  const { years, months } = getChildAge(child.birthDate);

  const ageLabel = years === 0 ? `${months}ヶ月` : `${years}歳${months}ヶ月`;

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100">
        <Baby className="h-5 w-5 text-teal-600" />
      </div>
      <div>
        <h2 className="font-heading text-lg font-bold text-foreground">
          {child.nickname}ちゃん
        </h2>
        <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
          {ageLabel}
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// No profile CTA
// ---------------------------------------------------------------------------

function NoProfileCTA() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/50 px-6 py-14 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
        <Baby className="h-8 w-8 text-teal-600" />
      </div>
      <h2 className="mt-4 font-heading text-lg font-bold text-foreground">
        お子さんの情報を登録しましょう
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        お子さんの生年月日を登録すると、
        <br />
        今やるべき手続きを時系列で確認できます。
      </p>
      <Link
        href="/my"
        className="mt-6 inline-flex items-center rounded-full bg-teal-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
      >
        プロフィールを設定する
      </Link>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 animate-pulse rounded-full bg-warm-200" />
      <div className="h-10 w-full animate-pulse rounded-lg bg-warm-200" />
      <div className="h-28 w-full animate-pulse rounded-xl bg-warm-200" />
      <div className="h-28 w-full animate-pulse rounded-xl bg-warm-200" />
      <div className="h-28 w-full animate-pulse rounded-xl bg-warm-200" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

type ViewMode = "list" | "calendar";

export default function TimelinePage() {
  const [profile, setProfile] = useState<FamilyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  useEffect(() => {
    const loaded = getFamilyProfile();
    setProfile(loaded);
    if (loaded && loaded.children.length > 0) {
      setSelectedChildId(loaded.children[0].id);
    }
    setIsLoading(false);
  }, []);

  const hasChildren = profile != null && profile.children.length > 0;

  const selectedChild =
    hasChildren && selectedChildId != null
      ? (profile.children.find((c) => c.id === selectedChildId) ??
        profile.children[0])
      : null;

  const timelineItems: readonly TimelineItem[] | null =
    selectedChild != null ? generateTimeline(selectedChild.birthDate) : null;

  const groupedSections: GroupedSections | null =
    timelineItems != null ? buildGroupedSections(timelineItems) : null;

  return (
    <>
      <title>タイムライン | すくすくナビ</title>

      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-50 to-warm-50 px-4 pb-8 pt-8 sm:pb-12 sm:pt-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            <Calendar className="mr-2 inline-block h-6 w-6 text-teal-600" />
            タイムライン
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            今やるべき手続き・受診・予防接種を時系列で確認できます。
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          {isLoading ? (
            <LoadingSkeleton />
          ) : !hasChildren ? (
            <NoProfileCTA />
          ) : (
            <>
              {/* Child selector */}
              {profile.children.length > 1 && (
                <ChildTabs
                  children={profile.children}
                  selectedId={selectedChildId ?? profile.children[0].id}
                  onSelect={setSelectedChildId}
                />
              )}

              {/* Child name + age */}
              {selectedChild != null && <ChildAgeBadge child={selectedChild} />}

              {/* View mode toggle */}
              {selectedChild != null && (
                <div className="flex gap-1 rounded-lg border border-border bg-warm-50 p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-sm font-medium transition-colors ${
                      viewMode === "list"
                        ? "bg-white text-teal-700 shadow-sm"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    <List className="h-4 w-4" />
                    リスト
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("calendar")}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-sm font-medium transition-colors ${
                      viewMode === "calendar"
                        ? "bg-white text-teal-700 shadow-sm"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    <Calendar className="h-4 w-4" />
                    カレンダー
                  </button>
                </div>
              )}

              {/* Calendar view */}
              {viewMode === "calendar" &&
                timelineItems != null &&
                selectedChild != null && (
                  <CalendarView
                    items={timelineItems}
                    birthDate={selectedChild.birthDate}
                  />
                )}

              {/* List view (timeline sections) */}
              {viewMode === "list" && groupedSections != null && (
                <div className="space-y-6">
                  {SECTIONS.map((sectionConfig) => (
                    <TimelineSection
                      key={sectionConfig.key}
                      config={sectionConfig}
                      items={groupedSections[sectionConfig.key]}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
