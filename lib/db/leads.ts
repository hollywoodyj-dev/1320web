import type { LeadPayload } from "@/lib/analytics";
import { getSql } from "@/lib/db/client";

export async function insertLead(payload: LeadPayload & { receivedAt: string }): Promise<void> {
  const db = getSql();
  const { type, source, email, receivedAt, ...rest } = payload;
  await db`
    INSERT INTO leads (type, source, email, payload)
    VALUES (
      ${type},
      ${source},
      ${email.trim().toLowerCase()},
      ${db.json({ ...rest, receivedAt })}
    )
  `;
}
