"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Train,
  Trees,
  Filter,
  List,
  Map as MapIcon,
} from "lucide-react";

const NurseryMap = dynamic(
  () => import("./nursery-map").then((mod) => ({ default: mod.NurseryMap })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-border bg-warm-100 sm:h-[500px]">
        <p className="text-sm text-muted">地図を読み込み中...</p>
      </div>
    ),
  },
);
import type { Nursery, NurseryType, NurseryArea } from "@/lib/types";
import { NURSERY_TYPE_LABELS, NURSERY_AREA_LABELS } from "@/lib/nurseries";
import {
  NURSERY_TYPE_ICON_MAP,
  NURSERY_TYPE_COLOR_MAP,
} from "@/lib/nursery-constants";

interface NurseryFilterProps {
  readonly nurseries: readonly Nursery[];
}

type AgeFilter = "all" | "0" | "1" | "3";

function NurseryCard({ nursery }: { readonly nursery: Nursery }) {
  const colorClass =
    NURSERY_TYPE_COLOR_MAP[nursery.type] ??
    "bg-gray-50 text-gray-600 border-gray-200";
  const IconComponent = NURSERY_TYPE_ICON_MAP[nursery.type];

  return (
    <Link
      href={`/nurseries/${nursery.slug}`}
      className="group flex gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-teal-200 hover:shadow-md"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${colorClass}`}
      >
        <IconComponent className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-heading text-base font-bold text-card-foreground">
            {nursery.name}
          </h3>
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${colorClass}`}
          >
            {NURSERY_TYPE_LABELS[nursery.type]}
          </span>
          {nursery.hasGarden && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600">
              <Trees className="h-3 w-3" />
              園庭
            </span>
          )}
        </div>

        <div className="mt-2 space-y-1">
          <p className="flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {nursery.address}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-muted">
            <Train className="h-3.5 w-3.5 shrink-0" />
            {nursery.nearestStation}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-muted">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            {nursery.hours.standard}
            {nursery.hours.extended != null && (
              <span className="text-xs text-teal-600">
                （延長 〜{nursery.hours.extended.split("-")[1]}）
              </span>
            )}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-muted">
            <Users className="h-3.5 w-3.5 shrink-0" />
            定員{nursery.capacity}名 ・ {nursery.ageMin}歳〜{nursery.ageMax}歳
          </p>
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {nursery.features.slice(0, 4).map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-warm-100 px-2 py-0.5 text-xs text-muted"
            >
              {feature}
            </span>
          ))}
        </div>

        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-teal-600 opacity-0 transition-opacity group-hover:opacity-100">
          詳細を見る
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}

const ALL_TYPES: readonly NurseryType[] = [
  "licensed",
  "certified",
  "small-scale",
  "kodomoen",
  "minato-room",
];

const ALL_AREAS: readonly NurseryArea[] = [
  "shiba-mita",
  "azabu",
  "akasaka-aoyama",
  "takanawa-shirokane",
  "daiba-shibaura",
];

const AGE_FILTER_LABELS: Record<AgeFilter, string> = {
  all: "すべて",
  "0": "0歳から",
  "1": "1歳から",
  "3": "3歳から",
};

type ViewMode = "list" | "map";

