import { getS3TierRecord } from "@/lib/get1320Content";
import type { SegmentId } from "@/lib/segments";

/**
 * Archetype card PNG packs under `public/`.
 * - S1: `S1-44/S01.png` … `S44.png` (code number = file index)
 * - S3: `S3-12/S01.png` … `S12.png` (tier 1–12 from s3Raw range lookup)
 */
const S1_CARD_DIR = "S1-44";
const S1_CARD_MAX = 44;

const S3_CARD_DIR = "S3-12";
const S3_TIER_MAX = 12;

function s3RawToTierIndex(s3Raw: number): number | undefined {
  const { record, tierMatched } = getS3TierRecord(s3Raw);
  if (!tierMatched || !record?.id) return undefined;

  const match = /^S3-T(\d{1,2})$/i.exec(String(record.id));
  if (!match) return undefined;

  const tier = Number.parseInt(match[1], 10);
  if (!Number.isFinite(tier) || tier < 1 || tier > S3_TIER_MAX) return undefined;
  return tier;
}

/** e.g. s1 + 18 → `/S1-44/S18.png`; s3 + 110 → `/S3-12/S04.png` (tier T04) */
export function getSegmentCardImageUrl(
  segmentId: SegmentId,
  codeNum: number,
): string | undefined {
  if (!Number.isFinite(codeNum) || codeNum < 1) return undefined;

  switch (segmentId) {
    case "s1": {
      if (codeNum > S1_CARD_MAX) return undefined;
      return `/${S1_CARD_DIR}/S${String(codeNum).padStart(2, "0")}.png`;
    }
    case "s3": {
      const tier = s3RawToTierIndex(codeNum);
      if (tier == null) return undefined;
      return `/${S3_CARD_DIR}/S${String(tier).padStart(2, "0")}.png`;
    }
    case "s2":
    case "s0":
      return undefined;
    default:
      return undefined;
  }
}
