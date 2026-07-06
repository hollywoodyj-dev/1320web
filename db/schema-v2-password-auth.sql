-- Password-based sign-in (replaces magic-link login for account access).

ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;
