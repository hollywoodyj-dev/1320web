-- FS-005A — Platform domain tables (Phase 2 relationship layer)
-- Run after db/schema.sql via npm run db:migrate
-- Note: `sessions` in schema.sql = auth cookie sessions (unchanged).

CREATE TABLE IF NOT EXISTS expression_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  report_id UUID NOT NULL REFERENCES soul_reports(id) ON DELETE CASCADE,
  state TEXT NOT NULL DEFAULT 'dormant'
    CHECK (state IN ('dormant', 'emerging', 'active', 'embodied', 'integrated')),
  notes JSONB,
  authorship TEXT NOT NULL DEFAULT 'system'
    CHECK (authorship IN ('user', 'facilitator', 'wisewave', 'system')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, report_id)
);

CREATE INDEX IF NOT EXISTS expression_profiles_user_report_idx
  ON expression_profiles(user_id, report_id);

CREATE TABLE IF NOT EXISTS relationship_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  report_id UUID NOT NULL REFERENCES soul_reports(id) ON DELETE CASCADE,
  kind TEXT NOT NULL
    CHECK (kind IN ('theme', 'question', 'insight', 'practice')),
  content TEXT NOT NULL,
  source_platform_session_id UUID,
  user_retained BOOLEAN NOT NULL DEFAULT TRUE,
  authorship TEXT NOT NULL DEFAULT 'system'
    CHECK (authorship IN ('user', 'facilitator', 'wisewave', 'system')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS relationship_memories_user_report_idx
  ON relationship_memories(user_id, report_id);

CREATE TABLE IF NOT EXISTS platform_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  report_id UUID NOT NULL REFERENCES soul_reports(id) ON DELETE CASCADE,
  kind TEXT NOT NULL
    CHECK (kind IN ('wisewave', 'personal_integration', 'membership_checkin', 'first_reflection')),
  status TEXT NOT NULL DEFAULT 'scheduled'
    CHECK (status IN ('scheduled', 'active', 'completed', 'cancelled')),
  growth_edge TEXT,
  summary TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  authorship TEXT NOT NULL DEFAULT 'system'
    CHECK (authorship IN ('user', 'facilitator', 'wisewave', 'system')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS platform_sessions_user_report_idx
  ON platform_sessions(user_id, report_id);

CREATE INDEX IF NOT EXISTS platform_sessions_status_idx
  ON platform_sessions(status);

CREATE TABLE IF NOT EXISTS reflections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  report_id UUID NOT NULL REFERENCES soul_reports(id) ON DELETE CASCADE,
  kind TEXT NOT NULL
    CHECK (kind IN ('journal', 'practice', 'growth_edge', 'session_note')),
  body TEXT NOT NULL,
  source_platform_session_id UUID REFERENCES platform_sessions(id) ON DELETE SET NULL,
  authorship TEXT NOT NULL DEFAULT 'user'
    CHECK (authorship IN ('user', 'facilitator', 'wisewave', 'system')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS reflections_user_report_idx
  ON reflections(user_id, report_id);

CREATE TABLE IF NOT EXISTS journeys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  report_id UUID NOT NULL REFERENCES soul_reports(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'paused', 'archived')),
  membership_tier TEXT,
  last_review_at TIMESTAMPTZ,
  meta JSONB,
  authorship TEXT NOT NULL DEFAULT 'system'
    CHECK (authorship IN ('user', 'facilitator', 'wisewave', 'system')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, report_id)
);

CREATE INDEX IF NOT EXISTS journeys_user_report_idx
  ON journeys(user_id, report_id);

-- FK from relationship_memories to platform_sessions (added after platform_sessions exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'relationship_memories_source_platform_session_id_fkey'
  ) THEN
    ALTER TABLE relationship_memories
      ADD CONSTRAINT relationship_memories_source_platform_session_id_fkey
      FOREIGN KEY (source_platform_session_id) REFERENCES platform_sessions(id) ON DELETE SET NULL;
  END IF;
END $$;
