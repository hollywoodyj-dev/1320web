/**
 * v2 steward EN JSONs for S0–S2 often ship zh-only body fields.
 * Fill missing English from approved v1 bilingual master data at read time.
 */
import s0V1Data from "@/data/1320/s0-void-gate.json";
import s1V1Data from "@/data/1320/s1-origin-frequency.json";
import s2V1Data from "@/data/1320/s2-mirror-path.json";
import type { V2ModuleId } from "@/lib/types/1320-v2-content";
import type { V2Entry } from "@/lib/1320-v2/v2-index";

type V1Map = Record<string, Record<string, unknown>>;

const s0V1 = s0V1Data as V1Map;
const s1V1 = s1V1Data as V1Map;
const s2V1 = s2V1Data as V1Map;

function str(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" ? value : undefined;
}

function strArray(record: Record<string, unknown>, key: string): string[] | undefined {
  const value = record[key];
  if (!Array.isArray(value)) return undefined;
  const items = value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  return items.length ? items : undefined;
}

function setIfMissing(entry: V2Entry, key: string, value: string | undefined): void {
  if (!value?.trim()) return;
  const existing = entry[key];
  if (typeof existing === "string" && existing.trim()) return;
  entry[key] = value;
}

function setArrayIfMissing(entry: V2Entry, key: string, values: string[] | undefined): void {
  if (!values?.length) return;
  const existing = entry[key];
  if (Array.isArray(existing) && existing.length > 0) return;
  entry[key] = values;
}

function enrichS0(entry: V2Entry, v1: Record<string, unknown>): void {
  setIfMissing(entry, "void_archetype", str(v1, "nameEn"));
  setIfMissing(entry, "void_archetype_zh", str(v1, "nameZh"));
  setIfMissing(entry, "core_illusion", str(v1, "coreIllusionEn"));
  setIfMissing(entry, "core_illusion_zh", str(v1, "coreIllusionZh"));
  setIfMissing(entry, "void_challenge", str(v1, "voidChallengeEn"));
  setIfMissing(entry, "void_challenge_zh", str(v1, "voidChallengeZh"));
  setIfMissing(entry, "void_power", str(v1, "voidPowerEn"));
  setIfMissing(entry, "void_power_zh", str(v1, "voidPowerZh"));
  setIfMissing(entry, "path_of_return", str(v1, "pathOfReturnEn"));
  setIfMissing(entry, "path_of_return_zh", str(v1, "pathOfReturnZh"));
  setIfMissing(entry, "wisewave_guidance", str(v1, "guidanceEn"));
  setIfMissing(entry, "wisewave_guidance_zh", str(v1, "guidanceZh"));
}

function enrichS1(entry: V2Entry, v1: Record<string, unknown>): void {
  setIfMissing(entry, "archetype", str(v1, "nameEn"));
  setIfMissing(entry, "archetype_zh", str(v1, "nameZh"));
  setIfMissing(entry, "origin_essence", str(v1, "essenceEn"));
  setIfMissing(entry, "origin_essence_zh", str(v1, "essenceZh"));
  setArrayIfMissing(entry, "soul_traits", strArray(v1, "traitsEn"));
  setArrayIfMissing(entry, "soul_traits_zh", strArray(v1, "traitsZh"));
  setArrayIfMissing(entry, "strengths", strArray(v1, "strengthsEn"));
  setArrayIfMissing(entry, "strengths_zh", strArray(v1, "strengthsZh"));
  setArrayIfMissing(entry, "shadow_frequency", strArray(v1, "shadowsEn"));
  setArrayIfMissing(entry, "shadow_frequency_zh", strArray(v1, "shadowsZh"));
  setIfMissing(entry, "core_lesson", str(v1, "lessonEn"));
  setIfMissing(entry, "core_lesson_zh", str(v1, "lessonZh"));
  setArrayIfMissing(entry, "mission_direction", strArray(v1, "directionEn"));
  setArrayIfMissing(entry, "mission_direction_zh", strArray(v1, "directionZh"));
  setIfMissing(entry, "symbolic_color", str(v1, "colorEn"));
  setIfMissing(entry, "symbolic_color_zh", str(v1, "colorZh"));
  setIfMissing(entry, "totem", str(v1, "totemEn"));
  setIfMissing(entry, "totem_zh", str(v1, "totemZh"));
  setIfMissing(entry, "wisewave_guidance", str(v1, "guidanceEn"));
  setIfMissing(entry, "wisewave_guidance_zh", str(v1, "guidanceZh"));
}

function enrichS2(entry: V2Entry, v1: Record<string, unknown>): void {
  setIfMissing(entry, "mirror_archetype", str(v1, "nameEn"));
  setIfMissing(entry, "mirror_archetype_zh", str(v1, "nameZh"));
  setIfMissing(entry, "relationship_dynamic", str(v1, "relationshipDynamicEn"));
  setIfMissing(entry, "relationship_dynamic_zh", str(v1, "relationshipDynamicZh"));
  setIfMissing(entry, "karmic_loop", str(v1, "karmicLoopEn"));
  setIfMissing(entry, "karmic_loop_zh", str(v1, "karmicLoopZh"));
  setIfMissing(entry, "lesson", str(v1, "lessonEn"));
  setIfMissing(entry, "lesson_zh", str(v1, "lessonZh"));
  setIfMissing(entry, "healing_path", str(v1, "healingPathEn"));
  setIfMissing(entry, "healing_path_zh", str(v1, "healingPathZh"));
  setIfMissing(entry, "wisewave_guidance", str(v1, "guidanceEn"));
  setIfMissing(entry, "wisewave_guidance_zh", str(v1, "guidanceZh"));
  setIfMissing(entry, "mirror_essence", str(v1, "essenceEn"));
  setIfMissing(entry, "mirror_essence_zh", str(v1, "essenceZh"));
}

export function enrichV2AwarenessEntry(
  module: V2ModuleId,
  code: string,
  entry: V2Entry,
): V2Entry {
  const merged = { ...entry };

  if (module === "S0" && s0V1[code]) enrichS0(merged, s0V1[code]);
  if (module === "S1" && s1V1[code]) enrichS1(merged, s1V1[code]);
  if (module === "S2" && s2V1[code]) enrichS2(merged, s2V1[code]);

  return merged;
}
