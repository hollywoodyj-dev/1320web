import { getSql } from "@/lib/db/client";
import type { ReflectionRow } from "@/lib/db/types";
import type { DomainAuthorship, ReflectionKind } from "@/lib/platform-domain";

export type CreateReflectionInput = {
  userId: string;
  reportId: string;
  kind: ReflectionKind;
  body: string;
  sourcePlatformSessionId?: string | null;
  authorship?: DomainAuthorship;
};

export async function createReflection(input: CreateReflectionInput): Promise<ReflectionRow> {
  const db = getSql();
  const rows = await db<ReflectionRow[]>`
    INSERT INTO reflections (
      user_id,
      report_id,
      kind,
      body,
      source_platform_session_id,
      authorship
    )
    VALUES (
      ${input.userId},
      ${input.reportId},
      ${input.kind},
      ${input.body},
      ${input.sourcePlatformSessionId ?? null},
      ${input.authorship ?? "user"}
    )
    RETURNING *
  `;
  return rows[0];
}

export async function listReflectionsForReport(input: {
  userId: string;
  reportId: string;
  limit?: number;
}): Promise<ReflectionRow[]> {
  const db = getSql();
  return db<ReflectionRow[]>`
    SELECT *
    FROM reflections
    WHERE user_id = ${input.userId}
      AND report_id = ${input.reportId}
      AND deleted_at IS NULL
    ORDER BY created_at DESC
    LIMIT ${input.limit ?? 20}
  `;
}

export async function listReflectionsForSession(sessionId: string): Promise<ReflectionRow[]> {
  const db = getSql();
  return db<ReflectionRow[]>`
    SELECT *
    FROM reflections
    WHERE source_platform_session_id = ${sessionId}
      AND deleted_at IS NULL
    ORDER BY created_at ASC
  `;
}
