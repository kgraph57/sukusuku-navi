---
name: sukusuku-flyer
description: スクスクナビスタイルの小児科医療フライヤーをNano Bananaで生成するスキル。テーマ（感染症・アレルギー・外傷・発達など）を指定するだけでA4横・左右2カラム・超高密度の絵本風フライヤーをPNG+PDFで出力する。使用場面：小児科外来・保育園・学校・SNS向けの医療情報フライヤーを作りたい時。スクスクナビのキャラクター（キツネ医師konkon・パンダpankun・ウサギusagi・クマkuma）を使った温かみのある水彩絵本スタイル。
---

# Sukusuku Flyer Skill

スクスクナビのキャラクターを使った小児科医療フライヤーをNano Bananaで生成するスキル。

## フライヤー仕様

| 項目 | 仕様 |
|---|---|
| サイズ | A4横（landscape） |
| スタイル | 水彩絵本風・スクスクナビキャラクター |
| レイアウト | 左右2カラム・各4セクション（計8ブロック） |
| 情報量 | ポスター2枍分相当（超高密度・小さい文字） |
| ロゴ | 左下固定：スクスクナビロゴバッジ |
| クレジット | 右下固定：「監修：スクスクナビ小児科医チーム　参考：[該当ガイドライン]」 |
| 出力 | PNG（高解像度）+ PDF（A4横・150dpi） |
| 枚数 | テーマの情報量に応じて1〜2枚 |

## テーマ別イラスト参照マッピング

Nano Banana生成時の`references`に渡す画像をテーマに応じて選ぶ。**必ず`konkon_stamps.png`を1枚目に含める**こと。

| テーマカテゴリ | 1枚目（必須） | 2枚目（テーマ別） | 3枚目（オプション） |
|---|---|---|---|
| **感染症全般**（インフルエンザ・RSウイルス・手足口病など） | konkon_stamps.png | illustrations/category_infection.png | scenes/vaccine_scene.png |
| **アレルギー・アナフィラキシー** | konkon_stamps.png | illustrations/category_allergy.png | poses/konkon_worried.png |
| **ワクチン・予防接種** | konkon_stamps.png | scenes/vaccine_scene.png | illustrations/feature_vaccine.png |
| **受診の目安・トリアージ** | konkon_stamps.png | scenes/triage_scene.png | poses/konkon_worried.png |
| **健診・発育・発達** | konkon_stamps.png | scenes/checkup_scene.png | illustrations/feature_checkups.png |
| **保育園・学校向け** | konkon_stamps.png | scenes/nursery_scene.png | illustrations/feature_nursery.png |
| **ホームケア・おうちでの対応** | konkon_stamps.png | pankun_stamps.png | poses/konkon_thumbsup.png |
| **緊急・救急・重症サイン** | konkon_stamps.png | poses/konkon_surprised.png | scenes/triage_scene.png |
| **薬・治療の説明** | konkon_stamps.png | poses/konkon_reading.png | illustrations/konkon_teaching.png |
| **Q&A・よくある質問** | konkon_stamps.png | poses/konkon_thinking.png | pankun_stamps.png |
| **回復・元気になったら** | konkon_stamps.png | poses/konkon_guts.png | poses/usagi_cheering.png |
| **その他・一般** | konkon_stamps.png | illustrations/hero_all_characters.png | pankun_stamps.png |

### 全イラスト素材一覧

**キャラクタースタンプ（templates/直下）**

| ファイル | キャラクター | 特徴 |
|---|---|---|
| konkon_stamps.png | キツネ医師konkon | 白衣・聴診器・複数ポーズ ★メイン |
| pankun_stamps.png | パンダpankun・ウサギusagi | 子ども・保護者キャラ |
| usagisan_stamps.png | ウサギ | 複数ポーズ |
| kumakun_stamps.png | クマ | 複数ポーズ |
| risuchan_stamps.png | リス | 複数ポーズ |

**illustrations/（シーンイラスト）**

| ファイル | 内容 | 推奨テーマ |
|---|---|---|
| hero_all_characters.png | 全キャラクター集合（街並み） | 総合・汎用 |
| konkon_teaching.png | konkonが黒板で教えている | 教育・説明 |
| konkon_clinic.png | クリニックシーン | 診察・受診 |
| konkon_presenting.png | konkonがプレゼン中 | 情報提供 |
| konkon_waving.png | konkonが手を振る | ウェルカム |
| konkon_welcome.png | konkonがウェルカムポーズ | 導入 |
| category_infection.png | 感染症カテゴリー | 感染症全般 |
| category_allergy.png | アレルギーカテゴリー | アレルギー全般 |
| feature_vaccine.png | ワクチン機能 | 予防接種 |
| feature_triage.png | トリアージ機能 | 受診判断 |
| feature_checkups.png | 健診機能 | 健診・発育 |
| feature_nursery.png | 保育園機能 | 保育園向け |
| kids_nursery.png | 保育園の子どもたち | 保育園 |
| hero_konkon_kids.png | konkonと子どもたち | 小児全般 |

**scenes/（場面イラスト）**

| ファイル | 内容 | 推奨テーマ |
|---|---|---|
| vaccine_scene.png | konkonが子どもにワクチン接種 | ワクチン・感染症予防 |
| triage_scene.png | クマ医師がウサギをトリアージ | 受診判断・症状確認 |
| checkup_scene.png | konkonが女の子の身長を測る | 健診・発育 |
| nursery_scene.png | 保育園シーン | 保育園・感染症予防 |
| checklist_scene.png | チェックリストシーン | 受診判断・予防 |
| all_together_scene.png | 全キャラクター集合 | 総合 |

