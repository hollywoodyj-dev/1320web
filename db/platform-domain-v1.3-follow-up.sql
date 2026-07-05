-- FS-006.1 — Follow-up access token for post-session reflection
-- Safe to re-run.

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS follow_up_access_token TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS platform_sessions_follow_up_access_token_idx
  ON platform_sessions(follow_up_access_token)
  WHERE follow_up_access_token IS NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'platform_sessions_follow_up_access_token_key'
  ) THEN
    ALTER TABLE platform_sessions
      ADD CONSTRAINT platform_sessions_follow_up_access_token_key UNIQUE (follow_up_access_token);
  END IF;
END $$;
