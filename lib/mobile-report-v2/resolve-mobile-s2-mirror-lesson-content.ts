import { getMobileS2RevealBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-s2-reveal-background";
import { getSignatureCardImageUrl } from "@/lib/full-report-v2/signature-card-images";
import { resolveS2PageContent } from "@/lib/full-report-v2/resolve-s2-page-content";
import { sanitizeCustomerFacingCopy } from "@/lib/report/customer-facing-copy";
import {
  MOBILE_S2_MIRROR_LESSON_BRAND_NAME,
  MOBILE_S2_MIRROR_LESSON_BRAND_SUBTITLE,
  MOBILE_S2_MIRROR_LESSON_FALLBACK_ICON,
  MOBILE_S2_MIRROR_LESSON_KICKER,
  MOBILE_S2_MIRROR_LESSON_MODULE_LABEL,
  MOBILE_S2_MIRROR_LESSON_PAGE_INDEX,
  MOBILE_S2_MIRROR_LESSON_POINT_ITEMS,
  MOBILE_S2_MIRROR_LESSON_REFLECTS_FALLBACK,
  MOBILE_S2_MIRROR_LESSON_REFLECTS_ICON,
  MOBILE_S2_MIRROR_LESSON_REFLECTS_TITLE,
  MOBILE_S2_MIRROR_LESSON_REFLECTION_FALLBACK,
  MOBILE_S2_MIRROR_LESSON_REFLECTION_ICON,
  MOBILE_S2_MIRROR_LESSON_REFLECTION_TITLE,
  MOBILE_S2_MIRROR_LESSON_SHORT_LINE_FALLBACK,
  MOBILE_S2_MIRROR_LESSON_SOUL_LESSON_FALLBACK,
  MOBILE_S2_MIRROR_LESSON_SOUL_LESSON_TITLE,
  MOBILE_S2_MIRROR_LESSON_SUBTITLE_LINES,
  MOBILE_S2_MIRROR_LESSON_THEME_ITEMS,
  MOBILE_S2_MIRROR_LESSON_THEMES_TITLE,
  MOBILE_S2_MIRROR_LESSON_TIP_FALLBACK,
  MOBILE_S2_MIRROR_LESSON_TIP_ICON,
  MOBILE_S2_MIRROR_LESSON_TIP_TITLE,
  MOBILE_S2_MIRROR_LESSON_TITLE_EMPHASIS,
  MOBILE_S2_MIRROR_LESSON_TITLE_LINE,
} from "@/lib/mobile-report-v2/s2-mirror-lesson-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS2MirrorLessonPoint = {
  icon: string;
  title: string;
  copy: string;
};

export type MobileS2MirrorLessonTheme = {
  icon: string;
  title: string;
  copy: string;
};

export type MobileS2MirrorLessonPageContent = {
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
  summaryBackgroundUrl: string;
  moduleLabel: string;
  shortMirrorLine: string;
  reflectsTitle: string;
  reflectsIcon: string;
  lifeReflectsBackCopy: string;
  soulLessonTitle: string;
  soulLessonCopy: string;
  lessonPoints: MobileS2MirrorLessonPoint[];
  themesTitle: string;
  themes: MobileS2MirrorLessonTheme[];
  reflectionTitle: string;
  reflectionIcon: string;
  reflectionPrompt: string;
  tipTitle: string;
  tipIcon: string;
  integrationTip: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? sanitizeCustomerFacingCopy(value.trim()) : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? sanitizeCustomerFacingCopy(item.trim()) : ""))
    .filter(Boolean);
}

function splitKarmicLoop(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  return trimmed
    .split(/\s*(?:→|->)\s*/)
    .map((part) => part.replace(/\.$/, "").trim())
    .filter(Boolean);
}

function stripIntegrationPrefix(text: string): string {
  return text
    .replace(/^The integration begins when the user expresses this origin frequency without turning it into proof, pressure, or fixed identity\.\s*/i, "")
    .replace(/^The integration begins through:\s*/i, "")
    .trim();
}

