/**
 * Production Lumen QA — Commercial Output Layer Step 2 (S0–S3).
 * Run: npx tsx scripts/lumen-qa-commercial-step2-prod.ts
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
  "This Soul Origin reflects",
  "It invites the user",
  "This vibration tier reflects",
  "Who You Attract",
  "Commercial report output layer",
  "missing: s1.soulTraits",
  "missing: s1.coreLesson",
  "Your Integrated Soul Blueprint could not be generated",
];

const GOVERNANCE = [
  { phrase: "who you attract", note: "S2 mirror governance" },
  { phrase: "destined partner", note: "S2 mirror governance" },
  { phrase: "compatibility verdict", note: "S2 mirror governance" },
  { phrase: "spiritual rank", note: "S3 non-ranking" },
  { phrase: "spiritual hierarchy", note: "S3 non-ranking" },
];

async function fetchText(path: string) {
  const res = await fetch(`${BASE}${path}`, { headers: { "User-Agent": "LumenQA/1" } });
  return { status: res.status, text: await res.text() };
}

function extractCodes(html: string) {
  const codes = [...html.matchAll(/S[0-3]-\d{2}/g)].map((m) => m[0]);
  return [...new Set(codes)];
}

function orderOk(html: string) {
  const s1 = html.search(/S1-\d{2}/);
  const s3 = html.search(/S3-\d{2}/);
  const s2 = html.search(/S2-\d{2}/);
  const s0 = html.search(/S0-\d{2}/);
  if (s1 < 0 || s3 < 0 || s2 < 0 || s0 < 0) return false;
  return s1 < s3 && s3 < s2 && s2 < s0;
}

function hasYouLanguage(html: string) {
  return /\byou\b/i.test(html) || /\byour\b/i.test(html);
}

async function main() {
let fails = 0;

for (const d of DATES) {
  const { status, text } = await fetchText(d.url);
  const codes = extractCodes(text);
  const triggers = TRIGGERS.filter((t) => text.includes(t));
  const gov = GOVERNANCE.filter((g) => text.toLowerCase().includes(g.phrase));
  const okOrder = orderOk(text);
  const pass = status === 200 && triggers.length === 0 && okOrder;
  if (!pass) fails++;

  console.log(`--- ${d.label} ${status === 200 ? "OK" : `HTTP ${status}`} ---`);
  console.log(`codes: ${codes.join(" / ")}`);
  console.log(`order S1->S3->S2->S0: ${okOrder ? "PASS" : "FAIL"}`);
  console.log(`direct you/your language: ${hasYouLanguage(text) ? "PASS" : "NOTE"}`);
  if (triggers.length) console.log(`TRIGGERS: ${triggers.join(", ")}`);
  if (gov.length) console.log(`GOV HITS: ${gov.map((g) => `${g.phrase} (${g.note})`).join(", ")}`);
  console.log(`overall: ${pass ? "PASS" : "FAIL"}\n`);
}

const fr = await fetchText("/full-report-v2");
const frTriggers = TRIGGERS.filter((t) => fr.text.includes(t));
const frCodes = extractCodes(fr.text);
const frOrder = orderOk(fr.text);
const frPass = fr.status === 200 && frTriggers.length === 0 && frOrder;
if (!frPass) fails++;

console.log("--- full-report-v2 ---");
console.log(`codes: ${frCodes.join(" / ")}`);
console.log(`order: ${frOrder ? "PASS" : "FAIL"}`);
if (frTriggers.length) console.log(`TRIGGERS: ${frTriggers.join(", ")}`);
console.log(`overall: ${frPass ? "PASS" : "FAIL"}`);

process.exit(fails > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
