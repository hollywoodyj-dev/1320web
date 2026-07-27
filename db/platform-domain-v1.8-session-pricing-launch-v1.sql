-- Personal Integration Session Pricing & Product Tier Update · Launch v1
-- Safe to re-run.

-- Allow Launch v1 session_type IDs while retaining pre-launch aliases for history.
ALTER TABLE platform_sessions
  DROP CONSTRAINT IF EXISTS platform_sessions_session_variant_check;

ALTER TABLE platform_sessions
  ADD CONSTRAINT platform_sessions_session_variant_check
  CHECK (
    session_variant IS NULL
    OR session_variant IN (
      'blueprint_integration',
      'focused_life_integration',
      'deep_blueprint_integration',
      'intro',
      'deep',
      'integration',
      'not-sure'
    )
  );

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS session_title TEXT;

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS duration_minutes INT;

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS price_amount NUMERIC(10, 2);

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS currency TEXT;

ALTER TABLE platform_sessions
  ADD COLUMN IF NOT EXISTS pricing_version TEXT;
