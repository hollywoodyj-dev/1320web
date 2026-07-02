/** Mobile Page 15 — Integrated Pattern in Action static UI chrome */

import type { SoulCodeLogo } from "@/lib/full-report-v2/soul-code-logos";
import {
  MOBILE_INTEGRATED_BLUEPRINT_CODE_ORDER,
  MOBILE_INTEGRATED_BLUEPRINT_MODULE_LABELS,
  type MobileIntegratedCodeKey,
} from "@/lib/mobile-report-v2/integrated-blueprint-overview-page-static";

export const MOBILE_INTEGRATED_PATTERN_ACTION_BRAND_NAME = "1320 Soul Origin Code System";

export const MOBILE_INTEGRATED_PATTERN_ACTION_BRAND_SUBTITLE = "Full Soul Origin Report";

export const MOBILE_INTEGRATED_PATTERN_ACTION_PAGE_INDEX = "15";

export const MOBILE_INTEGRATED_PATTERN_ACTION_KICKER = "Integrated Pattern in Action";

export const MOBILE_INTEGRATED_PATTERN_ACTION_TITLE_LINE = "Integrated Pattern";

export const MOBILE_INTEGRATED_PATTERN_ACTION_TITLE_EMPHASIS = "in Action";

export const MOBILE_INTEGRATED_PATTERN_ACTION_SUBTITLE =
  "See how your codes interact in real life, expression, growth, and return.";

export const MOBILE_INTEGRATED_PATTERN_ACTION_FLOW_TITLE = "Your Integrated Flow";

export const MOBILE_INTEGRATED_PATTERN_ACTION_LIFE_TITLE = "How They Show Up in Your Life";

export const MOBILE_INTEGRATED_PATTERN_ACTION_DAILY_TITLE = "Your Daily Expression Examples";

export const MOBILE_INTEGRATED_PATTERN_ACTION_AFFIRMATION_TITLE = "Integrated Affirmation";

export const MOBILE_INTEGRATED_PATTERN_ACTION_CODE_ORDER = MOBILE_INTEGRATED_BLUEPRINT_CODE_ORDER;

export const MOBILE_INTEGRATED_PATTERN_ACTION_MODULE_LABELS = MOBILE_INTEGRATED_BLUEPRINT_MODULE_LABELS;

export const MOBILE_INTEGRATED_PATTERN_ACTION_CODE_ICONS: Record<MobileIntegratedCodeKey, SoulCodeLogo> = {
  s1: "flame",
  s3: "waves",
  s2: "mirror",
  s0: "ring",
};

export const MOBILE_INTEGRATED_PATTERN_ACTION_DAILY_TITLES: Record<MobileIntegratedCodeKey, string> = {
  s1: "S1 in Action",
  s3: "S3 in Action",
  s2: "S2 in Action",
  s0: "S0 in Action",
};

export const MOBILE_INTEGRATED_PATTERN_ACTION_FLOW_SUMMARY_FALLBACK =
  "S1 is your source. S3 is your natural expression. S2 reflects your growth. S0 grounds your return.";

export const MOBILE_INTEGRATED_PATTERN_ACTION_LIFE_FALLBACKS: Record<MobileIntegratedCodeKey, string> = {
  s1: "You are here to lead, transform, and bring meaningful change.",
  s3: "You naturally inspire, explore, express, and awaken others.",
  s2: "You learn to see clearly, reflect honestly, and respond with awareness.",
  s0: "You return to stillness, self-worth, and inner alignment.",
};

export const MOBILE_INTEGRATED_PATTERN_ACTION_DAILY_FALLBACKS: Record<MobileIntegratedCodeKey, string> = {
  s1: "You take initiative, guide others, and create meaningful change.",
  s3: "You share your energy, uplift others, and lead through your presence.",
  s2: "You reflect, adjust, and turn challenges into clarity.",
  s0: "You pause, reset, and return to your inner truth.",
};

export const MOBILE_INTEGRATED_PATTERN_ACTION_AFFIRMATION_FALLBACK =
  "My soul codes work together in harmony. I trust my path, my process, and my purpose. I am here to live my soul blueprint fully.";
