"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/** Fires `blueprint_view` once on mount (Batch 10 analytics). */
export function BlueprintViewTracker() {
  useEffect(() => {
    trackEvent("blueprint_view");
  }, []);

  return null;
}
