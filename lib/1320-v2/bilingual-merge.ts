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

function containsCjk(text: string): boolean {
  return /[\u3400-\u9fff]/.test(text);
}

/** Set en/zh pair; replace base key when it holds Chinese, or *_zh when it holds English-only copy. */
function setBilingualPair(
  entry: V2Entry,
  baseKey: string,
  en?: string,
  zh?: string,
  options?: { forceEn?: boolean; forceZh?: boolean },
): void {
  const zhKey = `${baseKey}_zh`;
  const existingEn = str(entry, baseKey);
  const existingZh = str(entry, zhKey);

  if (en?.trim()) {
    const shouldSet =
      options?.forceEn || !existingEn?.trim() || containsCjk(existingEn);
    if (shouldSet) entry[baseKey] = en.trim();
  }
  if (zh?.trim()) {
    const shouldSet =
      options?.forceZh || !existingZh?.trim() || !containsCjk(existingZh);
    if (shouldSet) entry[zhKey] = zh.trim();
  }
}

function setArrayBilingualPair(
  entry: V2Entry,
  baseKey: string,
  en?: string[],
  zh?: string[],
): void {
  const zhKey = `${baseKey}_zh`;
  setArrayIfEmpty(entry, baseKey, en);
  setArrayIfEmpty(entry, zhKey, zh);
  const existingEn = entry[baseKey];
  if (Array.isArray(existingEn) && existingEn.length > 0) {
    const first = existingEn.find((item): item is string => typeof item === "string");
    if (first && containsCjk(first) && en?.length) {
      entry[baseKey] = en;
    }
  }
  const existingZh = entry[zhKey];
  if (Array.isArray(existingZh) && existingZh.length > 0) {
    const first = existingZh.find((item): item is string => typeof item === "string");
    if (first && !containsCjk(first) && zh?.length) {
      entry[zhKey] = zh;
    }
  }
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

function buildS3IntegrationKey(guidanceEn?: string, guidanceZh?: string) {
  return {
    en: guidanceEn ? `The integration begins by: ${guidanceEn}` : undefined,
    zh: guidanceZh ? `整合从此开始：${guidanceZh}` : undefined,
  };
}

export function mergeZhStewardFields(enEntry: V2Entry, zhEntry: V2Entry): V2Entry {
  const merged = { ...enEntry };
  for (const [key, value] of Object.entries(zhEntry)) {
    if (key === "code" || key === "module" || key === "numeric_value") continue;
    if (key.endsWith("_zh")) {
      if (typeof value === "string" && value.trim()) {
        merged[key] = value.trim();
      } else if (Array.isArray(value) && value.length > 0) {
        merged[key] = value;
      }
      continue;
    }
    if (typeof value === "string" && value.trim() && containsCjk(value)) {
      merged[`${key}_zh`] = value.trim();
    } else if (Array.isArray(value) && value.length > 0) {
      const zhKey = `${key}_zh`;
      if (!merged[zhKey]) merged[zhKey] = value;
    }
  }
  return merged;
}

export function mergeS0Entry(entry: V2Entry, code: string): V2Entry {
  const merged = { ...entry };
  const v1 = s0V1[code];
  if (v1) {
    setBilingualPair(merged, "void_archetype", str(v1, "nameEn"), str(v1, "nameZh"));
    setBilingualPair(merged, "core_illusion", str(v1, "coreIllusionEn"), str(v1, "coreIllusionZh"));
    setBilingualPair(merged, "void_challenge", str(v1, "voidChallengeEn"), str(v1, "voidChallengeZh"));
    setBilingualPair(merged, "void_power", str(v1, "voidPowerEn"), str(v1, "voidPowerZh"));
    setBilingualPair(merged, "path_of_return", str(v1, "pathOfReturnEn"), str(v1, "pathOfReturnZh"));
    setBilingualPair(
      merged,
      "wisewave_guidance",
      str(v1, "guidanceEn"),
      str(v1, "guidanceZh"),
      { forceEn: true },
    );
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

  setBilingualPair(merged, "archetype", str(v1, "nameEn"), str(v1, "nameZh"));
  setBilingualPair(merged, "origin_essence", str(v1, "essenceEn"), str(v1, "essenceZh"));
  setArrayBilingualPair(merged, "soul_traits", strArray(v1, "traitsEn"), strArray(v1, "traitsZh"));
  setArrayBilingualPair(merged, "strengths", strArray(v1, "strengthsEn"), strArray(v1, "strengthsZh"));
  setArrayBilingualPair(
    merged,
    "shadow_frequency",
    strArray(v1, "shadowsEn"),
    strArray(v1, "shadowsZh"),
  );
  setBilingualPair(merged, "core_lesson", str(v1, "lessonEn"), str(v1, "lessonZh"));
  setArrayBilingualPair(
    merged,
    "mission_direction",
    strArray(v1, "directionEn"),
    strArray(v1, "directionZh"),
  );
  setBilingualPair(merged, "symbolic_color", str(v1, "colorEn"), str(v1, "colorZh"));
  setBilingualPair(merged, "totem", str(v1, "totemEn"), str(v1, "totemZh"));
  setBilingualPair(
    merged,
    "wisewave_guidance",
    str(v1, "guidanceEn"),
    str(v1, "guidanceZh"),
    { forceEn: true },
  );
  setBilingualPair(merged, "esoteric_link", str(v1, "symbolicLink"), undefined);
  setBilingualPair(
    merged,
    "integration_key",
    str(v1, "integrationKeyEn"),
    str(v1, "integrationKeyZh"),
    { forceEn: true, forceZh: true },
  );

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
    setBilingualPair(merged, "mirror_archetype", str(v1, "nameEn"), str(v1, "nameZh"));
    setBilingualPair(
      merged,
      "relationship_dynamic",
      str(v1, "relationshipDynamicEn"),
      str(v1, "relationshipDynamicZh"),
    );
    setBilingualPair(merged, "karmic_loop", str(v1, "karmicLoopEn"), str(v1, "karmicLoopZh"));
    setBilingualPair(merged, "lesson", str(v1, "lessonEn"), str(v1, "lessonZh"));
    setBilingualPair(merged, "healing_path", str(v1, "healingPathEn"), str(v1, "healingPathZh"));
    setBilingualPair(
      merged,
      "wisewave_guidance",
      str(v1, "guidanceEn"),
      str(v1, "guidanceZh"),
      { forceEn: true },
    );
    setBilingualPair(merged, "mirror_essence", str(v1, "essenceEn"), str(v1, "essenceZh"));
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

  setBilingualPair(merged, "vibration_archetype", str(tier, "nameEn"), str(tier, "nameZh"));
  setBilingualPair(merged, "vibration_essence", str(tier, "essenceEn"), str(tier, "essenceZh"));
  setBilingualPair(merged, "soul_traits", str(tier, "soulTraitsEn"), str(tier, "soulTraitsZh"));
  setBilingualPair(merged, "strengths", str(tier, "strengthsEn"), str(tier, "strengthsZh"));
  setBilingualPair(merged, "challenges", str(tier, "challengesEn"), str(tier, "challengesZh"));
  setBilingualPair(
    merged,
    "wisewave_guidance",
    str(tier, "guidanceEn"),
    str(tier, "guidanceZh") ?? str(merged, "guidance_zh"),
    { forceEn: true },
  );
  setBilingualPair(merged, "expression_style", str(tier, "soulTraitsEn"), str(tier, "soulTraitsZh"));

  const integration = buildS3IntegrationKey(
    str(merged, "wisewave_guidance"),
    str(merged, "wisewave_guidance_zh"),
  );
  if (integration.en) merged.integration_key = integration.en;
  if (integration.zh) merged.integration_key_zh = integration.zh;

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

  setBilingualPair(merged, "archetype", str(v1, "nameEn"), str(v1, "nameZh"));
  setBilingualPair(merged, "value_essence", str(v1, "moneyCoreFrequencyEn"), str(v1, "moneyCoreFrequencyZh"));
  setBilingualPair(
    merged,
    "what_your_soul_is_learning_to_receive",
    str(v1, "soulWealthRelationshipEn"),
    str(v1, "soulWealthRelationshipZh"),
  );
  setBilingualPair(
    merged,
    "how_value_wants_to_flow",
    str(v1, "karmicMoneyLessonEn"),
    str(v1, "karmicMoneyLessonZh"),
  );
  setBilingualPair(
    merged,
    "shadow_distortion_of_receiving",
    str(v1, "shadowFrequencyEn"),
    str(v1, "shadowFrequencyZh"),
  );
  setBilingualPair(
    merged,
    "wisewave_reflection",
    str(v1, "wisewaveGuidanceEn"),
    str(v1, "wisewaveGuidanceZh"),
    { forceEn: true },
  );
  setBilingualPair(merged, "wisewave_guidance", str(v1, "wisewaveGuidanceEn"), str(v1, "wisewaveGuidanceZh"), {
    forceEn: true,
  });
  setBilingualPair(
    merged,
    "safe_language_note",
    str(v1, "safetyDisclaimerEn"),
    str(v1, "safetyDisclaimerZh"),
  );

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
      if (typeof value === "string" && containsCjk(value)) {
        continue;
      }
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
