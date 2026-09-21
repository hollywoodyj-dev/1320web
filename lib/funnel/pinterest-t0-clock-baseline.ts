/**
 * Phase 0 · Pinterest T0 clock vs approval.
 *
 * T0 **approved** = N0 measurement preconditions met (distribution may begin).
 * T0 **clock** = first pin published on Pinterest — KPI window starts here, not approval date.
 */
export const PINTEREST_T0_APPROVED_DATE = "2026-09-17";

/** ISO date (SG) of first live pin — set when Holly publishes batch 1. Until then null. */
export const PINTEREST_T0_CLOCK_START: string | null = null;

export const PINTEREST_T0_CLOCK_START_PENDING = "first_pin_publish_date" as const;
