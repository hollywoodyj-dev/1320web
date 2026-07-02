import { resolveS8PrimaryIconAsset } from "@/lib/full-report-v2/s8-icon-registry";
import {
  S8_CONTRIBUTION_MAP_LOGO_ALTS,
  S8_CONTRIBUTION_MAP_LOGO_URLS,
} from "@/lib/full-report-v2/s8-contribution-map-logos";
import {
  S8_CONTRIBUTION_INTEGRATION_TITLE,
  S8_FOCUS_DIMENSIONS,
  S8_FOCUS_PILL_TONES,
  S8_FOCUS_QUALIFIERS,
  S8_LIFE_INFLUENCE_TITLE,
  S8_MAP_NODE_FALLBACK_COPY,
  S8_MAP_NODE_TITLES,
  S8_PAGE_HERO,
} from "@/lib/full-report-v2/s8-page-static";
import type { QualitativeMapPillTone } from "@/lib/full-report-v2/advanced-module-display-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type S8FocusRow = {
  area: string;
  label: string;
  tone: QualitativeMapPillTone;
};

export type S8MapNode = {
  title: string;
  copy: string;
  fullCopy: string;
  iconUrl: string;
  iconAlt: string;
};

export type S8PageContent = {
  hero: typeof S8_PAGE_HERO;
  code: string;
  title: string;
  primary_icon_url?: string;
  primary_icon_svg?: string;
  primary_icon_alt: string;
  essenceParagraphs: string[];
  contributionShowsUp: string[];
  mapNodes: {
    top: S8MapNode;
    right: S8MapNode;
    bottom: S8MapNode;
    left: S8MapNode;
  };
  gifts: string[];
  focusRows: S8FocusRow[];
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
  return typeof value === "string" ? value.trim() : "";
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
    .replace(/^Mature contribution appears as\s+/i, "")
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

function s8SectionBody(
  sections: Array<{ id?: string; body?: { en?: string } }> | undefined,
  key: string,
): string {
  if (!sections) return "";
  const match = sections.find((section) => section.id === `S8-${key}`);
  return match?.body?.en?.trim() ?? "";
}

function cleanMapLead(text: string): string {
  return text
    .replace(/^This code reflects a soul whose\s+/i, "")
    .replace(/^Your contribution begins through\s+/i, "")
    .replace(/^Your contribution strengthens when\s+/i, "")
    .replace(/^Contribution flows when\s+/i, "")
    .replace(/^When distorted, contribution may become\s+/i, "")
    .replace(/^When distorted,\s+/i, "")
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
  return text.trim() || fallback;
}

function buildContributionShowsUp(
  flowText: string,
  shadowText: string,
  offersText: string,
  fallback: string[],
): string[] {
  const items = [
    ...splitSentences(flowText, 3),
    shadowText ? firstSentence(shadowText) : "",
    offersText ? firstSentence(offersText) : "",
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
    shadow ? `Where does fear distort contribution? ${firstSentence(shadow)}` : "",
    mature ? `What integration is inviting you now? ${firstSentence(mature)}` : "",
    essence ? "What gift is already trying to move through your life?" : "",
  ].filter(Boolean);
  return prompts.slice(0, 3);
}

export function resolveS8PageContent(payload: FullReportV2Payload): S8PageContent {
  const slot = payload.modules.s8;
  const code = slotString(slot, "code") || (payload.calculation.s8_code ?? "");
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
      : resolveS8PrimaryIconAsset(code, title);

  const soulSections = slot.contribution_sections as
    | Array<{ id?: string; body?: { en?: string } }>
    | undefined;

  const contributionEssence =
    slotString(slot, "contribution_essence") ||
    s8SectionBody(soulSections, "contribution_essence") ||
    slotString(slot, "essence");
  const soulOffers =
    slotString(slot, "what_your_soul_offers") || s8SectionBody(soulSections, "what_your_soul_offers");
  const contributionFlow =
    slotString(slot, "how_contribution_flows") ||
    s8SectionBody(soulSections, "how_contribution_flows");
  const naturalFieldsBody =
    slotString(slot, "natural_contribution_fields") ||
    s8SectionBody(soulSections, "natural_contribution_fields");
  const shadowDistortion =
    slotString(slot, "shadow_distortion") ||
    s8SectionBody(soulSections, "shadow_distortion_of_contribution");
  const matureExpression =
    slotString(slot, "mature_contribution_expression") ||
    s8SectionBody(soulSections, "mature_contribution_expression");
  const wisewave =
    slotString(slot, "wisewave_guidance") ||
    slotString(slot, "wisewave_reflection") ||
    s8SectionBody(soulSections, "wisewave_reflection");

  const giftsRaw =
    asStringArray(slot.contribution_gifts).length > 0
      ? asStringArray(slot.contribution_gifts)
      : parseBulletBody(naturalFieldsBody);
  const gifts = giftsRaw.map((gift) =>
    /^[a-z]/.test(gift) && gift.split(/\s+/).length <= 4 ? titleCaseField(gift) : capitalizeFirst(gift),
  );

  const essenceParagraphs = [contributionEssence, soulOffers].filter(Boolean);
  const contributionShowsUp =
    asStringArray(slot.contribution_shows_up).length > 0
      ? asStringArray(slot.contribution_shows_up)
      : buildContributionShowsUp(
          contributionFlow,
          shadowDistortion,
          soulOffers,
          splitSentences(contributionFlow, 5),
        );

  const topSource = contributionEssence || soulOffers;
  const rightSource = contributionFlow || soulOffers;
  const bottomSource = matureExpression || contributionFlow;
  const leftSource = soulOffers || naturalFieldsBody;

  const mapNodes = {
    top: {
      title: S8_MAP_NODE_TITLES.top,
      copy: shortMapCopy(topSource, S8_MAP_NODE_FALLBACK_COPY.top),
      fullCopy: fullMapCopy(topSource, S8_MAP_NODE_FALLBACK_COPY.top),
      iconUrl: S8_CONTRIBUTION_MAP_LOGO_URLS.top,
      iconAlt: S8_CONTRIBUTION_MAP_LOGO_ALTS.top,
    },
    right: {
      title: S8_MAP_NODE_TITLES.right,
      copy: shortMapCopy(rightSource, S8_MAP_NODE_FALLBACK_COPY.right),
      fullCopy: fullMapCopy(rightSource, S8_MAP_NODE_FALLBACK_COPY.right),
      iconUrl: S8_CONTRIBUTION_MAP_LOGO_URLS.right,
      iconAlt: S8_CONTRIBUTION_MAP_LOGO_ALTS.right,
    },
    bottom: {
      title: S8_MAP_NODE_TITLES.bottom,
      copy: shortMapCopy(bottomSource, S8_MAP_NODE_FALLBACK_COPY.bottom),
      fullCopy: fullMapCopy(bottomSource, S8_MAP_NODE_FALLBACK_COPY.bottom),
      iconUrl: S8_CONTRIBUTION_MAP_LOGO_URLS.bottom,
      iconAlt: S8_CONTRIBUTION_MAP_LOGO_ALTS.bottom,
    },
    left: {
      title: S8_MAP_NODE_TITLES.left,
      copy: shortMapCopy(leftSource, S8_MAP_NODE_FALLBACK_COPY.left),
      fullCopy: fullMapCopy(leftSource, S8_MAP_NODE_FALLBACK_COPY.left),
      iconUrl: S8_CONTRIBUTION_MAP_LOGO_URLS.left,
      iconAlt: S8_CONTRIBUTION_MAP_LOGO_ALTS.left,
    },
  };

  const focusRows: S8FocusRow[] = S8_FOCUS_DIMENSIONS.map((area, index) => ({
    area,
    label: S8_FOCUS_QUALIFIERS[index % S8_FOCUS_QUALIFIERS.length],
    tone: S8_FOCUS_PILL_TONES[index % S8_FOCUS_PILL_TONES.length],
  }));

  const integrationGuidance =
    stripMaturePrefix(matureExpression) || capitalizeFirst(slotString(slot, "integration_key"));
  const lifeInfluence = capitalizeFirst(
    slotString(slot, "life_influence") ||
      contributionFlow ||
      contributionEssence ||
      "Your contribution frequency may shape how you serve, create impact, and express your gifts — as purpose, not as a score.",
  );

  const keyInsight =
    wisewave ||
    "You are here to contribute your light. The world is better because you are here — not because you proved your worth through output.";
  const wisewaveSentences = allSentences(wisewave);
  const wisewaveClosing =
    wisewaveSentences.length > 1 ? wisewaveSentences[wisewaveSentences.length - 1] : "";
  const finalRemembrance =
    capitalizeFirst(wisewaveClosing) ||
    capitalizeFirst(slotString(slot, "integration_key")) ||
    "Your light. Your gift. Your legacy.";

  const reflectionPrompts = buildReflectionPrompts(
    shadowDistortion,
    matureExpression,
    slotString(slot, "reflection"),
    contributionEssence,
  );

  return {
    hero: S8_PAGE_HERO,
    code,
    title,
    primary_icon_url: iconAsset.primary_icon_url,
    primary_icon_svg: iconAsset.primary_icon_svg,
    primary_icon_alt: iconAsset.primary_icon_alt,
    essenceParagraphs,
    contributionShowsUp,
    mapNodes,
    gifts: gifts.slice(0, 5),
    focusRows,
    wisewaveGuidance: wisewave,
    reflectionPrompts,
    lifeInfluenceTitle: S8_LIFE_INFLUENCE_TITLE,
    lifeInfluence,
    integrationTitle: S8_CONTRIBUTION_INTEGRATION_TITLE,
    integrationGuidance,
    keyInsight: firstSentence(keyInsight),
    finalRemembrance,
  };
}
