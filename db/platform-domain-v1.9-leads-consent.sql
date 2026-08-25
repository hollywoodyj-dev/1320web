-- Phase A / B lead consent. Two timestamps — never a shared boolean.
-- return_link_requested_at = utility/continuity (Phase B Return Link)
-- marketing_opt_in_at      = optional newsletter / promotional (Phase B)
-- Historical bundled rows: payload.consent_status = 'legacy_bundled'; both timestamps stay NULL.

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS return_link_requested_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS marketing_opt_in_at TIMESTAMPTZ;
