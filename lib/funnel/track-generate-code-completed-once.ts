import { trackFunnelEvent } from "@/lib/funnel/track-funnel-event";
import { getOrCreateAnalyticsSessionId } from "@/lib/soulcode-analytics";

const STORAGE_PREFIX = "1320_generate_code_completed_v1:";

/** Primary KPI — at most one beacon per analytics session (pairs with server session dedupe). */
export function trackGenerateCodeCompletedOnce(): void {
  if (typeof window === "undefined") return;
  const sessionId = getOrCreateAnalyticsSessionId();
  if (!sessionId) {
    trackFunnelEvent("generate_code_completed");
    return;
  }
  const key = `${STORAGE_PREFIX}${sessionId}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, new Date().toISOString());
  } catch {
    /* sessionStorage blocked — server dedupe still applies */
  }
  trackFunnelEvent("generate_code_completed");
}
