"use client"

import { useReducer, useCallback, useEffect } from "react"
import Link from "next/link"
import { playReducer, initialState } from "@/lib/oyako-talk/reducer"
import { getShuffledQuestions } from "@/lib/oyako-talk/questions"
import { getStats, saveStats, incrementStats, toggleStatsFavorite } from "@/lib/oyako-talk/store"
import { isLevelUnlocked } from "@/lib/oyako-talk/constants"
import { TalkCard } from "@/components/oyako-talk/talk-card"
import { DeckSelector } from "@/components/oyako-talk/deck-selector"
import { SessionSummary } from "@/components/oyako-talk/session-summary"
import { AgeModeToggle } from "@/components/oyako-talk/age-mode-toggle"
import type { TalkLevel } from "@/lib/oyako-talk/types"

export function PlayClient() {
  const [state, dispatch] = useReducer(playReducer, initialState)
  const stats = getStats()

  const startDeck = useCallback(
    (level: TalkLevel) => {
      if (!isLevelUnlocked(level, stats.totalCardsDrawn)) return
      dispatch({ type: "SET_LEVEL", level })
      const deck = getShuffledQuestions(level)
      dispatch({ type: "SET_DECK", deck })
      dispatch({ type: "DRAW_CARD" })
    },
    [stats.totalCardsDrawn],
  )

  const handleSelectLevel = useCallback(
    (level: TalkLevel) => {
      dispatch({ type: "SET_LEVEL", level })
      if (state.phase === "selecting") return
      const deck = getShuffledQuestions(level)
      dispatch({ type: "SET_DECK", deck })
      dispatch({ type: "DRAW_CARD" })
    },
    [state.phase],
  )

  const handleDrawNext = useCallback(() => {
    dispatch({ type: "DRAW_CARD" })
  }, [])

  const handleFavorite = useCallback(() => {
    if (!state.currentCard) return
    dispatch({ type: "TOGGLE_FAVORITE", cardId: state.currentCard.id })
    const currentStats = getStats()
    saveStats(toggleStatsFavorite(currentStats, state.currentCard.id))
  }, [state.currentCard])

  const handleEndSession = useCallback(() => {
    dispatch({ type: "END_SESSION" })
    const currentStats = getStats()
    saveStats(incrementStats(currentStats, state.drawnCardIds.length))
  }, [state.drawnCardIds.length])

  const handlePlayAgain = useCallback(() => {
    dispatch({ type: "RESET" })
  }, [])

  const hasMore = state.deckIndex < state.deck.length

  // Auto-start level 1 if coming from landing page CTA
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const autoLevel = params.get("level")
    if (autoLevel && state.phase === "selecting") {
      const level = Number(autoLevel) as TalkLevel
      if (level >= 1 && level <= 5) {
        startDeck(level)
      }
    }
  }, [startDeck, state.phase])

  if (state.phase === "summary") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <SessionSummary
          cardsDrawn={state.drawnCardIds.length}
          favoritesCount={state.favoriteCardIds.length}
          onPlayAgain={handlePlayAgain}
        />
      </div>
    )
  }

  if (state.phase === "selecting") {
    return (
      <div className="mx-auto max-w-md px-4 py-8">
        <div className="mb-6 text-center">
          <Link
            href="/oyako-talk"
            className="mb-4 inline-block text-sm text-muted hover:text-sage-600"
          >
            ← もどる
          </Link>
          <h1 className="font-heading text-2xl font-bold text-sage-800">
            レベルをえらぼう
          </h1>
          <p className="mt-2 text-sm text-muted">
            カードを{stats.totalCardsDrawn}枚引きました
          </p>
        </div>

        <div className="mb-8">
          <DeckSelector
            selectedLevel={state.currentLevel}
            totalCardsDrawn={stats.totalCardsDrawn}
            onSelectLevel={(level) => dispatch({ type: "SET_LEVEL", level })}
          />
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => startDeck(state.currentLevel)}
            className="min-h-[48px] rounded-full bg-sage-600 px-8 py-3 font-heading text-lg font-semibold text-white shadow-md transition-all hover:bg-sage-700 hover:shadow-lg active:scale-95"
          >
            カードを引く
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <DeckSelector
          selectedLevel={state.currentLevel}
          totalCardsDrawn={stats.totalCardsDrawn}
          onSelectLevel={handleSelectLevel}
        />
        <AgeModeToggle
          ageMode={state.ageMode}
          onToggle={() => dispatch({ type: "TOGGLE_AGE_MODE" })}
        />
      </div>

      {/* Progress */}
      <div className="mb-6 text-center text-sm text-muted">
        {state.drawnCardIds.length}枚目
        {state.favoriteCardIds.length > 0 && (
          <span className="ml-2 text-coral-500">
            ♥ {state.favoriteCardIds.length}
          </span>
        )}
      </div>

      {/* Card */}
      {state.currentCard && (
        <TalkCard
          question={state.currentCard}
          ageMode={state.ageMode}
          isFavorited={state.favoriteCardIds.includes(state.currentCard.id)}
          onFavorite={handleFavorite}
          onNext={handleDrawNext}
          onEnd={handleEndSession}
          hasMore={hasMore}
        />
      )}
    </div>
  )
}
