/**
 * Lumen QA — Personal Integration Session Pricing & Product Tier Update · Launch v1
 * Run: npx tsx scripts/lumen-qa-session-pricing-launch-v1.ts
 *
 * Defaults to local. Override: QA_BASE_URL=https://www.1320soulcode.com
 */
import fs from "node:fs";
import path from "node:path";

const BASE = (process.env.QA_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const OUT_DIR = path.join(process.cwd(), "qa-artifacts", "session-pricing-launch-v1");
const REPORT = path.join(process.cwd(), "qa-artifacts", "LUMEN_QA_SESSION_PRICING_LAUNCH_V1.md");

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
    console.log(`QA URL: ${BASE}/booking`);
    await page.goto(`${BASE}/booking`, { waitUntil: "networkidle2", timeout: 90_000 });
    await page.waitForSelector(".booking-page--refined", { timeout: 45_000 });

    const desktop = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").replace(/\s+/g, " ");
      const cards = Array.from(document.querySelectorAll(".booking-session-card")).map((card) => {
        const title = (card.querySelector("h3")?.textContent ?? "").trim();
        const meta = (card.querySelector(".conversion-reading-duration")?.textContent ?? "").trim();
        const cta = (card.querySelector(".conversion-reading-cta")?.textContent ?? "").trim();
        const badge = (card.querySelector(".booking-session-badge")?.textContent ?? "").trim();
        const recommended = card.classList.contains("booking-session-card--recommended");
        return { title, meta, cta, badge, recommended };
      });
      const bannedPatterns = [
        /\bbasic\b/i,
        /\bstandard\b/i,
        /\bpremium\b/i,
        /\bstarter\b/i,
        /gst-free/i,
        /plus\s+gst/i,
        /%\s*off/i,
        /limited time/i,
        /crossed.?out/i,
      ];
      return {
        cards,
        hasMostRecommended: /Most Recommended/i.test(text),
        hasAud168: /AUD\s*168/.test(text),
        hasAud228: /AUD\s*228/.test(text),
        hasAud298: /AUD\s*298/.test(text),
        bannedHits: bannedPatterns.filter((re) => re.test(text)).map((re) => String(re)),
        payCtaCount: (text.match(/Pay & Book Session/g) ?? []).length,
      };
    });

    await page.screenshot({
      path: path.join(OUT_DIR, "booking-desktop-1280.png"),
      fullPage: true,
    });

    const titlesOk =
      desktop.cards[0]?.title === "Blueprint Integration Session" &&
      desktop.cards[1]?.title === "Focused Life Integration Session" &&
      desktop.cards[2]?.title === "Deep Blueprint Integration Session";
    const orderPricesOk =
      /45 minutes.*AUD 168/i.test(desktop.cards[0]?.meta ?? "") &&
      /60 minutes.*AUD 228/i.test(desktop.cards[1]?.meta ?? "") &&
      /75 minutes.*AUD 298/i.test(desktop.cards[2]?.meta ?? "");
    const recommendedOk =
      desktop.cards[1]?.recommended === true &&
      /Most Recommended/i.test(desktop.cards[1]?.badge ?? "");
    const ctasOk = desktop.cards.every((c) => c.cta === "Pay & Book Session");

    record("Session cards — titles, order, prices", titlesOk && orderPricesOk, [
      `cards: ${desktop.cards.map((c) => `${c.title} | ${c.meta}`).join(" || ")}`,
    ]);
    record("Most Recommended on 60-minute card", recommendedOk, [
      `badge=${desktop.cards[1]?.badge ?? "(none)"} recommendedClass=${desktop.cards[1]?.recommended}`,
    ]);
    record("CTA Pay & Book Session on all cards", ctasOk, desktop.cards.map((c) => c.cta));
    record("No banned tier / discount / GST language", desktop.bannedHits.length === 0, [
      desktop.bannedHits.length ? `hits: ${desktop.bannedHits.join(", ")}` : "none",
    ]);
    record("Launch prices present", desktop.hasAud168 && desktop.hasAud228 && desktop.hasAud298, [
      `168=${desktop.hasAud168} 228=${desktop.hasAud228} 298=${desktop.hasAud298}`,
    ]);
    record("Desktop no horizontal overflow", await noHorizontalOverflow(page), []);

    await page.setViewport({ width: 390, height: 844 });
    await page.reload({ waitUntil: "networkidle2", timeout: 90_000 });
    await page.screenshot({
      path: path.join(OUT_DIR, "booking-mobile-390.png"),
      fullPage: true,
    });
    record("Mobile no horizontal overflow", await noHorizontalOverflow(page), []);

    // Catalog / API sanity (no charge)
    const catalog = await import("../lib/personal-integration/session-catalog");
    const products = catalog.SESSION_PRODUCT_ORDER.map((id) => catalog.SESSION_CATALOG[id]);
    record("Catalog snapshot launch-v1", products.every((p) => p.pricingVersion === "launch-v1"), [
      products.map((p) => `${p.id}:${p.durationMinutes}:${p.priceAmount}:${p.currency}`).join(" | "),
    ]);
    record(
      "Focused Life is default + most recommended",
      catalog.DEFAULT_SESSION_VARIANT === "focused_life_integration" &&
        catalog.SESSION_CATALOG.focused_life_integration.mostRecommended,
      [],
    );
  } finally {
    await browser.close();
  }

  const failed = results.filter((r) => !r.pass);
  const lines = [
    "# Lumen QA — Session Pricing Launch v1",
    "",
    `Base: ${BASE}`,
    `Date: ${new Date().toISOString()}`,
    `Result: ${failed.length === 0 ? "PASS" : "FAIL"}`,
    "",
    ...results.map((r) => `- **${r.name}**: ${r.pass ? "PASS" : "FAIL"} — ${r.notes.join("; ")}`),
    "",
    `Screenshots: \`${OUT_DIR}\``,
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
