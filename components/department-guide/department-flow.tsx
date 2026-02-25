"use client";

import { useState } from "react";
import Link from "next/link";
import { WatercolorIcon } from "@/components/icons/watercolor-icon";
import type { WatercolorIconName } from "@/components/icons/watercolor-icon";

interface Situation {
  readonly id: string;
  readonly trigger: string;
  readonly icon: string;
  readonly department: string;
  readonly reason: string;
  readonly triageLink: string | null;
  readonly articleLinks: readonly string[];
}

interface DepartmentFlowProps {
  readonly situations: readonly Situation[];
}

function SituationCard({ situation }: { readonly situation: Situation }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white transition-shadow hover:shadow-sm">
      <button
        type="button"
        className="flex w-full items-start gap-3 p-5 text-left transition-colors hover:bg-ivory-50"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sage-50">
          <WatercolorIcon
            name={situation.icon as WatercolorIconName}
            size={18}
            className="text-sage-600"
          />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold leading-relaxed text-foreground sm:text-base">
            {situation.trigger}
          </p>
          <p className="mt-1 text-xs font-medium text-sage-600 sm:text-sm">
            → {situation.department}
          </p>
        </div>
        <WatercolorIcon
          name="chevron_down"
          size={16}
          className={`mt-1 shrink-0 text-muted transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-border bg-ivory-50/50 px-5 pb-5 pt-4">
          <p className="text-sm leading-relaxed text-muted">
            {situation.reason}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {situation.triageLink && (
              <Link
                href={situation.triageLink}
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700 transition-colors hover:bg-red-100"
              >
                <WatercolorIcon name="stethoscope" size={14} />
                症状をチェック
              </Link>
            )}
            {situation.articleLinks.length > 0 && (
              <Link
                href={situation.articleLinks[0]}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sage-50 px-3 py-2 text-xs font-medium text-sage-700 transition-colors hover:bg-sage-100"
              >
                <WatercolorIcon name="book" size={14} />
                関連記事を読む
              </Link>
            )}
            <Link
              href="/clinics"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
            >
              <WatercolorIcon name="mappin" size={14} />
              港区の小児科を探す
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export function DepartmentFlow({ situations }: DepartmentFlowProps) {
  return (
    <div className="space-y-3">
      {situations.map((situation) => (
        <SituationCard key={situation.id} situation={situation} />
      ))}
    </div>
  );
}
