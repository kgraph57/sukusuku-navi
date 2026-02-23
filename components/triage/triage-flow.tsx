"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  Phone,
  RotateCcw,
  HelpCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import type { TriageSymptom, SeverityResult } from "@/lib/triage/engine";
import { SEVERITY_CONFIG } from "@/lib/triage/engine";
import {
  trackTriageQuestionAnswered,
  trackTriageResultViewed,
} from "@/lib/analytics/events";

interface TriageFlowProps {
  readonly symptom: TriageSymptom;
}

function SeverityCard({ result }: { readonly result: SeverityResult }) {
  const config = SEVERITY_CONFIG[result.severity];

  return (
    <div
      className={`rounded-xl border-2 ${config.borderColor} ${config.bgColor} p-6`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-sm font-bold ${config.color} ${config.bgColor} ${config.borderColor}`}
        >
          {config.label}
        </span>
        {config.phone && (
          <a
            href={`tel:${config.phone}`}
            className={`inline-flex items-center gap-1 rounded-full border bg-white px-3 py-1 text-sm font-bold ${config.color} ${config.borderColor}`}
          >
            <Phone className="h-3.5 w-3.5" />
            {config.phone}
          </a>
        )}
      </div>

      <h2 className={`mt-4 font-heading text-xl font-semibold ${config.color}`}>
        {result.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-foreground">
        {result.description}
      </p>

      <div className="mt-4">
        <h3 className="text-sm font-bold text-foreground">対応方法</h3>
        <ul className="mt-2 space-y-2">
          {result.actions.map((action, index) => (
            <li key={index} className="flex gap-2 text-sm">
              <span className={`mt-0.5 shrink-0 font-bold ${config.color}`}>
                {index + 1}.
              </span>
              <span className="text-foreground">{action}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TriageFlow({ symptom }: TriageFlowProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<SeverityResult | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  const currentQuestion = symptom.questions[currentQuestionIndex];

  const handleAnswer = (answer: "yes" | "no") => {
    if (!currentQuestion) return;
    trackTriageQuestionAnswered(symptom.slug, currentQuestion.id, answer);

    const answerResult =
      answer === "yes" ? currentQuestion.yesResult : currentQuestion.noResult;

    if (typeof answerResult === "string") {
      const nextIndex = symptom.questions.findIndex(
        (q) => q.id === answerResult,
      );
      if (nextIndex !== -1) {
        setCurrentQuestionIndex(nextIndex);
        setShowHelp(false);
      }
    } else {
      const severityResult = answerResult as SeverityResult;
      trackTriageResultViewed(symptom.slug, severityResult.severity);
      setResult(severityResult);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setResult(null);
    setShowHelp(false);
  };

  const progress = result
    ? 100
    : Math.round(((currentQuestionIndex + 1) / symptom.questions.length) * 100);

  return (
    <>
      <section className="bg-gradient-to-b from-sage-50 to-ivory-50 px-4 pb-8 pt-8 sm:pb-12 sm:pt-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/triage"
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-sage-600"
          >
            <ArrowLeft className="h-4 w-4" />
            症状一覧に戻る
          </Link>

          <h1 className="mt-4 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            {symptom.name}の症状チェック
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {symptom.description}
          </p>

          <div className="mt-4 flex gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
            <AlertTriangle className="h-4 w-4 shrink-0 text-yellow-600" />
            <p className="text-sm text-yellow-800">{symptom.ageNote}</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">
                {result
                  ? "判定結果"
                  : `質問 ${currentQuestionIndex + 1}/${symptom.questions.length}`}
              </span>
              <span className="text-muted">{progress}%</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-ivory-100">
              <div
                className="h-full rounded-full bg-sage-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {result ? (
            <div className="space-y-6">
              <SeverityCard result={result} />

              <div className="flex gap-2 rounded-lg border border-border bg-ivory-50 p-4">
                <AlertTriangle className="h-4 w-4 shrink-0 text-muted" />
                <p className="text-xs leading-relaxed text-muted">
                  この判定は医師の診断に代わるものではありません。あくまで受診の目安としてご利用ください。心配な場合はいつでも医療機関にご相談ください。
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-sage-200 bg-white px-6 py-3 text-sm font-medium text-sage-700 transition-colors hover:bg-sage-50"
                >
                  <RotateCcw className="h-4 w-4" />
                  もう一度チェックする
                </button>
                <Link
                  href="/triage"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-medium text-muted transition-colors hover:bg-ivory-50"
                >
                  他の症状をチェックする
                </Link>
              </div>
            </div>
          ) : currentQuestion ? (
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="font-heading text-lg font-semibold text-card-foreground">
                  {currentQuestion.text}
                </h2>

                {showHelp && (
                  <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
                    <p className="text-sm leading-relaxed text-blue-800">
                      {currentQuestion.helpText}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setShowHelp((prev) => !prev)}
                  className="mt-3 inline-flex items-center gap-1 text-xs text-muted hover:text-sage-600"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  {showHelp ? "ヒントを閉じる" : "判断のヒント"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleAnswer("yes")}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-blush-200 bg-blush-50 px-6 py-4 text-base font-bold text-blush-600 transition-all hover:border-blush-300 hover:bg-blush-100"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  はい
                </button>
                <button
                  type="button"
                  onClick={() => handleAnswer("no")}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-sage-200 bg-sage-50 px-6 py-4 text-base font-bold text-sage-700 transition-all hover:border-sage-300 hover:bg-sage-100"
                >
                  <XCircle className="h-5 w-5" />
                  いいえ
                </button>
              </div>
            </div>
          ) : null}

          <div className="mt-8 pt-4">
            <Link
              href="/triage"
              className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-sage-600"
            >
              <ArrowLeft className="h-4 w-4" />
              症状一覧に戻る
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