**poses/（キャラクターポーズ）**

| ファイル | 内容 | 推奨テーマ |
|---|---|---|
| konkon_worried.png | konkon心配そう | 症状・注意喚起 |
| konkon_thinking.png | konkon考え中 | Q&A・診断 |
| konkon_thumbsup.png | konkonサムズアップ | 予防・推奨 |
| konkon_guts.png | konkonガッツポーズ | 回復・元気 |
| konkon_reading.png | konkon読書中 | 情報・ガイドライン |
| konkon_surprised.png | konkon驚き | 緊急・警告 |
| konkon_happy.png | konkon嬉しい | 一般 |
| pankun_pointing.png | パンダ指差し | 説明・案内 |
| usagi_cheering.png | ウサギ応援 | 励まし・回復 |
| kuma_gentle.png | クマ優しい | 安心・ケア |
| kuma_strong.png | クマ力強い | 緊急対応 |

## ワークフロー

### Step 1: テーマ・対象・枚数を確認する

- テーマ（例：インフルエンザ、アナフィラキシー、熱性けいれん）
- 対象読者（例：乳幼児の保護者、保育士、学校教員）
- 枚数（1〜2枚）

### Step 2: 参照画像を選ぶ

上記「テーマ別イラスト参照マッピング」表から適切な画像を選択する。

### Step 3: 8セクションのコンテンツを設計する

**左カラム（4セクション）の標準構成：**

1. 「〇〇とは？」— 定義・原因・感染経路・疫学データ（グラフ付き）
2. 「症状の特徴」— 年齢別・重症度別の症状（タイムライン図付き）
3. 「年齢別の注意点」— 0〜6ヶ月・6〜12ヶ月・1〜5歳の比較表
4. 「治療・薬」— 年齢別適応・禁忌・投与方法

**右カラム（4セクション）の標準構成：**

5. 「こんな時はすぐ受診！」— チェックリスト形式・赤枠強調
6. 「おうちでのケア」— 水分補給・解熱剤・禁忌・環境・登園基準
7. 「予防のポイント」— 手洗い・ワクチン・スケジュール・有効率
8. 「緊急対応」— ステップ形式の対応手順

テーマによってセクション内容は柔軟に変更する。

### Step 4: Nano Bananaで生成する

詳細なプロンプトテンプレートは `references/prompt_template.md` を参照。

**プロンプトの核心要素（必須）：**

```
Japanese pediatric medical information flyer about [THEME] for [TARGET_AUDIENCE].
A4 landscape format. Warm watercolor picture-book style.
Fox doctor (konkon), panda baby, rabbit toddler, bear child characters throughout.
Sky blue background. Large white torn-paper center area.
Big brush-stroke Japanese title at top: [タイトル]
Vertical dotted divider splits left and right columns.
Sukusuku Navi logo badge bottom-left corner.
VERY SMALL TEXT, MAXIMUM INFORMATION DENSITY, like two posters combined into one.
[左右カラムの8セクション詳細]
Footer: 監修：スクスクナビ小児科医チーム　参考：[ガイドライン名]
```

プロンプトは4000文字以内に収める（超過するとBAD_REQUESTエラー）。

### Step 5: PDF変換する

```bash
python3 /home/ubuntu/skills/sukusuku-flyer/scripts/png_to_pdf.py input.png output.pdf
```

## セクションカラー対応表

| セクション | ヘッダーカラー | 推奨用途 |
|---|---|---|
| 1 | orange | 疾患概要・定義 |
| 2 | red | 症状・警告 |
| 3 | blue | 年齢別・比較表 |
| 4 | green | 治療・薬 |
| 5 | yellow | 受診の目安 |
| 6 | purple | ホームケア |
| 7 | teal | 予防 |
| 8 | brown | 緊急対応 |

## テーマ別ガイドライン参考文献

| テーマ | 参考文献 |
|---|---|
| インフルエンザ | 日本小児科学会ガイドライン2024 |
| アナフィラキシー | 日本アレルギー学会アナフィラキシーガイドライン2022 |
| 食物アレルギー | 食物アレルギー診療ガイドライン2021 |
| 熱性けいれん | 熱性けいれん診療ガイドライン2023 |
| RSウイルス | 日本小児科学会RSウイルス感染症の手引き |
| 誤飲・誤嚥 | 日本中毒情報センター・日本小児科学会 |
| 川崎病 | 川崎病診断の手引き改訂6版 |
| 手足口病 | 国立感染症研究所感染症情報 |
| 麻疹 | 麻疹に関するガイドライン（厚生労働省） |
| 水痘 | 水痘ワクチン接種の手引き（日本小児科学会） |
| 溶連菌 | 日本小児科学会感染症委員会 |
| 健診・発育 | 乳幼児健康診査事業実践ガイド（厚生労働省） |

## 注意事項

- Nano Banana APIが混雑している場合は60〜90秒待ってから再試行する
- 生成後に必ず画像を確認し、テキストが切れていないかチェックする
- 医学的内容は日本小児科学会・各専門学会の最新ガイドラインに基づく
- 参照画像は最大3枚まで（多すぎるとスタイルが混乱する）

## 成功例

**インフルエンザ：乳幼児のための完全ガイド**
- 対象：乳幼児の保護者
- 参照画像：konkon_stamps.png + illustrations/category_infection.png
- 出力：`/home/ubuntu/flyer_project/output_v3/flu_infant_v1.png`
- 品質：「教えて！ドクター」スタイルに近い高密度フライヤー
