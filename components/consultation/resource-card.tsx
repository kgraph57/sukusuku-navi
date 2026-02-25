import { WatercolorIcon } from "@/components/icons/watercolor-icon";

interface ResourceCardProps {
  readonly name: string;
  readonly number: string;
  readonly description: string;
  readonly hours: string;
  readonly note?: string;
  readonly address?: string;
  readonly url?: string;
}

export function ResourceCard({
  name,
  number,
  description,
  hours,
  note,
  address,
  url,
}: ResourceCardProps) {
  return (
    <div className="rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-foreground sm:text-base">
            {name}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {description}
          </p>
        </div>
        <a
          href={`tel:${number}`}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-sage-50 px-3 py-2.5 text-base font-bold text-sage-700 transition-colors hover:bg-sage-100 sm:text-lg"
          aria-label={`${name}に電話: ${number}`}
        >
          <WatercolorIcon name="phone" size={16} className="text-sage-500" />
          {number}
        </a>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
        <span className="inline-flex items-center gap-1 rounded-full bg-ivory-100 px-2.5 py-1">
          <WatercolorIcon name="activity" size={12} />
          {hours}
        </span>
        {address && (
          <span className="inline-flex items-center gap-1 rounded-full bg-ivory-100 px-2.5 py-1">
            <WatercolorIcon name="mappin" size={12} />
            {address}
          </span>
        )}
      </div>

      {note && (
        <p className="mt-2.5 text-xs leading-relaxed text-amber-700">
          ※ {note}
        </p>
      )}

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 inline-flex items-center gap-1 text-xs text-sage-600 underline hover:text-sage-800"
        >
          公式サイト
          <WatercolorIcon name="external" size={12} />
        </a>
      )}
    </div>
  );
}
