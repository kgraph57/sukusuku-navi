"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { withBasePath } from "@/lib/image-path";

interface MangaStep {
  num: string;
  image: string;
  alt: string;
  title: string;
  desc: string;
  color: string;
  labelColor: string;
}

const steps: MangaStep[] = [
  {
    num: "01",
    image: "/characters/vaccine-steps/step01_vaccine_enters.png",
    alt: "コンコン先生がうさぎさんにワクチンを注射しているイラスト",
    title: "ワクチンが入る",
    desc: "弱くしたウイルスを体に入れる",
    color: "bg-sage-50",
    labelColor: "text-sage-500",
  },
  {
    num: "02",
    image: "/characters/vaccine-steps/step02_body_learns.png",
    alt: "体の中で免疫細胞がウイルスと戦い方を練習しているイラスト",
    title: "体が覚える",
    desc: "免疫が「戦い方」を学ぶ",
    color: "bg-blush-50",
    labelColor: "text-blush-400",
  },
  {
    num: "03",
    image: "/characters/vaccine-steps/step03_protected.png",
    alt: "シールドに守られたうさぎさんがウイルスをはじき返しているイラスト",
    title: "病気をブロック",
    desc: "本物が来ても、もう大丈夫",
    color: "bg-sage-50",
    labelColor: "text-sage-500",
  },
];

function MangaPanel({ step, index }: { step: MangaStep; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* 漫画コマ風カード */}
      <div className="group relative overflow-hidden rounded-2xl border-2 border-border/60 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* ステップ番号バッジ */}
        <div
          className={`absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md`}
        >
          <span className={`font-heading text-sm font-bold ${step.labelColor}`}>
            {step.num}
          </span>
        </div>

        {/* イラスト部分 */}
        <div className={`relative ${step.color} overflow-hidden`} style={{ height: '240px' }}>
          <Image
            src={withBasePath(step.image)}
            alt={step.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 80vw, 320px"
          />
        </div>

        {/* テキスト部分 */}
        <div className="px-6 pb-6 pt-4 text-center">
          <h3 className="font-heading text-xl font-semibold text-foreground">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted/70">
            {step.desc}
          </p>
        </div>

        {/* 矢印（最後以外） */}
        {index < steps.length - 1 && (
          <div className="absolute -right-4 top-1/2 z-20 hidden -translate-y-1/2 sm:block">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-400 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function HowItWorksManga() {
  return (
    <section className="bg-ivory-100/40 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        {/* ヘッダー */}
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted/60">
          How it works
        </p>
        <h2 className="mt-3 text-center font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          ワクチンの仕組み
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-center text-sm leading-loose text-muted/60">
          3つのステップで、体を守る仕組みを学ぼう
        </p>

        {/* 漫画コマグリッド */}
        <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {steps.map((step, index) => (
            <MangaPanel key={step.num} step={step} index={index} />
          ))}
        </div>

        {/* モバイル用の矢印（縦） */}
        <div className="mt-2 flex flex-col items-center gap-1 sm:hidden">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-400 shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 rotate-90"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
