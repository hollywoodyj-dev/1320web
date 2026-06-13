/**
 * Merge steward v2 JSON (often zh-only body fields) with approved v1 bilingual masters.
 * Produces full en + *_zh field pairs and clean reflective_summary / integration_key lines.
 */
import s0V1Data from "@/data/1320/s0-void-gate.json";
import s1V1Data from "@/data/1320/s1-origin-frequency.json";
import s2V1Data from "@/data/1320/s2-mirror-path.json";
import s3V1Data from "@/data/1320/s3-vibration-tier.json";
import s6V1Data from "@/data/1320/s6-money-frequency.json";
import type { V2Entry } from "@/lib/1320-v2/v2-index";

type JsonRecord = Record<string, unknown>;
type V1Map = Record<string, JsonRecord>;

const s0V1 = s0V1Data as V1Map;
const s1V1 = s1V1Data as V1Map;
const s2V1 = s2V1Data as V1Map;
const s6V1 = s6V1Data as V1Map;

const s3Tiers = (s3V1Data as { tiers?: JsonRecord[] }).tiers ?? [];

function str(record: JsonRecord, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" ? value : undefined;
}

function strArray(record: JsonRecord, key: string): string[] | undefined {
  const value = record[key];
  if (!Array.isArray(value)) return undefined;
  const items = value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  return items.length ? items : undefined;
}

function setIfEmpty(entry: V2Entry, key: string, value: unknown): void {
  if (value === undefined || value === null) return;
  if (typeof value === "string" && !value.trim()) return;
  if (Array.isArray(value) && value.length === 0) return;
  const existing = entry[key];
  if (typeof existing === "string" && existing.trim()) return;
  if (Array.isArray(existing) && existing.length > 0) return;
  entry[key] = value;
}

function buildS0ReflectiveSummary(coreIllusionEn?: string, coreIllusionZh?: string) {
  return {
    en: coreIllusionEn
      ? `This Void Gate reflects the illusion of: ${coreIllusionEn}. It invites the user to observe where this belief may shape perception, reactions, and self-protection without treating it as fate or fixed identity.`
      : undefined,
    zh: coreIllusionZh
      ? `此空性之门映照的幻象是：${coreIllusionZh}。邀请用户觉察此信念如何影响感知、反应与自我保护，而不将其视为命运或固定身份。`
      : undefined,
  };
}

function buildS0IntegrationKey(pathEn?: string, pathZh?: string) {
  return {
    en: pathEn ? `The integration begins through: ${pathEn}` : undefined,
    zh: pathZh ? `整合从此开始：${pathZh}` : undefined,
  };
}

function buildS2ReflectiveSummary(archetypeEn?: string, archetypeZh?: string) {
  return {
    en: archetypeEn
      ? `This Soul Mirror reflects a relational pattern around: ${archetypeEn}. It invites the user to observe how relationships may reveal unmet needs, projections, boundaries, or growth edges.`
      : undefined,
    zh: archetypeZh
      ? `此灵魂镜像反映的关系模式围绕：${archetypeZh}。邀请用户觉察关系如何映照未满足的需求、投射、边界或成长边缘。`
      : undefined,
  };
}

function buildS2IntegrationKey(healingEn?: string, healingZh?: string) {
  return {
    en: healingEn ? `The integration begins through: ${healingEn}` : undefined,
    zh: healingZh ? `整合从此开始：${healingZh}` : undefined,
  };
}

export function mergeS0Entry(entry: V2Entry, code: string): V2Entry {
  const merged = { ...entry };
  const v1 = s0V1[code];
  if (v1) {
    setIfEmpty(merged, "void_archetype", str(v1, "nameEn"));
    setIfEmpty(merged, "void_archetype_zh", str(v1, "nameZh"));
    setIfEmpty(merged, "core_illusion", str(v1, "coreIllusionEn"));
    setIfEmpty(merged, "core_illusion_zh", str(v1, "coreIllusionZh"));
    setIfEmpty(merged, "void_challenge", str(v1, "voidChallengeEn"));
    setIfEmpty(merged, "void_challenge_zh", str(v1, "voidChallengeZh"));
    setIfEmpty(merged, "void_power", str(v1, "voidPowerEn"));
    setIfEmpty(merged, "void_power_zh", str(v1, "voidPowerZh"));
    setIfEmpty(merged, "path_of_return", str(v1, "pathOfReturnEn"));
    setIfEmpty(merged, "path_of_return_zh", str(v1, "pathOfReturnZh"));
    setIfEmpty(merged, "wisewave_guidance", str(v1, "guidanceEn"));
    setIfEmpty(merged, "wisewave_guidance_zh", str(v1, "guidanceZh"));
  }

  const summary = buildS0ReflectiveSummary(
    str(merged, "core_illusion"),
    str(merged, "core_illusion_zh"),
  );
  if (summary.en) merged.reflective_summary = summary.en;
  if (summary.zh) merged.reflective_summary_zh = summary.zh;

  const integration = buildS0IntegrationKey(
    str(merged, "path_of_return"),
    str(merged, "path_of_return_zh"),
  );
  if (integration.en) merged.integration_key = integration.en;
  if (integration.zh) merged.integration_key_zh = integration.zh;

  return merged;
}

