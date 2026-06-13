import { fromV1Fields } from "@/lib/getLocalized";
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
  return fromV1Fields(en, zh);
}

function truncate(text: string, max = 200): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
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
  const vibration = text(str(entry, "vibration_archetype"), str(entry, "vibration_archetype_zh"));
  const voidArchetype = text(str(entry, "void_archetype"), str(entry, "void_archetype_zh"));
  const title =
    titleOverride ??
    (archetype.en ? archetype : vibration.en ? vibration : voidArchetype.en ? voidArchetype : labels.title);

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

  const reflection = str(entry, "reflection_question");
  const safeNote = str(entry, "safe_language_note");
  const sections = (() => {
    if (module === "S5") return buildS5Sections(entry);
    if (module === "S4" || module === "S6" || module === "S7" || module === "S8" || module === "S9") {
      return buildOutputSections(entry, getV2BlockSpecs(module), module);
    }
    return [];
  })();

  const base = baseSegment(module, code, entry);
  const freeEssenceSource =
    str(entry, "origin_essence") ??
    str(entry, "reflective_summary") ??
    str(entry, "vibration_essence") ??
    str(entry, "mirror_essence") ??
    sections[0]?.body.en;

  const segment: SegmentContent = {
    ...base,
    freeEssence: text(freeEssenceSource ?? MISSING_EN, str(entry, "origin_essence_zh")),
    lockedPreview: text(
      "Full report renders all approved v2 database fields for this module.",
      "完整报告将呈现此模块的全部已批准 v2 数据库字段。",
    ),
    reflectionQuestion: reflection ? text(reflection) : undefined,
    soulMissionSections: sections.length ? sections : undefined,
    guidance: str(entry, "wisewave_guidance") || str(entry, "wisewave_reflection")
      ? text(str(entry, "wisewave_guidance") ?? str(entry, "wisewave_reflection"))
      : undefined,
    practice: str(entry, "one_week_practice") ? text(str(entry, "one_week_practice")!) : undefined,
    s3Raw: module === "S3" ? s3Raw : undefined,
    s3Code: module === "S3" ? code : undefined,
  };

  if (module === "S1") {
    segment.soulTraits = strArray(entry, "soul_traits").map((item) => text(item));
    if (!segment.soulTraits.length) {
      segment.soulTraits = strArray(entry, "soul_traits_zh").map((item) => text("", item));
    }
    segment.coreGifts = strArray(entry, "strengths").map((item) => text(item));
    if (!segment.coreGifts.length) {
      segment.coreGifts = strArray(entry, "strengths_zh").map((item) => text("", item));
    }
    segment.lesson = str(entry, "core_lesson") ? text(str(entry, "core_lesson")!) : undefined;
    segment.direction = strArray(entry, "mission_direction").map((item) => text(item));
    segment.color = str(entry, "symbolic_color") ? text(str(entry, "symbolic_color")!) : undefined;
    segment.totem = str(entry, "totem") ? text(str(entry, "totem")!) : undefined;
    segment.fullEssence = str(entry, "origin_essence") ? text(str(entry, "origin_essence")!) : undefined;
  }

  if (module === "S0") {
    segment.coreIllusion = str(entry, "reflective_summary") ? text(str(entry, "reflective_summary")!) : undefined;
    segment.voidChallenge = str(entry, "void_challenge_zh") ? text("", str(entry, "void_challenge_zh")) : undefined;
    segment.voidPower = str(entry, "void_power_zh") ? text("", str(entry, "void_power_zh")) : undefined;
    segment.awakeningPath = str(entry, "path_of_return_zh") ? text("", str(entry, "path_of_return_zh")) : undefined;
  }

  if (module === "S2") {
    segment.relationshipPattern = str(entry, "relationship_pattern")
      ? text(str(entry, "relationship_pattern")!)
      : undefined;
    segment.mirrorLesson = str(entry, "reflective_summary") ? text(str(entry, "reflective_summary")!) : undefined;
  }

  if (module === "S3") {
    segment.expressionPattern = str(entry, "expression_style") ? text(str(entry, "expression_style")!) : undefined;
    segment.growthEdge = str(entry, "integration_key") ? text(str(entry, "integration_key")!) : undefined;
    segment.fullEssence = str(entry, "vibration_essence") ? text(str(entry, "vibration_essence")!) : undefined;
  }

  if (module === "S4") {
    segment.fullEssence = str(entry, "reflective_summary") ? text(str(entry, "reflective_summary")!) : undefined;
  }

  if (safeNote) {
    segment.integrationPrompt = text(safeNote);
  }

  if (freeEssenceSource) {
    segment.freeEssence = text(truncate(freeEssenceSource), str(entry, "origin_essence_zh"));
  }

  return segment;
}

export function adaptV2SegmentForLocale(segment: SegmentContent, locale: Locale): SegmentContent {
  if (locale === "en") return segment;
  // SegmentContent is bilingual; UI picks via pickLocalized — no mutation needed.
  return segment;
}
