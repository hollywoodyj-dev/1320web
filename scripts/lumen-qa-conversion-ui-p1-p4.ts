/**
 * Lumen QA — Conversion UI Refinement Launch v1 · P1–P4
 * Run: npx tsx scripts/lumen-qa-conversion-ui-p1-p4.ts
 */
import fs from "node:fs";
import path from "node:path";

const BASE = (process.env.QA_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const OUT_DIR = path.join(process.cwd(), "qa-artifacts", "conversion-ui-p1-p4");
const REPORT = path.join(process.cwd(), "qa-artifacts", "LUMEN_QA_CONVERSION_UI_P1_P4.md");

type Check = { name: string; pass: boolean; notes: string[] };
const results: Check[] = [];

function record(name: string, pass: boolean, notes: string[] = []) {
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

    // P1 Landing
    await page.goto(`${BASE}/free-soul-blueprint`, { waitUntil: "networkidle2", timeout: 90_000 });
    await page.waitForSelector(".fsb-page", { timeout: 45_000 });
    const lp = await page.evaluate(() => {
      const root = document.querySelector(".fsb-page");
      const text = (root?.textContent ?? "").replace(/\s+/g, " ");
      const ctas = Array.from(root?.querySelectorAll(".gold-button") ?? []).map((el) =>
        (el.textContent ?? "").trim(),
      );
      return {
        hasDiscoverCta: ctas.some((c) => /Discover My Free Soul Blueprint/i.test(c)),
        competingInPage: ctas.some((c) => /Buy|Book Session|Unlock|Subscribe|Generate My Code/i.test(c)),
        hasForm: !!document.querySelector('.fsb-hero-form input[name="year"]'),
        sessionPrices: /USD 119|USD 159|USD 209|AUD 168/.test(text),
        foundations: /Origin|Expression|Mirror|Return/i.test(text),
        ctaLabels: ctas,
      };
    });
    await page.screenshot({ path: path.join(OUT_DIR, "p1-landing-desktop-1280.png"), fullPage: true });
    record("P1 LP dominant CTA + form + no Session prices", lp.hasDiscoverCta && !lp.competingInPage && lp.hasForm && !lp.sessionPrices && lp.foundations, [
      JSON.stringify(lp),
    ]);
    record("P1 desktop no overflow", await noOverflow(page));
    await page.setViewport({ width: 390, height: 844 });
    await page.reload({ waitUntil: "networkidle2", timeout: 90_000 });
    await page.screenshot({ path: path.join(OUT_DIR, "p1-landing-mobile-390.png"), fullPage: true });
    record("P1 mobile no overflow", await noOverflow(page));

    // P2 Result rhythm
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(`${BASE}/result?year=1980&month=5&day=22`, {
      waitUntil: "networkidle2",
      timeout: 90_000,
    });
    await page.waitForSelector(".report-dashboard", { timeout: 45_000 });
    const result = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").replace(/\s+/g, " ");
      const ids = Array.from(document.querySelectorAll("[id]")).map((el) => el.id);
      const seg = ids.indexOf("segments");
      const integrated = ids.indexOf("integrated");
      const missing = ids.indexOf("missing-map");
      const offer = ids.indexOf("go-deeper");
      return {
        hasMissing: /Your Foundation Is Only the Beginning/i.test(text),
        hasOffer: /Unlock My Full Soul Blueprint/i.test(text),
        usd49: /USD 49/.test(text),
        sessionCards: /Most Recommended|Pay & Book Session/i.test(text),
        orderOk:
          seg >= 0 &&
          integrated >= 0 &&
          missing >= 0 &&
          offer >= 0 &&
          seg < integrated &&
          integrated < missing &&
          missing < offer,
        competingLearn: /Learn about the Full Report/i.test(text),
      };
    });
    await page.screenshot({ path: path.join(OUT_DIR, "p2-result-desktop-1280.png"), fullPage: true });
    record(
      "P2 result rhythm + USD offer + no Session pressure",
      result.hasMissing && result.hasOffer && result.usd49 && !result.sessionCards && result.orderOk && !result.competingLearn,
      [JSON.stringify(result)],
    );

    // P3 Full Report
    await page.goto(`${BASE}/full-report?year=1980&month=5&day=22`, {
      waitUntil: "networkidle2",
      timeout: 90_000,
    });
    const sales = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").replace(/\s+/g, " ");
      const gold = Array.from(document.querySelectorAll(".gold-button")).map((el) =>
        (el.textContent ?? "").trim(),
      );
      const liveGold = document.querySelector(".full-report-live-path .gold-button");
      return {
        title: /Explore Your Complete Soul Blueprint/i.test(text),
        usd: /USD 49/.test(text),
        foundation: /S1-|S3-|S2-|S0-/.test(text),
        unlockPrimary: gold.some((g) => /Unlock My Full Report/i.test(g)),
        liveSecondary: !liveGold,
        sessionCards: /USD 119|Most Recommended/i.test(text),
        faqCount: document.querySelectorAll(".blueprint-faq-item, details").length,
      };
    });
    await page.screenshot({ path: path.join(OUT_DIR, "p3-full-report-desktop-1280.png"), fullPage: true });
    record(
      "P3 Full Report invitation + personal foundation + USD 49",
      sales.title && sales.usd && sales.foundation && sales.unlockPrimary && sales.liveSecondary && !sales.sessionCards,
      [JSON.stringify(sales)],
    );
    await page.setViewport({ width: 390, height: 844 });
    await page.reload({ waitUntil: "networkidle2", timeout: 90_000 });
    await page.screenshot({ path: path.join(OUT_DIR, "p3-full-report-mobile-390.png"), fullPage: true });
    record("P3 mobile no overflow", await noOverflow(page));

    // P4 Booking
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(`${BASE}/booking`, { waitUntil: "networkidle2", timeout: 90_000 });
    const booking = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").replace(/\s+/g, " ");
      return {
        usd119: /USD 119/.test(text),
        usd159: /USD 159/.test(text),
        usd209: /USD 209/.test(text),
        aud: /AUD 168|AUD 228|AUD 298/.test(text),
        recommended: /Most Recommended/i.test(text),
        cta: /Pay & Book Session/i.test(text),
        consultant: /Blueprint Integration Consultant/i.test(text),
        noBasic: !/\bBasic\b|\bStandard\b|\bPremium\b|\bStarter\b|\bAdvanced\b/.test(text),
      };
    });
    await page.screenshot({ path: path.join(OUT_DIR, "p4-booking-desktop-1280.png"), fullPage: true });
    record(
      "P4 Session USD catalog + Consultant title",
      booking.usd119 &&
        booking.usd159 &&
        booking.usd209 &&
        !booking.aud &&
        booking.recommended &&
        booking.cta &&
        booking.consultant &&
        booking.noBasic,
      [JSON.stringify(booking)],
    );
    await page.setViewport({ width: 390, height: 844 });
    await page.reload({ waitUntil: "networkidle2", timeout: 90_000 });
    await page.screenshot({ path: path.join(OUT_DIR, "p4-booking-mobile-390.png"), fullPage: true });
    record("P4 mobile no overflow", await noOverflow(page));
  } finally {
    await browser.close();
  }

  const failed = results.filter((r) => !r.pass);
  const lines = [
    "# Lumen QA — Conversion UI Refinement · P1–P4",
    "",
    `Base: ${BASE}`,
    `Date: ${new Date().toISOString()}`,
    `Result: ${failed.length === 0 ? "PASS" : "FAIL"}`,
    "",
    ...results.map((r) => `- **${r.name}**: ${r.pass ? "PASS" : "FAIL"} — ${r.notes.join("; ")}`),
    "",
    `Screenshots: \`${OUT_DIR}\``,
    "",
    "## Pricing",
    "- Full Report: USD 49 (unchanged checkout logic)",
    "- Sessions: USD 119 / 159 / 209",
    "- AUD superseded; not displayed",
    "",
    "## Holds",
    "- P5–P8 not started",
    "- Intake Easy Access not rebuilt",
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
