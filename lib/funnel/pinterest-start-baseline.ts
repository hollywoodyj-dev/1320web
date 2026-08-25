/**
 * Pinterest-start funnel baseline. Locked 2026-08-25 (SG) after T8/T9 production
 * observation and signup_completed split. All-time counts with created_at <
 * 2026-08-25 21:30 +08. Operator page_views are tagged, never deleted (T32).
 *
 * signup_completed is two facts under one catalog name:
 *   account    = new users row (checkout_upsert / signup_page / booking_* / reflect_upsert)
 *   newsletter = footer_subscribe (pending rename; do not treat as account)
 */
export const PINTEREST_BASELINE_AS_OF = "2026-08-25";
export const PINTEREST_BASELINE_AS_OF_ISO = "2026-08-25T21:30:00+08:00";

export const PINTEREST_BASELINE_COUNTS = {
  page_view: 137,
  homepage_view: 29,
  paid_landing_view: 4,
  web_cta_click: 0,
  homepage_primary_cta_click: 0,
  homepage_secondary_cta_click: 0,
  paid_landing_primary_cta_click: 0,
  paid_landing_secondary_cta_click: 0,
  generate_code_started: 7,
  generate_code_completed: 7,
  sample_report_view: 1,
  full_report_cta_click: 1,
  checkout_started: 8,
  payment_button_clicked: 7,
  purchase_completed: 6,
  subscription_completed: 0,
  signup_completed: 4,
} as const;

export const PINTEREST_BASELINE_SIGNUP = {
  catalogTotal: 4,
  account: 3,
  newsletterFooter: 1,
  newsletterEntry: "footer_subscribe" as const,
};

/** Operator = session_id or user_id that has ever hit /admin. NULL is not operator. */
export const PINTEREST_BASELINE_PAGE_VIEW = {
  includeOperator: 137,
  excludeOperator: 108,
  operator: 29,
};
