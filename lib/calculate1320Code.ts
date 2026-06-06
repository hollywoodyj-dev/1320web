import { formatCodeDisplay } from "@/lib/format-code-display";

export type SoulCodeResult = {
  year: number;
  month: number;
  day: number;
  s1: number;
  s3Raw: number;
  s2: number;
  s0: number;
  s1Code: string;
  s3Code: string;
  s3Title: string;
  s2Code: string;
  s0Code: string;
  codeString: string;
  compactCode: string;
};

function sumDigits(value: string | number): number {
  return String(value)
    .replace(/\D/g, "")
    .split("")
    .filter(Boolean)
    .reduce((sum, digit) => sum + Number(digit), 0);
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

  const codes = formatCodeDisplay(s1, s3Raw, s2, s0);

  return {
    year,
    month,
    day,
    s1,
    s3Raw,
    s2,
    s0,
    s1Code: codes.s1Code,
    s3Code: codes.s3Code,
    s3Title: codes.s3Title,
    s2Code: codes.s2Code,
    s0Code: codes.s0Code,
    codeString: codes.codeString,
    compactCode: codes.compactCode,
  };
}
