import {
  isPersonalIntegrationSessionVariant,
  SESSION_CATALOG,
} from "@/lib/personal-integration/session-variants";
import type { ReportPurchaseStatus } from "@/lib/funnel/resolve-report-purchase-status";

const BOOKING_ENTRY_REFERRER_KEY = "1320_booking_entry_referrer";
const BOOKING_PAGE_VIEW_KEY = "1320_booking_page_view_fired";

/**
 * Page immediately before checkout API call (often /booking; after signup may be /signup).
 */
export function resolveCheckoutContextPage(): string {
  if (typeof window === "undefined") return "/booking";
  return window.location.pathname;
}

/**
 * Call on click before client-side navigation onto /booking (Next.js Link).
 * document.referrer is empty on in-app transitions; first-touch path is stored here.
 */
export function primeBookingEntryReferrer(sourcePath?: string): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(BOOKING_ENTRY_REFERRER_KEY)) return;
    const path =
      sourcePath ??
      `${window.location.pathname}${window.location.search}` ||
      "/";
    sessionStorage.setItem(BOOKING_ENTRY_REFERRER_KEY, path);
  } catch {
    /* ignore */
  }
}

/**
 * First-touch page that led the user onto /booking this session (D-8 continuation signal).
 * Captured once per tab session on first booking_page_view.
 */
export function captureBookingEntryReferrer(): string {
  if (typeof window === "undefined") return "direct";
  try {
    const existing = sessionStorage.getItem(BOOKING_ENTRY_REFERRER_KEY);
    if (existing) return existing;
  } catch {
    /* ignore */
  }

  let entry = "direct";
  try {
    const ref = document.referrer;
    if (ref) {
      const url = new URL(ref);
      if (url.origin === window.location.origin) {
        entry = `${url.pathname}${url.search}` || "/";
      } else {
        entry = "external";
      }
    }
  } catch {
    /* ignore */
  }

  try {
    sessionStorage.setItem(BOOKING_ENTRY_REFERRER_KEY, entry);
  } catch {
    /* ignore */
  }
  return entry;
}

export function loadBookingEntryReferrer(): string {
  if (typeof window === "undefined") return "direct";
  try {
    return sessionStorage.getItem(BOOKING_ENTRY_REFERRER_KEY) ?? "direct";
  } catch {
    return "direct";
  }
}

/** @deprecated use resolveCheckoutContextPage — kept for callers mid-migration */
export function resolveSourcePage(): string {
  return resolveCheckoutContextPage();
}

export function bookingReferrerMetadata(): Record<string, string> {
  return {
    referrer_into_booking: loadBookingEntryReferrer(),
  };
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
  checkoutContextPage?: string;
  reportPurchaseStatus?: ReportPurchaseStatus;
}): Record<string, string | number> {
  return {
    ...bookingOptionEventProps(input.readingType),
    ...bookingReferrerMetadata(),
    source_page: input.checkoutContextPage ?? resolveCheckoutContextPage(),
    ...(input.reportPurchaseStatus
      ? { report_purchase_status: input.reportPurchaseStatus }
      : {}),
  };
}

/** Gate: booking_page_view must precede any other booking funnel event on this mount. */
export function markBookingPageViewFired(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(BOOKING_PAGE_VIEW_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

export function hasBookingPageViewFired(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return Boolean(sessionStorage.getItem(BOOKING_PAGE_VIEW_KEY));
  } catch {
    return false;
  }
}
