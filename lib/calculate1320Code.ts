export type SoulCodeResult = {
  year: number;
  month: number;
  day: number;
  s1: number;
  s3Raw: number;
  s2: number;
  s0: number;
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

  const codeString = `S1-${s1} / S3-${s3Raw} / S2-${s2} / S0-${String(s0).padStart(2, "0")}`;
  const compactCode = `${s1}-${s3Raw}-${s2}-${String(s0).padStart(2, "0")}`;

  return { year, month, day, s1, s3Raw, s2, s0, codeString, compactCode };
}
