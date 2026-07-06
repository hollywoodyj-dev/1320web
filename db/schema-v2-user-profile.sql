-- User profile fields for one-time signup (name + birth date).

ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS birth_date DATE;
