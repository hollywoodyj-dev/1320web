"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { appendAttributionToHref } from "@/lib/funnel/attribution";
import { trackFunnelEvent } from "@/lib/funnel/track-funnel-event";

export type FullReportCheckoutEntry = "hero" | "unlock_section" | "final_cta";

const BURST_MS = 2000;
let lastFireAt = 0;

type FullReportCheckoutCtaProps = {
  entry: FullReportCheckoutEntry;
  className?: string;
  children: ReactNode;
};

/** One click → one full_report_cta_click. Burst-guards double-clicks, not extra CTAs. */
export function FullReportCheckoutCta({ entry, className, children }: FullReportCheckoutCtaProps) {
  const href = appendAttributionToHref("/checkout");

  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        const now = Date.now();
        if (now - lastFireAt < BURST_MS) return;
        lastFireAt = now;
        trackFunnelEvent("full_report_cta_click", { entry: `full_report_${entry}` });
      }}
    >
      {children}
    </Link>
  );
}
