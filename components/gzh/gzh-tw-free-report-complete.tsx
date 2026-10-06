"use client";

import { useEffect } from "react";
import { trackGenerateCodeCompletedOnce } from "@/lib/funnel/track-generate-code-completed-once";

/** Same Free Blueprint complete beacon as the English result page. */
export function GzhTwFreeReportComplete() {
  useEffect(() => {
    trackGenerateCodeCompletedOnce();
  }, []);
  return null;
}
