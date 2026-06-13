import { strArray } from "@/lib/adapt1320V1";
import { fromV1Fields, localizedFromStrings, pickLocalized } from "@/lib/getLocalized";
import type { Locale, SegmentContent, V1Record } from "@/lib/types/1320-content";

const S4_ESSENCE_EN =
  "This section reflects recurring low-frequency patterns that may appear under pressure, in relationships, or when proving your worth.";
const S4_GUIDANCE_EN =
  "Seeing the pattern is not about defining yourself — it is about gaining new choices.";

function str(record: V1Record, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" ? value : undefined;
}

/** S4 JSON uses Zh-first fields; English falls back to S1 shadow patterns. */
export function adaptS4ShadowPattern(
  record: V1Record | null,
  s1Content: SegmentContent,
  locale: Locale = "en",
): SegmentContent | null {
  if (!record) return null;

  const archetype = pickLocalized(s1Content.title, locale);
  const titleEn = str(record, "titleEn") ?? `${archetype} · Core Shadow Pattern`;
  const titleZh = str(record, "titleZh") ?? `${pickLocalized(s1Content.title, "zh")} · 核心阴影模式`;

  const corePatternEn = strArray(record, "corePatternEn");
  const corePatternZh = strArray(record, "corePatternZh");
  const shadowFallback =
    s1Content.shadowPatterns?.map((item) => pickLocalized(item, locale)).filter(Boolean) ?? [];

  const patternItems =
    locale === "en"
      ? corePatternEn.length
        ? corePatternEn
        : shadowFallback.length
          ? shadowFallback
          : corePatternZh
      : corePatternZh.length
        ? corePatternZh
        : shadowFallback;

  const essenceEn = str(record, "essenceEn") ?? S4_ESSENCE_EN;
  const essenceZh = str(record, "essenceZh") ?? S4_ESSENCE_EN;
  const integrationEn = str(record, "integrationEn") ?? str(record, "integrationZh") ?? "";
  const integrationZh = str(record, "integrationZh") ?? integrationEn;
  const guidanceEn = str(record, "guidanceEn") ?? str(record, "guidanceZh") ?? S4_GUIDANCE_EN;
  const guidanceZh = str(record, "guidanceZh") ?? guidanceEn;

  return {
    id: str(record, "id") ?? `S4-${s1Content.segmentCode ?? s1Content.id}`,
    number: s1Content.number,
    segmentCode: str(record, "id") ?? undefined,
    title: localizedFromStrings(titleEn, titleZh, { en: titleEn, zh: titleZh }),
    subtitle: fromV1Fields("Core Shadow Pattern", "核心阴影模式"),
    shortLabel: fromV1Fields("S4 Shadow", "S4 阴影"),
    freeEssence: localizedFromStrings(essenceEn, essenceZh, { en: essenceEn, zh: essenceZh }),
    fullEssence: localizedFromStrings(essenceEn, essenceZh, { en: essenceEn, zh: essenceZh }),
    shadowPatterns: patternItems.map((item) => fromV1Fields(item, item)),
    lesson: localizedFromStrings(integrationEn, integrationZh, { en: integrationEn, zh: integrationZh }),
    guidance: localizedFromStrings(guidanceEn, guidanceZh, { en: guidanceEn, zh: guidanceZh }),
    lockedPreview: fromV1Fields(
      "Distinct from Integrated Soul Blueprint — this is the pattern beneath the pattern.",
      "区别于整合灵魂蓝图——这是模式之下的模式。",
    ),
  };
}
