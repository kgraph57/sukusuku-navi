import type { Ehon, EhonCategory, AgeGroup } from "@/lib/types";
import ehonData from "@/data/ehon.json";

const books: readonly Ehon[] = ehonData.books as readonly Ehon[];

export function getAllEhon(): readonly Ehon[] {
  return books;
}

export function getEhonBySlug(slug: string): Ehon | null {
  return books.find((b) => b.slug === slug) ?? null;
}

export function getEhonByCategory(category: EhonCategory): readonly Ehon[] {
  return books.filter((b) => b.category === category);
}

export function getEhonByAgeGroup(ageGroup: AgeGroup): readonly Ehon[] {
  return books.filter((b) => b.ageGroups.includes(ageGroup));
}

export function getAllEhonSlugs(): readonly string[] {
  return books.map((b) => b.slug);
}
