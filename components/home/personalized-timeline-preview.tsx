"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { WatercolorIcon } from "@/components/icons/watercolor-icon";
import { useStore } from "@/lib/store";
import type { FamilyProfile } from "@/lib/store";
import { getChildAge } from "@/lib/utils/age";
import { generateTimeline, getTop3Items } from "@/lib/timeline-engine";
import type { TimelineItem, TimelineUrgency } from "@/lib/timeline-engine";

const URGENCY_COLORS: Record<
  TimelineUrgency,
  { readonly bg: string; readonly text: string; readonly border: string }
> = {
  overdue: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-l-red-500",
  },
  urgent: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-l-orange-400",
  },
  soon: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-l-amber-400",
  },
  upcoming: {
    bg: "bg-sage-50",
    text: "text-sage-700",
    border: "border-l-sage-400",
  },
  future: {
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-l-gray-300",
  },
};

const URGENCY_LABELS: Record<TimelineUrgency, string> = {
  overdue: "期限超過",
  urgent: "今週中",
  soon: "今月中",
  upcoming: "3ヶ月以内",
  future: "今後",
};

const CATEGORY_ICONS: Record<
  string,
  { readonly name: string; readonly color: string }
> = {
  admin: { name: "building", color: "text-blue-600" },
  medical: { name: "stethoscope", color: "text-sage-600" },
  vaccination: { name: "syringe", color: "text-purple-600" },
  support: { name: "heart", color: "text-rose-500" },
};

function CompactTimelineItem({ item }: { readonly item: TimelineItem }) {
  const urgencyColor = URGENCY_COLORS[item.urgency];
  const categoryIcon = CATEGORY_ICONS[item.category] ?? {
    name: "star",
    color: "text-gray-500",
  };
  const isExternal =
    item.actionUrl.startsWith("https://") ||
    item.actionUrl.startsWith("http://");

  return (
    <div
      className={`rounded-xl border border-border bg-card shadow-sm overflow-hidden border-l-4 ${urgencyColor.border}`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ivory-100">
            <WatercolorIcon
              name={categoryIcon.name as never}
              size={16}
              className={categoryIcon.color}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-heading text-sm font-semibold text-card-foreground">
                {item.title}
              </h3>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${urgencyColor.bg} ${urgencyColor.text}`}
              >
                {URGENCY_LABELS[item.urgency]}
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted line-clamp-2">
              {item.description}
            </p>
          </div>
          {isExternal ? (
            <a
              href={item.actionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-sage-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-sage-700"
            >
              {item.actionLabel}
            </a>
          ) : (
            <Link
              href={item.actionUrl}
              className="shrink-0 rounded-full bg-sage-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-sage-700"
            >
              {item.actionLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function AllDoneState({ childName }: { readonly childName: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-sage-200 bg-sage-50/50 px-6 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-100">
        <WatercolorIcon name="check" size={28} className="text-sage-500" />
      </div>
      <h3 className="mt-3 font-heading text-base font-semibold text-foreground">
        すべて完了しています
      </h3>
      <p className="mt-1 text-sm text-muted">
        {childName}ちゃんの今やるべきことはありません。
      </p>
      <Link
        href="/my/timeline"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
      >
        タイムライン全体を見る
        <WatercolorIcon name="arrow_right" size={16} />
      </Link>
    </div>
  );
}

/**
 * Shows personalized Top3 timeline items on the home page for registered users.
 * Falls back to null if no profile exists (parent component handles the CTA).
 */
export function PersonalizedTimelinePreview() {
  const store = useStore();
  const [profile, setProfile] = useState<FamilyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    const loaded = await store.getFamilyProfile();
    setProfile(loaded);
    setIsLoading(false);
  }, [store]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const firstChild =
    profile != null && profile.children.length > 0
      ? profile.children[0]
      : null;

  const top3Items = useMemo(() => {
    if (firstChild == null) return [];
    const timeline = generateTimeline(
      firstChild.birthDate,
      firstChild.completedItems,
    );
    return getTop3Items(timeline);
  }, [firstChild]);

  const pendingCount = useMemo(() => {
    if (firstChild == null) return 0;
    const timeline = generateTimeline(
      firstChild.birthDate,
      firstChild.completedItems,
    );
    return timeline.filter(
      (item) =>
        !item.completed &&
        !item.isExpired &&
        (item.urgency === "overdue" ||
          item.urgency === "urgent" ||
          item.urgency === "soon"),
    ).length;
  }, [firstChild]);

  if (isLoading) {
    return null;
  }

  if (firstChild == null) {
    return null;
  }

  const { years, months } = getChildAge(firstChild.birthDate);
  const ageLabel =
    years === 0 ? `${months}ヶ月` : `${years}歳${months}ヶ月`;

  return (
    <section className="border-t border-teal-100 bg-gradient-to-r from-teal-50/80 via-white to-coral-50/40 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100">
              <WatercolorIcon
                name="baby"
                size={20}
                className="text-teal-600"
              />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-foreground">
                {firstChild.nickname}ちゃんの今週やること
              </h2>
              <p className="text-xs text-muted">
                {ageLabel}
                {pendingCount > 0 && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                    {pendingCount}件の手続きが必要
                  </span>
                )}
              </p>
            </div>
          </div>
          <Link
            href="/my/timeline"
            className="flex items-center gap-1 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
          >
            すべて見る
            <WatercolorIcon name="arrow_right" size={16} />
          </Link>
        </div>

        <div className="mt-6 space-y-3">
          {top3Items.length === 0 ? (
            <AllDoneState childName={firstChild.nickname} />
          ) : (
            top3Items.map((item) => (
              <CompactTimelineItem key={item.id} item={item} />
            ))
          )}
        </div>

        {profile != null && profile.children.length > 1 && (
          <p className="mt-4 text-center text-xs text-muted">
            他のお子さんのタイムラインは
            <Link
              href="/my/timeline"
              className="font-medium text-teal-600 hover:text-teal-700"
            >
              マイページ
            </Link>
            で確認できます
          </p>
        )}
      </div>
    </section>
  );
}
