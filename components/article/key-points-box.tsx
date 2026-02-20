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
    <div className="my-8 overflow-hidden rounded-xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-teal-50/20 shadow-sm">
      <div className="flex items-center gap-2.5 border-b border-teal-200 bg-teal-600 px-6 py-4">
        <Lightbulb className="h-5 w-5 text-white" />
        <h3 className="font-heading text-base font-bold text-white">
          {title}
        </h3>
      </div>
      <ol className="space-y-0 divide-y divide-teal-100 px-6 py-2">
        {points.map((point, index) => (
          <li
            key={`point-${String(index)}`}
            className="flex items-start gap-4 py-4"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
              {index + 1}
            </span>
            <span className="text-base leading-[1.85] text-foreground">
              {point}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
