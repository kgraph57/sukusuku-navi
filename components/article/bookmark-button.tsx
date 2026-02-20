"use client";

import { useState, useEffect, useCallback } from "react";
import { Bookmark } from "lucide-react";
import {
  getFamilyProfile,
  saveFamilyProfile,
  createFamilyProfile,
  toggleSavedArticle,
} from "@/lib/family-store";

interface BookmarkButtonProps {
  readonly articleSlug: string;
}

export function BookmarkButton({ articleSlug }: BookmarkButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const profile = getFamilyProfile();
    if (profile != null) {
      setIsSaved(profile.savedArticles.includes(articleSlug));
    }
  }, [articleSlug]);

  const handleToggle = useCallback(() => {
    const profile = getFamilyProfile() ?? createFamilyProfile();
    const updated = toggleSavedArticle(profile, articleSlug);
    saveFamilyProfile(updated);
    setIsSaved(updated.savedArticles.includes(articleSlug));
  }, [articleSlug]);

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
        isSaved
          ? "bg-teal-100 text-teal-700 hover:bg-teal-200"
          : "bg-warm-100 text-muted hover:bg-warm-200 hover:text-foreground"
      }`}
      aria-label={isSaved ? "ブックマークを解除" : "ブックマークに追加"}
    >
      <Bookmark
        className={`h-3.5 w-3.5 ${isSaved ? "fill-teal-600" : ""}`}
      />
      {isSaved ? "保存済み" : "保存する"}
    </button>
  );
}
