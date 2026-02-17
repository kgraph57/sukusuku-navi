"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  CheckCircle2,
  Circle,
  MapPin,
  Calendar,
  FileText,
  Lightbulb,
  Link as LinkIcon,
} from "lucide-react"
import type { Checklist, ChecklistItem } from "@/lib/checklists"

interface ChecklistContentProps {
  readonly checklist: Checklist
}

function useCheckedItems(slug: string) {
  const [checkedItems, setCheckedItems] = useState<ReadonlySet<string>>(
    new Set()
  )
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`checklist-${slug}`)
      if (stored) {
        const parsed = JSON.parse(stored) as string[]
        setCheckedItems(new Set(parsed))
      }
    } catch {
      // Ignore localStorage errors
    }
    setIsLoaded(true)
  }, [slug])

  const toggleItem = useCallback(
    (itemId: string) => {
      setCheckedItems((prev) => {
        const next = new Set(prev)
        if (next.has(itemId)) {
          next.delete(itemId)
        } else {
          next.add(itemId)
        }
        try {
          localStorage.setItem(
            `checklist-${slug}`,
            JSON.stringify([...next])
          )
        } catch {
          // Ignore localStorage errors
        }
        return next
      })
    },
    [slug]
  )

  const setAllItems = useCallback(
    (itemIds: readonly string[]) => {
      const next = new Set(itemIds)
      setCheckedItems(next)
      try {
        localStorage.setItem(
          `checklist-${slug}`,
          JSON.stringify([...next])
        )
      } catch {
        // Ignore localStorage errors
      }
    },
    [slug]
  )

  const clearAll = useCallback(() => {
    setCheckedItems(new Set())
    try {
      localStorage.setItem(`checklist-${slug}`, JSON.stringify([]))
    } catch {
      // Ignore localStorage errors
    }
  }, [slug])

  return { checkedItems, isLoaded, toggleItem, setAllItems, clearAll }
}

function ChecklistItemCard({
  item,
  isChecked,
  onToggle,
}: {
  readonly item: ChecklistItem
  readonly isChecked: boolean
  readonly onToggle: () => void
}) {
  return (
    <div
      className={`rounded-xl border bg-card p-5 transition-all ${
        isChecked ? "border-teal-200 bg-teal-50/50" : "border-border"
      }`}
    >
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onToggle}
          className="mt-0.5 shrink-0 text-teal-600 transition-colors hover:text-teal-700"
          aria-label={isChecked ? "チェックを外す" : "チェックする"}
        >
          {isChecked ? (
            <CheckCircle2 className="h-6 w-6" />
          ) : (
            <Circle className="h-6 w-6 text-warm-300" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <h3
            className={`font-heading text-base font-bold ${
              isChecked
                ? "text-teal-700 line-through"
                : "text-card-foreground"
            }`}
          >
            {item.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {item.description}
          </p>

          <div className="mt-3 space-y-2">
            {item.deadline && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-3.5 w-3.5 shrink-0 text-coral-500" />
                <span className="font-medium text-coral-600">
                  {item.deadline}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-muted" />
              <span className="text-muted">{item.where}</span>
            </div>

            {item.documents.length > 0 && (
              <div className="flex items-start gap-2 text-sm">
                <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted" />
                <div className="flex flex-wrap gap-1">
                  {item.documents.map((doc) => (
                    <span
                      key={doc}
                      className="rounded bg-warm-100 px-1.5 py-0.5 text-xs text-muted"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {item.relatedProgram && (
              <div className="flex items-center gap-2 text-sm">
                <LinkIcon className="h-3.5 w-3.5 shrink-0 text-teal-600" />
                <Link
                  href={`/programs/${item.relatedProgram}`}
                  className="font-medium text-teal-600 hover:text-teal-700 hover:underline"
                >
                  関連制度を見る
                </Link>
              </div>
            )}
          </div>

          {item.tips && (
            <div className="mt-3 flex gap-2 rounded-lg bg-yellow-50 p-3">
              <Lightbulb className="h-4 w-4 shrink-0 text-yellow-600" />
              <p className="text-sm leading-relaxed text-yellow-800">
                {item.tips}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function ChecklistContent({ checklist }: ChecklistContentProps) {
  const { checkedItems, isLoaded, toggleItem, setAllItems, clearAll } =
    useCheckedItems(checklist.slug)

  const checkedCount = checkedItems.size
  const totalCount = checklist.items.length
  const progress =
    totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0

  const handleToggleAll = () => {
    if (checkedCount === totalCount) {
      clearAll()
    } else {
      setAllItems(checklist.items.map((item) => item.id))
    }
  }

  if (!isLoaded) {
    return (
      <div className="space-y-4">
        {checklist.items.map((item) => (
          <div
            key={item.id}
            className="h-40 animate-pulse rounded-xl border border-border bg-warm-50"
          />
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-card-foreground">
            進捗: {checkedCount}/{totalCount}項目完了
          </span>
          <button
            type="button"
            onClick={handleToggleAll}
            className="text-xs font-medium text-teal-600 hover:text-teal-700"
          >
            {checkedCount === totalCount
              ? "すべてのチェックを外す"
              : "すべてチェックする"}
          </button>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-warm-100">
          <div
            className="h-full rounded-full bg-teal-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {checklist.items.map((item) => (
          <ChecklistItemCard
            key={item.id}
            item={item}
            isChecked={checkedItems.has(item.id)}
            onToggle={() => toggleItem(item.id)}
          />
        ))}
      </div>
    </div>
  )
}
