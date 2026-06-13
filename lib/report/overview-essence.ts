import { pickLocalized } from "@/lib/getLocalized";
import type { SegmentId } from "@/lib/segments";
import type { Locale, LocalizedText, SegmentContent } from "@/lib/types/1320-content";

/** First source with non-empty text for the active locale (empty `en` must not block fallbacks). */
function pickFirstLocalized(
  locale: Locale,
  ...sources: (LocalizedText | undefined)[]
): string {
  for (const source of sources) {
    const text = pickLocalized(source, locale).trim();
    if (text) return text;
  }
  return "";
}

function joinEssenceParts(parts: string[]): string {
  return parts
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => (part.endsWith(".") || part.endsWith("。") ? part : `${part}.`))
    .join(" ");
}

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
    case "s2": {
      const reflective = pickLocalized(segment.fullEssence ?? segment.freeEssence, locale).trim();
      if (reflective) return reflective;
      const parts = [
        pickLocalized(segment.title, locale),
        pickLocalized(segment.relationshipPattern, locale),
        pickLocalized(segment.karmicLoop, locale),
        pickLocalized(segment.mirrorLesson, locale),
      ].filter(Boolean);
      if (parts.length >= 2) return joinEssenceParts(parts);
      return pickFirstLocalized(
        locale,
        segment.relationshipPattern,
        segment.fullEssence,
        segment.freeEssence,
      );
    }
    case "s0": {
      const parts = [
        pickLocalized(segment.title, locale),
        pickLocalized(segment.coreIllusion, locale),
        pickLocalized(segment.voidPower, locale),
        pickLocalized(segment.awakeningPath, locale),
      ].filter(Boolean);
      if (parts.length >= 2) return joinEssenceParts(parts);
      return pickFirstLocalized(
        locale,
        segment.coreIllusion,
        segment.freeEssence,
        segment.fullEssence,
      );
    }
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
