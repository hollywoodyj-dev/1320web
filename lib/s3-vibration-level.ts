import mappingData from "@/data/1320-v2/s3-vibration-mapping.json";
import { formatS3TierCode } from "@/lib/segment-code";

export type S3VibrationLevelResolution = {
  s3Raw: number;
  tierNumber: number | null;
  s3Code: string | null;
  vibrationArchetype: string | null;
  mapped: boolean;
  error?: string;
};

type MappingTier = {
  tier: number;
  code: string;
  vibration_archetype?: string;
  range_min: number;
  range_max: number | null;
};

type MappingDocument = {
  tiers?: MappingTier[];
};

const tiers = (mappingData as MappingDocument).tiers ?? [];

/**
 * Map S3_raw to official tier using 1320_S3_Vibration_Level_Mapping_Table_v2.
 * Downstream formulas (S5–S7) use tierNumber, not S3_raw.
 */
export function resolveS3VibrationLevel(s3Raw: number): S3VibrationLevelResolution {
  if (!Number.isInteger(s3Raw) || s3Raw < 0) {
    return {
      s3Raw,
      tierNumber: null,
      s3Code: null,
      vibrationArchetype: null,
      mapped: false,
      error: "S3_raw must be a non-negative integer.",
    };
  }

  const matched = tiers.find((tier) => {
    const max = tier.range_max ?? Number.POSITIVE_INFINITY;
    return s3Raw >= tier.range_min && s3Raw <= max;
  });

  if (!matched) {
    return {
      s3Raw,
      tierNumber: null,
      s3Code: null,
      vibrationArchetype: null,
      mapped: false,
      error: `S3_MAPPING_MISSING: no tier for S3_raw ${s3Raw}.`,
    };
  }

  const tierNumber = matched.tier;
  return {
    s3Raw,
    tierNumber,
    s3Code: matched.code ?? formatS3TierCode(tierNumber),
    vibrationArchetype: matched.vibration_archetype ?? null,
    mapped: true,
  };
}
