import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Stethoscope,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ClipboardList,
  ShieldCheck,
  Activity,
} from "lucide-react";
import {
  getAllCheckups,
  getCheckupBySlug,
  CHECKUP_VENUE_LABELS,
  CHECKUP_VENUE_COLORS,
} from "@/lib/checkups";
import type { Checkup } from "@/lib/types";

interface PageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const checkups = getAllCheckups();
  return checkups.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const checkup = getCheckupBySlug(slug);
  if (!checkup) return { title: "健診が見つかりません" };
  return {
    title: `${checkup.name}の内容と準備`,
    description: checkup.description,
  };
}

export default async function CheckupDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const checkup = getCheckupBySlug(slug);

  if (!checkup) {
    notFound();
  }

  const venueColorClass =
    CHECKUP_VENUE_COLORS[checkup.venue] ??
    "bg-gray-50 text-gray-700 border-gray-200";

  const nextCheckupData: Checkup | null = checkup.nextCheckup
    ? getCheckupBySlug(checkup.nextCheckup)
    : null;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-50 to-warm-50 px-4 pb-8 pt-8 sm:pb-12 sm:pt-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/checkups"
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-teal-600"
          >
            <ArrowLeft className="h-4 w-4" />
            健診一覧に戻る
          </Link>

          <div className="mt-4 flex items-start gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${venueColorClass}`}
            >
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${venueColorClass}`}
                >
                  {CHECKUP_VENUE_LABELS[checkup.venue]}
                </span>
                <span className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                  {checkup.cost}
                </span>
                {checkup.isMandatory ? (
                  <span className="inline-flex rounded-full border border-coral-200 bg-coral-50 px-2.5 py-0.5 text-xs font-medium text-coral-700">
                    必須
                  </span>
                ) : (
                  <span className="inline-flex rounded-full border border-border bg-warm-50 px-2.5 py-0.5 text-xs font-medium text-muted">
                    任意
                  </span>
                )}
              </div>
              <h1 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                {checkup.name}
              </h1>
              <p className="mt-1 text-sm text-muted">{checkup.ageLabel}</p>
            </div>
          </div>

          <p className="mt-4 text-base leading-relaxed text-muted">
            {checkup.description}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* What Doctor Checks Section */}
          {checkup.whatDoctorChecks.length > 0 && (
            <div
              id="doctor-checks"
              className="scroll-mt-20 rounded-xl border border-border bg-card p-6"
            >
              <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-card-foreground">
                <Stethoscope className="h-5 w-5 text-teal-600" />
                医師のチェックポイント
              </h2>
              <div className="mt-4 space-y-0 divide-y divide-border">
                {checkup.whatDoctorChecks.map(
                  (check, i) => (
                    <div
                      key={i}
                      className={`py-5 first:pt-0 last:pb-0 ${
                        i % 2 === 1 ? "bg-warm-50 -mx-6 px-6" : ""
                      }`}
                    >
                      <h3 className="text-sm font-bold text-card-foreground">
                        {check.area}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {check.detail}
                      </p>
                      <div className="mt-3 rounded-lg border border-teal-200 bg-teal-50 p-4">
                        <div className="flex items-start gap-2">
                          <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                          <div>
                            <p className="text-xs font-bold text-teal-700">
                              おかもん先生のひとこと
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-teal-800">
                              {check.doctorNote}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {/* Preparation Section */}
          {checkup.preparation.length > 0 && (
            <div
              id="preparation"
              className="scroll-mt-20 rounded-xl border border-border bg-card p-6"
            >
              <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-card-foreground">
                <ClipboardList className="h-5 w-5 text-teal-600" />
                持ち物・準備リスト
              </h2>
              <ul className="mt-4 space-y-4">
                {checkup.preparation.map((prep, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />
                    <div>
                      <p className="text-sm font-bold text-card-foreground">
                        {prep.item}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted">
                        {prep.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ Section */}
          {checkup.faq.length > 0 && (
            <div
              id="faq"
              className="scroll-mt-20 rounded-xl border border-border bg-card p-6"
            >
              <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-card-foreground">
                <HelpCircle className="h-5 w-5 text-teal-600" />
                よくある質問
              </h2>
              <div className="mt-4 space-y-5">
                {checkup.faq.map((item, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium text-card-foreground">
                      Q. {item.question}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      A. {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips Section */}
          {checkup.tips.length > 0 && (
            <div
              id="tips"
              className="scroll-mt-20 rounded-xl border border-border bg-card p-6"
            >
              <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-card-foreground">
                <Lightbulb className="h-5 w-5 text-teal-600" />
                ワンポイントアドバイス
              </h2>
              <ul className="mt-4 space-y-3">
                {checkup.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                    <p className="text-sm leading-relaxed text-card-foreground">
                      {tip}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Next Checkup CTA */}
          {nextCheckupData && (
            <Link
              href={`/checkups/${nextCheckupData.slug}`}
              className="flex items-center justify-between rounded-xl border border-teal-200 bg-teal-50 p-5 transition-colors hover:bg-teal-100"
            >
              <div>
                <p className="text-xs font-medium text-teal-600">次の健診</p>
                <p className="mt-1 font-heading text-base font-bold text-teal-800">
                  {nextCheckupData.name}
                </p>
                <p className="mt-0.5 text-sm text-teal-600">
                  {nextCheckupData.ageLabel}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-teal-600" />
            </Link>
          )}

          {/* Navigation Footer */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/checkups"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-teal-200 bg-white px-6 py-3 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50"
            >
              <ArrowLeft className="h-4 w-4" />
              健診一覧に戻る
            </Link>
            <Link
              href="/clinics"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-teal-700"
            >
              医療機関を探す
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl border border-border bg-warm-50 p-4">
            <p className="text-xs leading-relaxed text-muted">
              ※
              この情報は一般的な医学情報の提供を目的としており、個別の診断・治療を行うものではありません。
              健診の時期や内容についてはかかりつけの小児科医にご相談ください。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
