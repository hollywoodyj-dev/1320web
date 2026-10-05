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
  metaDescription: "1320｜生命映照——以結構化的方式看見自己的生命模式。",
  heroLead: "一生，學習看見、理解並愛自己。",
  boundary: "這是一面鏡子，不是一張判決書。",
  ctaPrimary: "開始免費生命映照",
  ctaSecondary: "了解 1320",
  trustLine: "只需國曆出生年月日。不需要出生時間與地點。",
  reportLanguageNote: "說明與輸入是中文。你打開的報告目前是英文。",
} as const;

export const GZH_TW_HOW = {
  title: "怎麼運作",
  steps: [
    {
      title: "輸入國曆生日",
      text: "只用年、月、日。系統依固定規則組成一組象徵組合。",
    },
    {
      title: "看見四個面向",
      text: "免費體驗會看四個部分：你原本的模樣、你怎麼表現、你的關係，以及你反覆回到的模式。",
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
    "一段可以做完的免費體驗",
    "依國曆生日組成的象徵組合",
    "陪你看見：什麼感覺更像原本的自己，什麼比較像後來學會的配合",
  ],
} as const;

/** Illustrative sample — clearly fictional; not a live reading. */
export const GZH_TW_EXAMPLE = {
  title: "一個例子",
  parts: "你原本的模樣、你怎麼表現、你的關係、你反覆回到的模式。",
  sampleLines: [
    "你可能很會把事情處理得妥當，讓身邊的人安心。",
    "那種妥當，有時比較像後來學會的配合。",
    "在配合之前，什麼對你更安靜、更像原本的自己？",
  ],
  takeaway: "你可以從這裡重新看見自己的模式。",
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
    "全球一致的核心原則：看見，而不是斷定；映照，而不是定義",
  ],
  whatItIsNotTitle: "它不是什麼",
  whatItIsNot: [
    "不是算命或命理",
    "不是心理診斷或諮商替代",
    "不是保證改變人生結果的方法",
  ],
  ctaFree: "開始免費生命映照",
  backHome: "回到首頁",
} as const;

export const GZH_TW_FREE = {
  metaTitle: "免費生命映照｜1320",
  metaDescription: "輸入國曆生日，開始一次結構化的自我觀察。",
  title: "免費生命映照",
  body: "輸入你的國曆出生年月日，開始一次安靜的自我觀察。",
  boundary: "看見，而不是斷定。映照，而不是定義。",
  cta: "開始我的生命映照",
  yearLabel: "年",
  monthLabel: "月",
  dayLabel: "日",
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
