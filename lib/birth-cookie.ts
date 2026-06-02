import { isValidBirthDate } from "@/lib/validateBirthDate";

export const BIRTH_COOKIE_NAME = "1320-birth-date";

export type BirthDateParts = {
  year: number;
  month: number;
  day: number;
};

export function formatBirthCookieValue(year: number, month: number, day: number): string {
  return `${year}-${month}-${day}`;
}

export function parseBirthCookieValue(value: string | undefined): BirthDateParts | null {
  if (!value) return null;
  const match = value.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (!isValidBirthDate(year, month, day)) return null;
  return { year, month, day };
}

/** Client — survives meta refresh / redirects when query string is truncated on mobile WebKit. */
export function saveBirthCookie(year: number, month: number, day: number): void {
  if (typeof document === "undefined") return;
  try {
    const value = formatBirthCookieValue(year, month, day);
    document.cookie = `${BIRTH_COOKIE_NAME}=${encodeURIComponent(value)}; path=/; max-age=900; SameSite=Lax`;
  } catch {
    // Cookie blocked — query params or sessionStorage may still work.
  }
}
