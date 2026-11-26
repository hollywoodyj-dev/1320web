export type BirthDateMessageLocale = "en" | "zh-TW";

export function isValidBirthDate(year: number, month: number, day: number): boolean {
  return getBirthDateValidationMessage(year, month, day) === null;
}

/** Returns user-facing error copy (3/15) or null when valid. */
export function getBirthDateValidationMessage(
  year: number,
  month: number,
  day: number,
  locale: BirthDateMessageLocale = "en",
): string | null {
  const zh = locale === "zh-TW";

  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    return zh
      ? "請輸入完整的西元出生年月日。"
      : "Please enter your full birth date to generate your code.";
  }

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return zh
      ? "西元年、月、日請使用整數。"
      : "Please use whole numbers for year, month, and day.";
  }

  if (year < 1900) {
    return zh
      ? "西元年請輸入 1900 或之後。"
      : "Please enter a birth year of 1900 or later.";
  }

  if (month < 1 || month > 12) {
    return zh
      ? "月份請輸入 1 到 12。"
      : "Please enter a valid month between 1 and 12.";
  }

  if (day < 1 || day > 31) {
    return zh
      ? "日期請輸入該月份有效的日子。"
      : "Please enter a valid day for your birth month.";
  }

  const date = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const matchesCalendar =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

  if (!matchesCalendar) {
    return zh
      ? "這個西元年／月／日組合無效，請再確認一次。"
      : "That date combination is not valid. Please check your birth date.";
  }

  if (date > today) {
    return zh
      ? "出生日期不能是未來。"
      : "Your birth date cannot be in the future.";
  }

  return null;
}
