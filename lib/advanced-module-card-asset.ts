/**
 * Archetype card packs under `public/` for advanced modules S4–S9.
 * - S4: `S4-20/S4-00.webp` … `S4-19.webp` (0–19)
 * - S5: `S5-44/S5-01.webp` … `S5-44.webp` (1–44; formula 0 → 44)
 * - S6: `S6-44/S6-01.webp` … `S6-44.webp` (1–44; formula 0 → 44)
 * - S7: `S7-07/S7-00.webp` … `S7-06.webp` (0–6)
 * - S8: `S8-08/S8-00.webp` … `S8-07.webp` (0–7)
 * - S9: `S9-09/S9-00.webp` … `S9-08.webp` (0–8)
 */
export type AdvancedModuleId = "s4" | "s5" | "s6" | "s7" | "s8" | "s9";

const CARD_DIRS: Record<AdvancedModuleId, string> = {
  s4: "S4-20",
  s5: "S5-44",
  s6: "S6-44",
  s7: "S7-07",
  s8: "S8-08",
  s9: "S9-09",
};

const CARD_MAX: Record<AdvancedModuleId, number> = {
  s4: 19,
  s5: 44,
  s6: 44,
  s7: 6,
  s8: 7,
  s9: 8,
};

const CARD_MIN: Record<AdvancedModuleId, number> = {
  s4: 0,
  s5: 1,
  s6: 1,
  s7: 0,
  s8: 0,
  s9: 0,
};

const CODE_PREFIX: Record<AdvancedModuleId, string> = {
  s4: "S4",
  s5: "S5",
  s6: "S6",
  s7: "S7",
  s8: "S8",
  s9: "S9",
};

function formatCardFilename(moduleId: AdvancedModuleId, codeNum: number): string {
  const prefix = CODE_PREFIX[moduleId];
  return `${prefix}-${String(codeNum).padStart(2, "0")}.webp`;
}

/** e.g. s5 + 14 → `/S5-44/S5-14.webp`; s7 + 0 → `/S7-07/S7-00.webp` */
export function getAdvancedModuleCardImageUrl(
  moduleId: AdvancedModuleId,
  codeNum: number,
): string | undefined {
  if (!Number.isFinite(codeNum)) return undefined;

  const min = CARD_MIN[moduleId];
  const max = CARD_MAX[moduleId];
  if (codeNum < min || codeNum > max) return undefined;

  const dir = CARD_DIRS[moduleId];
  return `/${dir}/${formatCardFilename(moduleId, codeNum)}`;
}

/** Parse `S5-14` (or `s5-14`) and return the public card URL when valid. */
export function getAdvancedModuleCardImageUrlFromCode(code: string): string | undefined {
  const match = /^(S4|S5|S6|S7|S8|S9)-(\d{1,2})$/i.exec(code.trim());
  if (!match) return undefined;

  const moduleId = match[1].toLowerCase() as AdvancedModuleId;
  const codeNum = Number.parseInt(match[2], 10);
  return getAdvancedModuleCardImageUrl(moduleId, codeNum);
}
