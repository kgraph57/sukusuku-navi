import Link from "next/link";
import { Calendar, Tag, Users } from "lucide-react";
import type {
  ArticleFrontmatter,
  ArticleCategory,
  AgeGroup,
} from "@/lib/types";
import { CATEGORY_LABELS, AGE_GROUP_LABELS } from "@/lib/types";

const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  "infectious-disease": "bg-red-50 text-red-700 border-red-200",
  allergy: "bg-orange-50 text-orange-700 border-orange-200",
  skin: "bg-pink-50 text-pink-700 border-pink-200",
  vaccination: "bg-blue-50 text-blue-700 border-blue-200",
  development: "bg-green-50 text-green-700 border-green-200",
  nutrition: "bg-yellow-50 text-yellow-700 border-yellow-200",
  emergency: "bg-red-50 text-red-700 border-red-200",
  checkup: "bg-teal-50 text-teal-700 border-teal-200",
  "mental-health": "bg-purple-50 text-purple-700 border-purple-200",
  "municipal-service": "bg-indigo-50 text-indigo-700 border-indigo-200",
} as const;

function CategoryBadge({ category }: { readonly category: ArticleCategory }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[category]}`}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}

function AgeGroupBadge({ ageGroup }: { readonly ageGroup: AgeGroup }) {
  return (
    <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700">
      {AGE_GROUP_LABELS[ageGroup]}
    </span>
  );
}

interface ArticleCardProps {
  readonly frontmatter: ArticleFrontmatter;
}

export function ArticleCard({ frontmatter }: ArticleCardProps) {
  const { slug, vol, title, description, category } = frontmatter;
  const ageGroups = frontmatter.ageGroups ?? [];
  const keyPoints = frontmatter.keyPoints ?? [];

  return (
    <Link
      href={`/articles/${slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-teal-200 hover:shadow-md"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted">Vol.{vol}</span>
        <CategoryBadge category={category} />
      </div>

      <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-card-foreground group-hover:text-teal-700">
        {title}
      </h3>

      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
        {description}
      </p>

      {keyPoints.length > 0 && (
        <ul className="mt-3 space-y-1">
          {keyPoints.slice(0, 2).map((point) => (
            <li
              key={point}
              className="flex items-start gap-1.5 text-xs leading-relaxed text-muted"
            >
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
              <span className="line-clamp-1">{point}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        <div className="flex items-center gap-1 text-xs text-muted">
          <Users className="h-3.5 w-3.5" />
          <span>{ageGroups.map((ag) => AGE_GROUP_LABELS[ag]).join("・")}</span>
        </div>
      </div>
    </Link>
  );
}

export { CategoryBadge, AgeGroupBadge, CATEGORY_COLORS };
