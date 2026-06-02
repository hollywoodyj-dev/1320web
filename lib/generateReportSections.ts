type Locale = "en" | "zh";

type ContentMap = Record<string, unknown> | null;

function readText(record: ContentMap, englishKey: string, chineseKey: string, locale: Locale) {
  if (!record) return "Content is being prepared for this section.";
  const english = record[englishKey];
  const chinese = record[chineseKey];
  if (locale === "zh") return String(chinese ?? english ?? "内容准备中。");
  return String(english ?? chinese ?? "Content is being prepared for this section.");
}

export function generateReportSections(
  content: {
    s1: ContentMap;
    s2: ContentMap;
    s3: ContentMap;
    s0: ContentMap;
    s4: ContentMap;
    s5: ContentMap;
    s6: ContentMap;
  },
  locale: Locale = "en",
) {
  return {
    free: {
      s1: readText(content.s1, "essenceEn", "essenceZh", locale),
      s2: readText(content.s2, "essenceEn", "essenceZh", locale),
      s3: readText(content.s3, "essenceEn", "essenceZh", locale),
      s0: readText(content.s0, "essenceEn", "essenceZh", locale),
    },
    full: {
      s4: readText(content.s4, "essenceEn", "essenceZh", locale),
      s5: readText(content.s5, "essenceEn", "essenceZh", locale),
      s6: readText(content.s6, "moneyCoreFrequencyEn", "moneyCoreFrequencyZh", locale),
    },
  };
}
