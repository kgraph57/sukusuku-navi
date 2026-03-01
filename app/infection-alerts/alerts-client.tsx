"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Info,
  ArrowRight,
  Thermometer,
  Wind,
  Hand,
  Flame,
  Eye,
  AlertCircle,
  Droplets,
  CircleDot,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SeasonalDisease } from "./page";

// ---------------------------------------------------------------------------
// Disease icon map — Lucide icons per disease
// ---------------------------------------------------------------------------

const DISEASE_ICON: Record<string, LucideIcon> = {
  influenza: Thermometer,
  rsv: Wind,
  hfmd: Hand,
  herpangina: Flame,
  "pharyngoconjunctival-fever": Eye,
  strep: AlertCircle,
  norovirus: Droplets,
  chickenpox: CircleDot,
};

const DISEASE_ICON_COLOR: Record<string, string> = {
  influenza: "text-red-500",
  rsv: "text-orange-500",
  hfmd: "text-yellow-600",
  herpangina: "text-orange-500",
  "pharyngoconjunctival-fever": "text-yellow-600",
  strep: "text-purple-500",
  norovirus: "text-blue-500",
  chickenpox: "text-pink-500",
};

// ---------------------------------------------------------------------------
// Month labels
// ---------------------------------------------------------------------------

const MONTH_SHORT = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
] as const;

// ---------------------------------------------------------------------------
// Color maps (no dynamic class generation)
// ---------------------------------------------------------------------------

const SEVERITY_BADGE: Record<string, string> = {
  peak_high: "bg-red-50 text-red-700 ring-red-200",
  peak_medium: "bg-orange-50 text-orange-700 ring-orange-200",
  warning_high: "bg-red-50/60 text-red-600 ring-red-100",
  warning_medium: "bg-amber-50 text-amber-600 ring-amber-100",
};

const CARD_GRADIENT: Record<string, string> = {
  peak_high:
    "border-red-200 bg-gradient-to-br from-red-50/60 via-white to-red-50/30",
  peak_medium:
    "border-orange-200 bg-gradient-to-br from-orange-50/60 via-white to-orange-50/30",
  warning_high:
    "border-red-100 bg-gradient-to-br from-red-50/20 via-white to-red-50/10",
  warning_medium:
    "border-amber-100 bg-gradient-to-br from-amber-50/20 via-white to-amber-50/10",
};

const PULSE_COLOR: Record<string, string> = {
  peak_high: "bg-red-500",
  peak_medium: "bg-orange-400",
  warning_high: "bg-red-300",
  warning_medium: "bg-amber-300",
};

const TIMELINE_PEAK_COLOR: Record<string, string> = {
  peak_high: "bg-red-400",
  peak_medium: "bg-orange-300",
  warning_high: "bg-red-300",
  warning_medium: "bg-amber-300",
};

