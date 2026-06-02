/** Canonical analytics event names — 11/15 §17 (+ generating chamber). */

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
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export function isAnalyticsEvent(value: string): value is AnalyticsEvent {
  return (ANALYTICS_EVENTS as readonly string[]).includes(value);
}
