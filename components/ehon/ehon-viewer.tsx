"use client";

import { useState, useCallback, useRef } from "react";
import type { EhonPage } from "@/lib/types";

interface EhonViewerProps {
  readonly title: string;
  readonly pages: readonly EhonPage[];
}

export function EhonViewer({ title, pages }: EhonViewerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalPages = pages.length;
  const page = pages[currentPage];

  const goNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const goPrev = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      touchEndX.current = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX.current;
      const threshold = 50;

      if (diff > threshold) {
        goNext();
      } else if (diff < -threshold) {
        goPrev();
      }
    },
    [goNext, goPrev],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    },
    [goNext, goPrev],
  );

  return (
    <div
      className="mx-auto max-w-lg"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`${title} - ${currentPage + 1}ページ目 / ${totalPages}ページ`}
    >
      <div
        className={`relative overflow-hidden rounded-3xl shadow-lg ${page.bgColor} transition-colors duration-500`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex min-h-[420px] flex-col items-center justify-center px-8 py-12 sm:min-h-[500px]">
          <span
            className="mb-8 text-8xl sm:text-9xl"
            role="img"
            aria-hidden="true"
          >
            {page.illustration}
          </span>

          <p className="whitespace-pre-line text-center font-heading text-xl leading-loose tracking-widest text-gray-800 sm:text-2xl">
            {page.text}
          </p>
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`h-2 rounded-full transition-all ${
                i === currentPage
                  ? "w-6 bg-sage-500"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setCurrentPage(i)}
              aria-label={`${i + 1}ページ目へ`}
              aria-current={i === currentPage ? "page" : undefined}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between px-2">
        <button
          type="button"
          onClick={goPrev}
          disabled={currentPage === 0}
          className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full bg-white text-2xl shadow-md transition-all hover:shadow-lg active:scale-95 disabled:opacity-30 disabled:shadow-none"
          aria-label="まえのページ"
        >
          &larr;
        </button>

        <span className="font-heading text-sm text-muted">
          {currentPage + 1} / {totalPages}
        </span>

        <button
          type="button"
          onClick={goNext}
          disabled={currentPage === totalPages - 1}
          className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full bg-sage-600 text-2xl text-white shadow-md transition-all hover:bg-sage-700 hover:shadow-lg active:scale-95 disabled:opacity-30 disabled:shadow-none"
          aria-label="つぎのページ"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
