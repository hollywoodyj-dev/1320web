/**
 * Lumen QA — Free → Full Funnel Phase F1
 * Run: npx tsx scripts/lumen-qa-free-full-funnel-f1.ts
 */
import fs from "node:fs";
import path from "node:path";

const BASE = (process.env.QA_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const OUT_DIR = path.join(process.cwd(), "qa-artifacts", "free-full-funnel-f1");
const REPORT = path.join(process.cwd(), "qa-artifacts", "LUMEN_QA_FREE_FULL_FUNNEL_F1.md");

type Check = { name: string; pass: boolean; notes: string[] };
const results: Check[] = [];

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

async function noOverflow(page: import("puppeteer-core").Page): Promise<boolean> {
  return page.evaluate(
    () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
  );
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await resolveExecutablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: { width: 1280, height: 900 },
  });

  try {
    const page = await browser.newPage();
    await page.goto(`${BASE}/free-soul-blueprint?utm_source=lumen&utm_campaign=f1-qa`, {
      waitUntil: "networkidle2",
      timeout: 90_000,
    });
    await page.waitForSelector(".fsb-page", { timeout: 45_000 });

    const landing = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").replace(/\s+/g, " ");
      const gold = Array.from(document.querySelectorAll(".gold-button")).map((el) =>
        (el.textContent ?? "").trim(),
      );
      return {
        hasHeroCta: gold.some((g) => /Discover My Free Soul Blueprint/i.test(g)),
        hasBuyPrimary: /Buy Full Report/i.test(text) && gold.some((g) => /Buy/i.test(g)),
        hasSessionPrices: /USD 119|USD 159|USD 209|AUD 168/.test(text),
        hasFoundations: /Four Foundations/i.test(text),
        hasBoundary: /Not prediction/i.test(text),
        hasSampleLabel: /Sample Content/i.test(text),
        competingPrimaries: gold.filter((g) => !/Discover My Free Soul Blueprint|OPENING/i.test(g)),
      };
    });

    await page.screenshot({ path: path.join(OUT_DIR, "landing-desktop-1280.png"), fullPage: true });
    record("Landing hero CTA + no Session prices", landing.hasHeroCta && !landing.hasSessionPrices, [
      `cta=${landing.hasHeroCta} sessionPrices=${landing.hasSessionPrices}`,
    ]);
    record("Landing foundations + boundary + sample label", landing.hasFoundations && landing.hasBoundary && landing.hasSampleLabel, []);
    record("Desktop no overflow", await noOverflow(page), []);

    await page.setViewport({ width: 390, height: 844 });
    await page.reload({ waitUntil: "networkidle2", timeout: 90_000 });
    await page.screenshot({ path: path.join(OUT_DIR, "landing-mobile-390.png"), fullPage: true });
    record("Mobile no overflow", await noOverflow(page), []);

    // Birth date → generating → result (continuity)
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(`${BASE}/free-soul-blueprint`, { waitUntil: "networkidle2", timeout: 90_000 });
    await page.type('input[name="month"]', "5");
    await page.type('input[name="day"]', "22");
    await page.type('input[name="year"]', "1980");
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2", timeout: 90_000 }),
      page.click(".fsb-hero-form button[type='submit']"),
    ]);

    const onGenerating = page.url().includes("/generating");
    record("Submit opens generating", onGenerating, [page.url()]);

    await page.waitForFunction(() => location.pathname.includes("/result"), { timeout: 90_000 });
    await page.waitForSelector(".report-dashboard", { timeout: 45_000 });
    const result = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").replace(/\s+/g, " ");
      const offerPrice = (document.querySelector(".fsb-offer-price")?.textContent ?? "").trim();
      return {
        hasOpened: /Your Code Has Opened|Soul Origin Code/i.test(text),
        hasMissingMap: /Your Foundation Is Only the Beginning/i.test(text),
        hasOffer: /Meet Your Complete Soul Blueprint|Unlock My Full Soul Blueprint/i.test(text),
        hasSessionCards: /Most Recommended|Blueprint Integration Session/i.test(text),
        offerPrice,
        hasUsdOffer: /^USD\s+\d/.test(offerPrice),
        hasAudOffer: /AUD/i.test(offerPrice) || /\bAUD\s*\d/.test(text),
      };
    });
    await page.screenshot({ path: path.join(OUT_DIR, "result-desktop-1280.png"), fullPage: true });
    record("Result recognition + Missing Map + offer", result.hasOpened && result.hasMissingMap && result.hasOffer, []);
    record("Result has no Session price cards", !result.hasSessionCards, []);
    record("Full Report offer price is USD", result.hasUsdOffer && !result.hasAudOffer, [
      `price=${result.offerPrice || "(missing)"}`,
    ]);

    // Full report sales
    await page.goto(`${BASE}/full-report`, { waitUntil: "networkidle2", timeout: 90_000 });
    const sales = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").replace(/\s+/g, " ");
      return {
        title: /Your Complete Soul Blueprint|Explore Your Complete/i.test(text),
        mirror: /A Mirror, Not a Verdict/i.test(text),
        unlock: /Unlock My Full Report/i.test(text),
        hasAud: /\bAUD\b/.test(text),
        hasUsd: /\bUSD\b/.test(text),
      };
    });
    await page.screenshot({ path: path.join(OUT_DIR, "full-report-desktop-1280.png"), fullPage: true });
    record("Full Report sales Spec alignment", sales.title && sales.mirror && sales.unlock, []);
    record("Full Report sales keeps USD (no AUD)", !sales.hasAud, [
      `usd=${sales.hasUsd} aud=${sales.hasAud}`,
    ]);

    // Alias rewrite
    const alias = await page.goto(`${BASE}/free-soul-blueprint/result?year=1980&month=5&day=22`, {
      waitUntil: "networkidle2",
      timeout: 90_000,
    });
    record("Alias /free-soul-blueprint/result serves result", alias?.ok() === true && (await page.$(".report-dashboard")) !== null, [
      `status=${alias?.status()}`,
    ]);
  } finally {
    await browser.close();
  }

  const failed = results.filter((r) => !r.pass);
  const lines = [
    "# Lumen QA — Free → Full Funnel Phase F1",
    "",
    `Base: ${BASE}`,
    `Date: ${new Date().toISOString()}`,
    `Result: ${failed.length === 0 ? "PASS" : "FAIL"}`,
    "",
    ...results.map((r) => `- **${r.name}**: ${r.pass ? "PASS" : "FAIL"} — ${r.notes.join("; ")}`),
    "",
    `Screenshots: \`${OUT_DIR}\``,
    "",
    "## Continuity notes",
    "- Birth submit uses existing `/generating` → `/result` (no second engine).",
    "- Checkout remains `/checkout`; attribution metadata forwarded when present.",
    "- Entitlement path unchanged: purchase → `/my-report/[reportId]`.",
    "",
  ];
  fs.writeFileSync(REPORT, lines.join("\n"), "utf8");
  console.log(`\nWrote ${REPORT}`);
  if (failed.length) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
