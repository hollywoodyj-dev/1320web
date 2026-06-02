/** Normalize birth date field values (handles 1980/05/22 in a single field on mobile). */

export type BirthDateParts = {
  year: string;
  month: string;
  day: string;
};

const COMBINED_DATE =
  /^(\d{4})[/.-](\d{1,2})[/.-](\d{1,2})$/;

export function parseBirthDateInput(
  yearRaw: string,
  monthRaw: string,
  dayRaw: string,
): BirthDateParts {
  const year = yearRaw.trim();
  const month = monthRaw.trim();
  const day = dayRaw.trim();

  const candidates = [
    year,
    month,
    day,
    `${year}/${month}/${day}`,
    `${year}/${month}`,
  ].filter(Boolean);

  for (const candidate of candidates) {
    const match = candidate.match(COMBINED_DATE);
    if (match) {
      return { year: match[1], month: match[2], day: match[3] };
    }
  }

  if (COMBINED_DATE.test(month)) {
    const match = month.match(COMBINED_DATE)!;
    return { year: match[1], month: match[2], day: match[3] };
  }

  if (COMBINED_DATE.test(day)) {
    const match = day.match(COMBINED_DATE)!;
    return { year: match[1], month: match[2], day: match[3] };
  }

  return { year, month, day };
}

export function birthPartsToNumbers(parts: BirthDateParts) {
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
  };
}
