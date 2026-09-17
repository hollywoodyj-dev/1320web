/**
 * N0.3 · Booking funnel baseline — locked 2026-09-17 after N0.2 production eyewitness.
 *
 * Counts are RAW (all production rows). QA-tagged rows (haze_* / operator) excluded
 * from CLEAN KPI reads — same rule as purchase_completed (T32).
 *
 * Pre-T0 baseline is effectively zero clean traffic: all rows below are QA test only.
 */
export const BOOKING_BASELINE_STATUS = "frozen" as const;
export const BOOKING_BASELINE_AS_OF = "2026-09-17";
export const BOOKING_BASELINE_AS_OF_ISO = "2026-09-17T10:27:46.621Z";

/** RAW counts at freeze (includes QA test012@yy.com + exploratory clicks). */
export const BOOKING_BASELINE_COUNTS = {
  booking_page_view: 2,
  booking_option_selected: 2,
  booking_started: 2,
  booking_completed: 1,
} as const;

/** Expected CLEAN counts at T0 start (QA excluded). */
export const BOOKING_BASELINE_COUNTS_CLEAN = {
  booking_page_view: 0,
  booking_option_selected: 0,
  booking_started: 0,
  booking_completed: 0,
} as const;

export const BOOKING_BASELINE_NOTES = {
  eyewitness: "test012@yy.com · haze_n02_booking_v1 · cs_live_b1YkgV5X…",
  abandonedCheckoutSessions: 1,
  promoCodeUsedOnEyewitness: true,
} as const;
