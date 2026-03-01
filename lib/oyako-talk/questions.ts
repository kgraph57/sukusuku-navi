import type { TalkQuestion, TalkLevel, TalkCategory } from "./types"
import questionsData from "@/data/oyako-talk-questions.json"

const allQuestions: readonly TalkQuestion[] =
  questionsData.questions as TalkQuestion[]

export function getQuestionsByLevel(level: TalkLevel): readonly TalkQuestion[] {
  return allQuestions.filter((q) => q.level === level)
}

export function getQuestionsByLevelAndCategories(
  level: TalkLevel,
  categories?: readonly TalkCategory[],
): readonly TalkQuestion[] {
  const byLevel = allQuestions.filter((q) => q.level === level)
  if (!categories || categories.length === 0) return byLevel
  return byLevel.filter((q) => categories.includes(q.category))
}

export function getQuestionById(id: string): TalkQuestion | undefined {
  return allQuestions.find((q) => q.id === id)
}

/** Fisher-Yates shuffle — returns a new array */
export function shuffle<T>(array: readonly T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }
  return result
}

export function getShuffledQuestions(
  level: TalkLevel,
  categories?: readonly TalkCategory[],
  excludeIds?: readonly string[],
): TalkQuestion[] {
  const filtered = getQuestionsByLevelAndCategories(level, categories)
  const available = excludeIds
    ? filtered.filter((q) => !excludeIds.includes(q.id))
    : filtered
  return shuffle(available)
}
