import type { Locale, SegmentContent } from "@/lib/types/1320-content";
import { pickLocalized } from "@/lib/getLocalized";

type DepthField = {
  label: string;
  value: string;
};

function lowerFirst(text: string): string {
  if (!text) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function relationshipTriggerValue(locale: Locale, dynamic: string): string {
  if (locale === "zh") {
    return `这条镜像路径常常吸引这样的人或关系动力：${dynamic}`;
  }
  return `This mirror path often attracts people or dynamics where ${lowerFirst(dynamic)}`;
}

function coreIllusionMechanismValue(locale: Locale, mechanism: string): string {
  if (locale === "zh") {
    return `这道空门下的幻象，往往通过这样的机制运作：${mechanism}`;
  }
  return `The illusion beneath this void gate often operates like this: ${mechanism}`;
}

export function relationshipTriggerPatternField(
  locale: Locale,
  segment: SegmentContent,
): DepthField | null {
  const dynamic = pickLocalized(
    segment.relationshipPattern ?? segment.fullEssence ?? segment.freeEssence,
    locale,
  ).trim();
  if (!dynamic) return null;
  return {
    label: "Relationship Trigger Pattern",
    value: relationshipTriggerValue(locale, dynamic),
  };
}

export function coreIllusionMechanismField(
  locale: Locale,
  segment: SegmentContent,
): DepthField | null {
  const mechanism = pickLocalized(
    segment.voidChallenge ?? segment.coreIllusion ?? segment.freeEssence,
    locale,
  ).trim();
  if (!mechanism) return null;
  return {
    label: "Core Illusion Mechanism",
    value: coreIllusionMechanismValue(locale, mechanism),
  };
}
