"use client";

import { useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";

interface CitationListProps {
  readonly citations: readonly string[];
}

export function CitationList({ citations }: CitationListProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (citations.length === 0) return null;

  return (
    <div className="my-8 rounded-xl border border-border bg-card">
      <button
        type="button"
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="h-4.5 w-4.5 text-sage-600" />
          <span className="font-heading text-sm font-semibold text-foreground">
            参考文献（{citations.length}件）
          </span>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-border px-5 pb-5 pt-3">
          <ol className="space-y-2">
            {citations.map((citation, index) => (
              <li
                key={`citation-${String(index)}`}
                className="flex items-start gap-2 text-xs leading-relaxed text-muted"
              >
                <span className="shrink-0 font-medium text-foreground">
                  [{index + 1}]
                </span>
                <span>{citation}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
