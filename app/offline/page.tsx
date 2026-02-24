"use client";

import Link from "next/link";
import { WatercolorIcon } from "@/components/icons/watercolor-icon";

export default function OfflinePage() {
  return (
    <>
      <title>オフライン | すくすくナビ</title>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage-50">
          <WatercolorIcon name="refresh" size={40} className="text-sage-400" />
        </div>
        <h1 className="mt-6 font-heading text-2xl font-bold text-foreground">
          オフラインです
        </h1>
        <p className="mt-3 max-w-sm text-center text-base leading-relaxed text-muted">
          インターネットに接続できません。
          Wi-Fiやモバイルデータ通信をご確認ください。
        </p>
        <p className="mt-2 max-w-sm text-center text-sm leading-relaxed text-muted">
          以前に閲覧したページは、オフラインでもご覧いただける場合があります。
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-sage-600 px-7 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sage-700 active:bg-sage-800"
          >
            <WatercolorIcon name="home" size={16} />
            トップに戻る
          </Link>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-border px-7 py-3 text-sm font-medium text-foreground transition-colors hover:bg-ivory-50 active:bg-ivory-100"
          >
            <WatercolorIcon name="refresh" size={16} />
            再読み込み
          </button>
        </div>

        {/* Emergency info always available */}
        <div className="mt-12 w-full max-w-sm rounded-xl border border-red-200 bg-red-50/50 p-5 text-center">
          <p className="text-sm font-semibold text-red-800">
            緊急時の連絡先
          </p>
          <div className="mt-3 space-y-2 text-sm">
            <a
              href="tel:119"
              className="block font-bold text-red-700 underline"
            >
              119番（救急車）
            </a>
            <a
              href="tel:0570064556"
              className="block text-red-700 underline"
            >
              #8000（小児救急電話相談）
            </a>
            <a
              href="tel:0335219900"
              className="block text-red-700 underline"
            >
              #7119（救急安心センター東京）
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
