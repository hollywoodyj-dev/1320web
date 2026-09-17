"use client";

import { useEffect } from "react";
import { trackFunnelEvent } from "@/lib/funnel/track-funnel-event";
import { resolveSourcePage } from "@/lib/funnel/booking-funnel-props";
import type { ReportPurchaseStatus } from "@/lib/funnel/resolve-report-purchase-status";

const BURST_MS = 2000;
let lastFireAt = 0;

type BookingPageViewTrackerProps = {
  reportPurchaseStatus?: ReportPurchaseStatus;
};

/** Persist booking_page_view once when /booking mounts. */
export function BookingPageViewTracker({ reportPurchaseStatus }: BookingPageViewTrackerProps) {
  useEffect(() => {
    const now = Date.now();
    if (now - lastFireAt < BURST_MS) return;
    lastFireAt = now;
    trackFunnelEvent("booking_page_view", {
      source_page: resolveSourcePage(),
      ...(reportPurchaseStatus ? { report_purchase_status: reportPurchaseStatus } : {}),
    });
  }, [reportPurchaseStatus]);

  return null;
}
