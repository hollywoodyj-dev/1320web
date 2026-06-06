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

export const DEFAULT_SITE_URL = "https://www.thesoulprofile.com";

/** Canonical origin for metadata, Stripe redirects, and magic links. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv;

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return `https://${vercelUrl}`;

  return process.env.NODE_ENV === "production" ? DEFAULT_SITE_URL : "http://localhost:3000";
}

export const REPORT_CONTENT_VERSION = "2026-06-07";

export const SESSION_COOKIE_NAME = "1320_session";

export const FULL_REPORT_PRODUCT = "full_report";
