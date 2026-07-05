-- FS-005A v1.1 — authorship / provenance on mutable domain objects (Wisewave FS-005A note)
-- Safe to re-run: adds column only if missing.

DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'expression_profiles',
    'relationship_memories',
    'platform_sessions',
    'reflections',
    'journeys'
  ]
  LOOP
    IF NOT EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = tbl
        AND column_name = 'authorship'
    ) THEN
      EXECUTE format(
        'ALTER TABLE %I ADD COLUMN authorship TEXT NOT NULL DEFAULT ''system''
          CHECK (authorship IN (''user'', ''facilitator'', ''wisewave'', ''system''))',
        tbl
      );
    END IF;
  END LOOP;
END $$;
