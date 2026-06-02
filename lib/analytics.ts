import type { AnalyticsEvent } from "@/lib/analytics-events";

export type EventPayload = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function pushToDataLayer(event: string, payload: EventPayload) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
}

/** Fire analytics event — console in dev; gtag/dataLayer when configured. */
export function trackEvent(event: AnalyticsEvent | string, payload: EventPayload = {}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const debug = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";

  if (typeof window !== "undefined") {
    if (gaId && typeof window.gtag === "function") {
      window.gtag("event", event, payload);
    } else {
      pushToDataLayer(event, payload);
    }
  }

  if (process.env.NODE_ENV !== "production" || debug) {
    console.info("[analytics]", event, payload);
  }
}

export type LeadType = "waitlist" | "email_capture" | "booking" | "newsletter";

export type LeadPayload = {
  type: LeadType;
  source: string;
  email: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  readingType?: string;
  timezone?: string;
  message?: string;
  code?: string;
};

/** POST lead to optional API route — returns true when server accepts. */
export async function submitLead(payload: LeadPayload): Promise<boolean> {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.ok;
  } catch {
    return false;
  }
}
