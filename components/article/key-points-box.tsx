import { Lightbulb } from "lucide-react";

interface KeyPointsBoxProps {
  readonly points: readonly string[];
  readonly title?: string;
}

export function KeyPointsBox({
  points,
  title = "今号のポイント",
}: KeyPointsBoxProps) {
  if (!points || points.length === 0) return null;

  return (
    <div className="my-8 rounded-xl border-2 border-teal-200 bg-teal-50/50 p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-teal-600" />
        <h3 className="font-heading text-base font-bold text-teal-800">
          {title}
        </h3>
      </div>
      <ol className="mt-4 space-y-3">
        {points.map((point, index) => (
          <li key={`point-${String(index)}`} className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
              {index + 1}
            </span>
            <span className="text-sm leading-relaxed text-foreground">
              {point}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
