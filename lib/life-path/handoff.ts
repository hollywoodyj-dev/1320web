/** Short-lived Life Path → Free Soul Blueprint birth-date handoff (session only). */

export const LIFE_PATH_HANDOFF_KEY = "1320_life_path_handoff_v1";
const MAX_AGE_MS = 30 * 60 * 1000;

export type LifePathHandoff = {
  year: number;
  month: number;
  day: number;
  savedAt: number;
};

export function saveLifePathHandoff(year: number, month: number, day: number): void {
  if (typeof window === "undefined") return;
  try {
    const payload: LifePathHandoff = { year, month, day, savedAt: Date.now() };
    sessionStorage.setItem(LIFE_PATH_HANDOFF_KEY, JSON.stringify(payload));
  } catch {
    // Storage unavailable — user re-enters date on Free Blueprint.
  }
}

/** Read and clear a recent handoff. Does not write cookies or analytics. */
export function consumeLifePathHandoff(): LifePathHandoff | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(LIFE_PATH_HANDOFF_KEY);
    sessionStorage.removeItem(LIFE_PATH_HANDOFF_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LifePathHandoff;
    if (
      !parsed ||
      typeof parsed.year !== "number" ||
      typeof parsed.month !== "number" ||
      typeof parsed.day !== "number" ||
      typeof parsed.savedAt !== "number"
    ) {
      return null;
    }
    if (Date.now() - parsed.savedAt > MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}
