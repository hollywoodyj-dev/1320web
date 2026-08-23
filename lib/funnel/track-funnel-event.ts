/**
 * Persist catalog funnel events to marketing_conversion_events (admin Tracking).
 *
 * The product funnel historically called `lib/analytics` (GA / dataLayer only).
 * Those names never matched the ME Spec catalog, so admin stayed at 0.
 *
 * Fire points (T9):
 *   generate_code_started     — valid birth-date submit (`submitBirthDate`)
 *   generate_code_completed   — free result shown (`/result` ReportDashboard)
 *   checkout_started          — paid checkout form mounted (`UnlockCheckoutForm`)
 *   payment_button_clicked    — Unlock / Stripe-redirect click (last owned click)
 */
import {
  trackEvent as trackSoulcodeEvent,
  type AnalyticsEventName,
  type AnalyticsPayload,
} from "@/lib/soulcode-analytics";
import {
  attributionToAnalyticsProps,
  loadFunnelAttribution,
  mergeAttribution,
  readAttributionFromSearchParams,
} from "@/lib/funnel/attribution";

export function trackFunnelEvent(
  name: AnalyticsEventName,
  extra: AnalyticsPayload = {},
): void {
  if (typeof window === "undefined") return;

  const stored = loadFunnelAttribution();
  const fromUrl = readAttributionFromSearchParams(new URLSearchParams(window.location.search));
  const merged = mergeAttribution(stored, fromUrl);
  const attr = attributionToAnalyticsProps(merged);

  trackSoulcodeEvent(name, {
    ...attr,
    ...(merged.landingPath ? { landingPath: merged.landingPath } : {}),
    path: window.location.pathname,
    ...extra,
  });
}
