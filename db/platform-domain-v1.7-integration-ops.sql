-- FS-006 Operating Flow Phase 1 — Integration ops tables & assignment-ready session fields
-- Safe to re-run.

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS assigned_facilitator_id TEXT;

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS facilitator_id TEXT;

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS intake_status TEXT NOT NULL DEFAULT 'not_started';

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS summary_status TEXT NOT NULL DEFAULT 'none';

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ;

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS timezone TEXT;

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS booking_id TEXT;

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS assigned_at TIMESTAMPTZ;

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS assigned_by TEXT;

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS last_facilitator_accessed_at TIMESTAMPTZ;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'platform_sessions_intake_status_check'
  ) THEN
    ALTER TABLE platform_sessions
      ADD CONSTRAINT platform_sessions_intake_status_check
      CHECK (intake_status IN ('not_started', 'draft', 'submitted', 'reviewed'));
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'platform_sessions_summary_status_check'
  ) THEN
    ALTER TABLE platform_sessions
      ADD CONSTRAINT platform_sessions_summary_status_check
      CHECK (summary_status IN ('none', 'draft', 'ready_for_review', 'published', 'sent'));
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS integration_intakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES platform_sessions(id) ON DELETE CASCADE,
  responses_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  wellbeing_flags JSONB NOT NULL DEFAULT '{}'::jsonb,
  consent_version TEXT,
  consented_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'submitted', 'reviewed')),
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (session_id)
);

CREATE TABLE IF NOT EXISTS integration_session_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES platform_sessions(id) ON DELETE CASCADE,
  private_notes TEXT,
  primary_focus TEXT,
  client_own_words TEXT,
  foundation_layers_explored TEXT,
  advanced_layers_explored TEXT,
  layers_explored TEXT,
  core_recognition TEXT,
  inner_tension TEXT,
  existing_resource TEXT,
  growth_edge TEXT,
  conscious_choice TEXT,
  practice TEXT,
  reflection_question TEXT,
  referral_note TEXT,
  guide_progress JSONB NOT NULL DEFAULT '{}'::jsonb,
  last_saved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (session_id)
);

CREATE TABLE IF NOT EXISTS integration_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES platform_sessions(id) ON DELETE CASCADE,
  client_facing_content JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'ready_for_review', 'published', 'sent')),
  published_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (session_id)
);

CREATE INDEX IF NOT EXISTS integration_intakes_session_id_idx ON integration_intakes(session_id);
CREATE INDEX IF NOT EXISTS integration_session_notes_session_id_idx ON integration_session_notes(session_id);
CREATE INDEX IF NOT EXISTS integration_summaries_session_id_idx ON integration_summaries(session_id);
CREATE INDEX IF NOT EXISTS platform_sessions_intake_status_idx ON platform_sessions(intake_status);
CREATE INDEX IF NOT EXISTS platform_sessions_summary_status_idx ON platform_sessions(summary_status);
CREATE INDEX IF NOT EXISTS platform_sessions_assigned_facilitator_idx ON platform_sessions(assigned_facilitator_id);
