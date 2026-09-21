/** T18 frozen Life Path conventions — output classification only. */

const MASTERS = new Set([11, 22, 33]);

export type LifePathConventionId = "A" | "A_prime" | "B" | "C";

export type LifePathTriplet = readonly [number, number, number];

/** Haze 1985 cohort — four-way unique signature across all three dates. */
export const T18_PROVENANCE_TEST_DATES = [
  { year: 1985, month: 4, day: 11 },
  { year: 1985, month: 6, day: 11 },
  { year: 1985, month: 1, day: 9 },
] as const;

export const T18_SIGNATURE_TABLE: Record<LifePathConventionId, LifePathTriplet> = {
  A: [2, 22, 6],
  A_prime: [11, 4, 6],
  B: [11, 4, 33],
  C: [2, 4, 6],
};

function sumDigits(n: number): number {
  let s = 0;
  const str = String(Math.abs(n));
  for (let i = 0; i < str.length; i += 1) s += Number(str[i]);
  return s;
}

function reduceKeepMasters(n: number): number {
  let current = n;
  while (current > 9 && !MASTERS.has(current)) current = sumDigits(current);
  return current;
}

function reduceToSingleDigit(n: number): number {
  let current = n;
  while (current > 9) current = sumDigits(current);
  return current;
}

function reduceYearParts(year: number, keepMasters: boolean): number {
  const reducer = keepMasters ? reduceKeepMasters : reduceToSingleDigit;
  return reducer(sumDigits(year));
}

function reduceMonth(month: number, keepMasters: boolean): number {
  const reducer = keepMasters ? reduceKeepMasters : reduceToSingleDigit;
  return reducer(month);
}

function reduceDay(day: number, keepMasters: boolean): number {
  const reducer = keepMasters ? reduceKeepMasters : reduceToSingleDigit;
  return reducer(day);
}

/** A — separate reduction; keep 11/22/33 at each step. */
export function conventionA(year: number, month: number, day: number): number {
  return reduceKeepMasters(
    reduceMonth(month, true) + reduceDay(day, true) + reduceYearParts(year, true),
  );
}

/** A′ — separate reduction; do not keep masters at intermediate steps. */
export function conventionAPrime(year: number, month: number, day: number): number {
  return reduceKeepMasters(
    reduceMonth(month, false) + reduceDay(day, false) + reduceYearParts(year, false),
  );
}

/** B — sum every YYYYMMDD digit; keep masters only on final reduction. */
export function conventionB(year: number, month: number, day: number): number {
  const digits = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
  let sum = 0;
  for (let i = 0; i < digits.length; i += 1) sum += Number(digits[i]);
  return reduceKeepMasters(sum);
}

/** C — sum unreduced month + day + year, then reduce. */
export function conventionC(year: number, month: number, day: number): number {
  return reduceKeepMasters(month + day + year);
}

export function lifePathTriplet(
  year: number,
  month: number,
  day: number,
  fn: (y: number, m: number, d: number) => number,
): LifePathTriplet {
  const values = T18_PROVENANCE_TEST_DATES.map(({ year: y, month: m, day: d }) => fn(y, m, d));
  return [values[0]!, values[1]!, values[2]!];
}

export function tripletKey(triplet: LifePathTriplet): string {
  return triplet.join(",");
}

/** Same output on all three test dates — not a convention (input-independent / scrape artifact). */
export function isDegenerateTriplet(triplet: LifePathTriplet): boolean {
  return triplet[0] === triplet[1] && triplet[1] === triplet[2];
}

export function classifyTriplet(triplet: LifePathTriplet): LifePathConventionId | "UNKNOWN" {
  const key = tripletKey(triplet);
  for (const id of ["A", "A_prime", "B", "C"] as const) {
    if (tripletKey(T18_SIGNATURE_TABLE[id]) === key) return id;
  }
  return "UNKNOWN";
}

export type MeasuredTripletOutcome =
  | LifePathConventionId
  | "UNKNOWN"
  | "SCRAPE_FAILED"
  | "INCOMPLETE";

/** Classify only when triplet is a valid live measurement (not scrape failure). */
export function classifyMeasuredTriplet(
  triplet: LifePathTriplet | null,
): MeasuredTripletOutcome {
  if (!triplet) return "INCOMPLETE";
  if (isDegenerateTriplet(triplet)) return "SCRAPE_FAILED";
  return classifyTriplet(triplet);
}

export function proseDeclaresConvention(prose: "A" | "B" | "other" | "undeclared"): string {
  return prose;
}
