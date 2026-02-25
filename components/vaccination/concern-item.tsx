"use client";

import { useState } from "react";
import { WatercolorIcon } from "@/components/icons/watercolor-icon";

interface ConcernItemProps {
  readonly question: string;
  readonly children: React.ReactNode;
}

export function ConcernItem({ question, children }: ConcernItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-sm">
      <button
        type="button"
        className="flex w-full items-start gap-3 p-5 text-left transition-colors hover:bg-ivory-50"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blush-50 text-blush-500">
          <WatercolorIcon name="help" size={14} />
        </span>
        <span className="flex-1 text-sm font-semibold leading-relaxed text-foreground sm:text-base">
          {question}
        </span>
        <WatercolorIcon
          name="chevron_down"
          size={16}
          className={`mt-0.5 shrink-0 text-muted transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="border-t border-border bg-ivory-50/50 px-5 pb-5 pt-4 pl-14">
          <div className="space-y-3 text-sm leading-relaxed text-muted">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
