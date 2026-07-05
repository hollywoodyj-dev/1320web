import { getSql } from "@/lib/db/client";
import type { RelationshipMemoryRow } from "@/lib/db/types";
import type { DomainAuthorship, RelationshipMemoryKind } from "@/lib/platform-domain";
import type { MemoryLayer } from "@/lib/living-blueprint/types";
import { memoryLayerForKind } from "@/lib/living-blueprint/memory-layers";
export async function listRelationshipMemories(input: {
  userId: string;
  reportId: string;
  retainedOnly?: boolean;
  limit?: number;
}): Promise<RelationshipMemoryRow[]> {
  const db = getSql();
  const limit = input.limit ?? 20;
  if (input.retainedOnly ?? true) {
    return db<RelationshipMemoryRow[]>`
      SELECT *
      FROM relationship_memories
      WHERE user_id = ${input.userId}
        AND report_id = ${input.reportId}
        AND user_retained = TRUE
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
  }
  return db<RelationshipMemoryRow[]>`
    SELECT *
    FROM relationship_memories
    WHERE user_id = ${input.userId}
      AND report_id = ${input.reportId}
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
}

export async function createRelationshipMemory(input: {
  userId: string;
  reportId: string;
  kind: RelationshipMemoryKind;
  content: string;
  sourcePlatformSessionId?: string | null;
  authorship?: DomainAuthorship;
  userRetained?: boolean;
  memoryLayer?: MemoryLayer;
}): Promise<RelationshipMemoryRow> {
  const db = getSql();
  const layer = input.memoryLayer ?? memoryLayerForKind(input.kind);
  const rows = await db<RelationshipMemoryRow[]>`
    INSERT INTO relationship_memories (
      user_id,
      report_id,
      kind,
      content,
      memory_layer,
      source_platform_session_id,
      authorship,
      user_retained
    )
    VALUES (
      ${input.userId},
      ${input.reportId},
      ${input.kind},
      ${input.content},
      ${layer},
      ${input.sourcePlatformSessionId ?? null},
      ${input.authorship ?? "wisewave"},
      ${input.userRetained ?? true}
    )
    RETURNING *
  `;
  return rows[0];
}

export async function listRelationshipMemoriesByLayer(input: {
  userId: string;
  reportId: string;
  layer: MemoryLayer;
  limit?: number;
}): Promise<RelationshipMemoryRow[]> {
  const db = getSql();
  return db<RelationshipMemoryRow[]>`
    SELECT *
    FROM relationship_memories
    WHERE user_id = ${input.userId}
      AND report_id = ${input.reportId}
      AND user_retained = TRUE
      AND memory_layer = ${input.layer}
    ORDER BY created_at DESC
    LIMIT ${input.limit ?? 10}
  `;
}

export async function setRelationshipMemoryRetained(
  memoryId: string,
  userId: string,
  retained: boolean,
): Promise<RelationshipMemoryRow | null> {
  const db = getSql();
  const rows = await db<RelationshipMemoryRow[]>`
    UPDATE relationship_memories
    SET user_retained = ${retained}
    WHERE id = ${memoryId}
      AND user_id = ${userId}
    RETURNING *
  `;
  return rows[0] ?? null;
}
