import type { TalkLevel, TalkCategory } from "./types"

export interface LevelConfig {
  readonly level: TalkLevel
  readonly name: string
  readonly description: string
  readonly colorClass: string
  readonly bgClass: string
  readonly borderClass: string
  readonly unlockThreshold: number
}

export const LEVELS: readonly LevelConfig[] = [
  {
    level: 1,
    name: "きっかけ",
    description: "かんたん・たのしい質問",
    colorClass: "text-teal-600",
    bgClass: "bg-teal-50",
    borderClass: "border-teal-200",
    unlockThreshold: 0,
  },
  {
    level: 2,
    name: "にちじょう",
    description: "毎日のできごと",
    colorClass: "text-sage-600",
    bgClass: "bg-sage-50",
    borderClass: "border-sage-200",
    unlockThreshold: 0,
  },
  {
    level: 3,
    name: "きもち",
    description: "気持ちや感情のこと",
    colorClass: "text-blush-600",
    bgClass: "bg-blush-50",
    borderClass: "border-blush-200",
    unlockThreshold: 10,
  },
  {
    level: 4,
    name: "おもいで",
    description: "思い出を語り合おう",
    colorClass: "text-purple-600",
    bgClass: "bg-purple-50",
    borderClass: "border-purple-200",
    unlockThreshold: 25,
  },
  {
    level: 5,
    name: "きずな",
    description: "大切なこと・感謝",
    colorClass: "text-coral-600",
    bgClass: "bg-coral-50",
    borderClass: "border-coral-200",
    unlockThreshold: 50,
  },
] as const

export function getLevelConfig(level: TalkLevel): LevelConfig {
  return LEVELS[level - 1]
}

export function isLevelUnlocked(
  level: TalkLevel,
  totalCardsDrawn: number,
): boolean {
  return totalCardsDrawn >= LEVELS[level - 1].unlockThreshold
}

export interface CategoryConfig {
  readonly category: TalkCategory
  readonly label: string
  readonly icon: string
}

export const CATEGORIES: readonly CategoryConfig[] = [
  { category: "daily", label: "日常のこと", icon: "home" },
  { category: "feelings", label: "きもち", icon: "heart" },
  { category: "memories", label: "おもいで", icon: "star" },
  { category: "dreams", label: "ゆめ", icon: "sparkles" },
  { category: "values", label: "たいせつなこと", icon: "lightbulb" },
  { category: "gratitude", label: "ありがとう", icon: "heart" },
  { category: "silly", label: "おもしろ", icon: "message" },
] as const
