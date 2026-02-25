import Image from "next/image";
import { withBasePath } from "@/lib/image-path";

interface SpeechBubbleProps {
  readonly character: "konkon" | "usagi" | "kuma" | "pankun";
  readonly pose: string;
  readonly name: string;
  readonly children: React.ReactNode;
  readonly direction?: "left" | "right";
}

const CHARACTER_CONFIG = {
  konkon: { color: "border-sage-200 bg-sage-50/70", nameColor: "text-sage-700" },
  usagi: { color: "border-blush-200 bg-blush-50/70", nameColor: "text-blush-600" },
  kuma: { color: "border-amber-200 bg-amber-50/70", nameColor: "text-amber-700" },
  pankun: { color: "border-purple-200 bg-purple-50/70", nameColor: "text-purple-700" },
} as const;

export function SpeechBubble({
  character,
  pose,
  name,
  children,
  direction = "left",
}: SpeechBubbleProps) {
  const config = CHARACTER_CONFIG[character];
  const isRight = direction === "right";

  return (
    <div
      className={`flex items-start gap-3 sm:gap-4 ${isRight ? "flex-row-reverse" : ""}`}
    >
      <div className="shrink-0">
        <Image
          src={withBasePath(`/characters/poses/${pose}.png`)}
          alt={name}
          width={64}
          height={64}
          className="drop-shadow-sm"
        />
        <p
          className={`mt-1 text-center text-[10px] font-bold ${config.nameColor}`}
        >
          {name}
        </p>
      </div>
      <div
        className={`relative flex-1 rounded-2xl border p-4 ${config.color} ${
          isRight ? "rounded-tr-sm" : "rounded-tl-sm"
        }`}
      >
        <div className="space-y-2 text-sm leading-relaxed text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}
