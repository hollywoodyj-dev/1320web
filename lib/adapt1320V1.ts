import { fromV1Fields, localizedFromStrings } from "@/lib/getLocalized";
import type { SegmentContent, V1Record } from "@/lib/types/1320-content";

const SEGMENT_LABELS = {
  s1: { subtitle: { en: "Origin Frequency", zh: "原频" }, shortLabel: { en: "Who You Are", zh: "你是谁" } },
  s3: { subtitle: { en: "Vibration Tier", zh: "振动层级" }, shortLabel: { en: "How You Express", zh: "你如何表达" } },
  s2: { subtitle: { en: "Mirror Path", zh: "镜像路径" }, shortLabel: { en: "Who You Attract", zh: "你吸引谁" } },
  s0: { subtitle: { en: "Void Gate", zh: "空门" }, shortLabel: { en: "How You Awaken", zh: "你如何觉醒" } },
} as const;

const MISSING_FALLBACK = {
  en: "This section is being prepared for the full report. Your current code still offers a meaningful first-layer reflection.",
  zh: "此部分正在完整报告中完善。你当前的编码仍可提供有意义的第一层反思。",
};

const GENERIC_EN = {
  s2: {
    title: (n: number) => `Mirror Path ${n}`,
    essence:
      "Your Mirror Path reveals how relationships mirror inner patterns — inviting awareness, not prediction.",
    locked:
      "The full report expands your relational mirror with deeper pattern recognition and integration guidance.",
  },
  s0: {
    title: (n: number) => `Void Gate ${String(n).padStart(2, "0")}`,
    essence: "Your Void Gate points to a core illusion ready to be seen with compassion.",
    practice: "Notice one moment today where you seek worth outside yourself — and return it inward.",
    locked:
      "The full report opens your Void Gate with deeper awakening paths and integration practices.",
  },
} as const;

function str(record: V1Record, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" ? value : undefined;
}

