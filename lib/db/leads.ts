import type { LeadPayload } from "@/lib/analytics";
import { getSql } from "@/lib/db/client";

export type InsertLeadPayload = LeadPayload & {
  receivedAt: string;
  /** When true, sets marketing_opt_in_at — separate from purchase / return-link. */
  marketingOptIn?: boolean;
  userId?: string;
  stripeCheckoutSessionId?: string;
  consentVersion?: string;
};

export async function insertLead(payload: InsertLeadPayload): Promise<void> {
  const db = getSql();
  const { type, source, email, receivedAt, marketingOptIn, ...rest } = payload;
  const marketingOptInAt = marketingOptIn ? new Date(receivedAt) : null;
  await db`
    INSERT INTO leads (type, source, email, payload, marketing_opt_in_at)
    VALUES (
      ${type},
      ${source},
      ${email.trim().toLowerCase()},
      ${db.json({ ...rest, receivedAt })},
      ${marketingOptInAt}
    )
  `;
}
