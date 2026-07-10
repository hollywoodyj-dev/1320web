-- FS-006 Model B — booking checkout links purchases to platform sessions
-- Safe to re-run.

ALTER TABLE purchases
  ADD COLUMN IF NOT EXISTS platform_session_id UUID REFERENCES platform_sessions(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS purchases_platform_session_id_idx
  ON purchases(platform_session_id)
  WHERE platform_session_id IS NOT NULL;
