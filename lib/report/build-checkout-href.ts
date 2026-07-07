import type { BirthDateParts } from "@/lib/birth-cookie";

/** Checkout URL with birth query params when a date is known (result → checkout handoff). */
export function buildCheckoutHref(birth?: BirthDateParts | string | null): string {
  if (!birth) return "/checkout";

  if (typeof birth === "string") {
    const match = birth.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (!match) return "/checkout";
    return buildCheckoutHref({
      year: Number(match[1]),
      month: Number(match[2]),
      day: Number(match[3]),
    });
  }

  const { year, month, day } = birth;
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    return "/checkout";
  }

  return `/checkout?year=${year}&month=${month}&day=${day}`;
}
