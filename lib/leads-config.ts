/** True when waitlist/booking/newsletter submissions are persisted via webhook. */
export function isLeadsWebhookConfigured(): boolean {
  return Boolean(process.env.LEADS_WEBHOOK_URL?.trim());
}
