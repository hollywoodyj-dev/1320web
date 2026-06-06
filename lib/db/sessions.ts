import { getSql } from "@/lib/db/client";

const SESSION_TTL_DAYS = 30;

export async function createSession(userId: string): Promise<string> {
  const db = getSql();
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
  const rows = await db<{ id: string }[]>`
    INSERT INTO sessions (user_id, expires_at)
    VALUES (${userId}, ${expiresAt})
    RETURNING id
  `;
  return rows[0].id;
}

export async function getSessionUserId(sessionId: string): Promise<string | null> {
  const db = getSql();
  const rows = await db<{ user_id: string }[]>`
    SELECT user_id
    FROM sessions
    WHERE id = ${sessionId}
      AND expires_at > NOW()
    LIMIT 1
  `;
  return rows[0]?.user_id ?? null;
}

export async function deleteSession(sessionId: string): Promise<void> {
  const db = getSql();
  await db`DELETE FROM sessions WHERE id = ${sessionId}`;
}