export function NurseryFilter({ nurseries }: NurseryFilterProps) {
  const [selectedType, setSelectedType] = useState<NurseryType | "all">("all");
  const [selectedArea, setSelectedArea] = useState<NurseryArea | "all">("all");
  const [selectedAge, setSelectedAge] = useState<AgeFilter>("all");
  const [gardenOnly, setGardenOnly] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const resetFilters = () => {
    setSelectedType("all");
    setSelectedArea("all");
    setSelectedAge("all");
    setGardenOnly(false);
  };

  const filtered = useMemo(() => {
    return nurseries.filter((n) => {
      if (selectedType !== "all" && n.type !== selectedType) return false;
      if (selectedArea !== "all" && n.area !== selectedArea) return false;
      if (selectedAge !== "all" && n.ageMin > Number(selectedAge)) return false;
      if (gardenOnly && !n.hasGarden) return false;
      return true;
    });
  }, [nurseries, selectedType, selectedArea, selectedAge, gardenOnly]);

  const activeFilterCount = [
    selectedType !== "all",
    selectedArea !== "all",
    selectedAge !== "all",
    gardenOnly,
  ].filter(Boolean).length;

  return (
    <div>
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-card-foreground">
          <Filter className="h-4 w-4 text-teal-600" />
          絞り込み
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-700">
              {activeFilterCount}件
            </span>
          )}
        </div>

        <div className="mt-3 space-y-3">
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted">種別</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedType("all")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  selectedType === "all"
                    ? "bg-teal-600 text-white"
                    : "bg-warm-100 text-muted hover:bg-warm-200"
                }`}
              >
                すべて
              </button>
              {ALL_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setSelectedType((prev) => (prev === type ? "all" : type))
                  }
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedType === type
                      ? "bg-teal-600 text-white"
                      : "bg-warm-100 text-muted hover:bg-warm-200"
                  }`}
                >
                  {NURSERY_TYPE_LABELS[type]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-xs font-medium text-muted">エリア</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedArea("all")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  selectedArea === "all"
                    ? "bg-teal-600 text-white"
                    : "bg-warm-100 text-muted hover:bg-warm-200"
                }`}
              >
                すべて
              </button>
              {ALL_AREAS.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() =>
                    setSelectedArea((prev) => (prev === area ? "all" : area))
                  }
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedArea === area
                      ? "bg-teal-600 text-white"
                      : "bg-warm-100 text-muted hover:bg-warm-200"
                  }`}
                >
                  {NURSERY_AREA_LABELS[area]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted">
                受け入れ年齢
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(
                  Object.entries(AGE_FILTER_LABELS) as [AgeFilter, string][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedAge(key)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      selectedAge === key
                        ? "bg-teal-600 text-white"
                        : "bg-warm-100 text-muted hover:bg-warm-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-1.5 text-xs font-medium text-muted">その他</p>
              <button
                type="button"
                onClick={() => setGardenOnly((prev) => !prev)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  gardenOnly
                    ? "bg-green-600 text-white"
                    : "bg-warm-100 text-muted hover:bg-warm-200"
                }`}
              >
                <Trees className="h-3 w-3" />
                園庭あり
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted">{filtered.length}件の保育施設</p>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-medium text-teal-600 hover:text-teal-700"
            >
              フィルターをリセット
            </button>
          )}
        </div>

        <div className="flex rounded-lg border border-border bg-card">
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1.5 rounded-l-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              viewMode === "list"
                ? "bg-teal-600 text-white"
                : "text-muted hover:bg-warm-100"
            }`}
          >
            <List className="h-3.5 w-3.5" />
            リスト
          </button>
          <button
            type="button"
            onClick={() => setViewMode("map")}
            className={`flex items-center gap-1.5 rounded-r-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              viewMode === "map"
                ? "bg-teal-600 text-white"
                : "text-muted hover:bg-warm-100"
            }`}
          >
            <MapIcon className="h-3.5 w-3.5" />
            マップ
          </button>
        </div>
      </div>

      <div className="mt-4">
        {viewMode === "list" ? (
          <div className="space-y-3">
            {filtered.length > 0 ? (
              filtered.map((nursery) => (
                <NurseryCard key={nursery.slug} nursery={nursery} />
              ))
            ) : (
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <p className="text-sm text-muted">
                  条件に一致する保育施設が見つかりませんでした。
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-2 text-sm font-medium text-teal-600 hover:text-teal-700"
                >
                  フィルターをリセット
                </button>
              </div>
            )}
          </div>
        ) : filtered.length > 0 ? (
          <NurseryMap nurseries={filtered} />
        ) : (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-sm text-muted">
              条件に一致する保育施設が見つかりませんでした。
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-2 text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              フィルターをリセット
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
