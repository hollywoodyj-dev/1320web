/**
 * N1.5 · BA01 utm_content naming table — FROZEN 2026-09-23.
 * Do not rename codes. Append new rows for new creatives only.
 * Spec: docs/governance/N1_5_UTM_CONTENT_NAMING_TABLE.md
 */

import { CANONICAL_SITE_URL } from "@/lib/platform-config";

export const BA01_UTM_SOURCE = "pinterest" as const;
export const BA01_UTM_MEDIUM = "organic" as const;
export const BA01_UTM_CAMPAIGN = "beneath_adaptation" as const;

/** Phase 1A Pinterest destination — Free Blueprint only. */
export const BA01_LANDING_PATH = "/free-soul-blueprint" as const;

export const BA01_UTM_CONTENT = {
  ba01_p01: {
    code: "ba01_p01",
    hook: "What sits beneath the ways you learned to fit in?",
    visual: "A",
    publishOffset: "Day0",
  },
  ba01_p02: {
    code: "ba01_p02",
    hook: "Beneath adaptation, some patterns still feel foundational.",
    visual: "A",
    publishOffset: "Day2–3",
  },
  ba01_p03: {
    code: "ba01_p03",
    hook: "What sits beneath the ways you learned to fit in?",
    visual: "B",
    publishOffset: "Day7",
    hookSameAs: "ba01_p01",
  },
} as const;

export type Ba01UtmContentCode = keyof typeof BA01_UTM_CONTENT;

/** Absolute Pin destination URL for a frozen BA01 content code. */
export function buildBa01PinUrl(content: Ba01UtmContentCode): string {
  const url = new URL(BA01_LANDING_PATH, `${CANONICAL_SITE_URL}/`);
  url.searchParams.set("utm_source", BA01_UTM_SOURCE);
  url.searchParams.set("utm_medium", BA01_UTM_MEDIUM);
  url.searchParams.set("utm_campaign", BA01_UTM_CAMPAIGN);
  url.searchParams.set("utm_content", content);
  return url.toString();
}
