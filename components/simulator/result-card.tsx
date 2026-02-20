"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Heart,
  Banknote,
  Baby,
  HandHeart,
} from "lucide-react";
import type { EligibleProgram } from "@/lib/types";

interface ResultCardProps {
  readonly eligibleProgram: EligibleProgram;
}

const CATEGORY_ICON_MAP: Record<string, typeof Heart> = {
  medical: Heart,
  financial: Banknote,
  childcare: Baby,
  support: HandHeart,
};

const CATEGORY_COLOR_MAP: Record<string, string> = {
  medical: "bg-red-50 text-red-600 border-red-200",
  financial: "bg-teal-50 text-teal-600 border-teal-200",
  childcare: "bg-blue-50 text-blue-600 border-blue-200",
  support: "bg-purple-50 text-purple-600 border-purple-200",
};

const CATEGORY_BADGE_MAP: Record<string, string> = {
  medical: "医療",
  financial: "給付金・手当",
  childcare: "保育・預かり",
  support: "子育て支援",
};

function formatAmount(amount: number): string {
  if (amount === 0) return "無料";
  if (amount >= 10000) {
    const man = Math.floor(amount / 10000);
    const remainder = amount % 10000;
    if (remainder === 0) return `約${man.toLocaleString()}万円`;
    return `約${amount.toLocaleString()}円`;
  }
  return `約${amount.toLocaleString()}円`;
}

export function ResultCard({ eligibleProgram }: ResultCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { program, estimatedAmount, actionItems } = eligibleProgram;

  const IconComponent = CATEGORY_ICON_MAP[program.category] ?? Heart;
  const colorClass =
    CATEGORY_COLOR_MAP[program.category] ??
    "bg-gray-50 text-gray-600 border-gray-200";
  const badgeLabel = CATEGORY_BADGE_MAP[program.category] ?? program.category;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${colorClass}`}
          >
            <IconComponent className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${colorClass}`}
              >
                {badgeLabel}
              </span>
            </div>

            <h3 className="mt-1.5 font-heading text-lg font-bold text-card-foreground">
              {program.name}
            </h3>

            <p className="mt-1 text-sm leading-relaxed text-muted">
              {program.description}
            </p>

            {estimatedAmount > 0 && (
              <div className="mt-3 inline-flex items-baseline gap-1 rounded-lg bg-teal-50 px-3 py-1.5">
                <span className="text-sm text-teal-700">年間推定</span>
                <span className="font-heading text-xl font-bold text-teal-700">
                  {formatAmount(estimatedAmount)}
                </span>
              </div>
            )}

            {estimatedAmount === 0 && program.amount.type !== "fixed" && (
              <div className="mt-3 inline-flex items-baseline gap-1 rounded-lg bg-warm-100 px-3 py-1.5">
                <span className="text-sm text-muted">
                  {program.amount.description}
                </span>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-4 flex w-full items-center justify-between rounded-lg bg-warm-50 px-3 py-2 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50"
        >
          <span>やることリスト ({actionItems.length}件)</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {isExpanded && (
          <div className="mt-3 space-y-2">
            {actionItems.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 rounded-lg bg-warm-50 px-3 py-2"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                <span className="text-sm text-card-foreground">{item}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
          <Link
            href={`/programs/${program.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
          >
            手続き方法を見る
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={program.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-white px-4 py-2 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50"
          >
            公式サイトで申請
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
