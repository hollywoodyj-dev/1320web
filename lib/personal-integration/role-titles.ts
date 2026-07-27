/**
 * Client-facing Personal Integration role titles.
 * Internal system fields remain facilitator_* — do not rename architecture.
 */

export const ROLE_TITLE_FULL = "1320 Soul Blueprint Integration Consultant" as const;
export const ROLE_TITLE_SHORT = "Blueprint Integration Consultant" as const;
/** Chinese — full */
export const ROLE_TITLE_ZH = "1320 灵魂蓝图整合顾问" as const;
/** Chinese — compact */
export const ROLE_TITLE_ZH_SHORT = "蓝图整合顾问" as const;

export const ROLE_MEET_HEADING = "Meet With a Blueprint Integration Consultant" as const;

export const ROLE_BOUNDARY = {
  lines: [
    "Your Blueprint Integration Consultant will not define you, predict your future, diagnose you, or make decisions on your behalf.",
    "The Session supports reflection, recognition and conscious choice. You remain the author and decision-maker in your own life.",
  ],
  posture:
    "The service posture is facilitative, reflective and non-directive — not predictive, diagnostic, or directive life advice.",
} as const;

export const ROLE_SESSION_SUPPORTING =
  "A guided one-to-one conversation to explore how your Soul Blueprint may be showing up in your current life, relationships, decisions and growth." as const;