export function mergeS1Entry(entry: V2Entry, code: string): V2Entry {
  const merged = { ...entry };
  const v1 = s1V1[code];
  if (!v1) return merged;

  setIfEmpty(merged, "archetype", str(v1, "nameEn"));
  setIfEmpty(merged, "archetype_zh", str(v1, "nameZh"));
  setIfEmpty(merged, "origin_essence", str(v1, "essenceEn"));
  setIfEmpty(merged, "origin_essence_zh", str(v1, "essenceZh"));
  setArrayIfEmpty(merged, "soul_traits", strArray(v1, "traitsEn"));
  setArrayIfEmpty(merged, "soul_traits_zh", strArray(v1, "traitsZh"));
  setArrayIfEmpty(merged, "strengths", strArray(v1, "strengthsEn"));
  setArrayIfEmpty(merged, "strengths_zh", strArray(v1, "strengthsZh"));
  setArrayIfEmpty(merged, "shadow_frequency", strArray(v1, "shadowsEn"));
  setArrayIfEmpty(merged, "shadow_frequency_zh", strArray(v1, "shadowsZh"));
  setIfEmpty(merged, "core_lesson", str(v1, "lessonEn"));
  setIfEmpty(merged, "core_lesson_zh", str(v1, "lessonZh"));
  setArrayIfEmpty(merged, "mission_direction", strArray(v1, "directionEn"));
  setArrayIfEmpty(merged, "mission_direction_zh", strArray(v1, "directionZh"));
  setIfEmpty(merged, "symbolic_color", str(v1, "colorEn"));
  setIfEmpty(merged, "symbolic_color_zh", str(v1, "colorZh"));
  setIfEmpty(merged, "totem", str(v1, "totemEn"));
  setIfEmpty(merged, "totem_zh", str(v1, "totemZh"));
  setIfEmpty(merged, "wisewave_guidance", str(v1, "guidanceEn"));
  setIfEmpty(merged, "wisewave_guidance_zh", str(v1, "guidanceZh"));

  return merged;
}

function setArrayIfEmpty(entry: V2Entry, key: string, values: string[] | undefined): void {
  if (!values?.length) return;
  const existing = entry[key];
  if (Array.isArray(existing) && existing.length > 0) return;
  entry[key] = values;
}

export function mergeS2Entry(entry: V2Entry, code: string): V2Entry {
  const merged = { ...entry };
  const v1 = s2V1[code];
  if (v1) {
    setIfEmpty(merged, "mirror_archetype", str(v1, "nameEn"));
    setIfEmpty(merged, "mirror_archetype_zh", str(v1, "nameZh"));
    setIfEmpty(merged, "relationship_dynamic", str(v1, "relationshipDynamicEn"));
    setIfEmpty(merged, "relationship_dynamic_zh", str(v1, "relationshipDynamicZh"));
    setIfEmpty(merged, "karmic_loop", str(v1, "karmicLoopEn"));
    setIfEmpty(merged, "karmic_loop_zh", str(v1, "karmicLoopZh"));
    setIfEmpty(merged, "lesson", str(v1, "lessonEn"));
    setIfEmpty(merged, "lesson_zh", str(v1, "lessonZh"));
    setIfEmpty(merged, "healing_path", str(v1, "healingPathEn"));
    setIfEmpty(merged, "healing_path_zh", str(v1, "healingPathZh"));
    setIfEmpty(merged, "wisewave_guidance", str(v1, "guidanceEn"));
    setIfEmpty(merged, "wisewave_guidance_zh", str(v1, "guidanceZh"));
    setIfEmpty(merged, "mirror_essence", str(v1, "essenceEn"));
    setIfEmpty(merged, "mirror_essence_zh", str(v1, "essenceZh"));
  }

  const summary = buildS2ReflectiveSummary(
    str(merged, "mirror_archetype"),
    str(merged, "mirror_archetype_zh"),
  );
  if (summary.en) merged.reflective_summary = summary.en;
  if (summary.zh) merged.reflective_summary_zh = summary.zh;

  const integration = buildS2IntegrationKey(
    str(merged, "healing_path"),
    str(merged, "healing_path_zh"),
  );
  if (integration.en) merged.integration_key = integration.en;
  if (integration.zh) merged.integration_key_zh = integration.zh;

  return merged;
}

