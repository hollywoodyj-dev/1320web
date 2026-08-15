-- Marketing / LP conversion tracking (ME Spec v1)
-- First-party events for admin dashboard (GA4 optional mirror)

CREATE TABLE IF NOT EXISTS marketing_conversion_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  user_id TEXT NULL,
  session_id TEXT NULL,
  source TEXT NULL,
  lp TEXT NULL,
  ad_group TEXT NULL,
  platform TEXT NULL,
  path TEXT NULL,
  metadata JSONB NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS marketing_conversion_events_name_created_idx
  ON marketing_conversion_events (event_name, created_at DESC);

CREATE INDEX IF NOT EXISTS marketing_conversion_events_created_idx
  ON marketing_conversion_events (created_at DESC);

CREATE INDEX IF NOT EXISTS marketing_conversion_events_lp_created_idx
  ON marketing_conversion_events (lp, created_at DESC)
  WHERE lp IS NOT NULL;
