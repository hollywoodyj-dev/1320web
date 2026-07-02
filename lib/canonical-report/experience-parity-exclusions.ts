import type { CanonicalSectionId } from "@/lib/canonical-report/types";
import { normalizeSubstantiveText } from "@/lib/canonical-report/extract-substantive-text";

export type ExperienceParityExclusionKind = "decorative" | "intentional_mobile";

/** Desktop-only strings excluded from experience parity enforcement after Phase B review. */
const DECORATIVE_PATTERNS: RegExp[] = [
  /\bpractice icon$/,
  /\bjournal icon$/,
  /\bmap logo$/,
];

/** Desktop long-form lines acceptable as mobile-condensed equivalents (Gate 4 relocation). */
const INTENTIONAL_MOBILE_PATTERNS: RegExp[] = [
  /^mature sovereignty appears as/,
  /^mature return appears as/,
  /^the person notices how quickly they leave their own center/,
  /^the person repeatedly asks others to confirm/,
  /^the person stops underestimating quiet influence/,
  /^this code reflects a soul/,
  /^life themes resolve when the person stops protecting illusions/,
  /^creative expression without proof$/,
  /^journaling reality vs projection$/,
  /^spiritual or reflective education$/,
];

const INTENTIONAL_MOBILE_SECTIONS = new Set<CanonicalSectionId>(["s6", "s7", "s8", "s9"]);

export function classifyExperienceParityExclusion(
  desktopText: string,
  sectionId: CanonicalSectionId,
): ExperienceParityExclusionKind | null {
  const normalized = normalizeSubstantiveText(desktopText);
  if (!normalized) return null;

  if (DECORATIVE_PATTERNS.some((pattern) => pattern.test(normalized))) {
    return "decorative";
  }

  if (
    INTENTIONAL_MOBILE_SECTIONS.has(sectionId) &&
    INTENTIONAL_MOBILE_PATTERNS.some((pattern) => pattern.test(normalized))
  ) {
    return "intentional_mobile";
  }

  return null;
}

export function isExperienceParityExclusion(
  desktopText: string,
  sectionId: CanonicalSectionId,
): boolean {
  return classifyExperienceParityExclusion(desktopText, sectionId) !== null;
}
