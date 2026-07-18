/**
 * Lumen QA — Disclaimer Page Refinement Spec v1.0 (Page 12)
 * Run: npx tsx scripts/lumen-qa-disclaimer-refinement-v1.ts
 */
import fs from "node:fs";
import path from "node:path";

const BASE = (process.env.QA_BASE_URL ?? "https://www.1320soulcode.com").replace(/\/$/, "");
const VIEWPORT = { width: 390, height: 844 };
const DESKTOP_VIEWPORT = { width: 1280, height: 900 };
const MOBILE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const ARTIFACT = path.join(
  process.cwd(),
  "qa-artifacts",
  "LUMEN_QA_DISCLAIMER_REFINEMENT_v1_2026-07-18.md",
);

type CheckResult = { name: string; pass: boolean; notes: string[] };
const results: CheckResult[] = [];

function record(name: string, pass: boolean, notes: string[]) {
  results.push({ name, pass, notes });
  console.log(`\n=== ${name}: ${pass ? "PASS" : "FAIL"} ===`);
  for (const note of notes) console.log(`  - ${note}`);
}

async function resolveExecutablePath(): Promise<string> {
  const localPath = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  if (localPath) return localPath;
  const winChrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  if (fs.existsSync(winChrome)) return winChrome;
  const chromium = await import("@sparticuz/chromium");
  return chromium.default.executablePath();
}

async function noHorizontalOverflow(page: import("puppeteer-core").Page): Promise<boolean> {
  return page.evaluate(
    () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
  );
}

async function main() {
  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await resolveExecutablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: DESKTOP_VIEWPORT,
  });

  try {
    const page = await browser.newPage();
    console.log(`QA URL: ${BASE}/disclaimer`);
    await page.goto(`${BASE}/disclaimer`, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".disclaimer-page--refined", { timeout: 45_000 });

    const desktop = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const segmentCards = document.querySelectorAll(".disclaimer-segment-item").length;
      const cards = document.querySelectorAll(".disclaimer-card").length;
      const mantra = (document.querySelector(".footer-mantra")?.textContent ?? "").trim();
      const goldInCta = document.querySelectorAll(".disclaimer-cta .gold-button").length;
      const copyFont = parseFloat(
        getComputedStyle(document.querySelector(".disclaimer-copy") ?? document.body).fontSize,
      );
      return { text, segmentCards, cards, mantra, goldInCta, copyFont };
    });

    const required = [
      "disclaimer",
      "symbolic mirror",
      "you remain the authority",
      "not a fixed identity",
      "reflection, not instruction",
      "medical",
      "psychological",
      "legal",
      "financial",
      "crisis",
      "segment-specific boundaries",
      "s2 · relationships",
      "who you will attract",
      "s6 · value & receiving",
      "money prediction",
      "s7 · soul sovereignty",
      "accountability",
      "s8 · soul contribution",
      "public success",
      "s9 · return to source",
      "spiritual superiority",
      "intelligence signals only",
      "fictional data",
      "personal integration sessions",
      "guarantee outcomes",
      "continue with clarity",
      "info@1320soulcode.com",
    ];

    const missing = required.filter((p) => !desktop.text.includes(p));
    const framingFail = [
      desktop.text.includes("not a sentence") ? "not a sentence" : "",
      desktop.text.includes("who you will attract") &&
      !desktop.text.includes("does not predict") &&
      !desktop.text.includes("not predict")
        ? "s2 attract uncorrected"
        : "",
    ].filter(Boolean);

    const mantraOk = desktop.mantra.toUpperCase().includes("NOT A FIXED IDENTITY");
    const desktopPass =
      missing.length === 0 &&
      framingFail.length === 0 &&
      desktop.segmentCards === 5 &&
      desktop.cards >= 5 &&
      desktop.cards <= 8 &&
      desktop.goldInCta === 1 &&
      mantraOk;

    record("Desktop disclaimer trust boundary", desktopPass, [
      `required missing (${missing.length}): ${missing.join(", ") || "none"}`,
      `framing fail: ${framingFail.join(", ") || "none"}`,
      `segment cards: ${desktop.segmentCards}`,
      `disclaimer cards: ${desktop.cards}`,
      `CTA gold buttons: ${desktop.goldInCta}`,
      `copy font: ${desktop.copyFont}`,
      `footer mantra: ${desktop.mantra}`,
    ]);

    await page.setViewport(VIEWPORT);
    await page.setUserAgent(MOBILE_UA);
    await page.reload({ waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".disclaimer-page--refined", { timeout: 45_000 });

    const mobile = await page.evaluate(() => {
      const copyFont = parseFloat(
        getComputedStyle(document.querySelector(".disclaimer-copy") ?? document.body).fontSize,
      );
      const bodyFont = parseFloat(getComputedStyle(document.body).fontSize);
      return { copyFont, bodyFont };
    });
    const overflow = await noHorizontalOverflow(page);
    const mobilePass = overflow && mobile.copyFont >= 16.5;

    record("Mobile disclaimer readability", mobilePass, [
      `copy font: ${mobile.copyFont}`,
      `body font: ${mobile.bodyFont}`,
      `no horizontal overflow: ${overflow}`,
    ]);
  } finally {
    await browser.close();
  }

  const allPass = results.every((r) => r.pass);
  const md = [
    "# Lumen QA — Disclaimer Page Refinement v1.0",
    "",
    `Date: 2026-07-18`,
    `Base: ${BASE}`,
    `Verdict: **${allPass ? "PASS" : "FAIL"}**`,
    "",
    ...results.flatMap((r) => [
      `## ${r.name}: ${r.pass ? "PASS" : "FAIL"}`,
      ...r.notes.map((n) => `- ${n}`),
      "",
    ]),
  ].join("\n");
  fs.mkdirSync(path.dirname(ARTIFACT), { recursive: true });
  fs.writeFileSync(ARTIFACT, md, "utf8");
  console.log(`\nWrote ${ARTIFACT}`);
  console.log(`\nOVERALL: ${allPass ? "PASS" : "FAIL"}`);
  process.exit(allPass ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
