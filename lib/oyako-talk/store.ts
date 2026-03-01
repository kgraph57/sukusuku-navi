import type { OyakoTalkSession, OyakoTalkStats, TalkLevel } from "./types"

const SESSION_KEY = "sukusuku-oyako-talk-session"
const STATS_KEY = "sukusuku-oyako-talk-stats"

function isSSR(): boolean {
  return typeof window === "undefined"
}

function readJson<T>(key: string): T | null {
  if (isSSR()) return null
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function writeJson<T>(key: string, value: T): void {
  if (isSSR()) return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore localStorage errors (quota exceeded, private browsing, etc.)
  }
}

export function getSession(): OyakoTalkSession | null {
  return readJson<OyakoTalkSession>(SESSION_KEY)
}

export function saveSession(session: OyakoTalkSession): void {
  writeJson(SESSION_KEY, session)
}

export function clearSession(): void {
  if (isSSR()) return
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    // Ignore
  }
}

function defaultStats(): OyakoTalkStats {
  return {
    totalCardsDrawn: 0,
    totalSessions: 0,
    favoriteCardIds: [],
    lastPlayedAt: null,
  }
}

export function getStats(): OyakoTalkStats {
  return readJson<OyakoTalkStats>(STATS_KEY) ?? defaultStats()
}

export function saveStats(stats: OyakoTalkStats): void {
  writeJson(STATS_KEY, stats)
}

export function createSession(level: TalkLevel): OyakoTalkSession {
  return {
    id: crypto.randomUUID(),
    startedAt: new Date().toISOString(),
    drawnCardIds: [],
    favoriteCardIds: [],
    currentLevel: level,
  }
}

export function addDrawnCard(
  session: OyakoTalkSession,
  cardId: string,
): OyakoTalkSession {
  return {
    ...session,
    drawnCardIds: [...session.drawnCardIds, cardId],
  }
}

export function toggleFavorite(
  session: OyakoTalkSession,
  cardId: string,
): OyakoTalkSession {
  const isFavorited = session.favoriteCardIds.includes(cardId)
  return {
    ...session,
    favoriteCardIds: isFavorited
      ? session.favoriteCardIds.filter((id) => id !== cardId)
      : [...session.favoriteCardIds, cardId],
  }
}

export function toggleStatsFavorite(
  stats: OyakoTalkStats,
  cardId: string,
): OyakoTalkStats {
  const isFavorited = stats.favoriteCardIds.includes(cardId)
  return {
    ...stats,
    favoriteCardIds: isFavorited
      ? stats.favoriteCardIds.filter((id) => id !== cardId)
      : [...stats.favoriteCardIds, cardId],
  }
}

export function incrementStats(
  stats: OyakoTalkStats,
  cardsDrawn: number,
): OyakoTalkStats {
  return {
    ...stats,
    totalCardsDrawn: stats.totalCardsDrawn + cardsDrawn,
    totalSessions: stats.totalSessions + 1,
    lastPlayedAt: new Date().toISOString(),
  }
}