export function mergeS3Entry(entry: V2Entry, code: string): V2Entry {
  const merged = { ...entry };
  const tier = s3Tiers.find((t) => str(t, "code") === code);
  if (!tier) return merged;

  setIfEmpty(merged, "vibration_archetype", str(tier, "nameEn"));
  setIfEmpty(merged, "vibration_archetype_zh", str(tier, "nameZh"));
  setIfEmpty(merged, "vibration_essence", str(tier, "essenceEn"));
  setIfEmpty(merged, "vibration_essence_zh", str(tier, "essenceZh"));
  setIfEmpty(merged, "soul_traits", str(tier, "soulTraitsEn"));
  setIfEmpty(merged, "soul_traits_zh", str(tier, "soulTraitsZh"));
  setIfEmpty(merged, "strengths", str(tier, "strengthsEn"));
  setIfEmpty(merged, "strengths_zh", str(tier, "strengthsZh"));
  setIfEmpty(merged, "challenges", str(tier, "challengesEn"));
  setIfEmpty(merged, "challenges_zh", str(tier, "challengesZh"));
  setIfEmpty(merged, "wisewave_guidance", str(tier, "guidanceEn"));
  setIfEmpty(merged, "wisewave_guidance_zh", str(tier, "guidanceZh"));
  setIfEmpty(merged, "expression_style", str(tier, "soulTraitsEn"));
  setIfEmpty(merged, "expression_style_zh", str(tier, "soulTraitsZh"));
  setIfEmpty(merged, "integration_key", str(tier, "guidanceEn"));
  setIfEmpty(merged, "integration_key_zh", str(tier, "guidanceZh"));

  const archetypeEn = str(merged, "vibration_archetype");
  if (archetypeEn && !str(merged, "vibration_essence")?.includes(archetypeEn)) {
    merged.vibration_essence = `This vibration tier reflects the ${archetypeEn} pattern: a symbolic way the user's energy may express, mature, and seek grounding.`;
  }
  const archetypeZh = str(merged, "vibration_archetype_zh");
  if (archetypeZh && !str(merged, "vibration_essence_zh")) {
    merged.vibration_essence_zh = `此振动层级映照「${archetypeZh}」模式：象征用户能量可能如何表达、成熟与落地。`;
  }

  return merged;
}

export function mergeS6Entry(entry: V2Entry, code: string): V2Entry {
  const merged = { ...entry };
  const v1 = s6V1[code];
  if (!v1) return merged;

  setIfEmpty(merged, "archetype", str(v1, "nameEn"));
  setIfEmpty(merged, "archetype_zh", str(v1, "nameZh"));
  setIfEmpty(merged, "value_essence", str(v1, "moneyCoreFrequencyEn"));
  setIfEmpty(merged, "value_essence_zh", str(v1, "moneyCoreFrequencyZh"));
  setIfEmpty(merged, "what_your_soul_is_learning_to_receive", str(v1, "soulWealthRelationshipEn"));
  setIfEmpty(merged, "what_your_soul_is_learning_to_receive_zh", str(v1, "soulWealthRelationshipZh"));
  setIfEmpty(merged, "how_value_wants_to_flow", str(v1, "karmicMoneyLessonEn"));
  setIfEmpty(merged, "how_value_wants_to_flow_zh", str(v1, "karmicMoneyLessonZh"));
  setIfEmpty(merged, "shadow_distortion_of_receiving", str(v1, "shadowFrequencyEn"));
  setIfEmpty(merged, "shadow_distortion_of_receiving_zh", str(v1, "shadowFrequencyZh"));
  setIfEmpty(merged, "wisewave_reflection", str(v1, "wisewaveGuidanceEn"));
  setIfEmpty(merged, "wisewave_reflection_zh", str(v1, "wisewaveGuidanceZh"));
  setIfEmpty(merged, "safe_language_note", str(v1, "safetyDisclaimerEn"));
  setIfEmpty(merged, "safe_language_note_zh", str(v1, "safetyDisclaimerZh"));

  return merged;
}

export function mergeAwarenessEntry(module: string, entry: V2Entry): V2Entry {
  const code = typeof entry.code === "string" ? entry.code : "";
  switch (module) {
    case "S0":
      return mergeS0Entry(entry, code);
    case "S1":
      return mergeS1Entry(entry, code);
    case "S2":
      return mergeS2Entry(entry, code);
    case "S3":
      return mergeS3Entry(entry, code);
    case "S6":
      return mergeS6Entry(entry, code);
    default:
      return entry;
  }
}

/** Strip *_zh keys and copy zh values into base keys for locale-specific export. */
export function entryToLocale(entry: V2Entry, locale: "en" | "zh"): V2Entry {
  const out: V2Entry = {};
  const zhSuffix = "_zh";

  for (const [key, value] of Object.entries(entry)) {
    if (key.endsWith(zhSuffix)) continue;
    if (locale === "en") {
      out[key] = value;
      continue;
    }
    const zhKey = `${key}${zhSuffix}`;
    const zhValue = entry[zhKey];
    if (typeof zhValue === "string" && zhValue.trim()) {
      out[key] = zhValue;
    } else if (zhValue !== undefined) {
      out[key] = zhValue;
    } else if (typeof value === "string") {
      out[key] = value;
    } else {
      out[key] = value;
    }
  }

  for (const [key, value] of Object.entries(entry)) {
    if (!key.endsWith(zhSuffix)) continue;
    const base = key.slice(0, -zhSuffix.length);
    if (locale === "zh" && out[base] === undefined) {
      out[base] = value;
    }
  }

  return out;
}

export function mergeDatabaseContent(
  module: string,
  content: V2Entry[],
): V2Entry[] {
  return content.map((entry) => mergeAwarenessEntry(module, { ...entry }));
}
