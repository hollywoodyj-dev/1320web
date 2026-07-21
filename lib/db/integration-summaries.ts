import type postgres from "postgres";
import { getSql } from "@/lib/db/client";
import type { SummaryStatus } from "@/lib/personal-integration/ops/constants";
import type { SummaryContent } from "@/lib/personal-integration/ops/summary-template";

export type IntegrationSummaryRow = {
  id: string;
  session_id: string;
  client_facing_content: SummaryContent;
  status: string;
  published_at: Date | null;
  sent_at: Date | null;
  pdf_url: string | null;
  created_at: Date;
  updated_at: Date;
};

export async function getIntegrationSummaryBySessionId(
  sessionId: string,
): Promise<IntegrationSummaryRow | null> {
  const db = getSql();
  const rows = await db<IntegrationSummaryRow[]>`
    SELECT * FROM integration_summaries WHERE session_id = ${sessionId} LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function upsertIntegrationSummaryDraft(input: {
  sessionId: string;
  content: SummaryContent;
  status?: "draft" | "ready_for_review";
}): Promise<IntegrationSummaryRow> {
  const db = getSql();
  const status = input.status ?? "draft";
  const rows = await db<IntegrationSummaryRow[]>`
    INSERT INTO integration_summaries (
      session_id,
      client_facing_content,
      status,
      updated_at
    )
    VALUES (
      ${input.sessionId},
      ${db.json(input.content as unknown as postgres.JSONValue)},
      ${status},
      now()
    )
    ON CONFLICT (session_id) DO UPDATE SET
      client_facing_content = EXCLUDED.client_facing_content,
      status = CASE
        WHEN integration_summaries.status IN ('published', 'sent') THEN integration_summaries.status
        ELSE EXCLUDED.status
      END,
      updated_at = now()
    RETURNING *
  `;
  return rows[0];
}

export async function publishIntegrationSummary(sessionId: string): Promise<IntegrationSummaryRow | null> {
  const db = getSql();
  const rows = await db<IntegrationSummaryRow[]>`
    UPDATE integration_summaries
    SET status = 'published',
        published_at = now(),
        updated_at = now()
    WHERE session_id = ${sessionId}
      AND status IN ('draft', 'ready_for_review', 'published')
    RETURNING *
  `;
  return rows[0] ?? null;
}

export async function markIntegrationSummarySent(sessionId: string): Promise<IntegrationSummaryRow | null> {
  const db = getSql();
  const rows = await db<IntegrationSummaryRow[]>`
    UPDATE integration_summaries
    SET status = 'sent',
        sent_at = now(),
        updated_at = now()
    WHERE session_id = ${sessionId}
      AND status IN ('published', 'sent')
    RETURNING *
  `;
  return rows[0] ?? null;
}

export async function setSessionSummaryStatus(sessionId: string, status: SummaryStatus): Promise<void> {
  const db = getSql();
  await db`
    UPDATE platform_sessions
    SET summary_status = ${status}
    WHERE id = ${sessionId}
  `;
}
