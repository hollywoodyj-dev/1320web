import { randomBytes } from "node:crypto";
import type postgres from "postgres";
import { getSql } from "@/lib/db/client";
import type { PlatformSessionRow } from "@/lib/db/types";
import type { DomainAuthorship, PlatformSessionKind, PlatformSessionStatus } from "@/lib/platform-domain";

export type CreatePlatformSessionInput = {
  userId: string;
  reportId: string;
  kind: PlatformSessionKind;
  status?: PlatformSessionStatus;
  growthEdge?: string | null;
  sessionVariant?: string | null;
  meta?: Record<string, unknown>;
  authorship?: DomainAuthorship;
};

function newAccessToken(): string {
  return randomBytes(32).toString("hex");
}

function newPrepAccessToken(): string {
  return newAccessToken();
}

export async function createPlatformSession(input: CreatePlatformSessionInput): Promise<PlatformSessionRow> {
  const db = getSql();
  const prepToken = newPrepAccessToken();
  const rows = await db<PlatformSessionRow[]>`
    INSERT INTO platform_sessions (
      user_id,
      report_id,
      kind,
      status,
      growth_edge,
      session_variant,
      meta,
      authorship,
      prep_access_token
    )
    VALUES (
      ${input.userId},
      ${input.reportId},
      ${input.kind},
      ${input.status ?? "scheduled"},
      ${input.growthEdge ?? null},
      ${input.sessionVariant ?? null},
      ${db.json((input.meta ?? {}) as postgres.JSONValue)},
      ${input.authorship ?? "system"},
      ${prepToken}
    )
    RETURNING *
  `;
  return rows[0];
}

export async function getPlatformSessionById(sessionId: string): Promise<PlatformSessionRow | null> {
  const db = getSql();
  const rows = await db<PlatformSessionRow[]>`
    SELECT *
    FROM platform_sessions
    WHERE id = ${sessionId}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function getPlatformSessionByPrepToken(
  sessionId: string,
  prepToken: string,
): Promise<PlatformSessionRow | null> {
  const db = getSql();
  const rows = await db<PlatformSessionRow[]>`
    SELECT *
    FROM platform_sessions
    WHERE id = ${sessionId}
      AND prep_access_token = ${prepToken}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function updatePlatformSessionGrowthEdge(input: {
  sessionId: string;
  growthEdge: string;
  authorship?: DomainAuthorship;
}): Promise<PlatformSessionRow | null> {
  const db = getSql();
  const rows = await db<PlatformSessionRow[]>`
    UPDATE platform_sessions
    SET growth_edge = ${input.growthEdge},
        authorship = ${input.authorship ?? "user"}
    WHERE id = ${input.sessionId}
    RETURNING *
  `;
  return rows[0] ?? null;
}

export type PersonalIntegrationSessionListRow = PlatformSessionRow & {
  user_email: string;
  user_first_name: string | null;
};

export async function listPersonalIntegrationSessionsForUser(
  userId: string,
  limit = 10,
): Promise<PlatformSessionRow[]> {
  const db = getSql();
  return db<PlatformSessionRow[]>`
    SELECT *
    FROM platform_sessions
    WHERE user_id = ${userId}
      AND kind = 'personal_integration'
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
}

export async function listPersonalIntegrationSessions(
  limit = 50,
): Promise<PersonalIntegrationSessionListRow[]> {
  const db = getSql();
  return db<PersonalIntegrationSessionListRow[]>`
    SELECT
      ps.*,
      u.email AS user_email,
      u.first_name AS user_first_name
    FROM platform_sessions ps
    INNER JOIN users u ON u.id = ps.user_id
    WHERE ps.kind = 'personal_integration'
    ORDER BY ps.created_at DESC
    LIMIT ${limit}
  `;
}

export async function getPlatformSessionByFollowUpToken(
  sessionId: string,
  followUpToken: string,
): Promise<PlatformSessionRow | null> {
  const db = getSql();
  const rows = await db<PlatformSessionRow[]>`
    SELECT *
    FROM platform_sessions
    WHERE id = ${sessionId}
      AND follow_up_access_token = ${followUpToken}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function mergePlatformSessionMeta(
  sessionId: string,
  patch: Record<string, unknown>,
): Promise<PlatformSessionRow | null> {
  const db = getSql();
  const rows = await db<PlatformSessionRow[]>`
    UPDATE platform_sessions
    SET meta = COALESCE(meta, '{}'::jsonb) || ${db.json(patch as postgres.JSONValue)}
    WHERE id = ${sessionId}
    RETURNING *
  `;
  return rows[0] ?? null;
}

export async function updatePlatformSessionFacilitator(input: {
  sessionId: string;
  status: PlatformSessionStatus;
  summary?: string | null;
}): Promise<PlatformSessionRow | null> {
  const db = getSql();
  const now = new Date();
  const followUpToken = input.status === "completed" ? newAccessToken() : null;

  const rows = await db<PlatformSessionRow[]>`
    UPDATE platform_sessions
    SET
      status = ${input.status},
      summary = COALESCE(${input.summary ?? null}, summary),
      authorship = 'facilitator',
      started_at = CASE
        WHEN ${input.status} = 'active' AND started_at IS NULL THEN ${now}
        ELSE started_at
      END,
      completed_at = CASE
        WHEN ${input.status} = 'completed' THEN ${now}
        ELSE completed_at
      END,
      follow_up_access_token = CASE
        WHEN ${input.status} = 'completed' AND follow_up_access_token IS NULL THEN ${followUpToken}
        ELSE follow_up_access_token
      END
    WHERE id = ${input.sessionId}
      AND kind = 'personal_integration'
    RETURNING *
  `;
  return rows[0] ?? null;
}

export async function touchFacilitatorSessionAccess(sessionId: string): Promise<void> {
  const db = getSql();
  await db`
    UPDATE platform_sessions
    SET last_facilitator_accessed_at = now()
    WHERE id = ${sessionId}
      AND kind = 'personal_integration'
  `;
}
