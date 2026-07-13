/**
 * Production Lumen QA — Commercial Output Layer Step 3 (S4–S6).
 * Run: npx tsx scripts/lumen-qa-commercial-step3-prod.ts
 */
const BASE = "https://www.1320soulcode.com";

const DATES = [
  { label: "1980-05-22", url: "/result?year=1980&month=5&day=22" },
  { label: "1982-02-03", url: "/result?year=1982&month=2&day=3" },
  { label: "1977-11-12", url: "/result?year=1977&month=11&day=12" },
  { label: "1988-07-14", url: "/result?year=1988&month=7&day=14" },
  { label: "1990-03-09", url: "/result?year=1990&month=3&day=9" },
];

const TRIGGERS = [
  "It invites the user",
  "This S6 pattern reflects",
  "Money Frequency",
  "Commercial report output layer",
  "财富",
  "丰盛",
  "金矿",
];

const S6_LEGACY = ["prosperity", "abundance", "wealth"];

async function fetchText(path: string) {
  const res = await fetch(`${BASE}${path}`, { headers: { "User-Agent": "LumenQA/1" } });
  return { status: res.status, text: await res.text() };
}

function orderOk(html: string) {
  const s1 = html.search(/S1-\d{2}/);
  const s3 = html.search(/S3-\d{2}/);
  const s2 = html.search(/S2-\d{2}/);
  const s0 = html.search(/S0-\d{2}/);
  if (s1 < 0 || s3 < 0 || s2 < 0 || s0 < 0) return false;
  return s1 < s3 && s3 < s2 && s2 < s0;
}

async function main() {
  let fails = 0;

  for (const d of DATES) {
    const { status, text } = await fetchText(d.url);
    const triggers = TRIGGERS.filter((t) => text.includes(t));
    const s6Legacy = S6_LEGACY.filter((t) => text.toLowerCase().includes(t));
    const okOrder = orderOk(text);
    const pass = status === 200 && triggers.length === 0 && okOrder;
    if (!pass) fails++;

    console.log(`--- ${d.label} ${status === 200 ? "OK" : `HTTP ${status}`} ---`);
    console.log(`order S1->S3->S2->S0: ${okOrder ? "PASS" : "FAIL"}`);
    if (triggers.length) console.log(`TRIGGERS: ${triggers.join(", ")}`);
    if (s6Legacy.length) console.log(`S6 LEGACY (note): ${s6Legacy.join(", ")}`);
    console.log(`overall: ${pass ? "PASS" : "FAIL"}\n`);
  }

  const fr = await fetchText("/full-report-v2");
  const frTriggers = TRIGGERS.filter((t) => fr.text.includes(t));
  const hasS4 = fr.text.includes("S4-14") || fr.text.includes("Loop of Perfection");
  const hasS5 = fr.text.includes("S5-04") || fr.text.includes("Mission of Structure");
  const hasS6 = fr.text.includes("S6-28") || fr.text.includes("Deep Transformer");
  const frPass = fr.status === 200 && frTriggers.length === 0 && hasS4 && hasS5 && hasS6;
  if (!frPass) fails++;

  console.log("--- full-report-v2 ---");
  console.log(`S4/S5/S6 present: ${hasS4 && hasS5 && hasS6 ? "PASS" : "FAIL"}`);
  if (frTriggers.length) console.log(`TRIGGERS: ${frTriggers.join(", ")}`);
  console.log(`overall: ${frPass ? "PASS" : "FAIL"}`);

  process.exit(fails > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
