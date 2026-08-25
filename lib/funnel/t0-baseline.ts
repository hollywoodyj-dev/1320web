/**
 * T0 snapshot locked 2026-08-23 (SG calendar day, until 2026-08-24 00:00 +08).
 * Operator page_views are tagged, never deleted (T32).
 *
 * signup_completed at T0: the one stored row is newsletter (entry=footer_subscribe),
 * not account creation. Account KPI at T0 is 0.
 */
export const T0_AS_OF = "2026-08-23";
export const T0_END = "2026-08-24T00:00:00+08:00";

export const T0_SIGNUP_COMPLETED_ACCOUNT = 0;
export const T0_NEWSLETTER_PENDING_NAME = 1;
export const T0_NEWSLETTER_ENTRY = "footer_subscribe";

/** page_view counts at T0. Operator = session or user_id that has hit /admin. */
export const T0_PAGE_VIEW_INCLUDE_OPERATOR = 94;
export const T0_PAGE_VIEW_OPERATOR = 24;
export const T0_PAGE_VIEW_EXCLUDE_OPERATOR = 70;
