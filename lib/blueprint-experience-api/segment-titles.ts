import s0Data from "@/data/1320/s0-void-gate.json";
import s1Data from "@/data/1320/s1-origin-frequency.json";
import s2Data from "@/data/1320/s2-mirror-path.json";
import s3Data from "@/data/1320/s3-vibration-tier.json";
import { lookupV2Entry } from "@/lib/1320-v2/v2-index";
import type { BlueprintExperienceLocale } from "@/lib/blueprint-experience-api/types";
import { lookupRecord } from "@/lib/lookup-segment-record";
import { use1320V2Content } from "@/lib/use-1320-v2-content";

type SegmentKey = "s1" | "s3" | "s2" | "s0";

/**
 * Resolve approved public display names by public segment code only.
 * Never returns formulas, raw S3 values, or Full Report prose.
 */
export function getPublicSegmentTitle(
  segment: SegmentKey,
  code: string,
  locale: BlueprintExperienceLocale,
): string {
  if (use1320V2Content()) {
    const moduleId = segment.toUpperCase() as "S1" | "S3" | "S2" | "S0";
    const entry = lookupV2Entry(moduleId, code);
    if (entry) {
      const displayEn =
        str(entry, "display_name") ||
        str(entry, "archetype") ||
        str(entry, "mirror_archetype") ||
        str(entry, "vibration_archetype") ||
        str(entry, "void_archetype");
      const displayZh =
        str(entry, "display_name_zh") ||
        str(entry, "archetype_zh") ||
        str(entry, "mirror_archetype_zh") ||
        str(entry, "vibration_archetype_zh") ||
        str(entry, "void_archetype_zh");
      if (locale === "zh-CN") return displayZh || displayEn || code;
      return displayEn || displayZh || code;
    }
  }

  const data =
    segment === "s1" ? s1Data : segment === "s3" ? s3Data : segment === "s2" ? s2Data : s0Data;
  const record = lookupRecord(data as Record<string, unknown>, code);
  if (record) {
    const nameEn = typeof record.nameEn === "string" ? record.nameEn : "";
    const nameZh = typeof record.nameZh === "string" ? record.nameZh : "";
    if (locale === "zh-CN") return nameZh || nameEn || code;
    return nameEn || nameZh || code;
  }

  return code;
}

function str(entry: Record<string, unknown>, key: string): string {
  const value = entry[key];
  return typeof value === "string" ? value : "";
}
