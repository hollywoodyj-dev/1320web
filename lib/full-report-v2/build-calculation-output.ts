import type { SoulCodeResult } from "@/lib/calculate1320Code";
import type { FullReportV2Calculation, FullReportV2LayerTitles } from "@/lib/full-report-v2/types";

function birthDateDigits(year: number, month: number, day: number): number[] {
  const iso = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
  return iso.split("").map((d) => Number(d));
}

export function buildCombinationSignature(
  s1Code: string,
  s3Code: string,
  s2Code: string,
  s0Code: string,
): string {
  return `${s1Code}|${s3Code}|${s2Code}|${s0Code}`;
}

export function buildCalculationOutput(
  codes: SoulCodeResult,
  titles: FullReportV2LayerTitles = {},
): FullReportV2Calculation {
  const birthDate = `${codes.year}-${String(codes.month).padStart(2, "0")}-${String(codes.day).padStart(2, "0")}`;
  const digits = birthDateDigits(codes.year, codes.month, codes.day);
  const fullSum = digits.reduce((a, b) => a + b, 0);

  return {
    birth_date: birthDate,
    digits,
    s1: {
      formula: `${codes.year} → 1 + … + digit sum`,
      raw: codes.s1,
      code: codes.s1Code,
      title: titles.s1 ?? "",
    },
    s3: {
      formula: `${codes.month} × ${codes.day}`,
      raw: codes.s3Raw,
      code: codes.s3Code,
      title: titles.s3 ?? codes.s3Title,
    },
    s2: {
      formula: `${codes.month} + ${codes.day}`,
      raw: codes.s2,
      code: codes.s2Code,
      title: titles.s2 ?? "",
    },
    s0: {
      formula: "full birth date digit sum",
      raw: fullSum,
      mod: `${fullSum} mod 20`,
      code: codes.s0Code,
      title: titles.s0 ?? "",
    },
    combination_signature: buildCombinationSignature(
      codes.s1Code,
      codes.s3Code,
      codes.s2Code,
      codes.s0Code,
    ),
    s4_code: codes.s4Code,
    s5_code: codes.s5Code,
    s6_code: codes.s6Code,
    s7_code: codes.s7Code,
    s8_code: codes.s8Code,
    s9_code: codes.s9Code,
  };
}
