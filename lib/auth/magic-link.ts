import { createRawToken, hashToken } from "@/lib/auth/tokens";
import { getSql } from "@/lib/db/client";
import { getSiteUrl } from "@/lib/platform-config";
import { sendMagicLinkEmail } from "@/lib/email/send-magic-link";

const MAGIC_LINK_TTL_HOURS = 24;

export async function issueMagicLink(input: {
  userId: string;
  email: string;
  reportId?: string;
  purpose?: string;
}): Promise<{ url: string; rawToken: string }> {
  const db = getSql();
  const rawToken = createRawToken();
  const tokenHash = hashToken(rawToken);
  const purpose = input.purpose ?? "login";

  const expiresAt = new Date(Date.now() + MAGIC_LINK_TTL_HOURS * 60 * 60 * 1000);
  await db`
    INSERT INTO magic_link_tokens (user_id, token_hash, purpose, report_id, expires_at)
    VALUES (
      ${input.userId},
      ${tokenHash},
      ${purpose},
      ${input.reportId ?? null},
      ${expiresAt}
    )
  `;

  const redirect = input.reportId ? `/my-report/${input.reportId}` : "/my-report";
  const url = `${getSiteUrl()}/auth/verify?token=${rawToken}&next=${encodeURIComponent(redirect)}`;

  await sendMagicLinkEmail({
    email: input.email,
    magicLinkUrl: url,
    reportId: input.reportId,
  });

  return { url, rawToken };
}

export async function consumeMagicLink(rawToken: string): Promise<{
  userId: string;
  reportId: string | null;
} | null> {
  const db = getSql();
  const tokenHash = hashToken(rawToken);

  const rows = await db<{ user_id: string; report_id: string | null; id: string }[]>`
    SELECT id, user_id, report_id
    FROM magic_link_tokens
    WHERE token_hash = ${tokenHash}
      AND used_at IS NULL
      AND expires_at > NOW()
    LIMIT 1
  `;

  const row = rows[0];
  if (!row) return null;

  await db`
    UPDATE magic_link_tokens
    SET used_at = NOW()
    WHERE id = ${row.id}
  `;

  return { userId: row.user_id, reportId: row.report_id };
}
