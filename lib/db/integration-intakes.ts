import type postgres from "postgres";
import { getSql } from "@/lib/db/client";
import type { IntakeStatus } from "@/lib/personal-integration/ops/constants";

export type IntegrationIntakeRow = {
  id: string;
  session_id: string;
  responses_json: Record<string, unknown>;
  wellbeing_flags: Record<string, unknown>;
  consent_version: string | null;
  consented_at: Date | null;
  status: string;
  submitted_at: Date | null;
  reviewed_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

export async function getIntegrationIntakeBySessionId(
  sessionId: string,
): Promise<IntegrationIntakeRow | null> {
  const db = getSql();
  const rows = await db<IntegrationIntakeRow[]>`
    SELECT * FROM integration_intakes WHERE session_id = ${sessionId} LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function upsertIntegrationIntakeDraft(input: {
  sessionId: string;
  responses: Record<string, unknown>;
  wellbeingFlags?: Record<string, unknown>;
}): Promise<IntegrationIntakeRow> {
  const db = getSql();
  const existing = await getIntegrationIntakeBySessionId(input.sessionId);
  if (existing && existing.status !== "draft") {
    return existing;
  }

  if (existing) {
    const rows = await db<IntegrationIntakeRow[]>`
      UPDATE integration_intakes
      SET responses_json = ${db.json(input.responses as postgres.JSONValue)},
          wellbeing_flags = ${db.json((input.wellbeingFlags ?? {}) as postgres.JSONValue)},
          status = 'draft',
          updated_at = now()
      WHERE session_id = ${input.sessionId}
        AND status = 'draft'
      RETURNING *
    `;
    return rows[0] ?? existing;
  }

  const rows = await db<IntegrationIntakeRow[]>`
    INSERT INTO integration_intakes (
      session_id,
      responses_json,
      wellbeing_flags,
      status,
      updated_at
    )
    VALUES (
      ${input.sessionId},
      ${db.json(input.responses as postgres.JSONValue)},
      ${db.json((input.wellbeingFlags ?? {}) as postgres.JSONValue)},
      'draft',
      now()
    )
    RETURNING *
  `;
  return rows[0];
}

export async function submitIntegrationIntake(input: {
  sessionId: string;
  responses: Record<string, unknown>;
  wellbeingFlags: Record<string, unknown>;
  consentVersion: string;
}): Promise<IntegrationIntakeRow> {
  const db = getSql();
  const existing = await getIntegrationIntakeBySessionId(input.sessionId);
  if (existing) {
    const rows = await db<IntegrationIntakeRow[]>`
      UPDATE integration_intakes
      SET responses_json = ${db.json(input.responses as postgres.JSONValue)},
          wellbeing_flags = ${db.json(input.wellbeingFlags as postgres.JSONValue)},
          consent_version = ${input.consentVersion},
          consented_at = now(),
          status = 'submitted',
          submitted_at = now(),
          updated_at = now()
      WHERE session_id = ${input.sessionId}
      RETURNING *
    `;
    return rows[0];
  }

  const rows = await db<IntegrationIntakeRow[]>`
    INSERT INTO integration_intakes (
      session_id,
      responses_json,
      wellbeing_flags,
      consent_version,
      consented_at,
      status,
      submitted_at,
      updated_at
    )
    VALUES (
      ${input.sessionId},
      ${db.json(input.responses as postgres.JSONValue)},
      ${db.json(input.wellbeingFlags as postgres.JSONValue)},
      ${input.consentVersion},
      now(),
      'submitted',
      now(),
      now()
    )
    RETURNING *
  `;
  return rows[0];
}

export async function markIntegrationIntakeReviewed(sessionId: string): Promise<IntegrationIntakeRow | null> {
  const db = getSql();
  const rows = await db<IntegrationIntakeRow[]>`
    UPDATE integration_intakes
    SET status = 'reviewed',
        reviewed_at = now(),
        updated_at = now()
    WHERE session_id = ${sessionId}
      AND status = 'submitted'
    RETURNING *
  `;
  return rows[0] ?? null;
}

export async function setSessionIntakeStatus(sessionId: string, status: IntakeStatus): Promise<void> {
  const db = getSql();
  await db`
    UPDATE platform_sessions
    SET intake_status = ${status}
    WHERE id = ${sessionId}
  `;
}
