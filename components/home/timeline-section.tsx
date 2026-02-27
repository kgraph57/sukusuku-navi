"use client";

import { useState, useEffect, useCallback } from "react";
import { WatercolorIcon } from "@/components/icons/watercolor-icon";
import { TrackedCTALink } from "@/components/shared/tracked-cta-link";
import { PersonalizedTimelinePreview } from "./personalized-timeline-preview";
import { useStore } from "@/lib/store";

/**
 * Wraps the Timeline CTA section on the home page.
 * - If user has registered children → shows personalized Top3 preview
 * - If no profile → shows the generic registration CTA
 */
export function TimelineSection() {
  const store = useStore();
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  const checkProfile = useCallback(async () => {
    const profile = await store.getFamilyProfile();
    setHasProfile(
      profile != null && profile.children.length > 0,
    );
  }, [store]);

  useEffect(() => {
    checkProfile();
  }, [checkProfile]);

  // Still loading — render nothing to avoid layout shift
  if (hasProfile === null) {
    return null;
  }

  if (hasProfile) {
    return <PersonalizedTimelinePreview />;
  }

  return (
    <section className="border-t border-teal-100 bg-gradient-to-r from-teal-50/80 via-white to-coral-50/40 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-teal-200/60 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-100">
            <WatercolorIcon name="calendar" size={28} />
          </div>
          <h2 className="mt-4 font-heading text-xl font-bold text-foreground sm:text-2xl">
            生年月日を登録して、
            <br className="sm:hidden" />
            今週やることを見る
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
            お子さんの生年月日を登録するだけで、今やるべき手続き・健診・予防接種が自動で表示されます。
            届出の期限や見逃しがちな助成金も、もう忘れません。
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <TrackedCTALink
              href="/my"
              ctaName="timeline_register"
              location="timeline_cta"
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-600/30"
            >
              <WatercolorIcon name="baby" size={18} />
              登録してタイムラインを見る
            </TrackedCTALink>
            <TrackedCTALink
              href="/my/timeline"
              ctaName="timeline_try"
              location="timeline_cta"
              className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-7 py-3.5 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50"
            >
              タイムラインを試す
            </TrackedCTALink>
          </div>
        </div>
      </div>
    </section>
  );
}
