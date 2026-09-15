import { insertLead } from "@/lib/db/leads";

export const CHECKOUT_MARKETING_CONSENT_VERSION = "t33-v1";

type RecordMarketingOptInInput = {
  email: string;
  source: string;
  userId?: string;
  stripeCheckoutSessionId?: string;
};

/** Optional marketing opt-in — never tied to purchase entitlement. */
export async function recordMarketingOptIn(input: RecordMarketingOptInInput): Promise<void> {
  const receivedAt = new Date().toISOString();
  await insertLead({
    type: "newsletter",
    source: input.source,
    email: input.email,
    consentStatus: "newsletter_updates",
    receivedAt,
    marketingOptIn: true,
    userId: input.userId,
    stripeCheckoutSessionId: input.stripeCheckoutSessionId,
    consentVersion: CHECKOUT_MARKETING_CONSENT_VERSION,
  });
}
