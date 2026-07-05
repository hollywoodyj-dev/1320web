import { getBirthDateValidationMessage } from "@/lib/validateBirthDate";

export function parseBirthDateString(value: string): { isoDate: string; year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (getBirthDateValidationMessage(year, month, day) !== null) return null;

  return { isoDate: `${match[1]}-${match[2]}-${match[3]}`, year, month, day };
}
