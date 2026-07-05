-- FS-006 — Personal Integration Session fields on platform_sessions
-- Safe to re-run.

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS session_variant TEXT
    CHECK (session_variant IS NULL OR session_variant IN ('intro', 'deep', 'integration', 'not-sure'));

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS meta JSONB NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS prep_access_token TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS platform_sessions_prep_access_token_idx
  ON platform_sessions(prep_access_token)
  WHERE prep_access_token IS NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'platform_sessions_prep_access_token_key'
  ) THEN
    ALTER TABLE platform_sessions
      ADD CONSTRAINT platform_sessions_prep_access_token_key UNIQUE (prep_access_token);
  END IF;
END $$;
