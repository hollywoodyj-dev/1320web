/**
 * v2 S0–S9 calculation smoke — canonical birth dates from steward examples.
 * Run: npm run smoke:v2-calculation
 */
import { calculate1320Code } from "../lib/calculate1320Code";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error("FAIL:", message);
    process.exit(1);
  }
}

type Case = {
  label: string;
  year: number;
  month: number;
  day: number;
  awareness: string;
  s4: string;
  s5: string;
  s6: string;
  s7: string;
  s8: string;
  s9: string;
};

const cases: Case[] = [
  {
    label: "1980-05-22 (Case A)",
    year: 1980,
    month: 5,
    day: 22,
    awareness: "S1-18 / S3-03 / S2-27 / S0-07",
    s4: "S4-14",
    s5: "S5-04",
    s6: "S6-28",
    s7: "S7-00",
    s8: "S8-00",
    s9: "S9-07",
  },
  {
    label: "1988-07-14 (sample report)",
    year: 1988,
    month: 7,
    day: 14,
    awareness: "S1-26 / S3-03 / S2-21 / S0-18",
    s4: "S4-19",
    s5: "S5-06",
    s6: "S6-03",
    s7: "S7-02",
    s8: "S8-03",
    s9: "S9-04",
  },
  {
    label: "1977-11-12 (W1)",
    year: 1977,
    month: 11,
    day: 12,
    awareness: "S1-24 / S3-04 / S2-23 / S0-09",
    s4: "S4-12",
    s5: "S5-07",
    s6: "S6-37",
    s7: "S7-00",
    s8: "S8-04",
    s9: "S9-01",
  },
];

console.log("=== v2 calculation smoke ===\n");

for (const c of cases) {
  const code = calculate1320Code(c.year, c.month, c.day);
  console.log(c.label);
  assert(code.codeString === c.awareness, `${c.label} awareness: expected ${c.awareness}, got ${code.codeString}`);
  assert(code.s4Code === c.s4, `${c.label} S4: expected ${c.s4}, got ${code.s4Code}`);
  assert(code.s5Code === c.s5, `${c.label} S5: expected ${c.s5}, got ${code.s5Code}`);
  assert(code.s6Code === c.s6, `${c.label} S6: expected ${c.s6}, got ${code.s6Code}`);
  assert(code.s7Code === c.s7, `${c.label} S7: expected ${c.s7}, got ${code.s7Code}`);
  assert(code.s8Code === c.s8, `${c.label} S8: expected ${c.s8}, got ${code.s8Code}`);
  assert(code.s9Code === c.s9, `${c.label} S9: expected ${c.s9}, got ${code.s9Code}`);
  assert(code.fullCompactCode.endsWith(c.s9), `${c.label} full chain should end with ${c.s9}`);
  console.log("  awareness:", code.codeString);
  console.log("  S4–S9:", `${code.s4Code} ${code.s5Code} ${code.s6Code} ${code.s7Code} ${code.s8Code} ${code.s9Code}`);
  console.log("");
}

console.log("PASS: smoke-v2-calculation — S0–S9 chain for canonical dates");
