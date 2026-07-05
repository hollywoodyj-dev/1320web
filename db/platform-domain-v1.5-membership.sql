-- FS-008 — Relationship memory layer mapping (governance Doc 9)
-- Safe to re-run.

ALTER TABLE relationship_memories
  ADD COLUMN IF NOT EXISTS memory_layer TEXT
    CHECK (memory_layer IS NULL OR memory_layer IN ('blueprint', 'reflection', 'expression', 'journey'));

-- Backfill v1 kinds → memory layers
UPDATE relationship_memories
SET memory_layer = CASE kind
  WHEN 'theme' THEN 'journey'
  WHEN 'question' THEN 'reflection'
  WHEN 'insight' THEN 'reflection'
  WHEN 'practice' THEN 'journey'
  ELSE 'reflection'
END
WHERE memory_layer IS NULL;
