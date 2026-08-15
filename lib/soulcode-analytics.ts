import {
  isMarketingBeaconEnabled,
  PERSISTED_CONVERSION_EVENT_NAMES,
} from "@/lib/soulcode-conversion-tracking";

export type AnalyticsEventName =
  | "page_view"
  | "homepage_view"
  | "homepage_primary_cta_click"
  | "homepage_secondary_cta_click"
  | "paid_landing_view"
  | "paid_landing_primary_cta_click"
  | "paid_landing_secondary_cta_click"
  | "web_cta_click"
  | "generate_code_started"
  | "generate_code_completed"
  | "sample_report_view"
  | "full_report_cta_click"
  | "checkout_started"
  | "payment_button_clicked"
  | "purchase_completed"
  | "subscription_completed"
  | "signup_completed";

export type AnalyticsPayload = Record<
  string,
  string | number | boolean | null | undefined
>;

/**
 * Optional auth JWT for beacon attribution. Stripped before GA4.
 * 1320 v1 primarily uses cookie sessions; leave unused unless wired.
 */
export const AUTH_TOKEN_PAYLOAD_KEY = "auth_token";

const SESSION_STORAGE_KEY = "soulcode_analytics_session";

const SENSITIVE_KEYS = new Set([
  AUTH_TOKEN_PAYLOAD_KEY,
  "token",
  "password",
  "birth_date",
  "birthDate",
  "birth_year",
  "birthYear",
  "birth_month",
  "birthMonth",
  "birth_day",
  "birthDay",
  "blueprint",
  "soul_blueprint",
  "soulBlueprint",
  "report",
  "report_body",
  "reportBody",
  "code_string",
  "codeString",
]);

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function getOrCreateAnalyticsSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (existing && existing.length >= 8) return existing;
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(SESSION_STORAGE_KEY, id);
    return id;
  } catch {
    return `s_${Date.now().toString(36)}`;
  }
}

function flattenForGa4(payload: AnalyticsPayload): Record<string, string | number | boolean> {
  const flat: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(payload)) {
    if (SENSITIVE_KEYS.has(k)) continue;
    if (v === null || v === undefined) continue;
    if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
      flat[k] = v;
    } else {
      flat[k] = String(v);
    }
  }
  return flat;
}

function persistConversionBeacon(name: string, payload: AnalyticsPayload): void {
  if (!isMarketingBeaconEnabled()) return;
  if (!PERSISTED_CONVERSION_EVENT_NAMES.has(name)) return;
  if (typeof window === "undefined") return;

  const { [AUTH_TOKEN_PAYLOAD_KEY]: authToken, ...rest } = payload;
  const metadata: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(rest)) {
    if (SENSITIVE_KEYS.has(k)) continue;
    if (k === "session_id" || k === "sessionId") continue;
    if (k === "source" || k === "lp" || k === "ad_group" || k === "adGroup") continue;
    if (k === "platform" || k === "path") continue;
    if (v === null || v === undefined) continue;
    if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
      metadata[k] = v;
    }
  }

  const sessionId =
    typeof payload.session_id === "string"
      ? payload.session_id
      : typeof payload.sessionId === "string"
        ? payload.sessionId
        : getOrCreateAnalyticsSessionId();

  const body = {
    eventName: name,
    token: typeof authToken === "string" ? authToken : undefined,
    sessionId,
    source: typeof payload.source === "string" ? payload.source : undefined,
    lp: typeof payload.lp === "string" ? payload.lp : undefined,
    adGroup:
      typeof payload.ad_group === "string"
        ? payload.ad_group
        : typeof payload.adGroup === "string"
          ? payload.adGroup
          : undefined,
    platform: typeof payload.platform === "string" ? payload.platform : "web",
    path:
      typeof payload.path === "string" ? payload.path : window.location.pathname,
    metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
  };

  void fetch("/api/marketing/conversion-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {
    /* best-effort */
  });
}

export type TrackEventOptions = {
  /** Skip DB beacon when server already recorded the event. */
  skipBeacon?: boolean;
};

export function trackEvent(
  name: AnalyticsEventName,
  payload: AnalyticsPayload = {},
  options: TrackEventOptions = {},
) {
  if (typeof window === "undefined") return;

  const withSession: AnalyticsPayload = {
    session_id: getOrCreateAnalyticsSessionId(),
    ...payload,
  };
  const flat = flattenForGa4(withSession);
  const debug = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";

  if (typeof window.gtag === "function") {
    window.gtag("event", name, flat);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...flat });
  } else if (process.env.NODE_ENV !== "production" || debug) {
    console.info("[analytics]", name, flat);
  }

  if (!options.skipBeacon) {
    persistConversionBeacon(name, withSession);
  }

  if (
    name === "paid_landing_primary_cta_click" ||
    name === "homepage_primary_cta_click"
  ) {
    persistConversionBeacon("web_cta_click", {
      ...withSession,
      web_cta_source: name,
    });
    if (typeof window.gtag === "function") {
      window.gtag("event", "web_cta_click", {
        ...flat,
        web_cta_source: name,
      });
    }
  }
}
