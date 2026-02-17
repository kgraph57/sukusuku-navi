interface QaBubbleProps {
  readonly speaker: string
  readonly children: React.ReactNode
}

function isDoctor(speaker: string): boolean {
  return speaker.includes("おかもん") || speaker.includes("先生")
}

export function QaBubble({ speaker, children }: QaBubbleProps) {
  const doctor = isDoctor(speaker)

  if (doctor) {
    return (
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
          医
        </div>
        <div className="max-w-[80%]">
          <p className="mb-1 text-xs font-medium text-teal-600">{speaker}</p>
          <div className="rounded-2xl rounded-tl-sm bg-teal-50 px-4 py-3 text-sm leading-relaxed text-foreground">
            {children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-row-reverse items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral-100 text-sm font-bold text-coral-600">
        親
      </div>
      <div className="max-w-[80%]">
        <p className="mb-1 text-right text-xs font-medium text-coral-500">
          {speaker}
        </p>
        <div className="rounded-2xl rounded-tr-sm bg-coral-50 px-4 py-3 text-sm leading-relaxed text-foreground">
          {children}
        </div>
      </div>
    </div>
  )
}

interface QaBlockProps {
  readonly children: React.ReactNode
}

export function QaBlock({ children }: QaBlockProps) {
  return (
    <div className="my-6 space-y-4 rounded-xl border border-border bg-warm-50 p-4 sm:p-6">
      {children}
    </div>
  )
}
