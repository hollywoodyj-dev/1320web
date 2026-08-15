"use client";

import { Suspense } from "react";
import { SoulcodePageView } from "@/components/analytics/soulcode-page-view";

/** Site-wide marketing analytics shell (page views + LP context). */
export function SoulcodeSiteAnalytics() {
  return (
    <Suspense fallback={null}>
      <SoulcodePageView />
    </Suspense>
  );
}
