import { cookies } from "next/headers";
import { BIRTH_COOKIE_NAME, parseBirthCookieValue, type BirthDateParts } from "@/lib/birth-cookie";
import { isValidBirthDate } from "@/lib/validateBirthDate";

type SearchParams = Record<string, string | string[] | undefined>;

function readParam(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  return typeof raw === "string" ? raw.trim() : undefined;
}

function readIntParam(value: string | string[] | undefined): number {
  const raw = readParam(value);
  if (!raw) return Number.NaN;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

/** Resolve birth date from URL query (primary) or cookie set during calculator/generating. */
export async function resolveBirthDateFromRequest(
  params: SearchParams,
): Promise<BirthDateParts | null> {
  const year = readIntParam(params.year);
  const month = readIntParam(params.month);
  const day = readIntParam(params.day);

  if (isValidBirthDate(year, month, day)) {
    return { year, month, day };
  }

  const hasBirthParams =
    readParam(params.year) !== undefined ||
    readParam(params.month) !== undefined ||
    readParam(params.day) !== undefined;

  // Do not fall back to cookie when URL has partial/invalid params (stale date after mobile redirect).
  if (hasBirthParams) {
    return null;
  }

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(BIRTH_COOKIE_NAME)?.value;
  const decoded = cookieValue ? decodeURIComponent(cookieValue) : undefined;
  return parseBirthCookieValue(decoded);
}
