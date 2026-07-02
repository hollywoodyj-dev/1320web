import { resolveS5PrimaryIconAsset } from "@/lib/full-report-v2/s5-icon-registry";
import {
  S5_MISSION_MAP_LOGO_ALTS,
  S5_MISSION_MAP_LOGO_URLS,
} from "@/lib/full-report-v2/s5-mission-map-logos";
import {
  S5_ACTIVATION_DIMENSIONS,
  S5_ACTIVATION_QUALIFIERS,
  S5_LIFE_INFLUENCE_TITLE,
  S5_MAP_NODE_TITLES,
  S5_MISSION_INTEGRATION_TITLE,
  S5_PAGE_HERO,
} from "@/lib/full-report-v2/s5-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type S5ActivationRow = {
  area: string;
  label: string;
};

export type S5MapNode = {
  title: string;
  copy: string;
  fullCopy: string;
  icon: string;
  iconUrl: string;
  iconAlt: string;
};

export type S5PageContent = {
  hero: typeof S5_PAGE_HERO;
  code: string;
  title: string;
  primary_icon_url?: string;
  primary_icon_svg?: string;
  primary_icon_alt: string;
  essenceParagraphs: string[];
  missionShowsUp: string[];
  mapNodes: {
    top: S5MapNode;
    right: S5MapNode;
    bottom: S5MapNode;
    left: S5MapNode;
  };
  gifts: string[];
  activationRows: S5ActivationRow[];
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

function s5SectionBody(
  sections: Array<{ id?: string; body?: { en?: string } }> | undefined,
  key: string,
): string {
  if (!sections) return "";
  const match = sections.find((section) => section.id === `S5-${key}`);
  return match?.body?.en?.trim() ?? "";
}

function cleanMapLead(text: string): string {
  return text
    .replace(/^This Soul Mission points to the invitation to\s+/i, "")
    .replace(/^The natural gift of this mission is\s+/i, "")
    .replace(/^The integration begins when the person\s+/i, "")
    .replace(/^The integration begins when\s+/i, "")
    .replace(/^Your repeating pattern may be\s+/i, "")
    .replace(/^Your repeating pattern\s+/i, "")
    .replace(/^When integrated, the same\s+/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function shortMapCopy(text: string, maxLen = 92): string {
  const sentence = capitalizeFirst(cleanMapLead(firstSentence(text)));
  if (sentence.length <= maxLen) return sentence;
  const clipped = sentence.slice(0, maxLen);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${(lastSpace > 50 ? clipped.slice(0, lastSpace) : clipped).trim()}…`;
}

/** Full first-paragraph text for map-node tooltips (untruncated). */
function fullMapCopy(text: string): string {
  return text.trim();
}

function buildMissionShowsUp(
  patternsText: string,
  shadowText: string,
  fallback: string[],
): string[] {
  const fromPatterns = splitSentences(patternsText, 4);
  const items = [
    ...fromPatterns,
    shadowText ? firstSentence(shadowText) : "",
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
    shadow ? `Where does fear distort this mission? ${firstSentence(shadow)}` : "",
    mature ? `What integration is inviting you now? ${firstSentence(mature)}` : "",
    essence ? `What truth is already trying to move through your life?` : "",
  ].filter(Boolean);
  return prompts.slice(0, 3);
}

export function resolveS5PageContent(payload: FullReportV2Payload): S5PageContent {
  const slot = payload.modules.s5;
  const code = slotString(slot, "code") || (payload.calculation.s5_code ?? "");
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
      : resolveS5PrimaryIconAsset(code, title);

  const sections = slot.content_sections as
    | Array<{ title?: string; body?: string }>
    | undefined;
  const soulSections = slot.soul_mission_sections as
    | Array<{ id?: string; body?: { en?: string } }>
    | undefined;

  const missionEssence =
    slotString(slot, "mission_essence") ||
    s5SectionBody(soulSections, "mission_essence") ||
    slotString(slot, "essence");
  const soulExpression =
    slotString(slot, "soul_expression") ||
    s5SectionBody(soulSections, "what_your_soul_is_learning_to_express");
  const patternsMission =
    slotString(slot, "patterns_mission") ||
    s5SectionBody(soulSections, "how_your_patterns_become_mission");
  const naturalFieldsBody =
    slotString(slot, "natural_mission_fields") ||
    s5SectionBody(soulSections, "natural_mission_fields");
  const shadowDistortion =
    slotString(slot, "shadow_distortion") ||
    s5SectionBody(soulSections, "shadow_distortion_of_this_mission");
  const matureExpression =
    slotString(slot, "mature_expression") ||
    s5SectionBody(soulSections, "mature_expression");
  const wisewave =
    slotString(slot, "wisewave_guidance") ||
    slotString(slot, "wisewave_reflection") ||
    s5SectionBody(soulSections, "wisewave_reflection");

  const giftsRaw =
    asStringArray(slot.mission_gifts).length > 0
      ? asStringArray(slot.mission_gifts)
      : parseBulletBody(naturalFieldsBody);
  const gifts = giftsRaw.map((gift) =>
    /^[a-z]/.test(gift) && gift.split(/\s+/).length <= 4 ? titleCaseField(gift) : capitalizeFirst(gift),
  );

  const essenceParagraphs = [missionEssence, soulExpression].filter(Boolean);
  const missionShowsUp =
    asStringArray(slot.mission_shows_up).length > 0
      ? asStringArray(slot.mission_shows_up)
      : buildMissionShowsUp(patternsMission, shadowDistortion, splitSentences(patternsMission, 5));

  const topSource = missionEssence || soulExpression;
  const rightSource = soulExpression || missionEssence;
  const bottomSource = matureExpression || patternsMission;
  const leftSource = patternsMission || soulExpression;

  const mapNodes = {
    top: {
      title: S5_MAP_NODE_TITLES.top,
      copy: shortMapCopy(topSource),
      fullCopy: fullMapCopy(topSource),
      icon: "✦",
      iconUrl: S5_MISSION_MAP_LOGO_URLS.top,
      iconAlt: S5_MISSION_MAP_LOGO_ALTS.top,
    },
    right: {
      title: S5_MAP_NODE_TITLES.right,
      copy: shortMapCopy(rightSource),
      fullCopy: fullMapCopy(rightSource),
      icon: "☉",
      iconUrl: S5_MISSION_MAP_LOGO_URLS.right,
      iconAlt: S5_MISSION_MAP_LOGO_ALTS.right,
    },
    bottom: {
      title: S5_MAP_NODE_TITLES.bottom,
      copy: shortMapCopy(bottomSource),
      fullCopy: fullMapCopy(bottomSource),
      icon: "⊕",
      iconUrl: S5_MISSION_MAP_LOGO_URLS.bottom,
      iconAlt: S5_MISSION_MAP_LOGO_ALTS.bottom,
    },
    left: {
      title: S5_MAP_NODE_TITLES.left,
      copy: shortMapCopy(leftSource),
      fullCopy: fullMapCopy(leftSource),
      icon: "❖",
      iconUrl: S5_MISSION_MAP_LOGO_URLS.left,
      iconAlt: S5_MISSION_MAP_LOGO_ALTS.left,
    },
  };

  const activationRows: S5ActivationRow[] = S5_ACTIVATION_DIMENSIONS.map((area, index) => ({
    area,
    label: S5_ACTIVATION_QUALIFIERS[index % S5_ACTIVATION_QUALIFIERS.length],
  }));

  const integrationGuidance =
    stripMaturePrefix(matureExpression) || capitalizeFirst(slotString(slot, "integration_key"));
  const lifeInfluence = capitalizeFirst(
    slotString(slot, "life_influence") ||
      patternsMission ||
      missionEssence ||
      "Your mission frequency may shape how you choose work, relationships, and the meaning you seek — as direction, not obligation.",
  );

  const keyInsight =
    wisewave ||
    "Your mission is not a burden placed upon you. It is the shape your life begins to take when awareness becomes choice.";
  const wisewaveSentences = allSentences(wisewave);
  const wisewaveClosing =
    wisewaveSentences.length > 1 ? wisewaveSentences[wisewaveSentences.length - 1] : "";
  const finalRemembrance =
    capitalizeFirst(wisewaveClosing) ||
    capitalizeFirst(slotString(slot, "integration_key")) ||
    "You transform so that others can rise.";

  const reflectionPrompts = buildReflectionPrompts(
    shadowDistortion,
    matureExpression,
    slotString(slot, "reflection"),
    missionEssence,
  );

  return {
    hero: S5_PAGE_HERO,
    code,
    title,
    primary_icon_url: iconAsset.primary_icon_url,
    primary_icon_svg: iconAsset.primary_icon_svg,
    primary_icon_alt: iconAsset.primary_icon_alt,
    essenceParagraphs,
    missionShowsUp,
    mapNodes,
    gifts: gifts.slice(0, 5),
    activationRows,
    wisewaveGuidance: wisewave,
    reflectionPrompts,
    lifeInfluenceTitle: S5_LIFE_INFLUENCE_TITLE,
    lifeInfluence,
    integrationTitle: S5_MISSION_INTEGRATION_TITLE,
    integrationGuidance,
    keyInsight: firstSentence(keyInsight),
    finalRemembrance,
  };
}
