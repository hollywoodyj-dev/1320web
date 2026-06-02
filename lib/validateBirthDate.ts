export function isValidBirthDate(year: number, month: number, day: number): boolean {
  return getBirthDateValidationMessage(year, month, day) === null;
}

/** Returns user-facing error copy (3/15) or null when valid. */
export function getBirthDateValidationMessage(
  year: number,
  month: number,
  day: number,
): string | null {
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    return "Please enter your full birth date to generate your code.";
  }

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return "Please use whole numbers for year, month, and day.";
  }

  if (year < 1900) {
    return "Please enter a birth year of 1900 or later.";
  }

  if (month < 1 || month > 12) {
    return "Please enter a valid month between 1 and 12.";
  }

  if (day < 1 || day > 31) {
    return "Please enter a valid day for your birth month.";
  }

  const date = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const matchesCalendar =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

  if (!matchesCalendar) {
    return "That date combination is not valid. Please check your birth date.";
  }

  if (date > today) {
    return "Your birth date cannot be in the future.";
  }

  return null;
}
