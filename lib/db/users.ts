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
  birthDate: string;
};

/** Signup — save profile once (name + birth date) and return user row. */
export async function upsertUserAccount(input: UpsertUserAccountInput): Promise<UserRow> {
  const db = getSql();
  const normalized = input.email.trim().toLowerCase();
  const rows = await db<UserRow[]>`
    INSERT INTO users (email, first_name, last_name, birth_date)
    VALUES (
      ${normalized},
      ${input.firstName.trim()},
      ${input.lastName.trim()},
      ${input.birthDate}
    )
    ON CONFLICT (email) DO UPDATE SET
      first_name = COALESCE(EXCLUDED.first_name, users.first_name),
      last_name = COALESCE(EXCLUDED.last_name, users.last_name),
      birth_date = COALESCE(EXCLUDED.birth_date, users.birth_date),
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
