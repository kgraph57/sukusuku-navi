import Image from "next/image";
import { withBasePath } from "@/lib/image-path";

interface SpeechBubbleProps {
  readonly character: "konkon" | "usagi" | "kuma" | "pankun";
  readonly pose: string;
  readonly name: string;
  readonly children: React.ReactNode;
  readonly direction?: "left" | "right";
  readonly size?: "default" | "large";
}

const CHARACTER_CONFIG = {
  konkon: { nameColor: "text-sage-600" },
  usagi: { nameColor: "text-blush-500" },
  kuma: { nameColor: "text-amber-600" },
  pankun: { nameColor: "text-purple-600" },
} as const;

export function SpeechBubble({
  character,
  pose,
  name,
  children,
  direction = "left",
  size = "default",
}: SpeechBubbleProps) {
  const config = CHARACTER_CONFIG[character];
  const isRight = direction === "right";
  const imgSize = size === "large" ? 96 : 72;

  return (
    <div
      className={`flex items-start gap-5 sm:gap-7 ${isRight ? "flex-row-reverse" : ""}`}
    >
      <div className="shrink-0 pt-1">
        <Image
          src={withBasePath(`/characters/poses/${pose}.png`)}
          alt={name}
          width={imgSize}
          height={imgSize}
        />
        <p
          className={`mt-1.5 text-center text-[11px] font-semibold tracking-wide ${config.nameColor}`}
        >
          {name}
        </p>
      </div>
      <div className="flex-1 pt-3">
        <div
          className={`text-base leading-[1.9] text-foreground/80 sm:text-lg sm:leading-[2] ${
            isRight ? "text-right" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
