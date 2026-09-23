/**
 * Phase 0 · Pinterest T0 clock vs approval.
 *
 * T0 **approved** = N0 measurement preconditions met (distribution may begin).
 * T0 **clock** = first pin published on Pinterest — KPI window starts here, not approval date.
 */
export const PINTEREST_T0_APPROVED_DATE = "2026-09-17";

/**
 * ISO date (SG) when BA01 p01 is live AND first_touch_content=ba01_p01 is observed.
 * Until then null. See docs/governance/N1_5_UTM_CONTENT_NAMING_TABLE.md
 */
export const PINTEREST_T0_CLOCK_START: string | null = null;

export const PINTEREST_T0_CLOCK_START_PENDING =
  "ba01_p01_live_and_first_touch_content_observed" as const;