const TIMELINE_WARNING_COLOR: Record<string, string> = {
  peak_high: "bg-red-100",
  peak_medium: "bg-orange-100",
  warning_high: "bg-red-100",
  warning_medium: "bg-amber-100",
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface AlertsClientProps {
  readonly diseases: readonly SeasonalDisease[];
}

// ---------------------------------------------------------------------------
// Threat summary banner
// ---------------------------------------------------------------------------

function ThreatSummary({
  peakCount,
  warningCount,
  currentMonth,
}: {
  readonly peakCount: number;
  readonly warningCount: number;
  readonly currentMonth: number;
}) {
  const totalAlerts = peakCount + warningCount;
  const threatLevel =
    peakCount >= 3 ? "高" : peakCount >= 1 ? "中" : "低";
  const threatColor =
    peakCount >= 3
      ? "from-red-500 to-red-600"
      : peakCount >= 1
        ? "from-orange-400 to-red-500"
        : "from-amber-300 to-amber-400";
  const threatBg =
    peakCount >= 3
      ? "bg-red-50 border-red-200"
      : peakCount >= 1
        ? "bg-orange-50 border-orange-200"
        : "bg-amber-50 border-amber-200";

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 ${threatBg}`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
        {/* Threat level circle */}
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
            {/* Outer pulse ring */}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${threatColor} opacity-20 animate-alert-pulse`}
            />
            {/* Inner circle */}
            <div
              className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${threatColor} shadow-lg`}
            >
              <div className="text-center">
                <p className="text-lg font-bold leading-none text-white">
                  {threatLevel}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="font-heading text-base font-bold text-foreground">
              {currentMonth}月の感染リスク
            </p>
            <p className="mt-0.5 text-sm text-muted">
              流行中 {peakCount}件 / 注意 {warningCount}件（計{totalAlerts}件）
            </p>
          </div>
        </div>

        {/* Stat pills */}
        <div className="flex gap-3 sm:ml-auto">
          {peakCount > 0 && (
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm ring-1 ring-red-100">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-alert-pulse" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
              <span className="text-sm font-semibold text-red-700">
                {peakCount}件流行中
              </span>
            </div>
          )}
          {warningCount > 0 && (
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm ring-1 ring-amber-100">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="text-sm font-semibold text-amber-700">
                {warningCount}件注意
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mini month timeline
// ---------------------------------------------------------------------------

function MonthTimeline({
  disease,
  statusKey,
  currentMonth,
}: {
  readonly disease: SeasonalDisease;
  readonly statusKey: string;
  readonly currentMonth: number;
}) {
  const peakColor = TIMELINE_PEAK_COLOR[statusKey] ?? "bg-orange-300";
  const warningColor = TIMELINE_WARNING_COLOR[statusKey] ?? "bg-orange-100";

  return (
    <div className="mt-3 flex items-end gap-0.5">
      {MONTH_SHORT.map((label, i) => {
        const month = i + 1;
        const isPeak = disease.peakMonths.includes(month);
        const isWarning = disease.warningMonths.includes(month);
        const isCurrent = month === currentMonth;

        let barColor = "bg-gray-100";
        if (isPeak) barColor = peakColor;
        else if (isWarning) barColor = warningColor;

        const barHeight = isPeak ? "h-5" : isWarning ? "h-3.5" : "h-2";

        return (
          <div key={month} className="flex flex-1 flex-col items-center gap-0.5">
            <div
              className={`w-full rounded-sm transition-all ${barColor} ${barHeight} ${
                isCurrent ? "ring-2 ring-foreground/40 ring-offset-1" : ""
              }`}
            />
            <span
              className={`text-[9px] leading-none ${
                isCurrent
                  ? "font-bold text-foreground"
                  : "text-muted/60"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Alert card with visual enhancements
// ---------------------------------------------------------------------------

function AlertCard({
  disease,
  statusKey,
  statusLabel,
  currentMonth,
}: {
  readonly disease: SeasonalDisease;
  readonly statusKey: string;
  readonly statusLabel: string;
  readonly currentMonth: number;
}) {
  const gradientClass = CARD_GRADIENT[statusKey] ?? "border-border bg-card";
  const badgeClass =
    SEVERITY_BADGE[statusKey] ?? "bg-gray-50 text-gray-600 ring-gray-200";
  const pulseColor = PULSE_COLOR[statusKey] ?? "bg-gray-400";
  const isPeak = statusKey.startsWith("peak");
  const Icon = DISEASE_ICON[disease.slug] ?? AlertCircle;
  const iconColor = DISEASE_ICON_COLOR[disease.slug] ?? "text-muted";

  return (
    <div className={`rounded-2xl border p-5 sm:p-6 transition-shadow hover:shadow-md ${gradientClass}`}>
      <div className="flex items-start gap-4">
        {/* Disease icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-sm ring-1 ring-black/5">
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>

        <div className="min-w-0 flex-1">
          {/* Header row */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Live pulse indicator */}
            {isPeak && (
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full ${pulseColor} opacity-75 animate-alert-pulse`}
                />
                <span
                  className={`relative inline-flex h-2.5 w-2.5 rounded-full ${pulseColor}`}
                />
              </span>
            )}
            <h4 className="font-heading text-base font-bold text-foreground">
              {disease.name}
            </h4>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${badgeClass}`}
            >
              {statusLabel}
            </span>
          </div>

          {/* Description */}
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {disease.description}
          </p>

          {/* Month timeline */}
          <MonthTimeline
            disease={disease}
            statusKey={statusKey}
            currentMonth={currentMonth}
          />

          {/* Article link */}
          {disease.articleSlug && (
            <Link
              href={`/articles/${disease.articleSlug}`}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-sage-50 px-3 py-1.5 text-xs font-semibold text-sage-700 transition-colors hover:bg-sage-100"
            >
              詳しく読む
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function AlertsClient({ diseases }: AlertsClientProps) {
  const currentMonth = new Date().getMonth() + 1;

  const peakDiseases = diseases.filter((d) =>
    d.peakMonths.includes(currentMonth),
  );
  const warningDiseases = diseases.filter(
    (d) =>
      d.warningMonths.includes(currentMonth) &&
      !d.peakMonths.includes(currentMonth),
  );

  const hasAlerts = peakDiseases.length > 0 || warningDiseases.length > 0;

  if (!hasAlerts) {
    return (
      <div className="flex items-start gap-4 rounded-2xl border border-sage-200 bg-gradient-to-br from-sage-50 to-white p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage-100">
          <Info className="h-6 w-6 text-sage-600" />
        </div>
        <div>
          <p className="font-heading text-base font-bold text-sage-800">
            今月は感染症の特別な注意時期ではありません
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            通常の手洗い・うがい・室内換気を心がけてください。
            年間カレンダーで季節ごとのリスクをご確認いただけます。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Threat level summary */}
      <ThreatSummary
        peakCount={peakDiseases.length}
        warningCount={warningDiseases.length}
        currentMonth={currentMonth}
      />

      {/* Peak alerts */}
      {peakDiseases.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100">
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </div>
            <h3 className="font-heading text-sm font-bold text-foreground">
              現在流行ピーク期
            </h3>
            <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700">
              {peakDiseases.length}件
            </span>
          </div>
          <div className="space-y-4">
            {peakDiseases.map((disease) => {
              const key = `peak_${disease.severity}`;
              return (
                <AlertCard
                  key={disease.slug}
                  disease={disease}
                  statusKey={key}
                  statusLabel={
                    disease.severity === "high"
                      ? "流行ピーク・注意"
                      : "流行ピーク"
                  }
                  currentMonth={currentMonth}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Warning alerts */}
      {warningDiseases.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100">
              <Info className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="font-heading text-sm font-bold text-foreground">
              注意期間（流行の始まり・終わり）
            </h3>
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">
              {warningDiseases.length}件
            </span>
          </div>
          <div className="space-y-4">
            {warningDiseases.map((disease) => {
              const key = `warning_${disease.severity}`;
              return (
                <AlertCard
                  key={disease.slug}
                  disease={disease}
                  statusKey={key}
                  statusLabel="注意期間"
                  currentMonth={currentMonth}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
