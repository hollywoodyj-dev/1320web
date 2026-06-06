import { getSql } from "@/lib/db/client";
import type { UserRow } from "@/lib/db/types";

export async function upsertUserByEmail(email: string, firstName?: string): Promise<UserRow> {
  const db = getSql();
  const normalized = email.trim().toLowerCase();
  const rows = await db<UserRow[]>`
    INSERT INTO users (email, first_name)
    VALUES (${normalized}, ${firstName ?? null})
    ON CONFLICT (email) DO UPDATE SET
      first_name = COALESCE(EXCLUDED.first_name, users.first_name),
      updated_at = NOW()
    RETURNING id, email, first_name, created_at
  `;
  return rows[0];
}

export async function getUserById(userId: string): Promise<UserRow | null> {
  const db = getSql();
  const rows = await db<UserRow[]>`
    SELECT id, email, first_name, created_at
    FROM users
    WHERE id = ${userId}
    LIMIT 1
  `;
  return rows[0] ?? null;
}
