import { BlueprintExperienceApiError } from "@/lib/blueprint-experience-api/errors";

/** Validate Gregorian YYYY-MM-DD without logging the raw value. */
export function parseValidBirthDate(value: string): { year: number; month: number; day: number } {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) throw new BlueprintExperienceApiError("INVALID_BIRTH_DATE");

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (year < 1900 || year > 2100) throw new BlueprintExperienceApiError("INVALID_BIRTH_DATE");

  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new BlueprintExperienceApiError("INVALID_BIRTH_DATE");
  }

  // Birth dates must not be in the future (UTC calendar day).
  const today = new Date();
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  if (date.getTime() > todayUtc) {
    throw new BlueprintExperienceApiError("INVALID_BIRTH_DATE");
  }

  return { year, month, day };
}
