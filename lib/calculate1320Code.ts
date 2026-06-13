import { formatCodeDisplay } from "@/lib/format-code-display";
import { resolveS3VibrationLevel } from "@/lib/s3-vibration-level";
import {
  formatS4Code,
  formatS5Code,
  formatS6Code,
  formatS7Code,
  formatS8Code,
  formatS9Code,
} from "@/lib/segment-code";

export type SoulCodeResult = {
  year: number;
  month: number;
  day: number;
  s1: number;
  s3Raw: number;
  /** Mapped S3 tier number used in S5–S7 formulas (not S3_raw). */
  s3: number;
  s2: number;
  s0: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
  s8: number;
  s9: number;
  s1Code: string;
  s3Code: string;
  s3Title: string;
  s2Code: string;
  s0Code: string;
  s4Code: string;
  s5Code: string;
  s6Code: string;
  s7Code: string;
  s8Code: string;
  s9Code: string;
  /** Awareness layer display: S1 / S3 / S2 / S0 */
  codeString: string;
  compactCode: string;
  /** Full S0–S9 chain for v2 reports */
  fullCodeString: string;
  fullCompactCode: string;
};

function sumDigits(value: string | number): number {
  return String(value)
    .replace(/\D/g, "")
    .split("")
    .filter(Boolean)
    .reduce((sum, digit) => sum + Number(digit), 0);
}

/** Apply S5/S6 zero rule: modulo 0 becomes 44. */
function normalizeS5S6(modValue: number): number {
  return modValue === 0 ? 44 : modValue;
}

function buildSoulCodeResult(
  year: number,
  month: number,
  day: number,
  s1: number,
  s3Raw: number,
  s2: number,
  s0: number,
): SoulCodeResult {
  const s3Level = resolveS3VibrationLevel(s3Raw);
  if (!s3Level.mapped || s3Level.tierNumber == null) {
    throw new Error(s3Level.error ?? `S3_MAPPING_MISSING: no tier for S3_raw ${s3Raw}`);
  }

  const s3 = s3Level.tierNumber;
  const s4 = (s2 + s0) % 20;
  const s5 = normalizeS5S6((s1 + s2 + s3) % 44);
  const s6 = normalizeS5S6((s1 + s3 + s0) % 44);
  const s7 = (s1 + s3 + s4 + s6) % 7;
  const s8 = (s5 + s6 + s7) % 8;
  const s9 = (s1 + s0 + s7 + s8) % 9;

  const codes = formatCodeDisplay(
    s1,
    s3Raw,
    s2,
    s0,
    s3Level.s3Code,
    s3Level.vibrationArchetype,
  );

  const s4Code = formatS4Code(s4);
  const s5Code = formatS5Code(s5);
  const s6Code = formatS6Code(s6);
  const s7Code = formatS7Code(s7);
  const s8Code = formatS8Code(s8);
  const s9Code = formatS9Code(s9);

  const fullParts = [
    codes.s0Code,
    codes.s1Code,
    codes.s2Code,
    codes.s3Code,
    s4Code,
    s5Code,
    s6Code,
    s7Code,
    s8Code,
    s9Code,
  ];

  return {
    year,
    month,
    day,
    s1,
    s3Raw,
    s3,
    s2,
    s0,
    s4,
    s5,
    s6,
    s7,
    s8,
    s9,
    s1Code: codes.s1Code,
    s3Code: codes.s3Code,
    s3Title: codes.s3Title,
    s2Code: codes.s2Code,
    s0Code: codes.s0Code,
    s4Code,
    s5Code,
    s6Code,
    s7Code,
    s8Code,
    s9Code,
    codeString: codes.codeString,
    compactCode: codes.compactCode,
    fullCodeString: fullParts.join(" / "),
    fullCompactCode: fullParts.join("|"),
  };
}

export function calculate1320Code(year: number, month: number, day: number): SoulCodeResult {
  if (!Number.isInteger(year) || year < 1) throw new Error("Invalid birth year");
  if (!Number.isInteger(month) || month < 1 || month > 12) throw new Error("Invalid birth month");
  if (!Number.isInteger(day) || day < 1 || day > 31) throw new Error("Invalid birth day");

  const paddedMonth = String(month).padStart(2, "0");
  const paddedDay = String(day).padStart(2, "0");
  const fullDateString = `${year}${paddedMonth}${paddedDay}`;

  const s1 = sumDigits(year);
  const s3Raw = month * day;
  const s2 = month + day;
  const s0 = sumDigits(fullDateString) % 20;

  return buildSoulCodeResult(year, month, day, s1, s3Raw, s2, s0);
}

/** Extend S4–S9 from awareness-layer inputs (S0–S3 already computed). */
export function calculateFromAwareness(
  s1: number,
  s3Raw: number,
  s2: number,
  s0: number,
): SoulCodeResult {
  return buildSoulCodeResult(0, 0, 0, s1, s3Raw, s2, s0);
}
