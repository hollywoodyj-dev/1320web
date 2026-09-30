/**
 * Taiwan GZH copy — Traditional Chinese (Hant).
 * Still GZH Semantic Gate YELLOW until full review; comprehension-first expansion after Lumen witness.
 */

export const GZH_TW_BRAND = {
  name: "1320｜生命映照",
  subtitle: "一生，學習看見、理解並愛自己。",
  emotional: "1320，一生愛你。",
  principleSee: "看見，而不是斷定。",
  principleMirror: "映照，而不是定義。",
} as const;

export const GZH_TW_LANDING = {
  metaTitle: "1320｜生命映照",
  metaDescription:
    "1320｜生命映照——以結構化的方式看見自己的生命模式。不是算命，不是命理，不是心理診斷。",
  heroLead: "一生，學習看見、理解並愛自己。",
  boundary: "不是預測。不是命定。不是替你下結論。",
  ctaPrimary: "開始免費生命映照",
  ctaSecondary: "了解 1320",
  trustLine: "只需公曆出生年月日。不需要出生時辰與地點。",
  reportLanguageNote: "完整報告目前提供英文版本。",
  semanticNote: "本頁文案處於 Global Chinese 語義審校中（尚未 GREEN）。",
} as const;

export const GZH_TW_HOW = {
  title: "怎麼運作",
  steps: [
    {
      title: "輸入公曆生日",
      text: "只用年、月、日。系統依固定規則組成一組象徵結構——不是即興生成，也不是靈媒解讀。",
    },
    {
      title: "看見四個面向",
      text: "免費體驗會映照：起源感、表達方式、關係中的鏡子，以及你如何回到自己。",
    },
    {
      title: "留給你自己觀察",
      text: "文字是鏡子，不是判決。你可以同意、不同意，或只是多看見一點自己的模式。",
    },
  ],
} as const;

export const GZH_TW_WHAT_YOU_GET = {
  title: "你會得到什麼",
  items: [
    "一段可完成的免費自我映照體驗",
    "以出生日期組成的象徵結構（非算命結論）",
    "幫助你觀察「什麼感覺更基礎、什麼比較像後來的適應」",
  ],
  notItems: [
    "不會告訴你命運好壞",
    "不會診斷心理狀態",
    "不會承諾改運、招財或感情結果",
  ],
} as const;

/** Illustrative sample — clearly fictional; not a live reading. */
export const GZH_TW_EXAMPLE = {
  title: "一個映照例子（示意）",
  disclaimer: "以下為示意，不是任何人的真實結果，也不構成預測。",
  label: "示意結構",
  codeHint: "例如：起源 · 表達 · 鏡子 · 回歸",
  sampleLines: [
    "你可能很擅長把事情處理得妥當，讓周圍的人安心。",
    "但有時，那種「妥當」比較像後來學會的配合，而不是最先出現的狀態。",
    "映照要問的是：在適應之前，什麼對你而言更安靜、更基礎？",
  ],
  takeaway: "重點不是「你是誰的標籤」，而是「你可以從哪個角度重新看見自己的模式」。",
} as const;

export const GZH_TW_ABOUT = {
  metaTitle: "了解 1320｜生命映照",
  metaDescription: "1320 是什麼、不是什麼，以及它如何幫助你看見生命模式。",
  title: "了解 1320",
  lead: "1320｜生命映照是一個結構化的自我觀察框架。它用象徵的方式映照模式，而不是替你斷定身份或命運。",
  whatItIsTitle: "它是什麼",
  whatItIs: [
    "一面結構化的鏡子：幫你看見可能反覆出現的生命模式",
    "一次可完成的反思體驗：從生日出發，進入觀察，而不是進入結論",
    "全球同一套核心治理：看見，而不是斷定；映照，而不是定義",
  ],
  whatItIsNotTitle: "它不是什麼",
  whatItIsNot: [
    "不是算命、命理或測命運",
    "不是心理診斷或諮商替代",
    "不是保證改變人生結果的方法",
  ],
  ctaFree: "開始免費生命映照",
  backHome: "回到首頁",
} as const;

export const GZH_TW_FREE = {
  metaTitle: "免費生命映照｜1320",
  metaDescription: "輸入公曆生日，獲得一次結構化的自我映照體驗。",
  title: "免費生命映照",
  body: "輸入你的公曆出生年月日，開始一次安靜的自我觀察——看見模式，而不是被定義。",
  boundary: "看見，而不是斷定。映照，而不是定義。",
  cta: "生成我的生命映照",
  yearLabel: "年",
  monthLabel: "月",
  dayLabel: "日",
  comprehensionHint: "請先閱讀上方說明與例子後再回答。若你剛完成結果頁，也可以依整體感受作答。",
} as const;

/** Lightweight GZH-1 comprehension research prompt (neutral options) — Traditional. */
export const GZH_TW_COMPREHENSION = {
  question: "看過說明之後，你覺得 1320 更像什麼？",
  options: [
    { id: "reflection", label: "自我覺察 / 反思工具" },
    { id: "patterns", label: "看見自己生命模式的框架" },
    { id: "fortune", label: "算命 / 命理" },
    { id: "quiz", label: "心理測驗 / 性格測試" },
    { id: "fate", label: "命運或靈魂預測" },
    { id: "unsure", label: "還不確定" },
  ],
} as const;

export const GZH_TW_NAV = {
  free: "免費映照",
  about: "了解 1320",
  english: "English",
} as const;
