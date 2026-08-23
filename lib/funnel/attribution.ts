/**
 * First-party campaign attribution for Free → Full funnel (Funnel Spec v1.0 · F1).
 * Never store birth dates, codes, or reflection text here.
 *
 * Attribution model (locked for Track B / purchase_completed):
 *   FIRST-TOUCH — mergeAttribution only fills empty keys, so the first captured
 *   utm_source / utm_campaign wins for the session lifetime (sessionStorage + 30d cookie).
 *   Checkout copies those values into Stripe session.metadata; purchase_completed reads
 *   them on webhook fulfill — not last-touch at payment time.
 */

export const FUNNEL_ATTRIBUTION_STORAGE_KEY = "1320_funnel_attribution_v1";
export const FUNNEL_ATTRIBUTION_COOKIE = "1320_funnel_attr";

export type FunnelAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  ref?: string;
  language?: string;
  capturedAt?: string;
  landingPath?: string;
  /** SEO Architecture v1.0 — analytics only; never PII. */
  landing_page?: string;
  content_slug?: string;
  primary_cluster?: string;
};

const ATTR_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "ref",
  "language",
] as const;

const SEO_ATTR_KEYS = ["landing_page", "content_slug", "primary_cluster"] as const;

function trimParam(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, 120);
}

export function readAttributionFromSearchParams(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
): FunnelAttribution {
  const get = (key: string): string | undefined => {
    if (params instanceof URLSearchParams) return trimParam(params.get(key));
    const raw = params[key];
    const value = Array.isArray(raw) ? raw[0] : raw;
    return trimParam(value);
  };

  const out: FunnelAttribution = {};
  for (const key of ATTR_KEYS) {
    const value = get(key);
    if (value) out[key] = value;
  }
  return out;
}

export function mergeAttribution(
  existing: FunnelAttribution | null | undefined,
  incoming: FunnelAttribution,
): FunnelAttribution {
  const base = { ...(existing ?? {}) };
  for (const key of ATTR_KEYS) {
    const next = incoming[key];
    if (next && !base[key]) base[key] = next;
  }
  for (const key of SEO_ATTR_KEYS) {
    const next = incoming[key];
    if (next && !base[key]) base[key] = next;
  }
  if (incoming.capturedAt && !base.capturedAt) base.capturedAt = incoming.capturedAt;
  if (incoming.landingPath && !base.landingPath) base.landingPath = incoming.landingPath;
  return base;
}

export function saveFunnelAttribution(attribution: FunnelAttribution): void {
  if (typeof window === "undefined") return;
  if (!Object.keys(attribution).length) return;
  try {
    const existing = loadFunnelAttribution();
    const merged = mergeAttribution(existing, {
      ...attribution,
      capturedAt: attribution.capturedAt ?? new Date().toISOString(),
    });
    sessionStorage.setItem(FUNNEL_ATTRIBUTION_STORAGE_KEY, JSON.stringify(merged));
    const compact = encodeURIComponent(JSON.stringify(merged));
    document.cookie = `${FUNNEL_ATTRIBUTION_COOKIE}=${compact}; Path=/; Max-Age=2592000; SameSite=Lax`;
  } catch {
    // Storage unavailable — query forwarding still works when present.
  }
}

export function loadFunnelAttribution(): FunnelAttribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(FUNNEL_ATTRIBUTION_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as FunnelAttribution;
  } catch {
    /* fall through */
  }
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${FUNNEL_ATTRIBUTION_COOKIE}=([^;]*)`));
    if (!match?.[1]) return null;
    return JSON.parse(decodeURIComponent(match[1])) as FunnelAttribution;
  } catch {
    return null;
  }
}

/** Append non-empty attribution keys to a relative href. */
export function appendAttributionToHref(href: string, attribution?: FunnelAttribution | null): string {
  const attr = attribution ?? (typeof window !== "undefined" ? loadFunnelAttribution() : null);
  if (!attr) return href;

  const url = new URL(href, "https://www.1320soulcode.com");
  for (const key of ATTR_KEYS) {
    const value = attr[key];
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return `${url.pathname}${url.search}${url.hash}`;
}

export function attributionToAnalyticsProps(attribution?: FunnelAttribution | null): Record<string, string> {
  const attr = attribution ?? {};
  const props: Record<string, string> = {};
  if (attr.utm_source) props.source = attr.utm_source;
  if (attr.utm_medium) props.medium = attr.utm_medium;
  if (attr.utm_campaign) props.campaign = attr.utm_campaign;
  if (attr.utm_content) props.content = attr.utm_content;
  if (attr.utm_term) props.term = attr.utm_term;
  if (attr.ref) props.referrer = attr.ref;
  if (attr.language) props.language = attr.language;
  if (attr.landingPath) props.landing_page = attr.landingPath;
  if (attr.landing_page) props.landing_page = attr.landing_page;
  if (attr.content_slug) props.content_slug = attr.content_slug;
  if (attr.primary_cluster) props.primary_cluster = attr.primary_cluster;
  return props;
}

export function attributionToCheckoutMetadata(
  attribution?: FunnelAttribution | null,
): Record<string, string> {
  const attr = attribution ?? {};
  const meta: Record<string, string> = {};
  for (const key of ATTR_KEYS) {
    const value = attr[key];
    if (value) meta[key] = value.slice(0, 200);
  }
  if (attr.landingPath) meta.landingPath = attr.landingPath.slice(0, 200);
  return meta;
}