function buildShortMirrorLine(slot: Record<string, unknown>, essenceBody: string): string {
  const relationship = asString(slot.relationship_dynamic);
  const essence = asString(slot.essence);
  if (relationship) return relationship;
  if (essence) return essence;
  if (essenceBody) return essenceBody.split(/(?<=[.!?])\s+/)[0] ?? essenceBody;
  return MOBILE_S2_MIRROR_LESSON_SHORT_LINE_FALLBACK;
}

function buildLifeReflectsBackCopy(
  slot: Record<string, unknown>,
  s2Page: ReturnType<typeof resolveS2PageContent>,
): string {
  const relationship = asString(slot.relationship_dynamic);
  const essence = asString(slot.essence);
  const guidance = asString(slot.wisewave_guidance);
  const shadows = asStringArray(slot.shadow_pattern);
  const traits = asStringArray(slot.soul_traits);

  const parts: string[] = [];
  if (relationship) parts.push(relationship);
  if (s2Page.essenceSecondary) parts.push(s2Page.essenceSecondary);
  if (s2Page.keyInsight) parts.push(s2Page.keyInsight);
  if (shadows.length > 0) parts.push(shadows.join(" "));
  if (traits.length > 0 && parts.length < 2) parts.push(traits.join(" "));
  if (essence && !parts.includes(essence)) parts.push(essence);
  else if (s2Page.essenceBody && parts.length < 2) parts.push(s2Page.essenceBody);
  if (s2Page.influenceIntro && !parts.includes(s2Page.influenceIntro)) parts.push(s2Page.influenceIntro);
  if (guidance && parts.length < 2) parts.push(guidance);

  return parts.join(" ") || MOBILE_S2_MIRROR_LESSON_REFLECTS_FALLBACK;
}

function buildSoulLessonCopy(slot: Record<string, unknown>): string {
  const lesson = asString(slot.lesson) || asString(slot.core_lesson);
  const healing = asString(slot.healing_path);
  const parts: string[] = [];
  if (lesson) parts.push(lesson);
  if (healing && !parts.includes(healing)) parts.push(healing);
  return parts.join(" ") || MOBILE_S2_MIRROR_LESSON_SOUL_LESSON_FALLBACK;
}

function buildLessonPoints(slot: Record<string, unknown>): MobileS2MirrorLessonPoint[] {
  const lesson = asString(slot.lesson) || asString(slot.core_lesson);
  const healing = asString(slot.healing_path);
  const guidance = asString(slot.wisewave_guidance);
  const loopSteps = splitKarmicLoop(asString(slot.repeating_loop));

  const copySources = [
    loopSteps[0] || lesson,
    healing || loopSteps[1] || asString(slot.integration_advice),
    guidance || loopSteps[2],
  ];

  return MOBILE_S2_MIRROR_LESSON_POINT_ITEMS.map((point, index) => ({
    icon: point.icon,
    title: point.title,
    copy: copySources[index] ?? point.copyFallback,
  }));
}

function buildThemes(
  slot: Record<string, unknown>,
  s2Page: ReturnType<typeof resolveS2PageContent>,
): MobileS2MirrorLessonTheme[] {
  const relationship = asString(slot.relationship_dynamic);
  const loop = asString(slot.repeating_loop);
  const shadows = [...s2Page.shadowPatterns, ...asStringArray(slot.shadow_pattern)];
  const traits = asStringArray(slot.soul_traits);
  const strengths = asStringArray(slot.core_gifts);

  const copySources = [
    relationship || traits[0] || strengths[0],
    shadows[0] || traits[1],
    loop || s2Page.essenceSecondary || traits[2] || shadows[1],
    s2Page.keyInsightBold || shadows[2] || strengths[1] || traits[3],
    ...s2Page.expressionNodes.map((node) => node.copy),
  ].filter(Boolean);

  return MOBILE_S2_MIRROR_LESSON_THEME_ITEMS.map((theme, index) => ({
    icon: theme.icon,
    title: theme.title,
    copy: copySources[index] ?? theme.copyFallback,
  }));
}

