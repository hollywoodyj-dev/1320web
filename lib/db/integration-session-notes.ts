import { getSql } from "@/lib/db/client";

export type IntegrationSessionNotesRow = {
  id: string;
  session_id: string;
  private_notes: string | null;
  primary_focus: string | null;
  client_own_words: string | null;
  foundation_layers_explored: string | null;
  advanced_layers_explored: string | null;
  layers_explored: string | null;
  core_recognition: string | null;
  inner_tension: string | null;
  existing_resource: string | null;
  growth_edge: string | null;
  conscious_choice: string | null;
  practice: string | null;
  reflection_question: string | null;
  referral_note: string | null;
  guide_progress: Record<string, unknown>;
  last_saved_at: Date;
  created_at: Date;
  updated_at: Date;
};

export type IntegrationNotesInput = {
  private_notes?: string | null;
  primary_focus?: string | null;
  client_own_words?: string | null;
  foundation_layers_explored?: string | null;
  advanced_layers_explored?: string | null;
  layers_explored?: string | null;
  core_recognition?: string | null;
  inner_tension?: string | null;
  existing_resource?: string | null;
  growth_edge?: string | null;
  conscious_choice?: string | null;
  practice?: string | null;
  reflection_question?: string | null;
  referral_note?: string | null;
  guide_progress?: Record<string, unknown>;
};

export async function getIntegrationNotesBySessionId(
  sessionId: string,
): Promise<IntegrationSessionNotesRow | null> {
  const db = getSql();
  const rows = await db<IntegrationSessionNotesRow[]>`
    SELECT * FROM integration_session_notes WHERE session_id = ${sessionId} LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function upsertIntegrationNotes(
  sessionId: string,
  input: IntegrationNotesInput,
): Promise<IntegrationSessionNotesRow> {
  const db = getSql();
  const guide = input.guide_progress ?? {};
  const rows = await db<IntegrationSessionNotesRow[]>`
    INSERT INTO integration_session_notes (
      session_id,
      private_notes,
      primary_focus,
      client_own_words,
      foundation_layers_explored,
      advanced_layers_explored,
      layers_explored,
      core_recognition,
      inner_tension,
      existing_resource,
      growth_edge,
      conscious_choice,
      practice,
      reflection_question,
      referral_note,
      guide_progress,
      last_saved_at,
      updated_at
    )
    VALUES (
      ${sessionId},
      ${input.private_notes ?? null},
      ${input.primary_focus ?? null},
      ${input.client_own_words ?? null},
      ${input.foundation_layers_explored ?? null},
      ${input.advanced_layers_explored ?? null},
      ${input.layers_explored ?? null},
      ${input.core_recognition ?? null},
      ${input.inner_tension ?? null},
      ${input.existing_resource ?? null},
      ${input.growth_edge ?? null},
      ${input.conscious_choice ?? null},
      ${input.practice ?? null},
      ${input.reflection_question ?? null},
      ${input.referral_note ?? null},
      ${db.json(guide as never)},
      now(),
      now()
    )
    ON CONFLICT (session_id) DO UPDATE SET
      private_notes = COALESCE(EXCLUDED.private_notes, integration_session_notes.private_notes),
      primary_focus = COALESCE(EXCLUDED.primary_focus, integration_session_notes.primary_focus),
      client_own_words = COALESCE(EXCLUDED.client_own_words, integration_session_notes.client_own_words),
      foundation_layers_explored = COALESCE(EXCLUDED.foundation_layers_explored, integration_session_notes.foundation_layers_explored),
      advanced_layers_explored = COALESCE(EXCLUDED.advanced_layers_explored, integration_session_notes.advanced_layers_explored),
      layers_explored = COALESCE(EXCLUDED.layers_explored, integration_session_notes.layers_explored),
      core_recognition = COALESCE(EXCLUDED.core_recognition, integration_session_notes.core_recognition),
      inner_tension = COALESCE(EXCLUDED.inner_tension, integration_session_notes.inner_tension),
      existing_resource = COALESCE(EXCLUDED.existing_resource, integration_session_notes.existing_resource),
      growth_edge = COALESCE(EXCLUDED.growth_edge, integration_session_notes.growth_edge),
      conscious_choice = COALESCE(EXCLUDED.conscious_choice, integration_session_notes.conscious_choice),
      practice = COALESCE(EXCLUDED.practice, integration_session_notes.practice),
      reflection_question = COALESCE(EXCLUDED.reflection_question, integration_session_notes.reflection_question),
      referral_note = COALESCE(EXCLUDED.referral_note, integration_session_notes.referral_note),
      guide_progress = COALESCE(EXCLUDED.guide_progress, integration_session_notes.guide_progress),
      last_saved_at = now(),
      updated_at = now()
    RETURNING *
  `;
  return rows[0];
}
