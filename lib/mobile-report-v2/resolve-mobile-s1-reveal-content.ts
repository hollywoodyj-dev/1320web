import { getMobileS1RevealBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-s1-reveal-background";
import { uniqueStrings, appendUniqueSentences } from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import { getSignatureCardImageUrl } from "@/lib/full-report-v2/signature-card-images";
import { resolveS1PageContent } from "@/lib/full-report-v2/resolve-s1-page-content";
import {
  MOBILE_S1_REVEAL_BRAND_NAME,
  MOBILE_S1_REVEAL_BRAND_SUBTITLE,
  MOBILE_S1_REVEAL_FALLBACK_ICON,
  MOBILE_S1_REVEAL_KICKER,
  MOBILE_S1_REVEAL_MEANING_FALLBACK,
  MOBILE_S1_REVEAL_MEANING_ICON,
  MOBILE_S1_REVEAL_MEANING_TITLE,
  MOBILE_S1_REVEAL_MODULE_LABEL,
  MOBILE_S1_REVEAL_MODULE_MEANING,
  MOBILE_S1_REVEAL_PAGE_INDEX,
  MOBILE_S1_REVEAL_QUOTE_FALLBACK,
  MOBILE_S1_REVEAL_QUOTE_FROM_CLOSING,
  MOBILE_S1_REVEAL_REFLECTION_FALLBACK,
  MOBILE_S1_REVEAL_REFLECTION_ICON,
  MOBILE_S1_REVEAL_REFLECTION_TITLE,
  MOBILE_S1_REVEAL_SUBTITLE_LINES,
  MOBILE_S1_REVEAL_THEME_ITEMS,
  MOBILE_S1_REVEAL_THEMES_TITLE_PREFIX,
  MOBILE_S1_REVEAL_TITLE_EMPHASIS,
  MOBILE_S1_REVEAL_TITLE_LINE,
} from "@/lib/mobile-report-v2/s1-reveal-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS1RevealTheme = {
  icon: string;
  title: string;
  copy: string;
};

export type MobileS1RevealPageContent = {
  brandName: string;
  brandSubtitle: string;
  pageIndex: string;
  kicker: string;
  titleLine: string;
  titleEmphasis: string;
  subtitleLines: string[];
  code: string;
  title: string;
  fallbackIcon: string;
  imageUrl?: string;
  revealBackgroundUrl?: string;
  moduleLabel: string;
  moduleMeaning: string;
  meaningTitle: string;
  meaningIcon: string;
  revealMeaning: string;
  themesTitle: string;
  themes: MobileS1RevealTheme[];
  reflectionTitle: string;
  reflectionIcon: string;
  reflectionPrompt: string;
  revealQuote: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => (typeof item === "string" ? item.trim() : "")).filter(Boolean);
}

function buildRevealMeaning(
  slot: Record<string, unknown>,
  title: string,
  essenceBody: string,
  keyInsight: string,
): string {
  const essence = asString(slot.essence);
  const lesson = asString(slot.core_lesson);
  const guidance = asString(slot.wisewave_guidance);
  const gifts = asStringArray(slot.core_gifts);

  const parts: string[] = [];

  if (essence) {
    parts.push(essence);
  } else if (essenceBody) {
    parts.push(essenceBody);
  } else if (title) {
    parts.push(`You carry the archetype of ${title}.`);
  }

  if (lesson) {
    parts.push(lesson);
  }

  if (guidance && !parts.includes(guidance)) {
    parts.push(guidance);
  } else if (keyInsight && !parts.includes(keyInsight)) {
    parts.push(keyInsight);
  }

  if (gifts.length > 0 && parts.length < 2) {
    parts.push(gifts[0]);
  }

  if (keyInsight && !parts.includes(keyInsight)) {
    parts.push(keyInsight);
  }

  return parts.join(" ") || MOBILE_S1_REVEAL_MEANING_FALLBACK;
}

function buildThemes(
  s1Page: ReturnType<typeof resolveS1PageContent>,
  slot: Record<string, unknown>,
): MobileS1RevealTheme[] {
  const expressionCopies = s1Page.expressionNodes.map((node) => node.copy);
  const copySources = uniqueStrings(
    expressionCopies.slice(0, 3),
    s1Page.shadowPatterns,
    asStringArray(slot.soul_traits),
    asStringArray(slot.core_gifts),
    asStringArray(slot.mission_direction),
    s1Page.influenceIntro,
  );

  return MOBILE_S1_REVEAL_THEME_ITEMS.map((theme, index) => ({
    icon: theme.icon,
    title: theme.title,
    copy: copySources[index] ?? theme.copyFallback,
  }));
}

function buildRevealQuote(guidance: string): string {
  if (!guidance) return MOBILE_S1_REVEAL_QUOTE_FALLBACK;

  const sentences = guidance
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (sentences.length >= 2) {
    return `${sentences[sentences.length - 2]} ${sentences[sentences.length - 1]}`;
  }

  if (sentences.length === 1) {
    return sentences[0];
  }

  return MOBILE_S1_REVEAL_QUOTE_FROM_CLOSING || MOBILE_S1_REVEAL_QUOTE_FALLBACK;
}

export function resolveMobileS1RevealContent(payload: FullReportV2Payload): MobileS1RevealPageContent {
  const s1Page = resolveS1PageContent(payload);
  const slot = payload.modules.s1;
  const guidance = asString(slot.wisewave_guidance);
  const reflection =
    asString(slot.reflection) ||
    s1Page.reflectionPrompts[0] ||
    MOBILE_S1_REVEAL_REFLECTION_FALLBACK;

  return {
    brandName: MOBILE_S1_REVEAL_BRAND_NAME,
    brandSubtitle: MOBILE_S1_REVEAL_BRAND_SUBTITLE,
    pageIndex: MOBILE_S1_REVEAL_PAGE_INDEX,
    kicker: MOBILE_S1_REVEAL_KICKER,
    titleLine: MOBILE_S1_REVEAL_TITLE_LINE,
    titleEmphasis: MOBILE_S1_REVEAL_TITLE_EMPHASIS,
    subtitleLines: [...MOBILE_S1_REVEAL_SUBTITLE_LINES],
    code: s1Page.code,
    title: s1Page.title,
    fallbackIcon: MOBILE_S1_REVEAL_FALLBACK_ICON,
    imageUrl: getSignatureCardImageUrl("s1", payload.calculation),
    revealBackgroundUrl: getMobileS1RevealBackgroundUrl(s1Page.code),
    moduleLabel: MOBILE_S1_REVEAL_MODULE_LABEL,
    moduleMeaning: MOBILE_S1_REVEAL_MODULE_MEANING,
    meaningTitle: MOBILE_S1_REVEAL_MEANING_TITLE,
    meaningIcon: MOBILE_S1_REVEAL_MEANING_ICON,
    revealMeaning: appendUniqueSentences(
      buildRevealMeaning(slot, s1Page.title, s1Page.essenceBody, s1Page.keyInsight),
      uniqueStrings(s1Page.expressionNodes.map((node) => node.copy).slice(3), s1Page.shadowPatterns),
    ),
    themesTitle: `${MOBILE_S1_REVEAL_THEMES_TITLE_PREFIX} ${s1Page.code}`,
    themes: buildThemes(s1Page, slot),
    reflectionTitle: MOBILE_S1_REVEAL_REFLECTION_TITLE,
    reflectionIcon: MOBILE_S1_REVEAL_REFLECTION_ICON,
    reflectionPrompt: reflection,
    revealQuote: buildRevealQuote(guidance),
  };
}