function buildIntegrationTip(slot: Record<string, unknown>): string {
  const integration = stripIntegrationPrefix(
    asString(slot.integration_advice) || asString(slot.integration_key),
  );
  const guidance = asString(slot.wisewave_guidance);

  if (integration && integration.length > 24) return integration;

  if (guidance) {
    const sentences = guidance
      .split(/(?<=[.!?])\s+/)
      .map((part) => part.trim())
      .filter(Boolean);
    if (sentences.length >= 2) {
      return `${sentences[sentences.length - 2]} ${sentences[sentences.length - 1]}`;
    }
    return guidance;
  }

  return MOBILE_S2_MIRROR_LESSON_TIP_FALLBACK;
}

export function resolveMobileS2MirrorLessonContent(
  payload: FullReportV2Payload,
): MobileS2MirrorLessonPageContent {
  const s2Page = resolveS2PageContent(payload);
  const slot = payload.modules.s2;
  const shadows = asStringArray(slot.shadow_pattern);
  const traits = asStringArray(slot.soul_traits);
  const strengths = asStringArray(slot.core_gifts);

  const reflection =
    asString(slot.reflection) ||
    s2Page.reflectionPrompts[0] ||
    MOBILE_S2_MIRROR_LESSON_REFLECTION_FALLBACK;

  return {
    brandName: MOBILE_S2_MIRROR_LESSON_BRAND_NAME,
    brandSubtitle: MOBILE_S2_MIRROR_LESSON_BRAND_SUBTITLE,
    pageIndex: MOBILE_S2_MIRROR_LESSON_PAGE_INDEX,
    kicker: MOBILE_S2_MIRROR_LESSON_KICKER,
    titleLine: MOBILE_S2_MIRROR_LESSON_TITLE_LINE,
    titleEmphasis: MOBILE_S2_MIRROR_LESSON_TITLE_EMPHASIS,
    subtitleLines: [...MOBILE_S2_MIRROR_LESSON_SUBTITLE_LINES],
    code: s2Page.code,
    title: s2Page.title,
    fallbackIcon: MOBILE_S2_MIRROR_LESSON_FALLBACK_ICON,
    imageUrl: getSignatureCardImageUrl("s2", payload.calculation),
    summaryBackgroundUrl: getMobileS2RevealBackgroundUrl(),
    moduleLabel: MOBILE_S2_MIRROR_LESSON_MODULE_LABEL,
    shortMirrorLine: buildShortMirrorLine(slot, s2Page.essenceBody),
    reflectsTitle: MOBILE_S2_MIRROR_LESSON_REFLECTS_TITLE,
    reflectsIcon: MOBILE_S2_MIRROR_LESSON_REFLECTS_ICON,
    lifeReflectsBackCopy: buildLifeReflectsBackCopy(slot, s2Page),
    soulLessonTitle: MOBILE_S2_MIRROR_LESSON_SOUL_LESSON_TITLE,
    soulLessonCopy: buildSoulLessonCopy(slot),
    lessonPoints: buildLessonPoints(slot),
    themesTitle: MOBILE_S2_MIRROR_LESSON_THEMES_TITLE,
    themes: buildThemes(slot, s2Page),
    reflectionTitle: MOBILE_S2_MIRROR_LESSON_REFLECTION_TITLE,
    reflectionIcon: MOBILE_S2_MIRROR_LESSON_REFLECTION_ICON,
    reflectionPrompt: reflection,
    tipTitle: MOBILE_S2_MIRROR_LESSON_TIP_TITLE,
    tipIcon: MOBILE_S2_MIRROR_LESSON_TIP_ICON,
    integrationTip: buildIntegrationTip(slot),
  };
}