function strArray(record: V1Record, key: string): string[] {
  const value = record[key];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function truncate(text: string, max = 160): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

export function mergeEnOverlay(record: V1Record | null, overlay: V1Record | undefined): V1Record | null {
  if (!record) return null;
  if (!overlay) return record;
  return { ...record, ...overlay };
}

function buildFreeEssenceEn(segment: keyof typeof SEGMENT_LABELS, record: V1Record): string | undefined {
  const essenceEn = str(record, "essenceEn");
  if (essenceEn) return essenceEn;

  const nameEn = str(record, "nameEn");
  if (segment === "s1" && nameEn) {
    return `You carry the origin frequency of ${nameEn}.`;
  }
  if (segment === "s2" && nameEn) {
    return `Your Mirror Path activates patterns of ${nameEn}.`;
  }
  if (segment === "s2") {
    return str(record, "relationshipDynamicEn") ?? GENERIC_EN.s2.essence;
  }
  if (segment === "s0" && nameEn) {
    return `Your Void Gate works through the illusion of ${nameEn}.`;
  }
  if (segment === "s0") {
    return str(record, "coreIllusionEn") ?? GENERIC_EN.s0.essence;
  }
  if (segment === "s3") {
    if (nameEn) return `Your vibration tier expresses as ${nameEn}.`;
  }
  return undefined;
}

function baseSegment(
  segment: keyof typeof SEGMENT_LABELS,
  record: V1Record | null,
  number: number,
  id: string,
  missing = false,
): SegmentContent {
  const labels = SEGMENT_LABELS[segment];
  const fallbackEssence = { en: MISSING_FALLBACK.en, zh: MISSING_FALLBACK.zh };

  if (!record) {
    return {
      id,
      number,
      title: fromV1Fields(id, id),
      subtitle: labels.subtitle,
      shortLabel: labels.shortLabel,
      freeEssence: fallbackEssence,
      lockedPreview: fallbackEssence,
      missing: true,
    };
  }

  const titleFallback =
    segment === "s2"
      ? { en: GENERIC_EN.s2.title(number), zh: str(record, "nameZh") ?? GENERIC_EN.s2.title(number) }
      : segment === "s0"
        ? { en: GENERIC_EN.s0.title(number), zh: str(record, "nameZh") ?? GENERIC_EN.s0.title(number) }
        : fromV1Fields(id);

  const title = localizedFromStrings(str(record, "nameEn"), str(record, "nameZh"), titleFallback);

  const essenceFallback =
    segment === "s2"
      ? { en: GENERIC_EN.s2.essence, zh: str(record, "essenceZh") ?? MISSING_FALLBACK.zh }
      : segment === "s0"
        ? { en: GENERIC_EN.s0.essence, zh: str(record, "essenceZh") ?? MISSING_FALLBACK.zh }
        : fallbackEssence;

  const freeEssence = localizedFromStrings(
    buildFreeEssenceEn(segment, record),
    str(record, "essenceZh"),
    essenceFallback,
  );

  const lockedPreview = localizedFromStrings(
    str(record, "noteEn") ?? str(record, "guidanceEn"),
    str(record, "noteZh") ?? str(record, "guidanceZh"),
    {
      en:
        segment === "s2"
          ? GENERIC_EN.s2.locked
          : segment === "s0"
            ? GENERIC_EN.s0.locked
            : "The full report expands this dimension with deeper integration guidance.",
      zh: "完整报告将展开更深层的整合指引。",
    },
  );

  return {
    id,
    number,
    title,
    subtitle: labels.subtitle,
    shortLabel: labels.shortLabel,
    freeEssence,
    lockedPreview,
    missing,
  };
}

export function adaptS1(record: V1Record | null, s1: number): SegmentContent {
  const id = record?.id ? String(record.id) : `S1-${String(s1).padStart(2, "0")}`;
  const content = baseSegment("s1", record, s1, id, !record);

  if (!record) return content;

  const nameEn = str(record, "nameEn") ?? content.title.en;
  const traitsEn = strArray(record, "traitsEn");
  const traitsZh = strArray(record, "traitsZh");
  const essenceFromTraits =
    traitsEn.length > 0
      ? `You carry the origin frequency of ${nameEn}. ${traitsEn.join(". ")}.`
      : undefined;
  const essenceZhFromTraits =
    traitsZh.length > 0
      ? `你携带的是「${str(record, "nameZh") ?? nameEn}」的原频。${traitsZh.join("。")}。`
      : undefined;

  const freeEssenceFromTraits =
    traitsEn.length > 0
      ? localizedFromStrings(
          `${traitsEn.map((t) => t.trim()).filter(Boolean).join(". ")}.`,
          traitsZh.length > 0
            ? `${traitsZh.map((t) => t.trim()).filter(Boolean).join("。")}。`
            : undefined,
          content.freeEssence,
        )
      : content.freeEssence;

  return {
    ...content,
    freeEssence: freeEssenceFromTraits,
    fullEssence: localizedFromStrings(
      essenceFromTraits ?? str(record, "essenceEn"),
      essenceZhFromTraits ?? str(record, "essenceZh"),
      freeEssenceFromTraits,
    ),
    soulTraits: strArray(record, "traitsEn").length
      ? strArray(record, "traitsEn").map((en, i) => fromV1Fields(en, strArray(record, "traitsZh")[i]))
      : strArray(record, "traitsZh").map((zh) => fromV1Fields(undefined, zh)),
    coreGifts: strArray(record, "strengthsEn").length
      ? strArray(record, "strengthsEn").map((en, i) =>
          fromV1Fields(en, strArray(record, "strengthsZh")[i]),
        )
      : strArray(record, "strengthsZh").map((zh) => fromV1Fields(undefined, zh)),
    shadowPatterns: strArray(record, "shadowsEn").length
      ? strArray(record, "shadowsEn").map((en, i) => fromV1Fields(en, strArray(record, "shadowsZh")[i]))
      : strArray(record, "shadowsZh").map((zh) => fromV1Fields(undefined, zh)),
    lesson: localizedFromStrings(str(record, "lessonEn"), str(record, "lessonZh"), { en: "", zh: "" }),
    direction: strArray(record, "directionEn").length
      ? strArray(record, "directionEn").map((en, i) =>
          localizedFromStrings(en, strArray(record, "directionZh")[i], { en: "", zh: "" }),
        )
      : strArray(record, "directionZh").map((zh) => ({ en: "", zh })),
    guidance: localizedFromStrings(str(record, "guidanceEn"), str(record, "guidanceZh"), { en: "", zh: "" }),
    color: localizedFromStrings(str(record, "colorEn"), str(record, "colorZh"), { en: "", zh: "" }),
    totem: localizedFromStrings(str(record, "totemEn"), str(record, "totemZh"), { en: "", zh: "" }),
    integrationPrompt: localizedFromStrings(
      str(record, "guidanceEn") ? truncate(str(record, "guidanceEn")!, 120) : undefined,
      str(record, "guidanceZh") ? truncate(str(record, "guidanceZh")!, 120) : undefined,
      { en: "", zh: "" },
    ),
  };
}

export function adaptS2(record: V1Record | null, s2: number): SegmentContent {
  const id = record?.id ? String(record.id) : `S2-${String(s2).padStart(2, "0")}`;
  const content = baseSegment("s2", record, s2, id, !record);

  if (!record) return content;

  const nameEn = str(record, "nameEn") ?? content.title.en;
  const nameZh = str(record, "nameZh");
  const dynamicEn = str(record, "relationshipDynamicEn") ?? str(record, "essenceEn");
  const dynamicZh = str(record, "relationshipDynamicZh") ?? str(record, "essenceZh");

  const freeEssence = localizedFromStrings(dynamicEn, dynamicZh, content.freeEssence);

  return {
    ...content,
    title: localizedFromStrings(nameEn, nameZh, content.title),
    freeEssence,
    fullEssence: localizedFromStrings(dynamicEn, dynamicZh, freeEssence),
    relationshipPattern: localizedFromStrings(dynamicEn, dynamicZh, { en: "", zh: "" }),
    karmicLoop: localizedFromStrings(
      str(record, "karmicLoopEn"),
      str(record, "karmicLoopZh"),
      { en: "", zh: "" },
    ),
    mirrorLesson: localizedFromStrings(str(record, "lessonEn"), str(record, "lessonZh"), { en: "", zh: "" }),
    guidance: localizedFromStrings(str(record, "guidanceEn"), str(record, "guidanceZh"), { en: "", zh: "" }),
    integrationPrompt: localizedFromStrings(
      str(record, "healingPathEn"),
      str(record, "healingPathZh"),
      { en: "", zh: "" },
    ),
  };
}

export function adaptS0(record: V1Record | null, s0: number): SegmentContent {
  const id = record?.id ? String(record.id) : `S0-${String(s0).padStart(2, "0")}`;
  const content = baseSegment("s0", record, s0, id, !record);

  if (!record) return content;

  const nameEn = str(record, "nameEn") ?? content.title.en;
  const nameZh = str(record, "nameZh");
  const illusionEn = str(record, "coreIllusionEn") ?? str(record, "essenceEn");
  const illusionZh = str(record, "coreIllusionZh") ?? str(record, "essenceZh");

  const practice = localizedFromStrings(
    str(record, "practiceEn") ?? str(record, "pathOfReturnEn"),
    str(record, "practiceZh") ?? str(record, "pathOfReturnZh"),
    {
      en: GENERIC_EN.s0.practice,
      zh: str(record, "practiceZh") ?? GENERIC_EN.s0.practice,
    },
  );

  const coreIllusion = localizedFromStrings(illusionEn, illusionZh, content.freeEssence);

  const freeEssence = coreIllusion;

  return {
    ...content,
    title: localizedFromStrings(nameEn, nameZh, content.title),
    freeEssence,
    fullEssence: coreIllusion,
    coreIllusion,
    voidChallenge: localizedFromStrings(
      str(record, "voidChallengeEn"),
      str(record, "voidChallengeZh"),
      { en: "", zh: "" },
    ),
    voidPower: localizedFromStrings(str(record, "voidPowerEn"), str(record, "voidPowerZh"), {
      en: "",
      zh: "",
    }),
    awakeningPath: localizedFromStrings(
      str(record, "pathOfReturnEn"),
      str(record, "pathOfReturnZh"),
      practice,
    ),
    practice,
    guidance: localizedFromStrings(str(record, "guidanceEn"), str(record, "guidanceZh"), content.lockedPreview),
    integrationPrompt: practice,
  };
}

export function adaptS3(record: V1Record | null, s3Raw: number, tierMatched: boolean): SegmentContent {
  const safe = record ?? {};
  const id = record?.id ? String(record.id) : `S3-${s3Raw}`;
  const content = baseSegment("s3", record, s3Raw, id, !record || !tierMatched);

  const nameEn = str(safe, "nameEn") ?? `Tier ${s3Raw}`;
  const nameZh = str(safe, "nameZh");
  const soulTraitsEn = str(safe, "soulTraitsEn") ?? str(safe, "essenceEn");
  const soulTraitsZh = str(safe, "soulTraitsZh") ?? str(safe, "essenceZh");

  const tierCode =
    typeof safe.code === "string"
      ? safe.code
      : typeof safe.tierNumber === "number"
        ? `S3-${String(safe.tierNumber).padStart(2, "0")}`
        : null;
  const title = localizedFromStrings(nameEn, nameZh, fromV1Fields(tierCode ?? "S3", tierCode ?? "S3"));

  const freeEssence = localizedFromStrings(
    soulTraitsEn ?? str(safe, "essenceEn") ?? buildFreeEssenceEn("s3", safe),
    soulTraitsZh ?? str(safe, "essenceZh"),
    {
      en: `${nameEn} reflects how your energy expresses in the world.`,
      zh: `${nameZh ?? nameEn}映照你的能量如何在现实中表达。`,
    },
  );

  return {
    ...content,
    title,
    freeEssence,
    s3Raw,
    s3Code: tierCode ?? undefined,
    segmentCode: tierCode ?? undefined,
    number: s3Raw,
    fullEssence: localizedFromStrings(soulTraitsEn, soulTraitsZh, freeEssence),
    expressionPattern: localizedFromStrings(
      str(safe, "strengthsEn"),
      str(safe, "strengthsZh"),
      { en: "", zh: "" },
    ),
    growthEdge: localizedFromStrings(
      str(safe, "challengesEn"),
      str(safe, "challengesZh"),
      { en: "", zh: "" },
    ),
    guidance: localizedFromStrings(
      str(safe, "guidanceEn") ?? str(safe, "noteEn"),
      str(safe, "guidanceZh") ?? str(safe, "noteZh"),
      { en: "", zh: "" },
    ),
  };
}

export function adaptPremiumSegment(
  record: V1Record | null,
  id: string,
  number: number,
  titleEn: string,
  titleZh: string,
): SegmentContent | null {
  if (!record) return null;
  return {
    ...baseSegment("s1", record, number, id, false),
    title: localizedFromStrings(str(record, "nameEn") ?? titleEn, str(record, "nameZh") ?? titleZh, {
      en: titleEn,
      zh: titleZh,
    }),
    freeEssence: localizedFromStrings(str(record, "essenceEn"), str(record, "essenceZh"), {
      en: "Content is being prepared for this section.",
      zh: "内容准备中。",
    }),
  };
}

// Locale export reserved for future adapter paths — see lib/types/1320-content.ts
