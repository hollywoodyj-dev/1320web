"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { attributionToAnalyticsProps } from "@/lib/funnel/attribution";

/** Fires once on Full Report sales page view. */
export function FullReportSalesTracker() {
  useEffect(() => {
    trackEvent("full_report_sales_page_viewed", attributionToAnalyticsProps());
  }, []);
  return null;
}
