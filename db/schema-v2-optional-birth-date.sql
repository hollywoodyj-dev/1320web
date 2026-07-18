-- Allow account creation without birth date (connect later from account / report flow).
ALTER TABLE users ALTER COLUMN birth_date DROP NOT NULL;
