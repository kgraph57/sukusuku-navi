import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllEhonSlugs, getEhonBySlug } from "@/lib/ehon";
import { EHON_CATEGORY_LABELS, AGE_GROUP_LABELS } from "@/lib/types";
import { EhonViewer } from "@/components/ehon/ehon-viewer";

interface PageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllEhonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getEhonBySlug(slug);
  if (!book) return {};

  return {
    title: book.title,
    description: book.description,
    openGraph: {
      title: `${book.title} | すくすくナビ えほん`,
      description: book.description,
      type: "article",
      authors: ["岡本賢"],
    },
  };
}

export default async function EhonDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const book = getEhonBySlug(slug);

  if (!book) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-ivory-50 pb-24">
      <nav className="mx-auto max-w-3xl px-4 py-4">
        <Link
          href="/ehon"
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-sage-600"
        >
          &larr; えほん一覧
        </Link>
      </nav>

      <section className="px-4 pb-6 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="rounded-full bg-sage-50 px-3 py-1 text-xs font-medium text-sage-700">
            {EHON_CATEGORY_LABELS[book.category]}
          </span>
          <span className="text-xs text-muted">
            {book.ageGroups.map((ag) => AGE_GROUP_LABELS[ag]).join("・")}
          </span>
        </div>
        <h1 className="font-heading text-2xl font-bold tracking-wide text-sage-800 sm:text-3xl">
          {book.title}
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
          {book.description}
        </p>
      </section>

      <section className="px-4 py-4">
        <EhonViewer title={book.title} pages={book.pages} />
      </section>

      <section className="mx-auto max-w-lg px-4 py-8 text-center">
        <Link
          href="/ehon"
          className="inline-flex min-h-[48px] items-center rounded-full border-2 border-sage-200 px-8 py-3 font-heading text-base font-semibold text-sage-700 transition-all hover:bg-sage-50 hover:border-sage-300 active:scale-95"
        >
          ほかのえほんをみる
        </Link>
      </section>
    </div>
  );
}
