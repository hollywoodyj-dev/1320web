/**
 * Phase 0 · Pinterest T0 clock vs approval.
 *
 * T0 **approved** = N0 measurement preconditions met (distribution may begin).
 * T0 **clock** = first pin published on Pinterest — KPI window starts here, not approval date.
 */
export const PINTEREST_T0_APPROVED_DATE = "2026-09-17";

/**
 * ISO calendar date (Asia/Singapore) when BA01 p01 is live AND first_touch_content=ba01_p01 was observed.
 * Locked 2026-09-23: page_view at 07:59:10Z (= 15:59 SGT) with content=ba01_p01.
 */
export const PINTEREST_T0_CLOCK_START: string | null = "2026-09-23";

export const PINTEREST_T0_CLOCK_START_PENDING =
  "ba01_p01_live_and_first_touch_content_observed" as const;
