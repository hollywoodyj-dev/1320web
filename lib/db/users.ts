import { getSql } from "@/lib/db/client";
import type { UserRow } from "@/lib/db/types";

function normalizeUserRow(row: UserRow): UserRow {
  const raw = row.birth_date as string | Date | null;
  const birth =
    raw == null
      ? null
      : typeof raw === "string"
        ? raw.slice(0, 10)
        : raw instanceof Date
          ? raw.toISOString().slice(0, 10)
          : null;
  return { ...row, birth_date: birth };
}

export async function upsertUserByEmailDetectCreate(
  email: string,
  firstName?: string,
): Promise<{ user: UserRow; created: boolean }> {
  const existing = await getUserByEmail(email);
  const user = await upsertUserByEmail(email, firstName);
  return { user, created: !existing };
}

export async function upsertUserByEmail(email: string, firstName?: string): Promise<UserRow> {
  const db = getSql();
  const normalized = email.trim().toLowerCase();
  const rows = await db<UserRow[]>`
    INSERT INTO users (email, first_name)
    VALUES (${normalized}, ${firstName ?? null})
    ON CONFLICT (email) DO UPDATE SET
      first_name = COALESCE(EXCLUDED.first_name, users.first_name),
      updated_at = NOW()
    RETURNING id, email, first_name, last_name, birth_date, created_at
  `;
  return normalizeUserRow(rows[0]);
}

export type UpsertUserAccountInput = {
  email: string;
  firstName: string;
  lastName: string;
  /** Optional at signup — connect Soul Blueprint / report later when absent. */
  birthDate?: string | null;
  passwordHash?: string;
};

/** Signup — save profile (name required; birth date optional) and return user row. */
export async function upsertUserAccount(input: UpsertUserAccountInput): Promise<UserRow> {
  const db = getSql();
  const normalized = input.email.trim().toLowerCase();
  const birthDate = input.birthDate?.trim() || null;
  const rows = await db<UserRow[]>`
    INSERT INTO users (email, first_name, last_name, birth_date, password_hash)
    VALUES (
      ${normalized},
      ${input.firstName.trim()},
      ${input.lastName.trim()},
      ${birthDate},
      ${input.passwordHash ?? null}
    )
    ON CONFLICT (email) DO UPDATE SET
      first_name = COALESCE(EXCLUDED.first_name, users.first_name),
      last_name = COALESCE(EXCLUDED.last_name, users.last_name),
      birth_date = COALESCE(EXCLUDED.birth_date, users.birth_date),
      password_hash = COALESCE(EXCLUDED.password_hash, users.password_hash),
      updated_at = NOW()
    RETURNING id, email, first_name, last_name, birth_date, created_at
  `;
  return normalizeUserRow(rows[0]);
}

export async function getUserById(userId: string): Promise<UserRow | null> {
  const db = getSql();
  const rows = await db<UserRow[]>`
    SELECT id, email, first_name, last_name, birth_date, created_at
    FROM users
    WHERE id = ${userId}
    LIMIT 1
  `;
  return rows[0] ? normalizeUserRow(rows[0]) : null;
}

export async function getUserByEmail(email: string): Promise<UserRow | null> {
  const db = getSql();
  const normalized = email.trim().toLowerCase();
  const rows = await db<UserRow[]>`
    SELECT id, email, first_name, last_name, birth_date, created_at
    FROM users
    WHERE email = ${normalized}
    LIMIT 1
  `;
  return rows[0] ? normalizeUserRow(rows[0]) : null;
}

export async function getUserPasswordHashByEmail(
  email: string,
): Promise<{ id: string; passwordHash: string | null } | null> {
  const db = getSql();
  const normalized = email.trim().toLowerCase();
  const rows = await db<{ id: string; password_hash: string | null }[]>`
    SELECT id, password_hash
    FROM users
    WHERE email = ${normalized}
    LIMIT 1
  `;
  if (!rows[0]) return null;
  return { id: rows[0].id, passwordHash: rows[0].password_hash };
}

export async function updateUserPassword(userId: string, passwordHash: string): Promise<void> {
  const db = getSql();
  await db`
    UPDATE users
    SET password_hash = ${passwordHash}, updated_at = NOW()
    WHERE id = ${userId}
  `;
}
