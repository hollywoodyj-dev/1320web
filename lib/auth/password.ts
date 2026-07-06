import bcrypt from "bcryptjs";

export const MIN_PASSWORD_LENGTH = 8;
const BCRYPT_ROUNDS = 12;
const HAS_DIGIT = /\d/;
const HAS_LETTER = /[a-zA-Z]/;

export const PASSWORD_REQUIREMENTS =
  "At least 8 characters, with both letters (a–z) and numbers (0–9). Example: soul1320";

export function validatePassword(password: string): string | null {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password is too short — use at least ${MIN_PASSWORD_LENGTH} characters with letters and numbers.`;
  }
  if (!HAS_LETTER.test(password)) {
    return "Password must include at least one letter (a–z).";
  }
  if (!HAS_DIGIT.test(password)) {
    return "Password must include at least one number (0–9).";
  }
  return null;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
