/** Phase 2A platform feature flags from environment. */

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.POSTGRES_URL?.trim() || process.env.DATABASE_URL?.trim());
}

export function getDatabaseUrl(): string | null {
  return process.env.POSTGRES_URL?.trim() || process.env.DATABASE_URL?.trim() || null;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

export function isLeadsPersistenceConfigured(): boolean {
  return isDatabaseConfigured();
}

/** Wisewave-approved primary / canonical public host. */
export const CANONICAL_SITE_URL = "https://www.1320soulcode.com" as const;
export const CANONICAL_HOST = "www.1320soulcode.com" as const;

/** @deprecated Use CANONICAL_SITE_URL — kept as alias for older imports. */
export const DEFAULT_SITE_URL = CANONICAL_SITE_URL;

/** Secondary host retained temporarily for redirect / Search Console migration. */
export const SECONDARY_SITE_HOSTS = [
  "thesoulprofile.com",
  "www.thesoulprofile.com",
] as const;

/** Apex primary that should permanently redirect to www. */
export const PRIMARY_APEX_HOST = "1320soulcode.com" as const;

function normalizeSiteUrl(raw: string): string {
  const trimmed = raw.trim().replace(/\/$/, "");
  if (!trimmed) return CANONICAL_SITE_URL;
  try {
    const url = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
    return `${url.protocol}//${url.host}`;
  } catch {
    return CANONICAL_SITE_URL;
  }
}

/** Canonical origin for metadata, Stripe redirects, magic links, sitemap, and emails. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return normalizeSiteUrl(fromEnv);

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return normalizeSiteUrl(`https://${vercelUrl}`);

  return process.env.NODE_ENV === "production" ? CANONICAL_SITE_URL : "http://localhost:3000";
}

export function getCanonicalHost(): string {
  try {
    return new URL(getSiteUrl()).host;
  } catch {
    return CANONICAL_HOST;
  }
}

/** True when the request host should 301 to the canonical www host (path preserved). */
export function shouldRedirectHostToCanonical(hostname: string): boolean {
  const host = hostname.toLowerCase().split(":")[0] ?? "";
  if (!host || host === "localhost" || host.endsWith(".vercel.app")) return false;
  if (host === CANONICAL_HOST) return false;
  if (host === PRIMARY_APEX_HOST) return true;
  return (SECONDARY_SITE_HOSTS as readonly string[]).includes(host);
}

/** Prefer the active request origin for in-app PDF rendering (avoids cross-host cold starts). */
export function resolveReportPrintBaseUrl(request?: Request): string {
  if (request) {
    try {
      const origin = new URL(request.url).origin;
      if (origin && origin !== "null") {
        return origin.replace(/\/$/, "");
      }
    } catch {
      /* fall through */
    }
  }

  return getSiteUrl().replace(/\/$/, "");
}

export const REPORT_CONTENT_VERSION = "2026-06-07";

export const SESSION_COOKIE_NAME = "1320_session";

export const FULL_REPORT_PRODUCT = "full_report";
export const BOOKING_PRODUCT = "personal_integration";

export function isBookingCheckoutConfigured(): boolean {
  return isDatabaseConfigured() && isStripeConfigured();
}
