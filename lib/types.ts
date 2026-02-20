export type AgeGroup =
  | "0-6mo"
  | "6-12mo"
  | "1-3yr"
  | "3-6yr"
  | "6-12yr"
  | "all";

export type ArticleCategory =
  | "infectious-disease"
  | "allergy"
  | "skin"
  | "vaccination"
  | "development"
  | "nutrition"
  | "emergency"
  | "checkup"
  | "mental-health"
  | "municipal-service";

export interface ArticleFrontmatter {
  readonly slug: string;
  readonly vol: number;
  readonly title: string;
  readonly description: string;
  readonly category: ArticleCategory;
  readonly ageGroups: readonly AgeGroup[];
  readonly publishedAt: string;
  readonly keyPoints: readonly string[];
  readonly qaCount: number;
  readonly referenceCount: number;
  readonly relatedSlugs: readonly string[];
}

export interface Article {
  readonly frontmatter: ArticleFrontmatter;
  readonly content: string;
}

export interface ProgramApplicationStep {
  readonly step: number;
  readonly title: string;
  readonly description: string;
  readonly tip: string | null;
}

export interface ProgramRequiredDocument {
  readonly name: string;
  readonly obtainHow: string;
  readonly notes: string | null;
  readonly downloadUrl: string | null;
}

export interface ProgramApplicationMethod {
  readonly method: "online" | "counter" | "mail";
  readonly label: string;
  readonly description: string;
  readonly url: string | null;
  readonly address: string | null;
  readonly hours: string | null;
}

export interface ProgramFaq {
  readonly question: string;
  readonly answer: string;
}

export interface Program {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly category: "medical" | "childcare" | "financial" | "support";
  readonly eligibility: ProgramEligibility;
  readonly amount: ProgramAmount;
  readonly applicationUrl: string;
  readonly deadline: string | null;
  readonly notes: string;
  readonly applicationSteps?: ReadonlyArray<ProgramApplicationStep>;
  readonly requiredDocuments?: ReadonlyArray<ProgramRequiredDocument>;
  readonly applicationMethods?: ReadonlyArray<ProgramApplicationMethod>;
  readonly faq?: ReadonlyArray<ProgramFaq>;
}

export interface ProgramEligibility {
  readonly maxAge: number | null;
  readonly minAge: number | null;
  readonly incomeLimit: number | null;
  readonly residency: "minato" | "tokyo" | "japan";
  readonly conditions: readonly string[];
}

export interface ProgramAmount {
  readonly type: "fixed" | "variable" | "subsidy";
  readonly value: number | null;
  readonly unit: "yen" | "percent" | "yen-per-month";
  readonly description: string;
}

export interface SimulatorInput {
  readonly children: readonly ChildInfo[];
  readonly householdIncome: IncomeRange;
  readonly householdType: "two-parent" | "single-parent";
  readonly workStatus: "both-working" | "one-working" | "neither";
  readonly district: string;
}

export interface ChildInfo {
  readonly birthDate: string;
  readonly careType: "home" | "nursery" | "kindergarten" | "school";
}

export type IncomeRange =
  | "under-300"
  | "300-500"
  | "500-700"
  | "700-1000"
  | "over-1000";

export interface SimulatorResult {
  readonly totalAnnualEstimate: number;
  readonly eligiblePrograms: readonly EligibleProgram[];
}

export interface EligibleProgram {
  readonly program: Program;
  readonly estimatedAmount: number;
  readonly actionItems: readonly string[];
}

export type TriageSeverity =
  | "emergency"
  | "call-8000"
  | "next-day"
  | "home-care";

export interface TriageResult {
  readonly severity: TriageSeverity;
  readonly title: string;
  readonly description: string;
  readonly actions: readonly string[];
}

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  "infectious-disease": "感染症",
  allergy: "アレルギー",
  skin: "皮膚",
  vaccination: "予防接種",
  development: "発達",
  nutrition: "栄養・食事",
  emergency: "救急",
  checkup: "健診",
  "mental-health": "メンタルヘルス",
  "municipal-service": "行政サービス",
} as const;

export const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  "0-6mo": "0〜6ヶ月",
  "6-12mo": "6〜12ヶ月",
  "1-3yr": "1〜3歳",
  "3-6yr": "3〜6歳",
  "6-12yr": "6〜12歳",
  all: "全年齢",
} as const;
