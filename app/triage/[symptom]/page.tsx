import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSymptoms, getSymptomBySlug } from "@/lib/triage/engine";
import { TriageFlow } from "@/components/triage/triage-flow";
import { SITE_URL } from "@/lib/constants";

interface PageProps {
  readonly params: Promise<{ symptom: string }>;
}

export async function generateStaticParams() {
  const symptoms = getAllSymptoms();
  return symptoms.map((s) => ({
    symptom: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { symptom: slug } = await params;
  const symptom = getSymptomBySlug(slug);
  if (!symptom) return { title: "症状が見つかりません" };

  return {
    title: `${symptom.name} - 症状チェック`,
    description: symptom.description,
  };
}

export default async function TriageSymptomPage({ params }: PageProps) {
  const { symptom: slug } = await params;
  const symptom = getSymptomBySlug(slug);

  if (!symptom) {
    notFound();
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "受診判断ガイド",
        item: `${SITE_URL}/triage`,
      },
      { "@type": "ListItem", position: 3, name: symptom.name },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TriageFlow symptom={symptom} />
    </>
  );
}
