/**
 * N0.3 · Booking funnel baseline — freeze after first production observation.
 *
 * Status: PENDING DEPLOY + prod booking test (all four events expected 0 at freeze).
 * Do not lock counts until Haze confirms production eyewitness.
 */
export const BOOKING_BASELINE_STATUS = "pending_production_freeze" as const;

/** ISO timestamp to set when baseline is locked (post-deploy eyewitness). */
export const BOOKING_BASELINE_AS_OF: string | null = null;

/** Placeholder — replace with prod-read counts at freeze. */
export const BOOKING_BASELINE_COUNTS = {
  booking_page_view: 0,
  booking_option_selected: 0,
  booking_started: 0,
  booking_completed: 0,
} as const;
