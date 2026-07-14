/**
 * Production Lumen QA — Commercial Output Layer Step 4 (S7–S9).
 * Run: npx tsx scripts/lumen-qa-commercial-step4-prod.ts
 */
const BASE = "https://www.1320soulcode.com";

const DATES = [
  { label: "1980-05-22", url: "/full-report-v2?year=1980&month=5&day=22" },
  { label: "1982-02-03", url: "/full-report-v2?year=1982&month=2&day=3" },
  { label: "1977-11-12", url: "/full-report-v2?year=1977&month=11&day=12" },
  { label: "1988-07-14", url: "/full-report-v2?year=1988&month=7&day=14" },
  { label: "1990-03-09", url: "/full-report-v2?year=1990&month=3&day=9" },
];

const TRIGGERS = [
  "It invites the user",
  "Commercial report output layer",
  "This Soul Origin reflects",
];

async function fetchText(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120" },
  });
  return { status: res.status, text: await res.text() };
}

async function main() {
  let fails = 0;

  for (const d of DATES) {
    const { status, text } = await fetchText(d.url);
    const triggers = TRIGGERS.filter((t) => text.includes(t));
    const hasS7 = /S7-\d{2}/.test(text);
    const hasS8 = /S8-\d{2}/.test(text);
    const hasS9 = /S9-\d{2}/.test(text);
    const pass = status === 200 && triggers.length === 0 && hasS7 && hasS8 && hasS9;
    if (!pass) fails++;

    console.log(`--- ${d.label} ${status === 200 ? "OK" : `HTTP ${status}`} ---`);
    console.log(`S7/S8/S9 codes present: ${hasS7 && hasS8 && hasS9 ? "PASS" : "FAIL"}`);
    if (triggers.length) console.log(`TRIGGERS: ${triggers.join(", ")}`);
    console.log(`overall: ${pass ? "PASS" : "FAIL"}\n`);
  }

  const mobile = await fetchText("/full-report-v2");
  const mobileRedirect =
    mobile.status === 307 || mobile.status === 308
      ? mobile.text.includes("mobile-report-v2")
      : false;
  console.log("--- mobile redirect (iPhone UA via middleware tested separately) ---");
  console.log(`desktop fetch: ${mobile.status === 200 ? "PASS" : "NOTE"}`);

  process.exit(fails > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export {};
