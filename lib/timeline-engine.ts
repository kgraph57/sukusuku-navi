export type TimelineCategory =
  | 'admin'
  | 'medical'
  | 'vaccination'
  | 'support'

export type TimelineUrgency =
  | 'overdue'
  | 'urgent'
  | 'soon'
  | 'upcoming'
  | 'future'

export interface TimelineItem {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly category: TimelineCategory
  readonly urgency: TimelineUrgency
  readonly daysFromBirth: number
  readonly deadlineDaysFromBirth?: number
  readonly expiryDaysFromBirth?: number
  readonly actionUrl: string
  readonly actionLabel: string
  readonly tip?: string
}

type Def = Omit<TimelineItem, 'urgency'>

// prettier-ignore
const DEFINITIONS: readonly Def[] = [
  // 行政手続き
  { id: 'birth-registration',      category: 'admin',      daysFromBirth: 0,    deadlineDaysFromBirth: 14,   expiryDaysFromBirth: 30,   actionUrl: 'https://www.city.minato.tokyo.jp/shussan-todoke',  actionLabel: '届出方法を確認',       title: '出生届',                            description: '出生後14日以内に区役所へ届出が必要です。',                                      tip: '出生後14日以内。休日でも受け付けています。' },
  { id: 'child-allowance',          category: 'admin',      daysFromBirth: 0,    deadlineDaysFromBirth: 15,   expiryDaysFromBirth: 60,   actionUrl: '/programs/child-allowance',                        actionLabel: '申請ガイドを見る',       title: '児童手当申請',                      description: '出生後15日以内に申請すると当月から支給されます。',                               tip: '15日を過ぎると翌月からの支給に。出生届と同日に申請できます。' },
  { id: 'child-medical-subsidy',    category: 'admin',      daysFromBirth: 0,    deadlineDaysFromBirth: 30,   expiryDaysFromBirth: 90,   actionUrl: '/programs/child-medical-subsidy',                  actionLabel: '申請ガイドを見る',       title: '子ども医療費助成申請（マル乳）',    description: '乳幼児医療費助成の申請です。',                                                   tip: '申請後1〜2週間で医療証が届きます。' },
  { id: 'childbirth-lump-sum',      category: 'admin',      daysFromBirth: 0,    deadlineDaysFromBirth: 730,  expiryDaysFromBirth: 730,  actionUrl: '/programs/childbirth-lump-sum',                    actionLabel: '申請方法を確認',         title: '出産育児一時金（直接支払制度未利用者）', description: '直接支払制度を利用しなかった場合は健康保険組合または協会けんぽへ申請が必要です。' },
  { id: 'birth-childcare-grant',    category: 'admin',      daysFromBirth: 0,    deadlineDaysFromBirth: 120,  expiryDaysFromBirth: 120,  actionUrl: '/programs/birth-childcare-grant',                  actionLabel: '面談を予約する',         title: '出産・子育て応援交付金（産後面談）', description: '産後4ヶ月以内に保健センターで面談を受けると5万円相当が支給されます。',            tip: '出産後4ヶ月以内に保健センターで面談を受けると5万円相当が支給されます。' },
  // 健診
  { id: 'checkup-1month',           category: 'medical',    daysFromBirth: 28,   deadlineDaysFromBirth: 60,   expiryDaysFromBirth: 90,   actionUrl: '/programs/infant-health-checkup',                  actionLabel: '健診について確認',       title: '1ヶ月健診',                         description: '赤ちゃんの発育・発達を確認する健診です。',                                      tip: '通常は分娩した産院で行います。受診票を忘れずに。' },
  { id: 'checkup-3to4month',        category: 'medical',    daysFromBirth: 90,   deadlineDaysFromBirth: 120,  expiryDaysFromBirth: 150,  actionUrl: '/programs/infant-health-checkup',                  actionLabel: '健診について確認',       title: '3-4ヶ月健診',                       description: '区が実施する乳幼児健診です。',                                                   tip: 'かかりつけ小児科を予約しましょう。' },
  { id: 'checkup-6to7month',        category: 'medical',    daysFromBirth: 180,  deadlineDaysFromBirth: 210,  expiryDaysFromBirth: 240,  actionUrl: '/programs/infant-health-checkup',                  actionLabel: '健診について確認',       title: '6-7ヶ月健診',                       description: '区が実施する乳幼児健診です。' },
  { id: 'checkup-9to10month',       category: 'medical',    daysFromBirth: 270,  deadlineDaysFromBirth: 300,  expiryDaysFromBirth: 330,  actionUrl: '/programs/infant-health-checkup',                  actionLabel: '健診について確認',       title: '9-10ヶ月健診',                      description: '区が実施する乳幼児健診です。' },
  { id: 'checkup-18month',          category: 'medical',    daysFromBirth: 540,  deadlineDaysFromBirth: 570,  expiryDaysFromBirth: 600,  actionUrl: '/programs/infant-health-checkup',                  actionLabel: '健診について確認',       title: '1歳6ヶ月健診',                      description: '区が実施する乳幼児健診です。' },
  { id: 'checkup-3year',            category: 'medical',    daysFromBirth: 1080, deadlineDaysFromBirth: 1110, expiryDaysFromBirth: 1140, actionUrl: '/programs/infant-health-checkup',                  actionLabel: '健診について確認',       title: '3歳健診',                           description: '区が実施する幼児健診です。' },
  // ワクチン
  { id: 'vaccine-bcg',              category: 'vaccination', daysFromBirth: 60,  deadlineDaysFromBirth: 365,  expiryDaysFromBirth: 365,  actionUrl: '/articles/vaccination',                            actionLabel: '接種について確認',       title: 'BCGワクチン（結核）',              description: '結核予防のための定期接種です。',                                                tip: '生後2〜6ヶ月が推奨。港区指定医療機関で接種。' },
  { id: 'vaccine-hepb-1',           category: 'vaccination', daysFromBirth: 60,  deadlineDaysFromBirth: 90,   expiryDaysFromBirth: 365,  actionUrl: '/articles/vaccination',                            actionLabel: '接種スケジュール確認',   title: 'B型肝炎ワクチン1回目',             description: 'B型肝炎予防のための定期接種です。',                                            tip: '2・3・7ヶ月の3回接種が基本スケジュール。' },
  { id: 'vaccine-rotavirus-1',      category: 'vaccination', daysFromBirth: 60,  deadlineDaysFromBirth: 90,   expiryDaysFromBirth: 150,  actionUrl: '/articles/vaccination',                            actionLabel: '接種について確認',       title: 'ロタウイルスワクチン1回目',        description: 'ロタウイルス感染症予防のための定期接種です。',                                  tip: '接種できる期間が短いので早めに。生後2ヶ月〜5ヶ月以内。' },
  { id: 'vaccine-hib-pcv-dtap',     category: 'vaccination', daysFromBirth: 60,  deadlineDaysFromBirth: 90,   expiryDaysFromBirth: 365,  actionUrl: '/articles/vaccination',                            actionLabel: '接種スケジュール確認',   title: 'ヒブ・肺炎球菌・4種混合ワクチン', description: 'ヒブ・肺炎球菌・ジフテリア・百日咳・破傷風・ポリオの定期接種です。',            tip: '同時接種可能。2・3・4ヶ月・1歳の4回。' },
  { id: 'vaccine-mr',               category: 'vaccination', daysFromBirth: 365, deadlineDaysFromBirth: 730,  expiryDaysFromBirth: 730,  actionUrl: '/articles/vaccination',                            actionLabel: '接種について確認',       title: 'MRワクチン（麻しん・風しん）',     description: '麻しん・風しん混合の定期接種です。',                                            tip: '1歳になったら早めに接種を。' },
  { id: 'vaccine-varicella',        category: 'vaccination', daysFromBirth: 365, deadlineDaysFromBirth: 548,  expiryDaysFromBirth: 730,  actionUrl: '/articles/vaccination',                            actionLabel: '接種について確認',       title: '水痘ワクチン',                      description: '水痘（みずぼうそう）予防のための定期接種です。',                                tip: '1歳〜3歳未満に2回接種。' },
  { id: 'vaccine-mumps-1',          category: 'vaccination', daysFromBirth: 365, deadlineDaysFromBirth: 730,  expiryDaysFromBirth: 2190, actionUrl: '/programs/mumps-vaccine-subsidy',                  actionLabel: '港区の助成を確認',       title: 'おたふくかぜワクチン1回目',        description: '流行性耳下腺炎（おたふくかぜ）予防ワクチンです。港区は全額助成。',              tip: '港区は全額助成。かかりつけ小児科で接種できます。' },
  { id: 'vaccine-influenza',        category: 'vaccination', daysFromBirth: 180, deadlineDaysFromBirth: 1825, expiryDaysFromBirth: 5475, actionUrl: '/programs/influenza-vaccine-subsidy',               actionLabel: '港区の助成を確認',       title: 'インフルエンザワクチン',            description: '毎年秋冬に接種推奨。港区の助成を確認しましょう。',                              tip: '毎年10月〜翌年1月。13歳未満は2回接種推奨。' },
  { id: 'vaccine-mumps-2',          category: 'vaccination', daysFromBirth: 1460, deadlineDaysFromBirth: 2190, expiryDaysFromBirth: 2190, actionUrl: '/programs/mumps-vaccine-subsidy',                 actionLabel: '港区の助成を確認',       title: 'おたふくかぜワクチン2回目（就学前）', description: '就学前（5〜6歳）に2回目接種。港区は全額助成。',                               tip: '就学前（5〜6歳）に2回目接種。' },
  // サポートサービス
  { id: 'postnatal-care',           category: 'support',    daysFromBirth: 0,    deadlineDaysFromBirth: 120,  expiryDaysFromBirth: 120,  actionUrl: '/programs/postnatal-care-stay',                    actionLabel: '産後ケアを申請する',     title: '産後ケア（宿泊・デイ・訪問）申請', description: '出産後4ヶ月以内に利用できる産後ケアサービスです。',                             tip: '出産後4ヶ月以内。体が辛い・育児が不安なら早めに相談を。' },
  { id: 'family-support',           category: 'support',    daysFromBirth: 90,                               expiryDaysFromBirth: 3650, actionUrl: '/programs/family-support',                         actionLabel: '登録方法を確認',         title: 'ファミリーサポート登録',            description: '子どもの一時預かりを地域住民が助け合う会員組織です。',                          tip: '登録は無料。急に預けたいときに備えて早めの登録を。' },
  { id: 'temporary-childcare',      category: 'support',    daysFromBirth: 120,                              expiryDaysFromBirth: 2190, actionUrl: '/programs/temporary-childcare',                    actionLabel: '施設を探す',             title: '一時保育 登録',                     description: '急な用事や保護者のリフレッシュのために子どもを一時的に預けられます。',          tip: '施設によっては登録に数週間かかります。余裕を持って。' },
  { id: 'unlicensed-nursery-subsidy', category: 'support',  daysFromBirth: 90,                               expiryDaysFromBirth: 2190, actionUrl: '/programs/unlicensed-nursery-subsidy',             actionLabel: '助成を確認',             title: '認可外保育施設保育料助成 確認',     description: '認可外保育施設を利用する場合の保育料助成制度です。' },
  { id: 'multi-child-nursery-reduction', category: 'support', daysFromBirth: 0,                              expiryDaysFromBirth: 2190, actionUrl: '/programs/multi-child-nursery-reduction',          actionLabel: '軽減を確認',             title: '多子世帯保育料軽減 確認（2人目以降）', description: '第2子以降の保育料が半額または無料になる軽減制度です。',                       tip: '第2子以降なら保育料が半額または無料になります。' },
]

