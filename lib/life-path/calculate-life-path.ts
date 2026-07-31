/** Pythagorean-style Life Path Number calculation — Page 03 Spec v1.0 */

export const MASTER_NUMBERS = new Set([11, 22, 33]);

export type LifePathInput = {
  year: number;
  month: number;
  day: number;
};

export type LifePathResult = {
  lifePath: number;
  underlyingNumber: number | null;
  monthValue: number;
  dayValue: number;
  yearValue: number;
  combinedTotal: number;
};

export function sumDigits(value: number): number {
  return String(Math.abs(value))
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);
}

export function reduceNumerologyNumber(value: number): number {
  let current = value;
  while (current > 9 && !MASTER_NUMBERS.has(current)) {
    current = sumDigits(current);
  }
  return current;
}

export function isValidCalendarDate(year: number, month: number, day: number): boolean {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return false;
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  if (year < 1900) return false;

  const now = new Date();
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const value = new Date(Date.UTC(year, month - 1, day));
  const valueUtc = Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate());

  if (
    value.getUTCFullYear() !== year ||
    value.getUTCMonth() !== month - 1 ||
    value.getUTCDate() !== day
  ) {
    return false;
  }

  if (valueUtc > todayUtc) return false;
  return true;
}

export function calculateLifePath(input: LifePathInput): LifePathResult {
  const { year, month, day } = input;

  if (!isValidCalendarDate(year, month, day)) {
    throw new Error("INVALID_BIRTH_DATE");
  }

  const monthValue = reduceNumerologyNumber(month);
  const dayValue = reduceNumerologyNumber(day);
  const yearValue = reduceNumerologyNumber(year);
  const combinedTotal = monthValue + dayValue + yearValue;
  const lifePath = reduceNumerologyNumber(combinedTotal);

  const underlyingNumber =
    lifePath === 11 ? 2 : lifePath === 22 ? 4 : lifePath === 33 ? 6 : null;

  return {
    lifePath,
    underlyingNumber,
    monthValue,
    dayValue,
    yearValue,
    combinedTotal,
  };
}

export type LifePathValidationError =
  | "missing_month"
  | "missing_day"
  | "missing_year"
  | "invalid_year"
  | "invalid_date"
  | "future_date";

export function validateLifePathFields(input: {
  year: string;
  month: string;
  day: string;
}): { ok: true; value: LifePathInput } | { ok: false; error: LifePathValidationError; message: string } {
  if (!input.month.trim()) {
    return { ok: false, error: "missing_month", message: "Please choose a month." };
  }
  if (!input.day.trim()) {
    return { ok: false, error: "missing_day", message: "Please choose a valid day." };
  }
  if (!input.year.trim()) {
    return { ok: false, error: "missing_year", message: "Please enter a four-digit birth year." };
  }

  const year = Number(input.year);
  const month = Number(input.month);
  const day = Number(input.day);

  if (!Number.isInteger(year) || String(year).length !== 4 || year < 1900) {
    return { ok: false, error: "invalid_year", message: "Please enter a four-digit birth year." };
  }

  const now = new Date();
  const candidate = new Date(Date.UTC(year, month - 1, day));
  if (
    candidate.getUTCFullYear() !== year ||
    candidate.getUTCMonth() !== month - 1 ||
    candidate.getUTCDate() !== day
  ) {
    return {
      ok: false,
      error: "invalid_date",
      message: "That date does not exist. Please check the birth date and try again.",
    };
  }

  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const valueUtc = Date.UTC(candidate.getUTCFullYear(), candidate.getUTCMonth(), candidate.getUTCDate());
  if (valueUtc > todayUtc) {
    return {
      ok: false,
      error: "future_date",
      message: "Please check the birth date and try again.",
    };
  }

  return { ok: true, value: { year, month, day } };
}

export const MONTH_OPTIONS = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
] as const;
