/**
 * Deterministic Life Path calculator smoke tests — Page 03 Spec §21
 * Run: npx tsx scripts/smoke-life-path-calculator.ts
 */
import {
  calculateLifePath,
  isValidCalendarDate,
  validateLifePathFields,
} from "../lib/life-path/calculate-life-path";

type Case = { name: string; pass: boolean; detail?: string };

const cases: Case[] = [];

function check(name: string, pass: boolean, detail?: string) {
  cases.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"} | ${name}${detail ? ` — ${detail}` : ""}`);
}

// Spec examples
check(
  "15 June 1990 → 4",
  (() => {
    const r = calculateLifePath({ year: 1990, month: 6, day: 15 });
    return (
      r.monthValue === 6 &&
      r.dayValue === 6 &&
      r.yearValue === 1 &&
      r.combinedTotal === 13 &&
      r.lifePath === 4 &&
      r.underlyingNumber === null
    );
  })(),
);

check(
  "22 May 1980 → 9",
  (() => {
    const r = calculateLifePath({ year: 1980, month: 5, day: 22 });
    return r.monthValue === 5 && r.dayValue === 22 && r.yearValue === 9 && r.lifePath === 9;
  })(),
);

check(
  "2 Feb 1987 → 11 (root 2)",
  (() => {
    const r = calculateLifePath({ year: 1987, month: 2, day: 2 });
    return r.lifePath === 11 && r.underlyingNumber === 2 && r.combinedTotal === 11;
  })(),
);

check(
  "11 May 1950 → 22 (root 4)",
  (() => {
    const r = calculateLifePath({ year: 1950, month: 5, day: 11 });
    return r.lifePath === 22 && r.underlyingNumber === 4;
  })(),
);

check(
  "22 Feb 1980 → 33 (root 6)",
  (() => {
    const r = calculateLifePath({ year: 1980, month: 2, day: 22 });
    return r.lifePath === 33 && r.underlyingNumber === 6;
  })(),
);

check(
  "29 Nov 1975 intermediate masters → final 8",
  (() => {
    const r = calculateLifePath({ year: 1975, month: 11, day: 29 });
    // Month 11, Day 11 (2+9=11), Year 22 → total 44 → 8
    return r.monthValue === 11 && r.dayValue === 11 && r.yearValue === 22 && r.lifePath === 8;
  })(),
);

check("29 Feb 2000 valid leap", isValidCalendarDate(2000, 2, 29));
check("29 Feb 2001 invalid", !isValidCalendarDate(2001, 2, 29));
check("31 Apr 1990 invalid", !isValidCalendarDate(1990, 4, 31));
check("future date rejected", !isValidCalendarDate(2099, 1, 1));

check(
  "incomplete month message",
  validateLifePathFields({ year: "1990", month: "", day: "15" }).ok === false &&
    (!validateLifePathFields({ year: "1990", month: "", day: "15" }).ok
      ? validateLifePathFields({ year: "1990", month: "", day: "15" }).message
      : "") === "Please choose a month.",
);

const failed = cases.filter((c) => !c.pass);
console.log(`\n${cases.length - failed.length}/${cases.length} passed`);
if (failed.length) process.exit(1);
