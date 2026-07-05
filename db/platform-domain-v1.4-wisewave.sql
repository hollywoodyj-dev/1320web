-- FS-007 — Wisewave conversation turns (Reasoning Architecture audit trail)
-- Safe to re-run.

CREATE TABLE IF NOT EXISTS wisewave_turns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_session_id UUID NOT NULL REFERENCES platform_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  report_id UUID NOT NULL REFERENCES soul_reports(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'wisewave')),
  content TEXT NOT NULL,
  reasoning_audit JSONB,
  authorship TEXT NOT NULL DEFAULT 'user'
    CHECK (authorship IN ('user', 'facilitator', 'wisewave', 'system')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS wisewave_turns_session_idx
  ON wisewave_turns(platform_session_id, created_at);

CREATE INDEX IF NOT EXISTS wisewave_turns_user_report_idx
  ON wisewave_turns(user_id, report_id);
