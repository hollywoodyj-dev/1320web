"use client";

import { useEffect } from "react";
import { trackFunnelEvent } from "@/lib/funnel/track-funnel-event";

const BURST_MS = 2000;
let lastFireAt = 0;

/** Persist sample_report_view once when the public sample (/full-report-v2) mounts. */
export function SampleReportViewTracker() {
  useEffect(() => {
    const now = Date.now();
    if (now - lastFireAt < BURST_MS) return;
    lastFireAt = now;
    trackFunnelEvent("sample_report_view", { entry: "full_report_v2" });
  }, []);
  return null;
}
