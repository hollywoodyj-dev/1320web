import { getS3TierRecord } from "@/lib/s3-tier";
import type { SegmentId } from "@/lib/segments";

/**
 * Archetype card PNG packs under `public/`.
 * - S1: `S1-44/S01.webp` … `S44.webp` (code number = file index)
 * - S3: `S3-12/S01.webp` … `S12.webp` (tier 1–12 from s3Raw range lookup)
 * - S2: `S2-50/S2-01.webp` … `S2-50.webp` (month + day code number)
 * - S0: `S0-19/S0-00.webp` … `S0-19.webp` (void gate 0–19 from date digit sum % 20)
 */
const S1_CARD_DIR = "S1-44";
const S1_CARD_MAX = 44;

const S3_CARD_DIR = "S3-12";
const S3_TIER_MAX = 12;

const S2_CARD_DIR = "S2-50";
const S2_CARD_MAX = 50;

const S0_CARD_DIR = "S0-19";
const S0_CARD_MAX = 19;

function s3RawToTierIndex(s3Raw: number): number | undefined {
  const { record, tierMatched } = getS3TierRecord(s3Raw);
  if (!tierMatched || !record?.id) return undefined;

  const match = /^S3-T(\d{1,2})$/i.exec(String(record.id));
  if (!match) return undefined;

  const tier = Number.parseInt(match[1], 10);
  if (!Number.isFinite(tier) || tier < 1 || tier > S3_TIER_MAX) return undefined;
  return tier;
}

/** e.g. s1 + 18 → `/S1-44/S18.webp`; s0 + 7 → `/S0-19/S0-07.webp`; s2 + 27 → `/S2-50/S2-27.webp` */
export function getSegmentCardImageUrl(
  segmentId: SegmentId,
  codeNum: number,
): string | undefined {
  if (!Number.isFinite(codeNum)) return undefined;

  switch (segmentId) {
    case "s0": {
      if (codeNum < 0 || codeNum > S0_CARD_MAX) return undefined;
      return `/${S0_CARD_DIR}/S0-${String(codeNum).padStart(2, "0")}.webp`;
    }
    case "s1": {
      if (codeNum < 1 || codeNum > S1_CARD_MAX) return undefined;
      return `/${S1_CARD_DIR}/S${String(codeNum).padStart(2, "0")}.webp`;
    }
    case "s3": {
      if (codeNum < 1) return undefined;
      const tier = s3RawToTierIndex(codeNum);
      if (tier == null) return undefined;
      return `/${S3_CARD_DIR}/S${String(tier).padStart(2, "0")}.webp`;
    }
    case "s2": {
      if (codeNum < 1 || codeNum > S2_CARD_MAX) return undefined;
      return `/${S2_CARD_DIR}/S2-${String(codeNum).padStart(2, "0")}.webp`;
    }
    default:
      return undefined;
  }
}