function calculateUrgency(
  ageInDays: number,
  daysFromBirth: number,
  deadlineDaysFromBirth: number | undefined
): TimelineUrgency {
  if (deadlineDaysFromBirth !== undefined) {
    const daysRemaining = deadlineDaysFromBirth - ageInDays
    if (daysRemaining < 0) return 'overdue'
    if (daysRemaining <= 7) return 'urgent'
    if (daysRemaining <= 30) return 'soon'
    if (daysRemaining <= 90) return 'upcoming'
    return 'future'
  }

  return ageInDays >= daysFromBirth ? 'upcoming' : 'future'
}

export function generateTimeline(birthDate: string): readonly TimelineItem[] {
  const today = new Date()
  const birthDay = new Date(birthDate)
  const ageInDays = Math.floor(
    (today.getTime() - birthDay.getTime()) / 86400000
  )

  return DEFINITIONS.flatMap((def) => {
    if (
      def.expiryDaysFromBirth !== undefined &&
      ageInDays > def.expiryDaysFromBirth
    ) {
      return []
    }

    const urgency = calculateUrgency(
      ageInDays,
      def.daysFromBirth,
      def.deadlineDaysFromBirth
    )

    return [{ ...def, urgency }]
  })
}

export function groupTimelineByUrgency(items: readonly TimelineItem[]): {
  readonly overdue: readonly TimelineItem[]
  readonly urgent: readonly TimelineItem[]
  readonly soon: readonly TimelineItem[]
  readonly upcoming: readonly TimelineItem[]
  readonly future: readonly TimelineItem[]
} {
  return {
    overdue: items.filter((item) => item.urgency === 'overdue'),
    urgent: items.filter((item) => item.urgency === 'urgent'),
    soon: items.filter((item) => item.urgency === 'soon'),
    upcoming: items.filter((item) => item.urgency === 'upcoming'),
    future: items.filter((item) => item.urgency === 'future'),
  }
}
