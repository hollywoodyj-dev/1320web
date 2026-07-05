import { getSql } from "@/lib/db/client";
import type { WisewaveTurnRow } from "@/lib/db/types";
import type { DomainAuthorship } from "@/lib/platform-domain";
import type { ReasoningAudit } from "@/lib/wisewave/types";

export async function createWisewaveTurn(input: {
  platformSessionId: string;
  userId: string;
  reportId: string;
  role: "user" | "wisewave";
  content: string;
  reasoningAudit?: ReasoningAudit | null;
  authorship?: DomainAuthorship;
}): Promise<WisewaveTurnRow> {
  const db = getSql();
  const rows = await db<WisewaveTurnRow[]>`
    INSERT INTO wisewave_turns (
      platform_session_id,
      user_id,
      report_id,
      role,
      content,
      reasoning_audit,
      authorship
    )
    VALUES (
      ${input.platformSessionId},
      ${input.userId},
      ${input.reportId},
      ${input.role},
      ${input.content},
      ${input.reasoningAudit ? db.json(input.reasoningAudit) : null},
      ${input.authorship ?? (input.role === "wisewave" ? "wisewave" : "user")}
    )
    RETURNING *
  `;
  return rows[0];
}

export async function listWisewaveTurns(platformSessionId: string): Promise<WisewaveTurnRow[]> {
  const db = getSql();
  return db<WisewaveTurnRow[]>`
    SELECT *
    FROM wisewave_turns
    WHERE platform_session_id = ${platformSessionId}
    ORDER BY created_at ASC
  `;
}
