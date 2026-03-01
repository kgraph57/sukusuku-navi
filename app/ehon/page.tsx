import type { Metadata } from "next";
import { getAllEhon } from "@/lib/ehon";
import { EhonCard } from "@/components/ehon/ehon-card";

export const metadata: Metadata = {
  title: "えほん",
  description:
    "親子でいっしょに読める健康えほん。手洗い・はみがき・びょういんなど、小さなお子さまに大切な生活習慣をたのしく学べます。",
  openGraph: {
    title: "えほん | すくすくナビ",
    description:
      "親子でいっしょに読める健康えほん。手洗い・はみがき・びょういんなど、小さなお子さまに大切な生活習慣をたのしく学べます。",
  },
};

export default function EhonListPage() {
  const books = getAllEhon();

  return (
    <div className="min-h-screen bg-ivory-50 pb-24">
      <section className="bg-gradient-to-b from-teal-50 to-ivory-50 px-4 pb-12 pt-10 text-center">
        <p className="mb-3 text-5xl" aria-hidden="true">
          📖
        </p>
        <h1 className="font-heading text-3xl font-bold tracking-wide text-sage-800">
          えほん
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-muted">
          おやこで いっしょに よんでみよう。
          <br />
          たのしみながら からだのことを まなべるよ。
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <EhonCard key={book.slug} book={book} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-lg px-4 py-8">
        <div className="rounded-2xl bg-blush-50 p-6">
          <h2 className="mb-3 font-heading text-lg font-bold text-blush-600">
            よみきかせのコツ
          </h2>
          <ul className="space-y-2 text-sm leading-relaxed text-gray-700">
            <li>
              <strong>ゆっくり、はっきり。</strong>
              お子さんのペースに合わせて読みましょう
            </li>
            <li>
              <strong>いっしょにやってみよう。</strong>
              手洗いやはみがきは、読んだあと実際にやってみると効果的です
            </li>
            <li>
              <strong>くりかえしが大切。</strong>
              何度も読むことで自然に生活習慣が身につきます
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
