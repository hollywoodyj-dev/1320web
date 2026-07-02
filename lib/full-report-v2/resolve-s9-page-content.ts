import { resolveS9PrimaryIconAsset } from "@/lib/full-report-v2/s9-icon-registry";
import {
  S9_RETURN_MAP_LOGO_ALTS,
  S9_RETURN_MAP_LOGO_URLS,
} from "@/lib/full-report-v2/s9-return-map-logos";
import {
  S9_FOCUS_DIMENSIONS,
  S9_FOCUS_PILL_TONES,
  S9_FOCUS_QUALIFIERS,
  S9_LIFE_INFLUENCE_TITLE,
  S9_MAP_NODE_FALLBACK_COPY,
  S9_MAP_NODE_TITLES,
  S9_PAGE_HERO,
  S9_RETURN_INTEGRATION_TITLE,
} from "@/lib/full-report-v2/s9-page-static";
import type { QualitativeMapPillTone } from "@/lib/full-report-v2/advanced-module-display-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type S9FocusRow = {
  area: string;
  label: string;
  tone: QualitativeMapPillTone;
};

export type S9MapNode = {
  title: string;
  copy: string;
  fullCopy: string;
  iconUrl: string;
  iconAlt: string;
};

export type S9PageContent = {
  hero: typeof S9_PAGE_HERO;
  code: string;
  title: string;
  primary_icon_url?: string;
  primary_icon_svg?: string;
  primary_icon_alt: string;
  essenceParagraphs: string[];
  returnShowsUp: string[];
  mapNodes: {
    top: S9MapNode;
    right: S9MapNode;
    bottom: S9MapNode;
    left: S9MapNode;
  };
  gifts: string[];
  focusRows: S9FocusRow[];
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
    .replace(/^Mature return appears as\s+/i, "")
    .replace(/^Mature return expression appears as\s+/i, "")
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

function s9SectionBody(
  sections: Array<{ id?: string; body?: { en?: string } }> | undefined,
  key: string,
): string {
  if (!sections) return "";
  const match = sections.find((section) => section.id === `S9-${key}`);
  return match?.body?.en?.trim() ?? "";
}

function cleanMapLead(text: string): string {
  return text
    .replace(/^This code reflects a soul learning that\s+/i, "")
    .replace(/^This code reflects a soul whose\s+/i, "")
    .replace(/^Your return to source happens through\s+/i, "")
    .replace(/^Your return strengthens when\s+/i, "")
    .replace(/^Return happens when\s+/i, "")
    .replace(/^When distorted, return may become\s+/i, "")
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

function buildReturnShowsUp(
  resolveText: string,
  shadowText: string,
  remembersText: string,
  fallback: string[],
): string[] {
  const items = [
    ...splitSentences(resolveText, 3),
    shadowText ? firstSentence(shadowText) : "",
    remembersText ? firstSentence(remembersText) : "",
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
    shadow ? `Where does fear distort return? ${firstSentence(shadow)}` : "",
    mature ? `What integration is inviting you now? ${firstSentence(mature)}` : "",
    essence ? "What remembrance is already alive within you?" : "",
  ].filter(Boolean);
  return prompts.slice(0, 3);
}

export function resolveS9PageContent(payload: FullReportV2Payload): S9PageContent {
  const slot = payload.modules.s9;
  const code = slotString(slot, "code") || (payload.calculation.s9_code ?? "");
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
      : resolveS9PrimaryIconAsset(code, title);

  const soulSections = slot.return_sections as
    | Array<{ id?: string; body?: { en?: string } }>
    | undefined;

  const returnEssence =
    slotString(slot, "return_essence") ||
    s9SectionBody(soulSections, "return_essence") ||
    slotString(slot, "essence");
  const soulRemembers =
    slotString(slot, "what_your_soul_remembers") ||
    s9SectionBody(soulSections, "what_your_soul_remembers");
  const lifeThemesResolve =
    slotString(slot, "how_life_themes_resolve") ||
    s9SectionBody(soulSections, "how_life_themes_resolve");
  const naturalPracticesBody =
    slotString(slot, "natural_return_practices") ||
    s9SectionBody(soulSections, "natural_return_practices");
  const shadowDistortion =
    slotString(slot, "shadow_distortion") ||
    s9SectionBody(soulSections, "shadow_distortion_of_return");
  const matureExpression =
    slotString(slot, "mature_return_expression") ||
    s9SectionBody(soulSections, "mature_return_expression");
  const wisewave =
    slotString(slot, "wisewave_guidance") ||
    slotString(slot, "wisewave_reflection") ||
    s9SectionBody(soulSections, "wisewave_reflection");

  const giftsRaw =
    asStringArray(slot.return_gifts).length > 0
      ? asStringArray(slot.return_gifts)
      : parseBulletBody(naturalPracticesBody);
  const gifts = giftsRaw.map((gift) =>
    /^[a-z]/.test(gift) && gift.split(/\s+/).length <= 4 ? titleCaseField(gift) : capitalizeFirst(gift),
  );

  const essenceParagraphs = [returnEssence, soulRemembers].filter(Boolean);
  const returnShowsUp =
    asStringArray(slot.return_shows_up).length > 0
      ? asStringArray(slot.return_shows_up)
      : buildReturnShowsUp(
          lifeThemesResolve,
          shadowDistortion,
          soulRemembers,
          splitSentences(lifeThemesResolve, 5),
        );

  const topSource = returnEssence || soulRemembers;
  const rightSource = lifeThemesResolve || soulRemembers;
  const bottomSource = matureExpression || lifeThemesResolve;
  const leftSource = soulRemembers || naturalPracticesBody;

  const mapNodes = {
    top: {
      title: S9_MAP_NODE_TITLES.top,
      copy: shortMapCopy(topSource, S9_MAP_NODE_FALLBACK_COPY.top),
      fullCopy: fullMapCopy(topSource, S9_MAP_NODE_FALLBACK_COPY.top),
      iconUrl: S9_RETURN_MAP_LOGO_URLS.top,
      iconAlt: S9_RETURN_MAP_LOGO_ALTS.top,
    },
    right: {
      title: S9_MAP_NODE_TITLES.right,
      copy: shortMapCopy(rightSource, S9_MAP_NODE_FALLBACK_COPY.right),
      fullCopy: fullMapCopy(rightSource, S9_MAP_NODE_FALLBACK_COPY.right),
      iconUrl: S9_RETURN_MAP_LOGO_URLS.right,
      iconAlt: S9_RETURN_MAP_LOGO_ALTS.right,
    },
    bottom: {
      title: S9_MAP_NODE_TITLES.bottom,
      copy: shortMapCopy(bottomSource, S9_MAP_NODE_FALLBACK_COPY.bottom),
      fullCopy: fullMapCopy(bottomSource, S9_MAP_NODE_FALLBACK_COPY.bottom),
      iconUrl: S9_RETURN_MAP_LOGO_URLS.bottom,
      iconAlt: S9_RETURN_MAP_LOGO_ALTS.bottom,
    },
    left: {
      title: S9_MAP_NODE_TITLES.left,
      copy: shortMapCopy(leftSource, S9_MAP_NODE_FALLBACK_COPY.left),
      fullCopy: fullMapCopy(leftSource, S9_MAP_NODE_FALLBACK_COPY.left),
      iconUrl: S9_RETURN_MAP_LOGO_URLS.left,
      iconAlt: S9_RETURN_MAP_LOGO_ALTS.left,
    },
  };

  const focusRows: S9FocusRow[] = S9_FOCUS_DIMENSIONS.map((area, index) => ({
    area,
    label: S9_FOCUS_QUALIFIERS[index % S9_FOCUS_QUALIFIERS.length],
    tone: S9_FOCUS_PILL_TONES[index % S9_FOCUS_PILL_TONES.length],
  }));

  const integrationGuidance =
    stripMaturePrefix(matureExpression) || capitalizeFirst(slotString(slot, "integration_key"));
  const lifeInfluence = capitalizeFirst(
    slotString(slot, "life_influence") ||
      lifeThemesResolve ||
      returnEssence ||
      "Your return frequency may shape how you integrate experience, reconnect with Source, and embody unity — as remembrance, not as a completion score.",
  );

  const keyInsight =
    wisewave ||
    "You are not measured by how far you have traveled. You are invited to live the presence you already carry.";
  const wisewaveSentences = allSentences(wisewave);
  const wisewaveClosing =
    wisewaveSentences.length > 1 ? wisewaveSentences[wisewaveSentences.length - 1] : "";
  const finalRemembrance =
    capitalizeFirst(wisewaveClosing) ||
    capitalizeFirst(slotString(slot, "integration_key")) ||
    "You are here to be the light.";

  const reflectionPrompts = buildReflectionPrompts(
    shadowDistortion,
    matureExpression,
    slotString(slot, "reflection"),
    returnEssence,
  );

  return {
    hero: S9_PAGE_HERO,
    code,
    title,
    primary_icon_url: iconAsset.primary_icon_url,
    primary_icon_svg: iconAsset.primary_icon_svg,
    primary_icon_alt: iconAsset.primary_icon_alt,
    essenceParagraphs,
    returnShowsUp,
    mapNodes,
    gifts: gifts.slice(0, 5),
    focusRows,
    wisewaveGuidance: wisewave,
    reflectionPrompts,
    lifeInfluenceTitle: S9_LIFE_INFLUENCE_TITLE,
    lifeInfluence,
    integrationTitle: S9_RETURN_INTEGRATION_TITLE,
    integrationGuidance,
    keyInsight: firstSentence(keyInsight),
    finalRemembrance,
  };
}
