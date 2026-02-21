import { Baby, Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-50">
        <Baby className="h-8 w-8 text-sage-600" />
      </div>
      <h1 className="mt-6 font-heading text-xl font-bold text-foreground">
        ページが見つかりません
      </h1>
      <p className="mt-2 max-w-md text-center text-sm text-muted">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-sage-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sage-700"
        >
          <Home className="h-4 w-4" />
          トップへ
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-ivory-50"
        >
          <Search className="h-4 w-4" />
          検索する
        </Link>
      </div>
    </div>
  );
}
