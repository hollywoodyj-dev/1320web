import { resolveS6PrimaryIconAsset } from "@/lib/full-report-v2/s6-icon-registry";
import {
  S6_RECEIVING_MAP_LOGO_ALTS,
  S6_RECEIVING_MAP_LOGO_URLS,
} from "@/lib/full-report-v2/s6-receiving-map-logos";
import {
  S6_FOCUS_DIMENSIONS,
  S6_FOCUS_QUALIFIERS,
  S6_LIFE_INFLUENCE_TITLE,
  S6_MAP_NODE_FALLBACK_COPY,
  S6_MAP_NODE_ICONS,
  S6_MAP_NODE_TITLES,
  S6_PAGE_HERO,
  S6_RECEIVING_INTEGRATION_TITLE,
} from "@/lib/full-report-v2/s6-page-static";
import { sanitizeCustomerFacingCopy } from "@/lib/report/customer-facing-copy";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type S6FocusRow = {
  area: string;
  label: string;
};

export type S6MapNode = {
  title: string;
  copy: string;
  fullCopy: string;
  icon: string;
  iconUrl: string;
  iconAlt: string;
};

export type S6PageContent = {
  hero: typeof S6_PAGE_HERO;
  code: string;
  title: string;
  primary_icon_url?: string;
  primary_icon_svg?: string;
  primary_icon_alt: string;
  essenceParagraphs: string[];
  receivingShowsUp: string[];
  mapNodes: {
    top: S6MapNode;
    right: S6MapNode;
    bottom: S6MapNode;
    left: S6MapNode;
  };
  gifts: string[];
  focusRows: S6FocusRow[];
  wisewaveGuidance: string;
  reflectionPrompts: string[];
  lifeInfluenceTitle: string;
  lifeInfluence: string;
  integrationTitle: string;
  integrationGuidance: string;
  keyInsight: string;
  finalRemembrance: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? sanitizeCustomerFacingCopy(value.trim()) : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => asString(item)).filter(Boolean);
}

function slotString(slot: Record<string, unknown>, key: string): string {
  return asString(slot[key]);
}

function splitSentences(text: string, max = 3): string[] {
  if (!text) return [];
  return text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, max);
}

function firstSentence(text: string): string {
  const match = text.match(/^[\s\S]*?[.!?](?:\s|$)/);
  return match ? match[0].trim() : text.trim();
}

function allSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function parseBulletBody(body: string): string[] {
  if (!body) return [];
  return body
    .split(/\n/)
    .map((line) => line.replace(/^•\s*/, "").trim())
    .filter(Boolean);
}

