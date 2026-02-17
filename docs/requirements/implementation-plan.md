# 子育て支援サイト「すくすくナビ」実装プラン

## Context

港区の小児科医（おかもん）が、メルマガ50号分の医療コンテンツと港区の行政サービス情報を統合した子育て支援サイトを構築する。日本には「医療情報＋行政サービス＋給付金シミュレーター」を1つにまとめたサービスが存在しないため、この空白を埋める。

- 技術: Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Vercel
- ブランド名: すくすくナビ（Sukusuku Navi）— 全国展開を見据えた地域非依存の名前
- プロジェクト: `/Users/kenokamoto/Desktop/App_development/sukusuku-navi/`

---

## Phase 1: 基盤 + 記事 + シミュレーター

### 1-1. プロジェクト初期化

- Next.js 15 + TypeScript strict + Tailwind v4 + App Router
- shadcn/ui ベースUI
- フォント: Zen Maru Gothic（見出し）+ Noto Sans JP（本文）
- カラー: ティール系（信頼）+ コーラル系（親しみ）+ オフホワイト背景

### 1-2. メルマガ50号のMDX移行

ソース: `/Users/kenokamoto/Desktop/AI MEDICINE/04_メルマガ/メルマガ/vol*.md`
出力先: `/content/articles/*.mdx`

移行スクリプトで自動抽出: タイトル、keyPoints、QA数、参考文献数、関連記事
手動付与: category, ageGroups, slug, description

frontmatter例:
```yaml
slug: "influenza-basics"
vol: 1
title: "うちの子インフルかも？"
category: "infectious-disease"
ageGroups: ["0-6mo", "6-12mo", "1-3yr", "3-6yr"]
publishedAt: "2026-02-01"
keyPoints: [...]
```

### 1-3. 記事表示システム

ルート:
- `/articles` — 一覧（カテゴリ・年齢フィルター・検索）
- `/articles/[slug]` — 個別記事（MDXレンダリング）
- `/articles/category/[cat]` — カテゴリ別

カスタムMDXコンポーネント:
- QABlock — LINE風チャットバブルで対話表示
- KeyPointsBox — 「今号のポイント」カード
- CitationList — 参考文献アコーディオン
- RelatedArticles — 関連記事カード

SEO: MedicalWebPage + FAQPage JSON-LD

### 1-4. 給付金シミュレーター（コア差別化）

ルート:
- `/simulator` — ランディング
- `/simulator/start` — 4ステップウィザード
- `/simulator/results` — 結果表示
- `/programs` — 制度一覧
- `/programs/[slug]` — 個別制度

ウィザード:
1. お子さんの情報（人数、生年月日、保育状況）
2. 世帯情報（収入帯、世帯タイプ、就労状況）
3. お住まい（港区地区）
4. 確認→結果

制度DB（vol.8から17制度をJSON化）:
医療費助成、児童手当、出産子育て応援交付金、出産育児一時金、おたふく/インフルワクチン助成、産後ケア3種、一時保育、ショートステイ、ファミサポ、子むすび、認可外保育料助成、多子世帯軽減、私立幼稚園補助

結果: 年間推定額 + 対象制度カード + アクションチェックリスト

---

## Phase 2: パーソナライズ + トリアージ + 地図

### 2-1. パーソナライズ
- `/my` — ダッシュボード（localStorageベース、将来Supabase）
- 生年月日→「いま読むべき記事」「次の健診」「申請すべき制度」

### 2-2. 受診判断トリアージ
- `/triage` — 症状選択→判断フロー
- 9症状: 発熱、嘔吐下痢、発疹、けいれん、呼吸困難、血便、頭痛、鼻血、誤飲
- 結果: 救急/8000/#翌日受診/ホームケアの4段階
- 常設「緊急」フローティングボタン

### 2-3. 港区小児科マップ
- `/clinics` — 地図＋夜間・休日フィルター

### 2-4. 手続きチェックリスト
- `/checklists` — 「出産前」「出生届時」「生後1ヶ月」等

---

## Phase 3: 拡張

- 予防接種スケジューラー
- 英語版（next-intl）
- Supabase（アカウント、永続化、プッシュ通知）

---

## ディレクトリ構成

```
sukusuku-navi/
├── app/
│   ├── page.tsx, layout.tsx
│   ├── articles/ [slug]/ category/[cat]/
│   ├── simulator/ start/ results/
│   ├── programs/ [slug]/
│   ├── triage/ [symptom]/
│   ├── clinics/ [slug]/
│   ├── checklists/ [slug]/
│   ├── my/ timeline/ settings/
│   └── (utility)/ about/ search/ contact/ privacy/
├── components/
│   ├── ui/ layout/ article/ simulator/
│   ├── triage/ personalization/ clinic/ shared/
├── content/articles/          # 50+ MDXファイル
├── data/                      # programs.json, clinics.json, triage/, vaccines.json
├── lib/
│   ├── content.ts             # MDX読み込み
│   ├── simulator/engine.ts    # シミュレーター計算
│   ├── triage/engine.ts       # トリアージ判断
│   └── types.ts
└── public/
```

---

## 参照ファイル

- `vol001_インフルエンザ.md` — MDX移行テンプレート
- `vol008_港区の子育て支援まとめ.md` — 制度DB情報源
- `vol023_夜間受診の判断.md` — トリアージ元ネタ
- `hoshizu/lib/content.ts` — コンテンツパイプライン参考

---

## 検証

1. 50本全記事が正しくレンダリング
2. シミュレーター: テストケース（子1人/0歳/港区/年収500万）で全対象制度表示
3. トリアージ: 「発熱」フロー完走で適切な判断表示
4. レスポンシブ: iPhone SE〜iPad Proで動作
5. Lighthouse: Performance 90+, Accessibility 95+, SEO 95+
