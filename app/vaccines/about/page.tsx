import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WatercolorIcon } from "@/components/icons/watercolor-icon";
import { ConcernItem } from "@/components/vaccination/concern-item";
import { SpeechBubble } from "@/components/vaccination/speech-bubble";
import { withBasePath } from "@/lib/image-path";

export const metadata: Metadata = {
  title: "予防接種、はじめの一歩 | すくすくナビ",
  description:
    "そもそも予防接種はなぜ必要？ワクチンへの不安や疑問に、小児科医おかもんが丁寧にお答えします。",
};

export default function VaccineAboutPage() {
  return (
    <>
      {/* ================================================================ */}
      {/*  Hero — 大きなシーンイラスト + シンプルなタイトル                     */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blush-50/60 via-ivory-50 to-white px-4 pb-8 pt-10 sm:pb-12 sm:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <Image
            src={withBasePath("/characters/scenes/vaccine_scene.png")}
            alt="予防接種のシーン"
            width={600}
            height={340}
            className="mx-auto rounded-2xl shadow-lg"
            priority
          />
          <h1 className="mt-8 font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            予防接種、はじめの一歩
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted">
            「本当に必要なの？」「なんのために打つの？」
            <br />
            コンコン先生とうさぎさんが、一緒に考えます。
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  予防接種ってなに？ — 会話形式                                      */}
      {/* ================================================================ */}
      <section className="px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-2xl space-y-5">
          <SpeechBubble
            character="usagi"
            pose="usagi_shy"
            name="うさぎさん"
            direction="right"
          >
            <p>
              コンコン先生、
              <strong>予防接種</strong>ってそもそも何ですか？
              赤ちゃんに注射するのが怖くて......
            </p>
          </SpeechBubble>

          <SpeechBubble
            character="konkon"
            pose="konkon_happy"
            name="コンコン先生"
          >
            <p>
              不安になりますよね。
              予防接種は、体の中で<strong>「予行練習」</strong>
              をすることなんです。
            </p>
          </SpeechBubble>

          {/* ビジュアルステップ: 予行練習の仕組み */}
          <div className="my-8 grid grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                step: "1",
                icon: "syringe" as const,
                label: "ワクチンが入る",
                desc: "弱くしたウイルスが体に入る",
                bg: "bg-blue-50 border-blue-200",
                iconColor: "text-blue-500",
              },
              {
                step: "2",
                icon: "shield" as const,
                label: "体が覚える",
                desc: "免疫が「戦い方」を学ぶ",
                bg: "bg-sage-50 border-sage-200",
                iconColor: "text-sage-500",
              },
              {
                step: "3",
                icon: "check" as const,
                label: "病気をブロック！",
                desc: "本物が来ても対応できる",
                bg: "bg-blush-50 border-blush-200",
                iconColor: "text-blush-500",
              },
            ].map((item) => (
              <div
                key={item.step}
                className={`relative rounded-xl border p-4 text-center ${item.bg}`}
              >
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ${item.iconColor}`}
                >
                  <WatercolorIcon name={item.icon} size={24} />
                </div>
                <p className="mt-3 text-xs font-bold text-foreground sm:text-sm">
                  {item.label}
                </p>
                <p className="mt-1 text-[10px] leading-snug text-muted sm:text-xs">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <SpeechBubble
            character="usagi"
            pose="usagi_happy"
            name="うさぎさん"
            direction="right"
          >
            <p>
              練習だから、本番に強くなるんですね！
            </p>
          </SpeechBubble>

          <SpeechBubble
            character="konkon"
            pose="konkon_thumbsup"
            name="コンコン先生"
          >
            <p>
              その通り！
              予防接種を受けると、病気に<strong>かからなかったり</strong>、
              かかっても<strong>軽くすんだり</strong>します。
            </p>
          </SpeechBubble>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  なぜ必要？ — 大きなビジュアルカード3枚                              */}
      {/* ================================================================ */}
      <section className="border-t border-border bg-gradient-to-b from-sage-50/50 to-ivory-50 px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            なぜ予防接種が必要なの？
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {/* カード1 */}
            <div className="flex flex-col items-center rounded-2xl border border-sage-200 bg-white p-6 text-center shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100">
                <WatercolorIcon
                  name="shield"
                  size={32}
                  className="text-sage-600"
                />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-foreground">
                お子さんを守る
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                お母さんからの免疫は
                <strong className="text-foreground">生後3〜6ヶ月</strong>
                で消えます。そのあとは自分で免疫を作る必要があります。
              </p>
            </div>

            {/* カード2 */}
            <div className="flex flex-col items-center rounded-2xl border border-blush-200 bg-white p-6 text-center shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blush-100">
                <WatercolorIcon
                  name="users"
                  size={32}
                  className="text-blush-500"
                />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-foreground">
                まわりの人も守る
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                まだ打てない赤ちゃんや免疫が弱い方を
                <strong className="text-foreground">みんなの免疫</strong>
                で守る。これが「集団免疫」です。
              </p>
            </div>

            {/* カード3 */}
            <div className="flex flex-col items-center rounded-2xl border border-blue-200 bg-white p-6 text-center shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <WatercolorIcon
                  name="heart"
                  size={32}
                  className="text-blue-500"
                />
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-foreground">
                病気をなくす
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                天然痘はワクチンで
                <strong className="text-foreground">完全に撲滅</strong>。
                ポリオも99%以上減少しました。
              </p>
            </div>
          </div>

          {/* 集団免疫の図解ボックス */}
          <div className="mt-8 rounded-2xl border-2 border-dashed border-blush-300 bg-blush-50/40 p-6 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["konkon_happy", "usagi_cheering", "kuma_strong", "pankun_happy", "pochi_excited", "tama_happy"].map(
                (pose) => (
                  <Image
                    key={pose}
                    src={withBasePath(`/characters/poses/${pose}.png`)}
                    alt=""
                    width={44}
                    height={44}
                    className="drop-shadow-sm"
                  />
                )
              )}
            </div>
            <div className="mx-auto mt-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-blush-300 bg-white">
              <WatercolorIcon
                name="baby"
                size={24}
                className="text-blush-400"
              />
            </div>
            <p className="mt-3 text-sm font-bold text-blush-800">
              みんなで赤ちゃんを守る＝集団免疫
            </p>
            <p className="mt-1 text-xs text-blush-600">
              はしかの場合、地域の<strong>95%以上</strong>
              が免疫を持てば流行を防げます
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  数字で見る — 大きな数字で視覚的インパクト                           */}
      {/* ================================================================ */}
      <section className="px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            予防接種で変わった世界
          </h2>
          <p className="mt-2 text-center text-sm text-muted">
            日本でのワクチン定期接種化による変化
          </p>

          {/* 大きな数字カード */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <p className="font-heading text-4xl font-black text-sage-600 sm:text-5xl">
                90<span className="text-2xl">%</span>
              </p>
              <p className="mt-1 text-xs font-bold text-foreground">
                Hib髄膜炎が減少
              </p>
              <p className="mt-1 text-[10px] text-muted">
                2013年〜 ワクチン定期接種化後
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <p className="font-heading text-4xl font-black text-sage-600 sm:text-5xl">
                85<span className="text-2xl">%</span>
              </p>
              <p className="mt-1 text-xs font-bold text-foreground">
                水ぼうそうが減少
              </p>
              <p className="mt-1 text-[10px] text-muted">
                2014年〜 水痘ワクチン定期接種化後
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <p className="font-heading text-3xl font-black text-sage-600 sm:text-4xl">
                200-300
                <span className="text-lg">万人</span>
              </p>
              <p className="mt-1 text-xs font-bold text-foreground">
                毎年ワクチンが救う命
              </p>
              <p className="mt-1 text-[10px] text-muted">
                WHO推計・世界全体
              </p>
            </div>
          </div>

          {/* 会話でビフォーアフター */}
          <div className="mt-8 space-y-5">
            <SpeechBubble
              character="usagi"
              pose="usagi_sitting"
              name="うさぎさん"
              direction="right"
            >
              <p>
                昔はワクチンがなくても元気に育ったんじゃないですか？
              </p>
            </SpeechBubble>

            <SpeechBubble
              character="konkon"
              pose="konkon_worried"
              name="コンコン先生"
            >
              <p>
                実は......昔は感染症で亡くなる子どもがとても多かったんです。
              </p>
            </SpeechBubble>
          </div>

          {/* ビフォーアフター */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5 text-center">
              <p className="text-xs font-bold text-red-400">Before</p>
              <p className="mt-2 font-heading text-2xl font-black text-red-600">
                600<span className="text-sm">人/年</span>
              </p>
              <p className="mt-1 text-xs text-red-700">
                Hib髄膜炎になる子ども
              </p>
              <p className="mt-2 text-[10px] leading-snug text-red-500">
                5%が死亡・25%に後遺症
              </p>
            </div>
            <div className="rounded-2xl border border-sage-200 bg-sage-50/50 p-5 text-center">
              <p className="text-xs font-bold text-sage-400">After</p>
              <p className="mt-2 font-heading text-2xl font-black text-sage-600">
                90<span className="text-sm">%減</span>
              </p>
              <p className="mt-1 text-xs text-sage-700">
                ワクチン定期接種化後
              </p>
              <p className="mt-2 text-[10px] leading-snug text-sage-500">
                2013年以降、劇的に改善
              </p>
            </div>
          </div>

          <div className="mt-5">
            <SpeechBubble
              character="konkon"
              pose="konkon_reading"
              name="コンコン先生"
            >
              <p>
                今「大丈夫」に見えるのは、
                <strong>みんながワクチンを打ってきたおかげ</strong>なんです。
              </p>
            </SpeechBubble>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  今、何が起きている？ — アラートカード                               */}
      {/* ================================================================ */}
      <section className="border-t border-border bg-amber-50/30 px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-center gap-3">
            <Image
              src={withBasePath("/characters/poses/konkon_surprised.png")}
              alt="驚くコンコン先生"
              width={64}
              height={64}
              className="drop-shadow-sm"
            />
            <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
              でも今、世界では......
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            {/* はしか */}
            <div className="flex gap-4 rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                <WatercolorIcon
                  name="alert"
                  size={28}
                  className="text-amber-500"
                />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-foreground">
                  はしかの再流行
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  2019年、患者数が
                  <strong className="text-amber-700">87万人</strong>
                  を超え、過去23年で最悪に。接種率が下がった地域で流行が拡大。
                </p>
              </div>
            </div>

            {/* HPV */}
            <div className="flex gap-4 rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                <WatercolorIcon
                  name="alert"
                  size={28}
                  className="text-amber-500"
                />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-foreground">
                  日本のHPVワクチン問題
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  接種率が
                  <strong className="text-amber-700">70% → 0.6%</strong>
                  に急落。約9年間、多くの方が接種の機会を逃しました。
                </p>
              </div>
            </div>

            {/* WHO */}
            <div className="flex gap-4 rounded-2xl border border-red-200 bg-white p-5 shadow-sm">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-100">
                <WatercolorIcon
                  name="alert"
                  size={28}
                  className="text-red-500"
                />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-red-700">
                  WHOが「世界の10大脅威」に認定
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  2019年、WHOは
                  <strong className="text-red-600">「ワクチン忌避」</strong>
                  を世界の健康に対する10大脅威の1つに挙げました。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  不安ありませんか？ — 大きな共感セクション                            */}
      {/* ================================================================ */}
      <section className="relative px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <div className="flex justify-center gap-4">
              <Image
                src={withBasePath("/characters/poses/kuma_gentle.png")}
                alt="くまくん"
                width={80}
                height={80}
                className="drop-shadow-sm"
              />
              <Image
                src={withBasePath("/characters/poses/usagi_shy.png")}
                alt="うさぎさん"
                width={72}
                height={72}
                className="drop-shadow-sm"
              />
            </div>
            <h2 className="mt-6 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
              不安や疑問、ありませんか？
            </h2>
          </div>

          <div className="mt-6 space-y-5">
            <SpeechBubble
              character="usagi"
              pose="usagi_shy"
              name="うさぎさん"
              direction="right"
            >
              <p>
                ここまで読んでも、やっぱり心配です......
              </p>
            </SpeechBubble>

            <SpeechBubble
              character="konkon"
              pose="konkon_happy"
              name="コンコン先生"
            >
              <p>
                <strong>それはとても自然なことですよ。</strong>
                大切なお子さんのことだからこそ、慎重になるのは当然です。
              </p>
            </SpeechBubble>

            <div className="rounded-2xl border-2 border-sage-200 bg-sage-50/50 p-5 text-center">
              <p className="text-sm font-bold text-sage-800">
                日本小児科学会より
              </p>
              <p className="mt-2 text-base font-semibold leading-relaxed text-sage-900">
                「保護者が不安に思うのは、
                <br className="sm:hidden" />
                お子さんのことを
                <br className="hidden sm:block" />
                真剣に考えている証拠」
              </p>
            </div>

            <SpeechBubble
              character="konkon"
              pose="konkon_reading"
              name="コンコン先生"
            >
              <p>
                よくある心配について、一つずつお話ししますね。
                <strong>
                  「こんなこと聞いていいのかな？」ということこそ、聞いてほしい
                </strong>
                です。
              </p>
            </SpeechBubble>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  よくある心配 — Q&A（キャラ付き）                                    */}
      {/* ================================================================ */}
      <section className="border-t border-border bg-ivory-100/50 px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            よくある心配にお答えします
          </h2>

          <div className="mt-8 space-y-3">
            <ConcernItem question="副反応が心配です">
              <p>
                接種部位が赤くなったり、微熱が出ることはあります（約10〜30%）。
                これは<strong className="text-foreground">体が免疫をつくっている証拠</strong>
                で、通常1〜2日でおさまります。
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center">
                  <p className="text-[10px] text-red-500">はしか感染 → 脳炎</p>
                  <p className="mt-1 text-lg font-black text-red-600">
                    1/1,000
                  </p>
                </div>
                <div className="rounded-lg border border-sage-200 bg-sage-50 p-3 text-center">
                  <p className="text-[10px] text-sage-500">ワクチン重篤副反応</p>
                  <p className="mt-1 text-lg font-black text-sage-600">
                    1-2/100万
                  </p>
                </div>
              </div>
              <p className="text-xs">
                万一の場合は<strong className="text-foreground">健康被害救済制度</strong>
                で補償を受けられます。
              </p>
            </ConcernItem>

            <ConcernItem question="自然にかかったほうが強い免疫がつく？">
              <p>
                自然感染でも免疫はつきますが、
                <strong className="text-foreground">「病気にかかる」リスク</strong>
                を伴います。
              </p>
              <div className="space-y-1.5">
                {[
                  "おたふくかぜ → 1,000人に1人が一生治らない難聴",
                  "はしか → 脳炎・肺炎のリスク",
                  "百日咳 → 乳児は命に関わることも",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 rounded-lg border border-red-100 bg-red-50/50 px-3 py-2"
                  >
                    <WatercolorIcon
                      name="alert"
                      size={14}
                      className="mt-0.5 shrink-0 text-red-400"
                    />
                    <p className="text-xs text-red-700">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs">
                ワクチンは重篤な合併症のリスクなしに免疫をつける
                <strong className="text-foreground">安全な方法</strong>です。
              </p>
            </ConcernItem>

            <ConcernItem question="ワクチンの成分が心配です">
              <p>
                添加物の量は<strong className="text-foreground">極めて微量</strong>
                で安全性が検証済みです。
              </p>
              <div className="rounded-lg border border-sage-200 bg-sage-50 p-3">
                <p className="text-xs text-sage-800">
                  チメロサール（エチル水銀）は現在ほとんどの小児用ワクチンから除去。
                  仮に含まれていても、
                  <strong>魚の刺身1切れより少ない量</strong>です。
                </p>
              </div>
              <p className="text-xs">
                ワクチンは開発から承認まで<strong className="text-foreground">10年以上</strong>
                かけて安全性を確認。承認後も継続監視されています。
              </p>
            </ConcernItem>

            <ConcernItem question="同時に何本も打って大丈夫？">
              <p>
                <strong className="text-foreground">日本小児科学会が推奨</strong>
                しています。赤ちゃんの免疫は理論上
                <strong className="text-foreground">約1万種類</strong>
                のワクチンに同時対応できます。
              </p>
              <p className="text-xs">
                4本打っても副反応が4倍になることはありません。
                むしろ1本ずつだと免疫獲得が遅れるリスクがあります。
              </p>
              <p className="text-xs">
                <Link
                  href="/articles/simultaneous-vaccination-safety"
                  className="font-medium text-sage-600 underline hover:text-sage-800"
                >
                  詳しくは → 「同時接種の安全性を解説」（Vol.19）
                </Link>
              </p>
            </ConcernItem>

            <ConcernItem question="ネットで怖い情報を見ました">
              <p>
                「ワクチンが自閉症の原因」という説は、
                <strong className="text-foreground">データ捏造が発覚</strong>
                し2010年に撤回された論文が元です。
                数百万人規模の研究で因果関係なしと証明済みです。
              </p>
              <div className="rounded-lg border border-sage-200 bg-sage-50 p-3">
                <p className="mb-1 text-xs font-bold text-sage-800">
                  信頼できる情報源
                </p>
                <div className="flex flex-wrap gap-2">
                  {["厚生労働省", "日本小児科学会", "Know VPD!", "国立感染症研究所"].map(
                    (source) => (
                      <span
                        key={source}
                        className="rounded-full border border-sage-200 bg-white px-2 py-0.5 text-[10px] font-medium text-sage-700"
                      >
                        {source}
                      </span>
                    )
                  )}
                </div>
              </div>
            </ConcernItem>

            <ConcernItem question="アレルギーがあるのですが......">
              <p>
                アレルギーがあっても
                <strong className="text-foreground">ほとんどの場合接種できます</strong>
                。卵アレルギーでもインフルエンザワクチンはOKです。
              </p>
              <p className="text-xs">
                心配な場合は接種前にかかりつけ医にお伝えください。
                最善の方法を一緒に考えます。
              </p>
            </ConcernItem>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  おかもん先生からのメッセージ — 手紙風                               */}
      {/* ================================================================ */}
      <section className="px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-2xl border-2 border-sage-200 bg-gradient-to-br from-sage-50/80 to-ivory-50 shadow-sm">
            {/* 手紙ヘッダー */}
            <div className="border-b border-sage-200 bg-sage-100/50 px-6 py-4 text-center">
              <p className="text-xs font-medium tracking-wider text-sage-600">
                おかもん先生からのメッセージ
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex justify-center">
                <Image
                  src={withBasePath(
                    "/characters/illustrations/about_konkon_doctor.png"
                  )}
                  alt="おかもん先生"
                  width={100}
                  height={100}
                  className="drop-shadow-sm"
                />
              </div>

              <div className="mt-6 space-y-4 text-center text-sm leading-relaxed text-muted sm:text-base">
                <p>予防接種について不安を感じている</p>
                <p>お父さん、お母さんへ。</p>
                <p className="text-base font-semibold text-foreground sm:text-lg">
                  「打ったほうがいいのかな？」と迷う気持ちは
                  <br />
                  お子さんのことを真剣に考えている証です。
                </p>
                <p>
                  私も小児科医として
                  <br />
                  自分の子どもたちに予防接種を受けさせています。
                  <br />
                  病気の怖さを現場で見てきたからです。
                </p>
                <p className="font-semibold text-foreground">
                  心配なことがあれば
                  <br />
                  遠慮なくかかりつけの小児科医にご相談ください。
                </p>
                <p className="text-lg font-bold text-sage-700">
                  お子さんの健康を、一緒に守っていきましょう。
                </p>
              </div>

              <p className="mt-6 text-right text-sm text-sage-600">
                愛育病院 小児科 おかもん
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  CTA — 次のアクション                                              */}
      {/* ================================================================ */}
      <section className="border-t border-border bg-gradient-to-b from-sage-50/50 to-white px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-center gap-4">
            <Image
              src={withBasePath("/characters/poses/konkon_guts.png")}
              alt="コンコン先生"
              width={72}
              height={72}
              className="drop-shadow-sm"
            />
            <Image
              src={withBasePath("/characters/poses/usagi_cheering.png")}
              alt="うさぎさん"
              width={64}
              height={64}
              className="drop-shadow-sm"
            />
          </div>
          <p className="mt-4 text-center text-sm font-medium text-foreground">
            もっと詳しく知りたくなったら
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/vaccines"
              className="flex flex-1 items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-sage-200 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage-50 text-sage-600">
                <WatercolorIcon name="syringe" size={24} />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-card-foreground">
                  ワクチン一覧
                </h3>
                <p className="text-xs text-muted">
                  全12種類の詳細とスケジュール
                </p>
              </div>
            </Link>
            <Link
              href="/clinics"
              className="flex flex-1 items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-sage-200 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <WatercolorIcon name="mappin" size={24} />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-card-foreground">
                  小児科を探す
                </h3>
                <p className="text-xs text-muted">港区の小児科マップ</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  参考文献（折りたたみ）                                             */}
      {/* ================================================================ */}
      <section className="border-t border-border px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <details className="group">
            <summary className="flex cursor-pointer items-center gap-2 text-xs font-medium text-muted hover:text-foreground">
              <WatercolorIcon name="book" size={14} />
              参考文献を見る
              <WatercolorIcon
                name="chevron_down"
                size={12}
                className="transition-transform group-open:rotate-180"
              />
            </summary>
            <ol className="mt-3 list-inside list-decimal space-y-1.5 text-[10px] leading-relaxed text-muted">
              <li>WHO: Immunization coverage fact sheet, 2024</li>
              <li>WHO: Ten threats to global health in 2019</li>
              <li>
                日本小児科学会「予防接種の同時接種に対する考え方」2011年、2020年改訂
              </li>
              <li>
                Offit PA, et al. Pediatrics 2002; 109(1): 124-129
              </li>
              <li>厚生労働省: 予防接種の副反応報告制度</li>
              <li>国立感染症研究所: 感染症発生動向調査</li>
              <li>
                Taylor LE, et al. Vaccine 2014; 32(29): 3623-3629
              </li>
              <li>CDC: Pink Book (Vaccine-Preventable Diseases)</li>
            </ol>
          </details>
        </div>
      </section>
    </>
  );
}
