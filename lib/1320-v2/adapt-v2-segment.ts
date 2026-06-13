import { enrichV2AwarenessEntry } from "@/lib/1320-v2/enrich-v2-awareness";
import { bilingualField, containsCjk, fromV1Fields } from "@/lib/getLocalized";
import type { Locale, LocalizedText, SegmentContent } from "@/lib/types/1320-content";
import type { SoulMissionSection } from "@/lib/types/s5-soul-mission";
import type { V2BlockSpec, V2ModuleId } from "@/lib/types/1320-v2-content";
import { getV2BlockSpecs, type V2Entry } from "@/lib/1320-v2/v2-index";

const MISSING_EN =
  "This v2 content entry is missing from the database. Please contact support if this persists.";
const MISSING_ZH = "此 v2 内容条目在数据库中缺失。如持续出现请联系支持。";

const MODULE_LABELS: Record<
  V2ModuleId,
  { title: LocalizedText; subtitle: LocalizedText; shortLabel: LocalizedText; number: number }
> = {
  S0: {
    number: 0,
    title: { en: "Void Gate", zh: "空性之门" },
    subtitle: { en: "Void Gate", zh: "空性之门" },
    shortLabel: { en: "How You Awaken", zh: "你如何觉醒" },
  },
  S1: {
    number: 1,
    title: { en: "Soul Origin", zh: "灵魂本源" },
    subtitle: { en: "Origin Frequency", zh: "原频" },
    shortLabel: { en: "Who You Are", zh: "你是谁" },
  },
  S2: {
    number: 2,
    title: { en: "Soul Mirror", zh: "灵魂镜像" },
    subtitle: { en: "Soul Mirror", zh: "灵魂镜像" },
    shortLabel: { en: "Who You Attract", zh: "你吸引谁" },
  },
  S3: {
    number: 3,
    title: { en: "Soul Vibration", zh: "灵魂振动" },
    subtitle: { en: "Vibration Tier", zh: "振动层级" },
    shortLabel: { en: "How You Express", zh: "你如何表达" },
  },
  S4: {
    number: 4,
    title: { en: "Core Shadow Pattern", zh: "核心阴影模式" },
    subtitle: { en: "Core Shadow Pattern", zh: "核心阴影模式" },
    shortLabel: { en: "Shadow Loop", zh: "阴影循环" },
  },
  S5: {
    number: 5,
    title: { en: "Soul Mission", zh: "灵魂使命" },
    subtitle: { en: "Soul Mission", zh: "灵魂使命" },
    shortLabel: { en: "Mission", zh: "使命" },
  },
  S6: {
    number: 6,
    title: { en: "Value & Receiving", zh: "价值与接收" },
    subtitle: { en: "Value & Receiving", zh: "价值与接收" },
    shortLabel: { en: "Value", zh: "价值" },
  },
  S7: {
    number: 7,
    title: { en: "Soul Sovereignty", zh: "灵魂主权" },
    subtitle: { en: "Soul Sovereignty", zh: "灵魂主权" },
    shortLabel: { en: "Sovereignty", zh: "主权" },
  },
  S8: {
    number: 8,
    title: { en: "Soul Contribution", zh: "灵魂贡献" },
    subtitle: { en: "Soul Contribution", zh: "灵魂贡献" },
    shortLabel: { en: "Contribution", zh: "贡献" },
  },
  S9: {
    number: 9,
    title: { en: "Return to Source", zh: "回源之门" },
    subtitle: { en: "Return to Source", zh: "回源之门" },
    shortLabel: { en: "Return", zh: "回源" },
  },
};

function str(entry: V2Entry, key: string): string | undefined {
  const value = entry[key];
  return typeof value === "string" ? value : undefined;
}

