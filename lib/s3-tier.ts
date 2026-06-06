import s3Data from "@/data/1320/s3-vibration-tier.json";
import { formatS3TierCode } from "@/lib/segment-code";
import type { S3TierRecord, V1Record } from "@/lib/types/1320-content";

export type S3TierResolution = {
  record: V1Record | null;
  tierMatched: boolean;
  s3Raw: number;
  s3Code: string | null;
  s3Title: string | null;
  tierNumber: number | null;
};

export function getS3TierRecord(s3Raw: number): { record: V1Record | null; tierMatched: boolean } {
  const typed = s3Data as unknown as {
    default?: V1Record;
    tiers?: S3TierRecord[];
  };

  const tiers = typed.tiers;
  if (Array.isArray(tiers) && tiers.length > 0) {
    const matched = tiers.find((tier) => {
      const range = tier.range ?? (tier.min != null && tier.max != null ? [tier.min, tier.max] : null);
      if (!range || range.length !== 2) return false;
      const [min, max] = range;
      return s3Raw >= min && s3Raw <= max;
    });
    if (matched) return { record: matched, tierMatched: true };
  }

  return { record: typed.default ?? null, tierMatched: false };
}

export function resolveS3Tier(s3Raw: number): S3TierResolution {
  const { record, tierMatched } = getS3TierRecord(s3Raw);
  if (!record || !tierMatched) {
    return {
      record,
      tierMatched,
      s3Raw,
      s3Code: null,
      s3Title: null,
      tierNumber: null,
    };
  }

  const code =
    typeof record.code === "string"
      ? record.code
      : typeof record.tierNumber === "number"
        ? formatS3TierCode(record.tierNumber)
        : null;
  const title = typeof record.nameEn === "string" ? record.nameEn : null;
  const tierNumber =
    typeof record.tierNumber === "number"
      ? record.tierNumber
      : code
        ? Number.parseInt(code.slice(4), 10)
        : null;

  return { record, tierMatched, s3Raw, s3Code: code, s3Title: title, tierNumber };
}
