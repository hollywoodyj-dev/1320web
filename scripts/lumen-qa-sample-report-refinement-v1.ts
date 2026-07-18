/**
 * Lumen QA — Sample Report Page Refinement Spec v1.0
 * Run: npx tsx scripts/lumen-qa-sample-report-refinement-v1.ts
 * Optional: QA_BASE_URL=http://localhost:3000
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
  "LUMEN_QA_SAMPLE_REPORT_REFINEMENT_v1_2026-07-18.md",
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
    const url = `${BASE}/full-report-v2?view=desktop&year=1980&month=5&day=22`;
    console.log(`QA URL: ${url}`);

    await page.goto(url, { waitUntil: "networkidle2", timeout: 90_000 });
    await page.waitForSelector('.report-root[data-report-type="sample"]', { timeout: 45_000 });

    const desktop = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const pageIds = Array.from(document.querySelectorAll(".report-page[data-page-id]")).map(
        (el) => el.getAttribute("data-page-id") ?? "",
      );
      const foundationOrder = ["s1-origin", "s3-vibration", "s2-mirror", "s0-void"];
      const foundationIdx = foundationOrder.map((id) => pageIds.indexOf(id));
      const orderOk = foundationIdx.every((v, i, arr) => v >= 0 && (i === 0 || v > arr[i - 1]!));

      const s1Cards = document.querySelectorAll('[data-page-id="s1-origin"] .report-insight-card, [data-page-id="s1-origin"] .report-card');
      const lockedBlocks = document.querySelectorAll(".locked-preview-block").length;
      const hasSideNav = Boolean(document.querySelector(".sample-report-side-nav"));
      const introTitle = (document.querySelector(".sample-report-intro-title")?.textContent ?? "")
        .trim()
        .toLowerCase();
      const goldInIntro = document.querySelectorAll(".sample-report-intro .gold-button").length;
      const previewBadge = text.includes("preview mode");
      const availableInFull = (document.body.textContent ?? "").includes("Available in the Full Report.");

      return {
        text,
        orderOk,
        pageIds,
        s1CardCount: s1Cards.length,
        lockedBlocks,
        hasSideNav,
        introTitle,
        goldInIntro,
        previewBadge,
        availableInFull,
        hasRenderer: Boolean(document.querySelector('.report-root[data-report-type="sample"]')),
        hasUnlock: text.includes("unlock"),
        hasGenerate: text.includes("generate my code"),
        hasBoundary: text.includes("symbolic mirror") && text.includes("authority"),
      };
    });

    const required = [
      "sample soul blueprint report",
      "preview mode",
      "four foundation layers",
      "s1",
      "s3",
      "s2",
      "s0",
      "available in the full report",
      "reflection, not instruction",
      "you remain the authority",
    ];
    const missing = required.filter((p) => !desktop.text.includes(p));
    // Boundary intentionally contains "does not predict/diagnose" — only fail positive framing
    const framingFail = ["who you attract", "spiritual maturity"].filter((p) =>
      desktop.text.includes(p),
    );

    const desktopPass =
      missing.length === 0 &&
      framingFail.length === 0 &&
      desktop.orderOk &&
      desktop.hasRenderer &&
      desktop.hasSideNav &&
      desktop.goldInIntro === 1 &&
      desktop.s1CardCount > 0 &&
      desktop.s1CardCount <= 6 &&
      desktop.lockedBlocks >= 6 &&
      desktop.availableInFull;

    record("Desktop sample preview framing", desktopPass, [
      `required missing (${missing.length}): ${missing.join(", ") || "none"}`,
      `framing fail: ${framingFail.join(", ") || "none"}`,
      `foundation order S1→S3→S2→S0: ${desktop.orderOk}`,
      `side nav: ${desktop.hasSideNav}`,
      `intro gold CTAs: ${desktop.goldInIntro}`,
      `S1 insight cards: ${desktop.s1CardCount}`,
      `locked blocks: ${desktop.lockedBlocks}`,
      `available-in-full copy: ${desktop.availableInFull}`,
    ]);

    // Mobile viewport on same desktop URL (view=desktop) for overflow + chips
    await page.setViewport(VIEWPORT);
    await page.setUserAgent(MOBILE_UA);
    await page.reload({ waitUntil: "networkidle2", timeout: 90_000 });
    await page.waitForSelector(".sample-report-chip-nav", { timeout: 45_000 });

    const mobile = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const bodyFont = parseFloat(getComputedStyle(document.body).fontSize);
      const chips = document.querySelectorAll(".sample-report-chip").length;
      return {
        text,
        bodyFont,
        chips,
        hasFinal: Boolean(document.querySelector(".sample-report-final")),
      };
    });
    const overflow = await noHorizontalOverflow(page);
    const mobilePass =
      mobile.chips >= 6 &&
      mobile.hasFinal &&
      overflow &&
      mobile.bodyFont >= 16 &&
      mobile.text.includes("preview mode");

    record("Mobile sample chrome", mobilePass, [
      `chips: ${mobile.chips}`,
      `final CTA: ${mobile.hasFinal}`,
      `no horizontal overflow: ${overflow}`,
      `body font: ${mobile.bodyFont}`,
    ]);
  } finally {
    await browser.close();
  }

  const allPass = results.every((r) => r.pass);
  const md = [
    "# Lumen QA — Sample Report Refinement v1.0",
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
