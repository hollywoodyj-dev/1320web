import { isLeadsPersistenceConfigured } from "@/lib/platform-config";

/** True when waitlist/booking/newsletter submissions are persisted (Phase 2A database). */
export function isLeadsWebhookConfigured(): boolean {
  return isLeadsPersistenceConfigured();
}
