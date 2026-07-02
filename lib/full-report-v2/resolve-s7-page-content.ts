import { resolveS7PrimaryIconAsset } from "@/lib/full-report-v2/s7-icon-registry";
import {
  S7_SOVEREIGNTY_MAP_LOGO_ALTS,
  S7_SOVEREIGNTY_MAP_LOGO_URLS,
} from "@/lib/full-report-v2/s7-sovereignty-map-logos";
import {
  S7_FOCUS_DIMENSIONS,
  S7_FOCUS_PILL_TONES,
  S7_FOCUS_QUALIFIERS,
  S7_LIFE_INFLUENCE_TITLE,
  S7_MAP_NODE_FALLBACK_COPY,
  S7_MAP_NODE_TITLES,
  S7_PAGE_HERO,
  S7_SOVEREIGNTY_INTEGRATION_TITLE,
} from "@/lib/full-report-v2/s7-page-static";
import type { QualitativeMapPillTone } from "@/lib/full-report-v2/advanced-module-display-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type S7FocusRow = {
  area: string;
  label: string;
  tone: QualitativeMapPillTone;
};

export type S7MapNode = {
  title: string;
  copy: string;
  fullCopy: string;
  iconUrl: string;
  iconAlt: string;
};

export type S7PageContent = {
  hero: typeof S7_PAGE_HERO;
  code: string;
  title: string;
  primary_icon_url?: string;
  primary_icon_svg?: string;
  primary_icon_alt: string;
  essenceParagraphs: string[];
  sovereigntyShowsUp: string[];
  mapNodes: {
    top: S7MapNode;
    right: S7MapNode;
    bottom: S7MapNode;
    left: S7MapNode;
  };
  gifts: string[];
  focusRows: S7FocusRow[];
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
    .replace(/^Mature sovereignty appears as\s+/i, "")
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

function s7SectionBody(
  sections: Array<{ id?: string; body?: { en?: string } }> | undefined,
  key: string,
): string {
  if (!sections) return "";
  const match = sections.find((section) => section.id === `S7-${key}`);
  return match?.body?.en?.trim() ?? "";
}

function cleanMapLead(text: string): string {
  return text
    .replace(/^This code reflects a soul learning to\s+/i, "")
    .replace(/^Your sovereignty strengthens when\s+/i, "")
    .replace(/^Your sovereignty begins through\s+/i, "")
    .replace(/^Patterns become visible when\s+/i, "")
    .replace(/^Patterns become visible where\s+/i, "")
    .replace(/^When distorted, sovereignty may become\s+/i, "")
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

function buildSovereigntyShowsUp(
  powerGivenAway: string,
  shadowText: string,
  reclaimText: string,
  fallback: string[],
): string[] {
  const items = [
    ...splitSentences(powerGivenAway, 3),
    shadowText ? firstSentence(shadowText) : "",
    reclaimText ? firstSentence(reclaimText) : "",
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
    shadow ? `Where does fear distort sovereignty? ${firstSentence(shadow)}` : "",
    mature ? `What integration is inviting you now? ${firstSentence(mature)}` : "",
    essence ? "What truth is already trying to move through your inner authority?" : "",
  ].filter(Boolean);
  return prompts.slice(0, 3);
}

export function resolveS7PageContent(payload: FullReportV2Payload): S7PageContent {
  const slot = payload.modules.s7;
  const code = slotString(slot, "code") || (payload.calculation.s7_code ?? "");
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
      : resolveS7PrimaryIconAsset(code, title);

  const soulSections = slot.sovereignty_sections as
    | Array<{ id?: string; body?: { en?: string } }>
    | undefined;

  const sovereigntyEssence =
    slotString(slot, "sovereignty_essence") ||
    s7SectionBody(soulSections, "sovereignty_essence") ||
    slotString(slot, "essence");
  const soulReclaim =
    slotString(slot, "soul_learning_to_reclaim") ||
    s7SectionBody(soulSections, "what_your_soul_is_learning_to_reclaim");
  const powerGivenAway =
    slotString(slot, "where_power_given_away") ||
    s7SectionBody(soulSections, "where_power_was_given_away");
  const naturalFieldsBody =
    slotString(slot, "natural_sovereignty_fields") ||
    s7SectionBody(soulSections, "natural_sovereignty_fields");
  const shadowDistortion =
    slotString(slot, "shadow_distortion") ||
    s7SectionBody(soulSections, "shadow_distortion_of_sovereignty");
  const matureExpression =
    slotString(slot, "mature_sovereignty_expression") ||
    s7SectionBody(soulSections, "mature_sovereignty_expression");
  const wisewave =
    slotString(slot, "wisewave_guidance") ||
    slotString(slot, "wisewave_reflection") ||
    s7SectionBody(soulSections, "wisewave_reflection");

  const giftsRaw =
    asStringArray(slot.sovereignty_gifts).length > 0
      ? asStringArray(slot.sovereignty_gifts)
      : parseBulletBody(naturalFieldsBody);
  const gifts = giftsRaw.map((gift) =>
    /^[a-z]/.test(gift) && gift.split(/\s+/).length <= 4 ? titleCaseField(gift) : capitalizeFirst(gift),
  );

  const essenceParagraphs = [sovereigntyEssence, soulReclaim].filter(Boolean);
  const sovereigntyShowsUp =
    asStringArray(slot.sovereignty_shows_up).length > 0
      ? asStringArray(slot.sovereignty_shows_up)
      : buildSovereigntyShowsUp(powerGivenAway, shadowDistortion, soulReclaim, splitSentences(powerGivenAway, 5));

  const topSource = sovereigntyEssence || soulReclaim;
  const rightSource = powerGivenAway || shadowDistortion;
  const bottomSource = matureExpression || soulReclaim;
  const leftSource = soulReclaim || sovereigntyEssence;

  const mapNodes = {
    top: {
      title: S7_MAP_NODE_TITLES.top,
      copy: shortMapCopy(topSource, S7_MAP_NODE_FALLBACK_COPY.top),
      fullCopy: fullMapCopy(topSource, S7_MAP_NODE_FALLBACK_COPY.top),
      iconUrl: S7_SOVEREIGNTY_MAP_LOGO_URLS.top,
      iconAlt: S7_SOVEREIGNTY_MAP_LOGO_ALTS.top,
    },
    right: {
      title: S7_MAP_NODE_TITLES.right,
      copy: shortMapCopy(rightSource, S7_MAP_NODE_FALLBACK_COPY.right),
      fullCopy: fullMapCopy(rightSource, S7_MAP_NODE_FALLBACK_COPY.right),
      iconUrl: S7_SOVEREIGNTY_MAP_LOGO_URLS.right,
      iconAlt: S7_SOVEREIGNTY_MAP_LOGO_ALTS.right,
    },
    bottom: {
      title: S7_MAP_NODE_TITLES.bottom,
      copy: shortMapCopy(bottomSource, S7_MAP_NODE_FALLBACK_COPY.bottom),
      fullCopy: fullMapCopy(bottomSource, S7_MAP_NODE_FALLBACK_COPY.bottom),
      iconUrl: S7_SOVEREIGNTY_MAP_LOGO_URLS.bottom,
      iconAlt: S7_SOVEREIGNTY_MAP_LOGO_ALTS.bottom,
    },
    left: {
      title: S7_MAP_NODE_TITLES.left,
      copy: shortMapCopy(leftSource, S7_MAP_NODE_FALLBACK_COPY.left),
      fullCopy: fullMapCopy(leftSource, S7_MAP_NODE_FALLBACK_COPY.left),
      iconUrl: S7_SOVEREIGNTY_MAP_LOGO_URLS.left,
      iconAlt: S7_SOVEREIGNTY_MAP_LOGO_ALTS.left,
    },
  };

  const focusRows: S7FocusRow[] = S7_FOCUS_DIMENSIONS.map((area, index) => ({
    area,
    label: S7_FOCUS_QUALIFIERS[index % S7_FOCUS_QUALIFIERS.length],
    tone: S7_FOCUS_PILL_TONES[index % S7_FOCUS_PILL_TONES.length],
  }));

  const integrationGuidance =
    stripMaturePrefix(matureExpression) || capitalizeFirst(slotString(slot, "integration_key"));
  const lifeInfluence = capitalizeFirst(
    slotString(slot, "life_influence") ||
      powerGivenAway ||
      sovereigntyEssence ||
      "Your sovereignty frequency may shape how you choose, set boundaries, and trust your inner knowing — as awareness, not as a power score.",
  );

  const keyInsight =
    wisewave ||
    "Sovereignty is not dominance over others. It is the quiet authority to choose from truth and stand in your own center.";
  const wisewaveSentences = allSentences(wisewave);
  const wisewaveClosing =
    wisewaveSentences.length > 1 ? wisewaveSentences[wisewaveSentences.length - 1] : "";
  const finalRemembrance =
    capitalizeFirst(wisewaveClosing) ||
    capitalizeFirst(slotString(slot, "integration_key")) ||
    "Your inner authority restores your freedom.";

  const reflectionPrompts = buildReflectionPrompts(
    shadowDistortion,
    matureExpression,
    slotString(slot, "reflection"),
    sovereigntyEssence,
  );

  return {
    hero: S7_PAGE_HERO,
    code,
    title,
    primary_icon_url: iconAsset.primary_icon_url,
    primary_icon_svg: iconAsset.primary_icon_svg,
    primary_icon_alt: iconAsset.primary_icon_alt,
    essenceParagraphs,
    sovereigntyShowsUp,
    mapNodes,
    gifts: gifts.slice(0, 5),
    focusRows,
    wisewaveGuidance: wisewave,
    reflectionPrompts,
    lifeInfluenceTitle: S7_LIFE_INFLUENCE_TITLE,
    lifeInfluence,
    integrationTitle: S7_SOVEREIGNTY_INTEGRATION_TITLE,
    integrationGuidance,
    keyInsight: firstSentence(keyInsight),
    finalRemembrance,
  };
}
