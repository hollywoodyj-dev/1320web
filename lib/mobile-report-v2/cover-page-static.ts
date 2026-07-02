/** Mobile Page 00 — Cover v2 static chrome */

export const MOBILE_COVER_BRAND_NAME = "1320 Soul Origin Code System";

export const MOBILE_COVER_MAIN_TITLE_LINES = ["Full", "Report"] as const;

export const MOBILE_COVER_SUB_TITLE = "Soul Origin Report";

export const MOBILE_COVER_TAGLINE = "A symbolic map of your soul blueprint";

export const MOBILE_COVER_PREPARED_LABEL = "Prepared For";

export const MOBILE_COVER_BIRTH_LABEL = "Birth Date";

export const MOBILE_COVER_VERSION_DEFAULT = "Mobile Report v1.0";

/** Short labels for mobile wheel nodes (S4 abbreviated per mockup). */
export const MOBILE_COVER_NODE_SHORT_LABELS: Record<string, string> = {
  s4: "Core Shadow",
};

/**
 * Clockwise wheel angles (deg). Sequence: S9 → S0 → S1 → … → S8.
 * S9 at top (0°); S9 sits between S8 and S0.
 */
export const MOBILE_CODE_WHEEL_ANGLES: Record<string, number> = {
  s9: 0,
  s0: 36,
  s1: 72,
  s2: 108,
  s3: 144,
  s4: 180,
  s5: 216,
  s6: 252,
  s7: 288,
  s8: 324,
};
