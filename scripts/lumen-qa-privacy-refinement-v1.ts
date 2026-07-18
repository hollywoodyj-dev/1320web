/**
 * Lumen QA — Privacy Policy Page Refinement Spec v1.0 (Page 13)
 * Run: npx tsx scripts/lumen-qa-privacy-refinement-v1.ts
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
  "LUMEN_QA_PRIVACY_REFINEMENT_v1_2026-07-18.md",
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
    console.log(`QA URL: ${BASE}/privacy`);
    await page.goto(`${BASE}/privacy`, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".privacy-page--refined", { timeout: 45_000 });

    const desktop = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const summaryItems = document.querySelectorAll(".privacy-summary-list li").length;
      const cards = document.querySelectorAll(".privacy-card").length;
      const mantra = (document.querySelector(".footer-mantra")?.textContent ?? "").trim();
      const goldInCta = document.querySelectorAll(".privacy-cta .gold-button").length;
      const summaryNearTop = Boolean(document.querySelector("#summary.privacy-summary-card"));
      const copyFont = parseFloat(
        getComputedStyle(document.querySelector(".privacy-copy") ?? document.body).fontSize,
      );
      return { text, summaryItems, cards, mantra, goldInCta, summaryNearTop, copyFont };
    });

    const required = [
      "privacy policy",
      "privacy summary",
      "birth date",
      "session or local storage",
      "form information",
      "technical data",
      "we do not sell your personal information",
      "medical",
      "psychological",
      "legal",
      "financial",
      "your choices",
      "children",
      "international users",
      "info@1320soulcode.com",
      "continue with clarity",
    ];
    const missing = required.filter((p) => !desktop.text.includes(p));
    const framingFail = [
      desktop.text.includes("never store") ? "never store" : "",
      desktop.text.includes("not a sentence") ? "not a sentence" : "",
    ].filter(Boolean);
    const mantraOk = desktop.mantra.toUpperCase().includes("NOT A FIXED IDENTITY");

    const desktopPass =
      missing.length === 0 &&
      framingFail.length === 0 &&
      desktop.summaryNearTop &&
      desktop.summaryItems >= 4 &&
      desktop.cards >= 4 &&
      desktop.cards <= 8 &&
      desktop.goldInCta === 1 &&
      mantraOk;

    record("Desktop privacy trust page", desktopPass, [
      `required missing (${missing.length}): ${missing.join(", ") || "none"}`,
      `framing fail: ${framingFail.join(", ") || "none"}`,
      `summary near top: ${desktop.summaryNearTop}`,
      `summary items: ${desktop.summaryItems}`,
      `privacy cards: ${desktop.cards}`,
      `CTA gold buttons: ${desktop.goldInCta}`,
      `copy font: ${desktop.copyFont}`,
      `footer mantra: ${desktop.mantra}`,
    ]);

    await page.setViewport(VIEWPORT);
    await page.setUserAgent(MOBILE_UA);
    await page.reload({ waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".privacy-page--refined", { timeout: 45_000 });

    const mobile = await page.evaluate(() => {
      const copyFont = parseFloat(
        getComputedStyle(document.querySelector(".privacy-copy") ?? document.body).fontSize,
      );
      const summaryFont = parseFloat(
        getComputedStyle(
          document.querySelector(".privacy-summary-list li") ?? document.body,
        ).fontSize,
      );
      return { copyFont, summaryFont };
    });
    const overflow = await noHorizontalOverflow(page);
    const mobilePass = overflow && mobile.copyFont >= 16.5 && mobile.summaryFont >= 16.5;

    record("Mobile privacy readability", mobilePass, [
      `copy font: ${mobile.copyFont}`,
      `summary font: ${mobile.summaryFont}`,
      `no horizontal overflow: ${overflow}`,
    ]);
  } finally {
    await browser.close();
  }

  const allPass = results.every((r) => r.pass);
  const md = [
    "# Lumen QA — Privacy Policy Page Refinement v1.0",
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