function strArray(entry: V2Entry, key: string): string[] {
  const value = entry[key];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function text(en?: string, zh?: string): LocalizedText {
  return bilingualField(en, zh);
}

function mapStringArray(entry: V2Entry, enKey: string, zhKey: string): LocalizedText[] {
  const enItems = strArray(entry, enKey);
  const zhItems = strArray(entry, zhKey);
  if (enItems.length) {
    return enItems.map((en, i) => text(en, zhItems[i]));
  }
  return zhItems.map((zh) => text(undefined, zh));
}

function pickEnglishGuidance(entry: V2Entry): LocalizedText | undefined {
  const ww = str(entry, "wisewave_guidance");
  const wwZh = str(entry, "wisewave_guidance_zh") ?? str(entry, "guidance_zh");
  const practice = str(entry, "one_week_practice");
  const en = ww && !containsCjk(ww) ? ww : practice;
  const zh = wwZh ?? (ww && containsCjk(ww) ? ww : undefined);
  if (!en?.trim() && !zh?.trim()) return undefined;
  return text(en, zh);
}

function formatBulletList(items: string[]): string {
  return items.map((item) => `• ${item}`).join("\n");
}

function buildOutputSections(
  entry: V2Entry,
  specs: V2BlockSpec[],
  prefix: string,
): SoulMissionSection[] {
  return specs
    .map((spec, index) => {
      const raw = entry[spec.key];
      if (typeof raw === "string" && raw.trim()) {
        return {
          id: `${prefix}-${spec.key}`,
          label: text(spec.title, spec.titleZh),
          body: text(raw),
        };
      }
      if (Array.isArray(raw) && raw.length > 0) {
        const items = raw.filter((v): v is string => typeof v === "string");
        if (!items.length) return null;
        return {
          id: `${prefix}-${spec.key}`,
          label: text(spec.title, spec.titleZh),
          body: text(formatBulletList(items)),
        };
      }
      return null;
    })
    .filter((section): section is SoulMissionSection => Boolean(section));
}

function buildS5Sections(entry: V2Entry): SoulMissionSection[] {
  const blocks = entry.output_blocks;
  if (!blocks || typeof blocks !== "object") return [];
  const merged: V2Entry = { ...entry, ...(blocks as V2Entry) };
  return buildOutputSections(merged, getV2BlockSpecs("S5"), "S5");
}

function missingSegment(module: V2ModuleId, code: string): SegmentContent {
  const labels = MODULE_LABELS[module];
  return {
    id: code,
    number: labels.number,
    title: labels.title,
    subtitle: labels.subtitle,
    shortLabel: labels.shortLabel,
    segmentCode: code,
    missing: true,
    freeEssence: text(MISSING_EN, MISSING_ZH),
    lockedPreview: text(MISSING_EN, MISSING_ZH),
  };
}

function baseSegment(
  module: V2ModuleId,
  code: string,
  entry: V2Entry,
  titleOverride?: LocalizedText,
): Pick<SegmentContent, "id" | "number" | "title" | "subtitle" | "shortLabel" | "segmentCode"> {
  const labels = MODULE_LABELS[module];
  const archetype = text(str(entry, "archetype"), str(entry, "archetype_zh"));
  const mirrorArchetype = text(str(entry, "mirror_archetype"), str(entry, "mirror_archetype_zh"));
  const vibration = text(str(entry, "vibration_archetype"), str(entry, "vibration_archetype_zh"));
  const voidArchetype = text(str(entry, "void_archetype"), str(entry, "void_archetype_zh"));
  const title =
    titleOverride ??
    (archetype.en
      ? archetype
      : mirrorArchetype.en
        ? mirrorArchetype
        : vibration.en
          ? vibration
          : voidArchetype.en
            ? voidArchetype
            : labels.title);

  return {
    id: code,
    number: labels.number,
    title,
    subtitle: labels.subtitle,
    shortLabel: labels.shortLabel,
    segmentCode: code,
  };
}

export function adaptV2Segment(
  module: V2ModuleId,
  code: string,
  entry: V2Entry | null,
  s3Raw?: number,
): SegmentContent {
  if (!entry) return missingSegment(module, code);

  const enriched = enrichV2AwarenessEntry(module, code, entry);

  const reflection = str(enriched, "reflection_question");
  const safeNote = str(enriched, "safe_language_note");
  const sections = (() => {
    if (module === "S5") return buildS5Sections(enriched);
    if (module === "S4" || module === "S6" || module === "S7" || module === "S8" || module === "S9") {
      return buildOutputSections(enriched, getV2BlockSpecs(module), module);
    }
    return [];
  })();

  const base = baseSegment(module, code, enriched);
  const freeEssenceSource =
    str(enriched, "origin_essence") ??
    str(enriched, "mirror_essence") ??
    str(enriched, "reflective_summary") ??
    str(enriched, "vibration_essence") ??
    sections[0]?.body.en;

  const segment: SegmentContent = {
    ...base,
    freeEssence: text(freeEssenceSource ?? MISSING_EN, str(enriched, "origin_essence_zh")),
    lockedPreview: text(
      "Full report renders all approved v2 database fields for this module.",
      "完整报告将呈现此模块的全部已批准 v2 数据库字段。",
    ),
    reflectionQuestion: reflection ? text(reflection) : undefined,
    soulMissionSections: sections.length ? sections : undefined,
    guidance: pickEnglishGuidance(enriched),
    practice: str(enriched, "one_week_practice") ? text(str(enriched, "one_week_practice")!) : undefined,
    s3Raw: module === "S3" ? s3Raw : undefined,
    s3Code: module === "S3" ? code : undefined,
  };

  if (module === "S1") {
    segment.soulTraits = mapStringArray(enriched, "soul_traits", "soul_traits_zh");
    segment.coreGifts = mapStringArray(enriched, "strengths", "strengths_zh");
    segment.shadowPatterns = mapStringArray(enriched, "shadow_frequency", "shadow_frequency_zh");
    segment.lesson = text(str(enriched, "core_lesson"), str(enriched, "core_lesson_zh"));
    segment.direction = mapStringArray(enriched, "mission_direction", "mission_direction_zh");
    segment.color = text(str(enriched, "symbolic_color"), str(enriched, "symbolic_color_zh"));
    segment.totem = text(str(enriched, "totem"), str(enriched, "totem_zh"));
    segment.fullEssence = text(str(enriched, "origin_essence"), str(enriched, "origin_essence_zh"));
    if (!segment.guidance) {
      segment.guidance = pickEnglishGuidance(enriched);
    }
  }

  if (module === "S0") {
    segment.coreIllusion = text(str(enriched, "core_illusion"), str(enriched, "core_illusion_zh"));
    if (!segment.coreIllusion.en?.trim() && !segment.coreIllusion.zh?.trim()) {
      segment.coreIllusion = text(str(enriched, "reflective_summary"), undefined);
    }
    segment.voidChallenge = text(str(enriched, "void_challenge"), str(enriched, "void_challenge_zh"));
    segment.voidPower = text(str(enriched, "void_power"), str(enriched, "void_power_zh"));
    segment.awakeningPath = text(str(enriched, "path_of_return"), str(enriched, "path_of_return_zh"));
    segment.freeEssence = text(
      str(enriched, "core_illusion") ??
        str(enriched, "reflective_summary") ??
        freeEssenceSource ??
        MISSING_EN,
      str(enriched, "core_illusion_zh") ?? str(enriched, "origin_essence_zh"),
    );
  }

  if (module === "S2") {
    segment.relationshipPattern = text(
      str(enriched, "relationship_dynamic"),
      str(enriched, "relationship_dynamic_zh"),
    );
    segment.karmicLoop = text(str(enriched, "karmic_loop"), str(enriched, "karmic_loop_zh"));
    segment.mirrorLesson = text(str(enriched, "lesson"), str(enriched, "lesson_zh"));
    segment.integrationPrompt = text(str(enriched, "healing_path"), str(enriched, "healing_path_zh"));
    segment.freeEssence = text(
      str(enriched, "mirror_essence") ?? str(enriched, "reflective_summary") ?? freeEssenceSource ?? MISSING_EN,
      str(enriched, "mirror_essence_zh"),
    );
    segment.fullEssence = segment.freeEssence;
    if (!segment.guidance) {
      segment.guidance = pickEnglishGuidance(enriched);
    }
  }

  if (module === "S3") {
    segment.expressionPattern = text(str(enriched, "expression_style"), str(enriched, "expression_style_zh"));
    segment.growthEdge = text(str(enriched, "integration_key"), str(enriched, "integration_key_zh"));
    segment.fullEssence = text(str(enriched, "vibration_essence"), str(enriched, "vibration_essence_zh"));
    if (!segment.guidance) {
      segment.guidance = pickEnglishGuidance(enriched);
    }
    segment.integrationPrompt = text(str(enriched, "one_week_practice"), str(enriched, "one_week_practice_zh"));
  }

  if (module === "S4") {
    segment.fullEssence = text(str(enriched, "reflective_summary"), str(enriched, "reflective_summary_zh"));
  }

  if (safeNote && module !== "S2" && module !== "S0") {
    segment.integrationPrompt = text(safeNote, str(enriched, "safe_language_note_zh"));
  }

  return segment;
}

export function adaptV2SegmentForLocale(segment: SegmentContent, locale: Locale): SegmentContent {
  if (locale === "en") return segment;
  // SegmentContent is bilingual; UI picks via pickLocalized — no mutation needed.
  return segment;
}
