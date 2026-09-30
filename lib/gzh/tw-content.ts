/**
 * Taiwan GZH-1 landing copy — Founder-locked brand lines only.
 * Full product/UI strings remain GZH Semantic Gate YELLOW until reviewed.
 */

export const GZH_TW_BRAND = {
  name: "1320｜生命映照",
  subtitle: "一生，学习看见、理解并爱自己。",
  emotional: "1320，一生爱你。",
  principleSee: "看见，而不是断定。",
  principleMirror: "映照，而不是定义。",
} as const;

export const GZH_TW_LANDING = {
  metaTitle: "1320｜生命映照",
  metaDescription:
    "1320｜生命映照——以结构化的方式看见自己的生命模式。不是算命，不是命理，不是心理诊断。",
  heroLead: "一生，学习看见、理解并爱自己。",
  boundary: "不是预测。不是命定。不是替你下结论。",
  ctaPrimary: "开始免费生命映照",
  ctaSecondary: "了解 1320",
  trustLine: "只需公历出生年月日。不需要出生时辰与地点。",
  reportLanguageNote: "完整报告目前提供英文版本。",
  semanticNote: "本页文案处于 Global Chinese 语义审校中（尚未 GREEN）。",
} as const;

export const GZH_TW_FREE = {
  metaTitle: "免费生命映照｜1320",
  metaDescription: "输入公历生日，获得一次结构化的自我映照体验。",
  title: "免费生命映照",
  body: "输入你的公历出生年月日，开始一次安静的自我观察——看见模式，而不是被定义。",
  boundary: "看见，而不是断定。映照，而不是定义。",
  cta: "生成我的生命映照",
  yearLabel: "年",
  monthLabel: "月",
  dayLabel: "日",
} as const;

/** Lightweight GZH-1 comprehension research prompt (neutral options). */
export const GZH_TW_COMPREHENSION = {
  question: "完成后，你觉得 1320 更像什么？",
  options: [
    { id: "reflection", label: "自我觉察 / 反思工具" },
    { id: "patterns", label: "看见自己生命模式的框架" },
    { id: "fortune", label: "算命 / 命理" },
    { id: "quiz", label: "心理测验 / 性格测试" },
    { id: "fate", label: "命运或灵魂预测" },
    { id: "unsure", label: "还不确定" },
  ],
} as const;
