import type { TalkQuestion, TalkLevel, AgeMode } from "./types"

export interface PlayState {
  readonly phase: "selecting" | "drawing" | "viewing" | "summary"
  readonly currentLevel: TalkLevel
  readonly currentCard: TalkQuestion | null
  readonly drawnCardIds: readonly string[]
  readonly favoriteCardIds: readonly string[]
  readonly deck: readonly TalkQuestion[]
  readonly deckIndex: number
  readonly ageMode: AgeMode
  readonly isFlipped: boolean
  readonly sessionStartedAt: string | null
}

export type PlayAction =
  | { readonly type: "SET_LEVEL"; readonly level: TalkLevel }
  | {
      readonly type: "SET_DECK"
      readonly deck: readonly TalkQuestion[]
    }
  | { readonly type: "DRAW_CARD" }
  | { readonly type: "FLIP_CARD" }
  | { readonly type: "TOGGLE_FAVORITE"; readonly cardId: string }
  | { readonly type: "TOGGLE_AGE_MODE" }
  | { readonly type: "END_SESSION" }
  | { readonly type: "RESET" }

export const initialState: PlayState = {
  phase: "selecting",
  currentLevel: 1,
  currentCard: null,
  drawnCardIds: [],
  favoriteCardIds: [],
  deck: [],
  deckIndex: 0,
  ageMode: "standard",
  isFlipped: false,
  sessionStartedAt: null,
}

export function playReducer(state: PlayState, action: PlayAction): PlayState {
  switch (action.type) {
    case "SET_LEVEL":
      return { ...state, currentLevel: action.level }

    case "SET_DECK":
      return {
        ...state,
        deck: action.deck,
        deckIndex: 0,
        phase: "drawing",
        sessionStartedAt: state.sessionStartedAt ?? new Date().toISOString(),
      }

    case "DRAW_CARD": {
      if (state.deckIndex >= state.deck.length) return state
      const card = state.deck[state.deckIndex]
      return {
        ...state,
        currentCard: card,
        drawnCardIds: [...state.drawnCardIds, card.id],
        deckIndex: state.deckIndex + 1,
        isFlipped: false,
        phase: "viewing",
      }
    }

    case "FLIP_CARD":
      return { ...state, isFlipped: true }

    case "TOGGLE_FAVORITE": {
      const isFav = state.favoriteCardIds.includes(action.cardId)
      return {
        ...state,
        favoriteCardIds: isFav
          ? state.favoriteCardIds.filter((id) => id !== action.cardId)
          : [...state.favoriteCardIds, action.cardId],
      }
    }

    case "TOGGLE_AGE_MODE":
      return {
        ...state,
        ageMode: state.ageMode === "standard" ? "kids" : "standard",
      }

    case "END_SESSION":
      return { ...state, phase: "summary" }

    case "RESET":
      return initialState

    default:
      return state
  }
}
