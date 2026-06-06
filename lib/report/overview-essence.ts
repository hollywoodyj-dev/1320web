import { pickLocalized } from "@/lib/getLocalized";
import type { SegmentId } from "@/lib/segments";
import type { Locale, SegmentContent } from "@/lib/types/1320-content";

/** Short preview for overview pillar cards — no codes, no template wrappers. */
export function buildOverviewEssence(
  segmentId: SegmentId,
  segment: SegmentContent,
  locale: Locale,
): string {
  switch (segmentId) {
    case "s1": {
      const traits = segment.soulTraits
        ?.map((item) => pickLocalized(item, locale).trim())
        .filter(Boolean);
      if (traits?.length) {
        const joined = traits.join(". ");
        return joined.endsWith(".") ? joined : `${joined}.`;
      }
      return stripS1Boilerplate(pickLocalized(segment.freeEssence, locale), segment, locale);
    }
    case "s3":
      return stripS3Boilerplate(
        pickLocalized(segment.fullEssence ?? segment.freeEssence, locale),
      );
    case "s2":
      return pickLocalized(
        segment.relationshipPattern ?? segment.fullEssence ?? segment.freeEssence,
        locale,
      );
    case "s0":
      return pickLocalized(
        segment.coreIllusion ?? segment.fullEssence ?? segment.freeEssence,
        locale,
      );
    default:
      return pickLocalized(segment.freeEssence, locale);
  }
}

export function truncateOverview(text: string, max = 155): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  const cut = trimmed.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const safe = lastSpace > 80 ? cut.slice(0, lastSpace) : cut;
  return `${safe.trim()}…`;
}

function stripS1Boilerplate(
  text: string,
  segment: SegmentContent,
  locale: Locale,
): string {
  const title = pickLocalized(segment.title, locale).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text
    .replace(new RegExp(`^You carry the origin frequency of ${title}\\.\\s*`, "i"), "")
    .trim();
}

function stripS3Boilerplate(text: string): string {
  return text
    .replace(/^S3-\d+\s*·\s*[^.]+\.\s*/i, "")
    .replace(/^Your S3 number \(\d+\) expresses through the [^.]+\.\s*/i, "")
    .trim();
}
