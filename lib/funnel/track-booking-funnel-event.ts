/**
 * Booking funnel event ordering — page_view always first on /booking.
 * D-11 drop-off queries require monotonic step order within a visit.
 */
import {
  bookingClientMetadata,
  captureBookingEntryReferrer,
  hasBookingPageViewFired,
  markBookingPageViewFired,
} from "@/lib/funnel/booking-funnel-props";
import type { ReportPurchaseStatus } from "@/lib/funnel/resolve-report-purchase-status";
import { trackFunnelEvent } from "@/lib/funnel/track-funnel-event";

export function trackBookingPageView(reportPurchaseStatus?: ReportPurchaseStatus): void {
  const referrerIntoBooking = captureBookingEntryReferrer();
  trackFunnelEvent("booking_page_view", {
    funnel_step: 1,
    referrer_into_booking: referrerIntoBooking,
    ...(reportPurchaseStatus ? { report_purchase_status: reportPurchaseStatus } : {}),
  });
  markBookingPageViewFired();
}

export function trackBookingOptionSelected(input: {
  readingType: string;
  entry: string;
  reportPurchaseStatus?: ReportPurchaseStatus;
}): void {
  if (!hasBookingPageViewFired()) {
    trackBookingPageView(input.reportPurchaseStatus);
  }
  trackFunnelEvent("booking_option_selected", {
    funnel_step: 2,
    ...bookingClientMetadata({
      readingType: input.readingType,
      reportPurchaseStatus: input.reportPurchaseStatus,
    }),
    entry: input.entry,
  });
}
