/**
 * Pinterest Organic Discovery Pilot — UTM convention on the existing first-touch chain.
 * Do not add a separate Pinterest analytics stack (T22).
 *
 *   utm_source   = pinterest
 *   utm_medium   = organic
 *   utm_campaign = pin_{YYYY-MM}_{theme}_{dest}
 *   utm_content  = optional pin / creative id (one pin, not a board)
 *
 * Campaign grain: month batch + theme + destination page.
 * That is enough to split the 8-week pilot without a unique campaign per pin.
 */

import { CANONICAL_SITE_URL } from "@/lib/platform-config";

export const PINTEREST_UTM_SOURCE = "pinterest" as const;
export const PINTEREST_UTM_MEDIUM = "organic" as const;

export const PINTEREST_DESTINATIONS = {
  fsb: "/free-soul-blueprint",
  lp: "/what-is-my-life-path-number",
  p1: "/what-is-a-soul-blueprint",
  p2: "/life-path-number-vs-soul-blueprint",
} as const;

export type PinterestDest = keyof typeof PINTEREST_DESTINATIONS;

export const PINTEREST_THEMES = [
  "soul-blueprint",
  "life-path",
  "birthday-meaning",
] as const;

export type PinterestTheme = (typeof PINTEREST_THEMES)[number];

export type PinterestCampaignInput = {
  /** Batch month, e.g. 2026-09 */
  batch: string;
  theme: PinterestTheme;
  dest: PinterestDest;
  /** Optional pin or creative id → utm_content */
  content?: string;
};

const BATCH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;

export function buildPinterestCampaign({ batch, theme, dest }: PinterestCampaignInput): string {
  if (!BATCH_RE.test(batch)) {
    throw new Error(`utm_campaign batch must be YYYY-MM, got ${batch}`);
  }
  return `pin_${batch}_${theme}_${dest}`;
}

/** Absolute outbound URL for a Pin. First-touch capture happens on any public landing page. */
export function buildPinterestLandingUrl(input: PinterestCampaignInput): string {
  const path = PINTEREST_DESTINATIONS[input.dest];
  const url = new URL(path, `${CANONICAL_SITE_URL}/`);
  url.searchParams.set("utm_source", PINTEREST_UTM_SOURCE);
  url.searchParams.set("utm_medium", PINTEREST_UTM_MEDIUM);
  url.searchParams.set("utm_campaign", buildPinterestCampaign(input));
  if (input.content?.trim()) {
    url.searchParams.set("utm_content", input.content.trim().slice(0, 80));
  }
  return url.toString();
}
