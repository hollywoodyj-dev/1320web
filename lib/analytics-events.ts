/** Canonical analytics event names — 11/15 §17 (+ generating chamber + Funnel Spec v1.0 F1). */

export const ANALYTICS_EVENTS = [
  "homepage_generate_click",
  "calculator_submit",
  "calculator_success",
  "calculator_error",
  "generating_view",
  "generating_complete",
  "result_view",
  "sample_report_view",
  "blueprint_view",
  "email_capture_submit",
  "email_capture_success",
  "full_report_waitlist_click",
  "waitlist_submit",
  "waitlist_success",
  "booking_click",
  "booking_submit",
  "booking_success",
  // Funnel Spec v1.0 · Phase F1
  "free_blueprint_landing_view",
  "free_blueprint_birthdate_started",
  "free_blueprint_birthdate_submitted",
  "free_blueprint_generation_started",
  "free_blueprint_generation_completed",
  "free_blueprint_generation_failed",
  "free_blueprint_result_viewed",
  "free_blueprint_foundation_viewed",
  "free_blueprint_integrated_mirror_viewed",
  "full_report_offer_viewed",
  "full_report_cta_clicked",
  "full_report_sample_clicked",
  "full_report_sales_page_viewed",
  "full_report_checkout_started",
  "full_report_checkout_completed",
  "full_report_checkout_abandoned",
  // SEO Keyword Architecture v1.0 · Phase 0 measurement
  "seo_article_view",
  "seo_article_scroll_50",
  "seo_article_cta_click",
  "seo_to_free_blueprint",
  "free_blueprint_started",
  "free_blueprint_completed",
  "free_to_full_report",
  "seo_to_session",
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export function isAnalyticsEvent(value: string): value is AnalyticsEvent {
  return (ANALYTICS_EVENTS as readonly string[]).includes(value);
}
