import {
  isPersonalIntegrationSessionVariant,
  SESSION_CATALOG,
} from "@/lib/personal-integration/session-variants";
import type { ReportPurchaseStatus } from "@/lib/funnel/resolve-report-purchase-status";

export function resolveSourcePage(): string {
  if (typeof window === "undefined") return "/booking";
  try {
    const ref = document.referrer;
    if (ref) {
      const url = new URL(ref);
      if (url.origin === window.location.origin && url.pathname !== "/booking") {
        return url.pathname;
      }
    }
  } catch {
    /* ignore */
  }
  return window.location.pathname;
}

export function bookingOptionEventProps(readingType: string): Record<string, string | number> {
  if (!isPersonalIntegrationSessionVariant(readingType)) {
    return { session_type: readingType };
  }
  const catalog = SESSION_CATALOG[readingType as keyof typeof SESSION_CATALOG];
  return {
    session_type: readingType,
    duration: catalog.durationMinutes,
    amount: catalog.priceAmount,
    currency: catalog.currency,
  };
}

export function bookingClientMetadata(input: {
  readingType: string;
  sourcePage?: string;
  reportPurchaseStatus?: ReportPurchaseStatus;
}): Record<string, string | number> {
  return {
    ...bookingOptionEventProps(input.readingType),
    source_page: input.sourcePage ?? resolveSourcePage(),
    ...(input.reportPurchaseStatus
      ? { report_purchase_status: input.reportPurchaseStatus }
      : {}),
  };
}
