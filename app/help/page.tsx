import type { Metadata } from "next";
import Link from "next/link";
import { WatercolorIcon } from "@/components/icons/watercolor-icon";
import type { WatercolorIconName } from "@/components/icons/watercolor-icon";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata: Metadata = {
  title: "こんなときどうする？── 子育てお助けポータル",
  description:
    "お子さんの症状チェック、病気の情報、相談窓口、手続きガイド。状況に合わせて必要な情報にすぐたどり着けます。",
};

const CATEGORIES = [
  {
    href: "/triage",
    icon: "stethoscope" as WatercolorIconName,
    title: "症状がある",
    description: "熱・咳・嘔吐・発疹など、症状から緊急度を判断",
    color: "border-red-200 bg-red-50",
    iconColor: "text-red-500",
    subLinks: [
      { href: "/triage/fever", label: "発熱" },
      { href: "/triage/vomiting", label: "嘔吐" },
      { href: "/triage/cough", label: "咳" },
      { href: "/triage/rash", label: "発疹" },
      { href: "/triage/seizure", label: "けいれん" },
    ],
  },
  {
    href: "/articles",
    icon: "book" as WatercolorIconName,
    title: "病気について知りたい",
    description: "感染症、アレルギー、予防接種など病気の詳しい解説",
    color: "border-teal-200 bg-teal-50",
    iconColor: "text-teal-600",
    subLinks: [
      { href: "/articles/category/infectious-disease", label: "感染症" },
      { href: "/articles/category/allergy", label: "アレルギー" },
      { href: "/articles/category/skin", label: "皮膚" },
      { href: "/articles/category/vaccination", label: "予防接種" },
    ],
  },
  {
    href: "/consultation",
    icon: "phone" as WatercolorIconName,
    title: "どこに相談すればいい？",
    description: "緊急連絡先、発達相談、育児ストレス相談など港区の窓口",
    color: "border-coral-200 bg-coral-50",
    iconColor: "text-coral-500",
    subLinks: [
      { href: "/emergency", label: "緊急連絡先" },
      { href: "/department-guide", label: "受診科選択" },
      { href: "/clinics", label: "小児科マップ" },
    ],
  },
  {
    href: "/exclusion-periods",
    icon: "clipboard" as WatercolorIconName,
    title: "登園停止・手続き",
    description: "出席停止期間、手続きチェックリスト、支援制度",
    color: "border-purple-200 bg-purple-50",
    iconColor: "text-purple-600",
    subLinks: [
      { href: "/checklists", label: "手続きガイド" },
      { href: "/programs", label: "支援制度" },
      { href: "/simulator", label: "給付金シミュレーター" },
    ],
  },
] as const;

const QUICK_ACTIONS = [
  {
    href: "/ambulance-guide",
    icon: "alert" as WatercolorIconName,
    label: "救急車を呼ぶ",
    color: "border-red-300 bg-red-50 text-red-700",
  },
  {
    href: "/emergency",
    icon: "phone" as WatercolorIconName,
    label: "夜間・休日の診療先",
    color: "border-amber-300 bg-amber-50 text-amber-700",
  },
  {
    href: "/triage/accidental-ingestion",
    icon: "shield" as WatercolorIconName,
    label: "誤飲してしまった",
    color: "border-purple-300 bg-purple-50 text-purple-700",
  },
  {
    href: "/clinics",
    icon: "mappin" as WatercolorIconName,
    label: "小児科を探す",
    color: "border-blue-300 bg-blue-50 text-blue-700",
  },
] as const;

export default function HelpPage() {
  return (
    <main className="pb-20">
      {/* Hero */}
      <section className="bg-ivory-50 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            こんなときどうする？
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            お子さんの状況から必要な情報にたどり着けます。
          </p>
        </div>
      </section>

      {/* クイックアクション */}
      <section className="border-b border-border px-4 py-6 sm:py-8">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`flex items-center gap-2 rounded-xl border-2 p-3 text-xs font-semibold transition-all hover:shadow-sm sm:text-sm ${action.color}`}
            >
              <WatercolorIcon
                name={action.icon}
                size={18}
                className="shrink-0"
              />
              {action.label}
            </Link>
          ))}
        </div>
      </section>

      {/* 4カテゴリ */}
      <section className="px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <SectionHeading subtitle="お子さんの状況に近いものを選んでください">
            状況から探す
          </SectionHeading>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.href}
                className={`rounded-2xl border-2 p-5 transition-shadow hover:shadow-md sm:p-6 ${cat.color}`}
              >
                <Link href={cat.href} className="block">
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/80 ${cat.iconColor}`}
                    >
                      <WatercolorIcon name={cat.icon} size={22} />
                    </span>
                    <div>
                      <h2 className="text-base font-bold text-foreground sm:text-lg">
                        {cat.title}
                      </h2>
                      <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="mt-4 flex flex-wrap gap-1.5 pl-[52px]">
                  {cat.subLinks.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="rounded-full bg-white/70 px-2.5 py-1 text-xs font-medium text-foreground/70 transition-colors hover:bg-white hover:text-foreground"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 緊急帯 */}
      <section className="border-t border-red-100 bg-red-50 px-4 py-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div>
            <p className="text-sm font-bold text-red-700">
              命に関わる緊急時は迷わず119
            </p>
            <p className="mt-1 text-xs text-red-600/70">
              意識がない、呼吸がおかしい、けいれんが止まらない
            </p>
          </div>
          <a
            href="tel:119"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-red-700"
          >
            <WatercolorIcon name="phone" size={20} className="text-white" />
            119
          </a>
        </div>
      </section>
    </main>
  );
}
