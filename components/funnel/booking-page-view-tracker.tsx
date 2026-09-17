"use client";

import { useEffect } from "react";
import { trackBookingPageView } from "@/lib/funnel/track-booking-funnel-event";
import type { ReportPurchaseStatus } from "@/lib/funnel/resolve-report-purchase-status";

type BookingPageViewTrackerProps = {
  reportPurchaseStatus?: ReportPurchaseStatus;
};

/** Persist booking_page_view once when /booking mounts (before any option_selected). */
export function BookingPageViewTracker({ reportPurchaseStatus }: BookingPageViewTrackerProps) {
  useEffect(() => {
    trackBookingPageView(reportPurchaseStatus);
  }, [reportPurchaseStatus]);

  return null;
}
