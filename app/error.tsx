"use client"

;

import Link from "next/link";
import { WatercolorIcon } from "@/components/icons/watercolor-icon";

export default function ErrorPage({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blush-50">
        <WatercolorIcon name="baby" size={32} className="text-blush-500" />
      </div>
      <h1 className="mt-6 font-heading text-xl font-semibold text-foreground">
        エラーが発生しました
      </h1>
      <p className="mt-2 max-w-md text-center text-sm text-muted">
        申し訳ございません。ページの読み込み中に問題が発生しました。もう一度お試しください。
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-ivory-200">
          エラーコード: {error.digest}
        </p>
      )}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg bg-sage-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sage-700"
        >
          <WatercolorIcon name="plus" size={16} />
          再読み込み
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-ivory-50"
        >
          <WatercolorIcon name="home" size={16} />
          トップへ
        </Link>
      </div>
    </div>
  );
}
