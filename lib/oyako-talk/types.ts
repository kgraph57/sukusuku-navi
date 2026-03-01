export type TalkLevel = 1 | 2 | 3 | 4 | 5

export type TalkCategory =
  | "daily"
  | "feelings"
  | "memories"
  | "dreams"
  | "values"
  | "gratitude"
  | "silly"

export interface TalkQuestion {
  readonly id: string
  readonly level: TalkLevel
  readonly category: TalkCategory
  readonly text: string
  readonly textKids: string
  readonly followUp: string
  readonly mascot: string
  readonly emoji: string
}

export interface OyakoTalkSession {
  readonly id: string
  readonly startedAt: string
  readonly drawnCardIds: readonly string[]
  readonly favoriteCardIds: readonly string[]
  readonly currentLevel: TalkLevel
}

export interface OyakoTalkStats {
  readonly totalCardsDrawn: number
  readonly totalSessions: number
  readonly favoriteCardIds: readonly string[]
  readonly lastPlayedAt: string | null
}

export type AgeMode = "standard" | "kids"
