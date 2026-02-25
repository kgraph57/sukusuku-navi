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
      {/* ─────────────────────────────────────────────────────────── */}
      {/*  Hero — フルワイド、シーンイラストが主役                       */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <Image
            src={withBasePath("/characters/scenes/vaccine_scene.png")}
            alt="予防接種のシーン"
            width={520}
            height={300}
            className="mx-auto"
            priority
          />
          <h1 className="mt-12 font-heading text-4xl font-semibold leading-snug tracking-tight text-foreground sm:text-5xl">
            予防接種、
            <br />
            はじめの一歩。
          </h1>
          <p className="mx-auto mt-6 max-w-sm text-base leading-loose text-muted/70">
            「本当に必要なの？」「こわくないの？」
            <br />
            コンコン先生と、一緒に考えてみましょう。
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  導入 — 会話で始まる                                         */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-border/50 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-xl space-y-10">
          <SpeechBubble
            character="usagi"
            pose="usagi_shy"
            name="うさぎさん"
            direction="right"
          >
            <p>
              先生、<strong className="text-foreground">予防接種</strong>
              ってそもそもなんですか？
              <br />
              赤ちゃんに注射って、こわくて......
            </p>
          </SpeechBubble>

          <SpeechBubble
            character="konkon"
            pose="konkon_happy"
            name="コンコン先生"
            size="large"
          >
            <p>
              そうですよね。
              <br />
              <strong className="text-foreground">
                ひとことで言うと「体の予行練習」です。
              </strong>
            </p>
          </SpeechBubble>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  3ステップ — フルワイド、大きなアイコン                        */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="bg-ivory-100/40 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted/60">
            How it works
          </p>
          <h2 className="mt-3 text-center font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            ワクチンの仕組み
          </h2>

          <div className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
            {[
              {
                num: "01",
                icon: "syringe" as const,
                title: "ワクチンが入る",
                desc: "弱くしたウイルスを体に入れる",
              },
              {
                num: "02",
                icon: "shield" as const,
                title: "体が覚える",
                desc: "免疫が「戦い方」を学ぶ",
              },
              {
                num: "03",
                icon: "check" as const,
                title: "病気をブロック",
                desc: "本物が来ても、もう大丈夫",
              },
            ].map((s) => (
              <div key={s.num} className="text-center">
                <p className="font-heading text-5xl font-extralight tracking-tight text-sage-300">
                  {s.num}
                </p>
                <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                  <WatercolorIcon
                    name={s.icon}
                    size={24}
                    className="text-sage-500"
                  />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted/70">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  会話 — 理解                                                */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-xl space-y-10">
          <SpeechBubble
            character="usagi"
            pose="usagi_happy"
            name="うさぎさん"
            direction="right"
          >
            <p>
              練習だから、本番に強くなるんですね。
            </p>
          </SpeechBubble>

          <SpeechBubble
            character="konkon"
            pose="konkon_thumbsup"
            name="コンコン先生"
          >
            <p>
              その通り。では、
              <br />
              <strong className="text-foreground">
                なぜ予防接種が大切なのか
              </strong>
              、3つお話しします。
            </p>
          </SpeechBubble>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  なぜ大切？ — 3つの理由、1カード1メッセージ                    */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="bg-sage-50/40 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted/60">
            3 Reasons
          </p>
          <h2 className="mt-3 text-center font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            なぜ、予防接種が大切なの？
          </h2>

          <div className="mt-16 space-y-6">
            {/* 理由1 */}
            <div className="flex gap-6 rounded-2xl bg-white p-8 shadow-sm sm:gap-10 sm:p-10">
              <div className="shrink-0">
                <Image
                  src={withBasePath("/characters/poses/kuma_gentle.png")}
                  alt=""
                  width={80}
                  height={80}
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sage-400">
                  Reason 01
                </p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  お子さんを守る
                </h3>
                <p className="mt-3 text-sm leading-loose text-muted/70 sm:text-base">
                  お母さんからもらった免疫は
                  <strong className="text-foreground">生後3〜6ヶ月</strong>
                  で消えていきます。
                  そのあとは、自分で免疫をつくるしかありません。
                </p>
              </div>
            </div>

            {/* 理由2 */}
            <div className="flex gap-6 rounded-2xl bg-white p-8 shadow-sm sm:gap-10 sm:p-10">
              <div className="shrink-0">
                <Image
                  src={withBasePath("/characters/poses/pankun_happy.png")}
                  alt=""
                  width={80}
                  height={80}
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blush-400">
                  Reason 02
                </p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  まわりの人も守る
                </h3>
                <p className="mt-3 text-sm leading-loose text-muted/70 sm:text-base">
                  まだワクチンを打てない赤ちゃん、免疫が弱い方。
                  <br />
                  <strong className="text-foreground">
                    みんなの免疫が、その人たちの壁になります。
                  </strong>
                </p>
              </div>
            </div>

            {/* 理由3 */}
            <div className="flex gap-6 rounded-2xl bg-white p-8 shadow-sm sm:gap-10 sm:p-10">
              <div className="shrink-0">
                <Image
                  src={withBasePath("/characters/poses/usagi_cheering.png")}
                  alt=""
                  width={80}
                  height={80}
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-400">
                  Reason 03
                </p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  病気をなくす
                </h3>
                <p className="mt-3 text-sm leading-loose text-muted/70 sm:text-base">
                  天然痘はワクチンで完全に撲滅。ポリオも99%減少。
                  <br />
                  <strong className="text-foreground">
                    予防接種は、病気そのものを消す力を持っています。
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  数字 — マガジン風インフォグラフィック                         */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted/60">
            Impact
          </p>
          <h2 className="mt-3 text-center font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            ワクチンが変えた世界
          </h2>

          <div className="mt-20 grid gap-16 sm:grid-cols-3 sm:gap-8">
            <div className="text-center">
              <p className="font-heading text-7xl font-extralight tracking-tighter text-sage-500">
                90
                <span className="text-3xl">%</span>
              </p>
              <div className="mx-auto mt-4 h-px w-8 bg-sage-300" />
              <p className="mt-4 text-sm font-semibold text-foreground">
                Hib髄膜炎が減少
              </p>
              <p className="mt-1 text-xs text-muted/60">2013年〜</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-7xl font-extralight tracking-tighter text-sage-500">
                85
                <span className="text-3xl">%</span>
              </p>
              <div className="mx-auto mt-4 h-px w-8 bg-sage-300" />
              <p className="mt-4 text-sm font-semibold text-foreground">
                水ぼうそうが減少
              </p>
              <p className="mt-1 text-xs text-muted/60">2014年〜</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-6xl font-extralight tracking-tighter text-sage-500">
                300
                <span className="text-2xl">万人</span>
              </p>
              <div className="mx-auto mt-4 h-px w-8 bg-sage-300" />
              <p className="mt-4 text-sm font-semibold text-foreground">
                毎年ワクチンが救う命
              </p>
              <p className="mt-1 text-xs text-muted/60">WHO推計</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  一方で — 静かな警告                                         */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="bg-foreground px-4 py-24 text-white sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Meanwhile
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            一方で、今。
          </h2>

          <div className="mt-16 space-y-12">
            <div>
              <p className="font-heading text-6xl font-extralight tracking-tighter text-blush-300">
                87<span className="text-2xl">万人</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                2019年、世界のはしか患者数。過去23年で最悪。
                <br />
                接種率が下がった地域で、再び流行が広がっています。
              </p>
            </div>

            <div className="mx-auto h-px w-12 bg-white/20" />

            <div>
              <p className="font-heading text-5xl font-extralight tracking-tighter text-blush-300">
                70% → 0.6%
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                日本のHPVワクチン接種率の急落。
                <br />
                約9年間、多くの方が接種の機会を逃しました。
              </p>
            </div>

            <div className="mx-auto h-px w-12 bg-white/20" />

            <div>
              <p className="text-sm leading-relaxed text-white/80">
                2019年、WHOは
                <strong className="text-white">「ワクチン忌避」</strong>を
                <br />
                世界の健康に対する
                <strong className="text-white">10大脅威</strong>
                の1つに挙げました。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  転換 — 共感                                                 */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-xl">
          <div className="text-center">
            <Image
              src={withBasePath("/characters/poses/kuma_gentle.png")}
              alt=""
              width={100}
              height={100}
              className="mx-auto"
            />
            <h2 className="mt-8 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              不安があっても、
              <br />
              大丈夫です。
            </h2>
            <p className="mx-auto mt-6 max-w-sm text-base leading-loose text-muted/70">
              大切なお子さんのことだからこそ、
              <br />
              慎重になるのは当然のこと。
            </p>
          </div>

          <div className="mt-12 space-y-10">
            <SpeechBubble
              character="usagi"
              pose="usagi_shy"
              name="うさぎさん"
              direction="right"
            >
              <p>でもやっぱり、心配で......</p>
            </SpeechBubble>

            <SpeechBubble
              character="konkon"
              pose="konkon_happy"
              name="コンコン先生"
              size="large"
            >
              <p>
                <strong className="text-foreground">
                  不安に思うのは、お子さんのことを
                  真剣に考えている証拠です。
                </strong>
              </p>
              <p className="mt-2">
                よくある心配について、
                <br />
                ひとつずつお話ししますね。
              </p>
            </SpeechBubble>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  Q&A — ミニマルなアコーディオン                                */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="bg-ivory-100/40 px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted/60">
            Q&amp;A
          </p>
          <h2 className="mt-3 text-center font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            よくある心配に、お答えします
          </h2>

          <div className="mt-16 space-y-4">
            <ConcernItem question="副反応が心配です">
              <p>
                接種部位の赤みや微熱は約10〜30%で起こります。
                <strong className="text-foreground">
                  体が免疫をつくっている証拠
                </strong>
                で、通常1〜2日でおさまります。
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white p-4 text-center">
                  <p className="text-[10px] font-medium text-muted/60">
                    はしか感染 → 脳炎
                  </p>
                  <p className="mt-1 font-heading text-2xl font-extralight text-red-400">
                    1/1,000
                  </p>
                </div>
                <div className="rounded-xl bg-white p-4 text-center">
                  <p className="text-[10px] font-medium text-muted/60">
                    ワクチン重篤副反応
                  </p>
                  <p className="mt-1 font-heading text-2xl font-extralight text-sage-400">
                    1-2/100万
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted/60">
                万一の場合は健康被害救済制度で補償を受けられます。
              </p>
            </ConcernItem>

            <ConcernItem question="自然にかかったほうが強い免疫がつく？">
              <p>
                自然感染でも免疫はつきますが、
                <strong className="text-foreground">
                  「病気にかかる」リスク
                </strong>
                を伴います。
              </p>
              <p className="mt-2">
                おたふくかぜ → 1,000人に1人が
                <strong className="text-foreground">一生治らない難聴</strong>
                に。
                はしか → 脳炎・肺炎のリスク。
                ワクチンは重篤な合併症なしに免疫をつける安全な方法です。
              </p>
            </ConcernItem>

            <ConcernItem question="ワクチンの成分が心配です">
              <p>
                添加物の量は極めて微量で安全性が検証済みです。
                チメロサールは現在ほとんどの小児用ワクチンから除去。
                仮に含まれていても、
                <strong className="text-foreground">
                  魚の刺身1切れより少ない量
                </strong>
                です。
              </p>
            </ConcernItem>

            <ConcernItem question="同時に何本も打って大丈夫？">
              <p>
                日本小児科学会が推奨しています。
                赤ちゃんの免疫は理論上
                <strong className="text-foreground">約1万種類</strong>
                のワクチンに同時対応できます。
                4本打っても副反応が4倍になることはありません。
              </p>
              <p className="mt-2 text-xs">
                <Link
                  href="/articles/simultaneous-vaccination-safety"
                  className="text-sage-600 underline decoration-sage-300 underline-offset-2 hover:text-sage-800"
                >
                  詳しくは「同時接種の安全性を解説」（Vol.19）→
                </Link>
              </p>
            </ConcernItem>

            <ConcernItem question="ネットで怖い情報を見ました">
              <p>
                「ワクチン＝自閉症」説は
                <strong className="text-foreground">データ捏造が発覚</strong>
                し撤回された論文が元です。
                数百万人規模の研究で因果関係なしと証明済み。
              </p>
              <p className="mt-2">
                信頼できる情報源：厚生労働省、日本小児科学会、
                Know VPD!、国立感染症研究所
              </p>
            </ConcernItem>

            <ConcernItem question="アレルギーがあるのですが">
              <p>
                アレルギーがあっても
                <strong className="text-foreground">
                  ほとんどの場合接種できます
                </strong>
                。心配な場合は接種前にかかりつけ医にお伝えください。
                最善の方法を一緒に考えます。
              </p>
            </ConcernItem>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  おかもん先生メッセージ — シンプルな手紙                       */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-lg text-center">
          <Image
            src={withBasePath(
              "/characters/illustrations/about_konkon_doctor.png"
            )}
            alt="おかもん先生"
            width={120}
            height={120}
            className="mx-auto"
          />

          <div className="mt-10 space-y-6 text-base leading-loose text-muted/70 sm:text-lg sm:leading-loose">
            <p>
              予防接種について迷っている
              <br />
              お父さん、お母さんへ。
            </p>
            <p className="text-lg font-semibold leading-relaxed text-foreground sm:text-xl">
              迷うのは、
              <br />
              お子さんのことを
              <br />
              真剣に考えている証です。
            </p>
            <p>
              私も自分の子どもたちに
              <br />
              予防接種を受けさせています。
              <br />
              病気の怖さを、現場で見てきたからです。
            </p>
            <p className="text-lg font-semibold text-foreground sm:text-xl">
              心配なことがあれば、
              <br />
              いつでもご相談ください。
            </p>
          </div>

          <p className="mt-10 text-sm text-muted/50">
            愛育病院 小児科 おかもん
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  CTA                                                        */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-border/50 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center justify-center gap-5">
            <Image
              src={withBasePath("/characters/poses/konkon_guts.png")}
              alt=""
              width={80}
              height={80}
            />
            <Image
              src={withBasePath("/characters/poses/usagi_cheering.png")}
              alt=""
              width={72}
              height={72}
            />
          </div>

          <p className="mt-8 text-center text-sm text-muted/60">
            もっと詳しく知りたくなったら
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/vaccines"
              className="group flex flex-1 items-center gap-5 rounded-2xl bg-sage-50/80 p-6 transition-colors hover:bg-sage-100/80"
            >
              <WatercolorIcon
                name="syringe"
                size={24}
                className="shrink-0 text-sage-400"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  ワクチン一覧
                </p>
                <p className="mt-0.5 text-xs text-muted/60">
                  全12種類の詳細とスケジュール
                </p>
              </div>
            </Link>
            <Link
              href="/clinics"
              className="group flex flex-1 items-center gap-5 rounded-2xl bg-blue-50/80 p-6 transition-colors hover:bg-blue-100/80"
            >
              <WatercolorIcon
                name="mappin"
                size={24}
                className="shrink-0 text-blue-400"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  小児科を探す
                </p>
                <p className="mt-0.5 text-xs text-muted/60">
                  港区の小児科マップ
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  参考文献                                                    */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-border/30 px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <details className="group">
            <summary className="flex cursor-pointer items-center gap-2 text-xs text-muted/40 hover:text-muted/60">
              参考文献
              <WatercolorIcon
                name="chevron_down"
                size={10}
                className="transition-transform group-open:rotate-180"
              />
            </summary>
            <ol className="mt-4 list-inside list-decimal space-y-1 text-[10px] leading-relaxed text-muted/40">
              <li>WHO: Immunization coverage fact sheet, 2024</li>
              <li>WHO: Ten threats to global health in 2019</li>
              <li>
                日本小児科学会「予防接種の同時接種に対する考え方」2020年改訂
              </li>
              <li>Offit PA, et al. Pediatrics 2002; 109(1): 124-129</li>
              <li>厚生労働省: 予防接種の副反応報告制度</li>
              <li>国立感染症研究所: 感染症発生動向調査</li>
              <li>Taylor LE, et al. Vaccine 2014; 32(29): 3623-3629</li>
              <li>CDC: Pink Book (Vaccine-Preventable Diseases)</li>
            </ol>
          </details>
        </div>
      </section>
    </>
  );
}
