import { ShieldCheck, ExternalLink } from "lucide-react";
import type { VaccinationEvidence } from "@/lib/types";

interface EvidenceSectionProps {
  readonly evidence: readonly VaccinationEvidence[];
}

export function EvidenceSection({ evidence }: EvidenceSectionProps) {
  return (
    <div className="space-y-4">
      {evidence.map((item) => (
        <div
          key={item.claim}
          className="rounded-xl border border-teal-200 bg-teal-50/50 p-5"
        >
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
            <div className="flex-1">
              <h4 className="font-heading text-sm font-bold text-teal-800">
                {item.claim}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.evidence}
              </p>
              <p className="mt-3 text-xs text-muted">
                出典:{" "}
                {item.sourceUrl ? (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-teal-600 underline hover:text-teal-700"
                  >
                    {item.source}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span>{item.source}</span>
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
