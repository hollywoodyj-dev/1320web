/**
 * Taiwan GZH copy — Traditional Chinese (Hant).
 * Taiwan GZH copy — Traditional Chinese (Hant). Semantic gate GREEN (2026-10-05).
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
  reportLanguageNote: "免費生命映照是中文。完整報告目前是英文。",
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
  yearLabelFull: "西元年",
  monthLabel: "月",
  dayLabel: "日",
  yearPlaceholder: "YYYY",
  monthPlaceholder: "MM",
  dayPlaceholder: "DD",
  submittingLabel: "開啟中…",
  dateHint: "請依西元年／月／日輸入國曆生日；計算公式不變。",
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

export const GZH_TW_RESULT = {
  metaTitle: "你的生命映照",
  metaDescription:
    "依國曆生日看見四個部分：你原本的模樣、你怎麼表現、你的關係、你反覆回到的模式。",
  title: "你的生命映照",
  freeEyebrow: "FREE SAMPLE · 免費四碼映照",
  freeLead: "這是免費版：先完整打開基礎四碼。文字會比較精簡，是入口，不是完整報告。",
  boundary: "這是一面鏡子，不是一張判決書。",
  birthPrefix: "國曆",
  parts: [
    { id: "s1", label: "你原本的模樣" },
    { id: "s3", label: "你怎麼表現" },
    { id: "s2", label: "你的關係" },
    { id: "s0", label: "你反覆回到的模式" },
  ],
  mirrorLine: "文字是鏡子，不是判決。",
  mirrorBody: "你可以同意、不同意，或只是多看見一點自己的模式。",
  fullReportNote: "這是免費的四個部分。完整中文報告可在下方 Preview 審閱；尚未正式核准，也不開放購買。",
  missingDateTitle: "還沒有讀到生日",
  missingDateBody: "這個連結沒有可用的國曆生日。回到免費生命映照，再輸入一次。",
  missingDateCta: "回到免費生命映照",
  missingPart: "這一段的中文說明還在準備中。",
  reflectionTitle: "留給你自己觀察",
  nextStep: {
    title: "免費版只是起點，完整藍圖還有更深的一層",
    body: "接下來可進入中文完整報告 Preview，供內部審閱。敘事仍可能是 PENDING／候選稿；不代表已正式核准。",
    freeLabel: "免費四碼",
    freeLayers: [
      { code: "S1", title: "靈魂本源" },
      { code: "S3", title: "靈魂振動" },
      { code: "S2", title: "靈魂鏡像" },
      { code: "S0", title: "空性之門" },
    ],
    fullLabel: "完整十碼 · 中文 Full Report",
    fullLayers: [
      { code: "S4", title: "核心陰影" },
      { code: "S5", title: "靈魂使命" },
      { code: "S6", title: "價值與接收" },
      { code: "S7", title: "靈魂主權" },
      { code: "S8", title: "靈魂貢獻" },
      { code: "S9", title: "回歸源頭" },
    ],
    includes: [
      "S0–S9 完整十碼",
      "跨碼整合與 17 章閱讀結構",
      "七日練習與反思日誌",
      "中文 Preview（內部審閱）",
    ],
    languageNote:
      "完整報告為繁體中文 Preview。僅部分生日有參考／候選敘事；其他生日會顯示編碼但正文可能尚未核准。",
    primaryCta: "查看中文完整報告",
    secondaryCta: "查看中文四碼試讀",
    holdNote: "僅供審閱 · 暫不提供購買／付款 · 顧客發布 HOLD",
  },
} as const;

export const GZH_TW_NAV = {
  free: "免費映照",
  about: "了解 1320",
  english: "English",
} as const;
