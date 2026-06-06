import { resolveS3Tier } from "@/lib/s3-tier";
import { segmentCodeKey } from "@/lib/segment-code";

export function formatCodeDisplay(
  s1: number,
  s3Raw: number,
  s2: number,
  s0: number,
  s3Code?: string | null,
  s3Title?: string | null,
) {
  const s1Code = segmentCodeKey("S1", s1);
  const resolvedS3 = s3Code ?? resolveS3Tier(s3Raw).s3Code ?? `S3-raw-${s3Raw}`;
  const resolvedS3Title = s3Title ?? resolveS3Tier(s3Raw).s3Title ?? "";
  const s2Code = segmentCodeKey("S2", s2);
  const s0Code = segmentCodeKey("S0", s0);
  const codeString = `${s1Code} / ${resolvedS3} / ${s2Code} / ${s0Code}`;
  const compactCode = `${s1Code}|${resolvedS3}|${s2Code}|${s0Code}`;

  return {
    s1,
    s3Raw,
    s2,
    s0,
    s1Code,
    s3Code: resolvedS3,
    s3Title: resolvedS3Title,
    s2Code,
    s0Code,
    codeString,
    compactCode,
  };
}
