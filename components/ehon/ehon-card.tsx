import Link from "next/link";
import type { Ehon } from "@/lib/types";
import { EHON_CATEGORY_LABELS, AGE_GROUP_LABELS } from "@/lib/types";

interface EhonCardProps {
  readonly book: Ehon;
}

export function EhonCard({ book }: EhonCardProps) {
  return (
    <Link
      href={`/ehon/${book.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <div
        className={`flex h-48 items-center justify-center bg-gradient-to-br ${book.coverBgColor}`}
      >
        <span className="text-7xl transition-transform group-hover:scale-110">
          {book.coverEmoji}
        </span>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-sage-50 px-2.5 py-0.5 text-xs font-medium text-sage-700">
            {EHON_CATEGORY_LABELS[book.category]}
          </span>
          <span className="text-xs text-muted">
            {book.ageGroups.map((ag) => AGE_GROUP_LABELS[ag]).join("・")}
          </span>
        </div>

        <h3 className="font-heading text-lg font-bold tracking-wide text-foreground">
          {book.title}
        </h3>

        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {book.description}
        </p>

        <div className="mt-3 flex items-center gap-1 text-sm font-medium text-sage-600">
          よんでみる
          <span className="transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
