"use client";

import Link from "next/link";
import { ExternalLink, Phone } from "lucide-react";
import type { Clinic } from "@/lib/clinics";

interface ClinicMapPopupProps {
  readonly clinic: Clinic;
}

export function ClinicMapPopup({ clinic }: ClinicMapPopupProps) {
  return (
    <div className="min-w-[200px] max-w-[260px]">
      <div className="flex items-center gap-1.5">
        {clinic.emergencyAvailable && (
          <span className="inline-flex rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
            救急対応
          </span>
        )}
        {clinic.nightHours != null && (
          <span className="inline-flex rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
            夜間
          </span>
        )}
      </div>
      <p className="mt-1 text-sm font-bold leading-tight text-foreground">
        {clinic.name}
      </p>
      <div className="mt-1.5 space-y-0.5 text-xs text-muted">
        <p>{clinic.address}</p>
        <p>{clinic.nearestStation}</p>
        <p>
          <a href={`tel:${clinic.phone}`} className="hover:text-teal-600">
            {clinic.phone}
          </a>
        </p>
        <p>平日 {clinic.hours.weekday}</p>
      </div>
      <div className="mt-1.5 flex flex-wrap gap-1">
        {clinic.features.slice(0, 3).map((feature) => (
          <span
            key={feature}
            className="rounded-full bg-warm-100 px-1.5 py-0.5 text-[10px] text-muted"
          >
            {feature}
          </span>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <Link
          href={`/clinics/${clinic.slug}`}
          className="inline-flex items-center rounded-full bg-teal-600 px-3 py-1 text-xs font-medium text-white hover:bg-teal-700"
        >
          詳細を見る
        </Link>
        <a
          href={`tel:${clinic.phone}`}
          className="inline-flex items-center gap-0.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted hover:bg-warm-100"
        >
          <Phone className="h-3 w-3" />
          電話
        </a>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${clinic.lat},${clinic.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted hover:bg-warm-100"
        >
          <ExternalLink className="h-3 w-3" />
          Maps
        </a>
      </div>
    </div>
  );
}
