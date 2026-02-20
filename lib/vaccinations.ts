import type {
  Vaccine,
  VaccineType,
  VaccinationStep,
  VaccinationFaq,
  VaccinationFaqCategory,
  VaccinationEvidence,
} from "./types";
import vaccinationsData from "@/data/vaccinations.json";

interface VaccinationsData {
  readonly vaccines: readonly Vaccine[];
  readonly steps: readonly VaccinationStep[];
  readonly faq: readonly VaccinationFaq[];
  readonly evidence: readonly VaccinationEvidence[];
}

const data = vaccinationsData as VaccinationsData;

export function getAllVaccines(): readonly Vaccine[] {
  return data.vaccines;
}

export function getVaccineBySlug(slug: string): Vaccine | null {
  return data.vaccines.find((v) => v.slug === slug) ?? null;
}

export function getVaccinesByType(type: VaccineType): readonly Vaccine[] {
  return data.vaccines.filter((v) => v.type === type);
}

export function getVaccinationSteps(): readonly VaccinationStep[] {
  return data.steps;
}

export function getVaccinationFaqs(): readonly VaccinationFaq[] {
  return data.faq;
}

export function getVaccinationEvidence(): readonly VaccinationEvidence[] {
  return data.evidence;
}

export const VACCINE_TYPE_LABELS: Record<VaccineType, string> = {
  routine: "定期接種",
  optional: "任意接種",
} as const;

export const FAQ_CATEGORY_LABELS: Record<VaccinationFaqCategory, string> = {
  schedule: "スケジュール",
  safety: "安全性",
  "side-effects": "副反応",
  practical: "実践的な質問",
} as const;