function capitalizeFirst(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function stripMaturePrefix(text: string): string {
  const stripped = text
    .replace(/^The mature expression appears when\s+/i, "")
    .replace(/^The integration begins when\s+/i, "")
    .replace(/^The integration begins through:\s*/i, "")
    .trim();
  return capitalizeFirst(stripped);
}

function titleCaseField(text: string): string {
  return text
    .split(/\s+/)
    .map((word) =>
      word.length > 2 || /^(of|to|in|by)$/i.test(word) === false
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word,
    )
    .join(" ")
    .trim();
}

function s6SectionBody(
  sections: Array<{ id?: string; body?: { en?: string } }> | undefined,
  key: string,
): string {
  if (!sections) return "";
  const match = sections.find((section) => section.id === `S6-${key}`);
  return sanitizeCustomerFacingCopy(match?.body?.en?.trim() ?? "");
}

function cleanMapLead(text: string): string {
  return text
    .replace(/^This S6 pattern reflects value that grows through\s+/i, "")
    .replace(/^Value wants to flow when\s+/i, "")
    .replace(/^The soul is learning to receive from\s+/i, "")
    .replace(/^Receiving becomes cleaner when\s+/i, "")
    .replace(/^When distorted by fear, this pattern may move into\s+/i, "")
    .replace(/^The mature expression appears when the person\s+/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function shortMapCopy(text: string, fallback: string, maxLen = 96): string {
  const source = text.trim() || fallback;
  const sentence = capitalizeFirst(cleanMapLead(firstSentence(source)));
  if (sentence.length <= maxLen) return sentence;
  const clipped = sentence.slice(0, maxLen);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${(lastSpace > 50 ? clipped.slice(0, lastSpace) : clipped).trim()}…`;
}

function fullMapCopy(text: string, fallback: string): string {
  return sanitizeCustomerFacingCopy(text.trim() || fallback);
}

function buildReceivingShowsUp(
  flowText: string,
  shadowText: string,
  learningText: string,
  fallback: string[],
): string[] {
  const items = [
    ...splitSentences(flowText, 3),
    shadowText ? firstSentence(shadowText) : "",
    learningText ? firstSentence(learningText) : "",
    ...fallback,
  ].filter(Boolean);
  return items.slice(0, 5);
}

function buildReflectionPrompts(
  shadow: string,
  mature: string,
  reflection: string,
  essence: string,
): string[] {
  const prompts = [
    reflection,
    shadow ? `Where does fear distort receiving? ${firstSentence(shadow)}` : "",
    mature ? `What integration is inviting you now? ${firstSentence(mature)}` : "",
    essence ? "What truth is already trying to move through your worth frequency?" : "",
  ].filter(Boolean);
  return prompts.slice(0, 3);
}

export function resolveS6PageContent(payload: FullReportV2Payload): S6PageContent {
  const slot = payload.modules.s6;
  const code = slotString(slot, "code") || (payload.calculation.s6_code ?? "");
  const title = slotString(slot, "title") || slotString(slot, "archetype");
  const iconFromSlot = {
    primary_icon_url: slotString(slot, "primary_icon_url") || undefined,
    primary_icon_svg: slotString(slot, "primary_icon_svg") || undefined,
    primary_icon_alt: slotString(slot, "primary_icon_alt"),
  };
  const iconAsset =
    iconFromSlot.primary_icon_url || iconFromSlot.primary_icon_svg
      ? {
          primary_icon_url: iconFromSlot.primary_icon_url,
          primary_icon_svg: iconFromSlot.primary_icon_svg,
          primary_icon_alt: iconFromSlot.primary_icon_alt || `${code} ${title} primary icon`,
        }
      : resolveS6PrimaryIconAsset(code, title);

  const soulSections = slot.value_receiving_sections as
    | Array<{ id?: string; body?: { en?: string } }>
    | undefined;

  const valueEssence =
    slotString(slot, "value_essence") || s6SectionBody(soulSections, "value_essence") || slotString(slot, "essence");
  const soulLearning =
    slotString(slot, "soul_learning_to_receive") ||
    s6SectionBody(soulSections, "what_your_soul_is_learning_to_receive");
  const valueFlow =
    slotString(slot, "how_value_flows") || s6SectionBody(soulSections, "how_value_wants_to_flow");
  const naturalFieldsBody =
    slotString(slot, "natural_value_fields") || s6SectionBody(soulSections, "natural_value_fields");
  const shadowDistortion =
    slotString(slot, "shadow_distortion") ||
    s6SectionBody(soulSections, "shadow_distortion_of_receiving");
  const matureExpression =
    slotString(slot, "mature_receiving_expression") ||
    s6SectionBody(soulSections, "mature_receiving_expression");
  const wisewave =
    slotString(slot, "wisewave_guidance") ||
    slotString(slot, "wisewave_reflection") ||
    s6SectionBody(soulSections, "wisewave_reflection");

  const giftsRaw =
    asStringArray(slot.receiving_gifts).length > 0
      ? asStringArray(slot.receiving_gifts)
      : parseBulletBody(naturalFieldsBody);
  const gifts = giftsRaw.map((gift) =>
    /^[a-z]/.test(gift) && gift.split(/\s+/).length <= 4 ? titleCaseField(gift) : capitalizeFirst(gift),
  );

  const essenceParagraphs = [valueEssence, soulLearning].filter(Boolean);
  const receivingShowsUp =
    asStringArray(slot.receiving_shows_up).length > 0
      ? asStringArray(slot.receiving_shows_up)
      : buildReceivingShowsUp(valueFlow, shadowDistortion, soulLearning, splitSentences(valueFlow, 5));

  const topSource = valueEssence || soulLearning;
  const rightSource = valueFlow || soulLearning;
  const bottomSource = matureExpression || valueFlow;
  const leftSource = soulLearning || shadowDistortion;

  const mapNodes = {
    top: {
      title: S6_MAP_NODE_TITLES.top,
      copy: shortMapCopy(topSource, S6_MAP_NODE_FALLBACK_COPY.top),
      fullCopy: fullMapCopy(topSource, S6_MAP_NODE_FALLBACK_COPY.top),
      icon: S6_MAP_NODE_ICONS[0],
      iconUrl: S6_RECEIVING_MAP_LOGO_URLS.top,
      iconAlt: S6_RECEIVING_MAP_LOGO_ALTS.top,
    },
    right: {
      title: S6_MAP_NODE_TITLES.right,
      copy: shortMapCopy(rightSource, S6_MAP_NODE_FALLBACK_COPY.right),
      fullCopy: fullMapCopy(rightSource, S6_MAP_NODE_FALLBACK_COPY.right),
      icon: S6_MAP_NODE_ICONS[1],
      iconUrl: S6_RECEIVING_MAP_LOGO_URLS.right,
      iconAlt: S6_RECEIVING_MAP_LOGO_ALTS.right,
    },
    bottom: {
      title: S6_MAP_NODE_TITLES.bottom,
      copy: shortMapCopy(bottomSource, S6_MAP_NODE_FALLBACK_COPY.bottom),
      fullCopy: fullMapCopy(bottomSource, S6_MAP_NODE_FALLBACK_COPY.bottom),
      icon: S6_MAP_NODE_ICONS[2],
      iconUrl: S6_RECEIVING_MAP_LOGO_URLS.bottom,
      iconAlt: S6_RECEIVING_MAP_LOGO_ALTS.bottom,
    },
    left: {
      title: S6_MAP_NODE_TITLES.left,
      copy: shortMapCopy(leftSource, S6_MAP_NODE_FALLBACK_COPY.left),
      fullCopy: fullMapCopy(leftSource, S6_MAP_NODE_FALLBACK_COPY.left),
      icon: S6_MAP_NODE_ICONS[3],
      iconUrl: S6_RECEIVING_MAP_LOGO_URLS.left,
      iconAlt: S6_RECEIVING_MAP_LOGO_ALTS.left,
    },
  };

  const focusRows: S6FocusRow[] = S6_FOCUS_DIMENSIONS.map((area, index) => ({
    area,
    label: S6_FOCUS_QUALIFIERS[index % S6_FOCUS_QUALIFIERS.length],
  }));

  const integrationGuidance =
    stripMaturePrefix(matureExpression) || capitalizeFirst(slotString(slot, "integration_key"));
  const lifeInfluence = capitalizeFirst(
    slotString(slot, "life_influence") ||
      valueFlow ||
      valueEssence ||
      "Your worth frequency may shape how you relate to money, support, boundaries, and reciprocity — as awareness, not as a score.",
  );

  const keyInsight =
    wisewave ||
    "You are not here to earn your worth. You are here to remember that worth is already present — and let life meet you there.";
  const wisewaveSentences = allSentences(wisewave);
  const wisewaveClosing =
    wisewaveSentences.length > 1 ? wisewaveSentences[wisewaveSentences.length - 1] : "";
  const finalRemembrance =
    capitalizeFirst(wisewaveClosing) ||
    capitalizeFirst(slotString(slot, "integration_key")) ||
    "Your worth allows life to flow to you.";

  const reflectionPrompts = buildReflectionPrompts(
    shadowDistortion,
    matureExpression,
    slotString(slot, "reflection"),
    valueEssence,
  );

  return {
    hero: S6_PAGE_HERO,
    code,
    title,
    primary_icon_url: iconAsset.primary_icon_url,
    primary_icon_svg: iconAsset.primary_icon_svg,
    primary_icon_alt: iconAsset.primary_icon_alt,
    essenceParagraphs,
    receivingShowsUp,
    mapNodes,
    gifts: gifts.slice(0, 5),
    focusRows,
    wisewaveGuidance: wisewave,
    reflectionPrompts,
    lifeInfluenceTitle: S6_LIFE_INFLUENCE_TITLE,
    lifeInfluence,
    integrationTitle: S6_RECEIVING_INTEGRATION_TITLE,
    integrationGuidance,
    keyInsight: firstSentence(keyInsight),
    finalRemembrance,
  };
}
