"use client";

import { Baby, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-coral-50">
        <Baby className="h-8 w-8 text-coral-500" />
      </div>
      <h1 className="mt-6 font-heading text-xl font-bold text-foreground">
        エラーが発生しました
      </h1>
      <p className="mt-2 max-w-md text-center text-sm text-muted">
        申し訳ございません。ページの読み込み中に問題が発生しました。もう一度お試しください。
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-warm-200">
          エラーコード: {error.digest}
        </p>
      )}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
        >
          <RefreshCw className="h-4 w-4" />
          再読み込み
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-warm-50"
        >
          <Home className="h-4 w-4" />
          トップへ
        </Link>
      </div>
    </div>
  );
}
