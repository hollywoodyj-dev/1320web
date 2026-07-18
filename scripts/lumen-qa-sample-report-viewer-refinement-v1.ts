/**
 * Lumen QA — Sample Report Viewer Refinement Spec v1.0 (Page 10)
 * Run: npx tsx scripts/lumen-qa-sample-report-viewer-refinement-v1.ts
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
  "LUMEN_QA_SAMPLE_REPORT_VIEWER_REFINEMENT_v1_2026-07-18.md",
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

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".sample-report-viewer", { timeout: 60_000 });

    const desktop = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const pageIds = Array.from(document.querySelectorAll(".report-page[data-page-id]")).map(
        (el) => el.getAttribute("data-page-id") ?? "",
      );
      const foundationOrder = ["s1-origin", "s3-vibration", "s2-mirror", "s0-void"];
      const foundationIdx = foundationOrder.map((id) => pageIds.indexOf(id));
      const orderOk = foundationIdx.every((v, i, arr) => v >= 0 && (i === 0 || v > arr[i - 1]!));

      const chapters = Array.from(document.querySelectorAll(".report-chapter-label")).map((el) =>
        (el.textContent ?? "").trim().toLowerCase(),
      );
      const lockedBlocks = document.querySelectorAll(".locked-preview-block").length;
      const lockedItems = document.querySelectorAll(".sample-locked-item").length;
      const lockedGold = document.querySelectorAll(".sample-locked-preview .gold-button").length;
      const navLinks = document.querySelectorAll(".report-viewer-nav a").length;
      const goldInIntro = document.querySelectorAll(".sample-report-intro .gold-button").length;
      const s1Cards = document.querySelectorAll(
        '[data-page-id="s1-origin"] .report-insight-card',
      ).length;

      return {
        text,
        orderOk,
        chapters,
        lockedBlocks,
        lockedItems,
        lockedGold,
        navLinks,
        goldInIntro,
        s1Cards,
        hasViewer: Boolean(document.querySelector(".sample-report-viewer")),
        hasLockedSection: Boolean(document.querySelector("#locked.sample-locked-preview")),
        hasFinal: Boolean(document.querySelector(".sample-report-final")),
      };
    });

    const required = [
      "sample soul blueprint report",
      "preview mode",
      "chapter 01",
      "chapter 04",
      "available in the full report",
      "reflection, not instruction",
      "you remain the authority",
    ];
    const framingFail = ["who you attract", "spiritual maturity"].filter((p) =>
      desktop.text.includes(p),
    );
    const missing = required.filter((p) => !desktop.text.includes(p));

    const desktopPass =
      missing.length === 0 &&
      framingFail.length === 0 &&
      desktop.orderOk &&
      desktop.hasViewer &&
      desktop.hasLockedSection &&
      desktop.navLinks >= 8 &&
      desktop.goldInIntro === 1 &&
      desktop.lockedGold === 1 &&
      desktop.lockedBlocks === 0 &&
      desktop.lockedItems >= 8 &&
      desktop.s1Cards > 0 &&
      desktop.s1Cards <= 6 &&
      desktop.hasFinal;

    record("Desktop guided viewer", desktopPass, [
      `required missing (${missing.length}): ${missing.join(", ") || "none"}`,
      `framing fail: ${framingFail.join(", ") || "none"}`,
      `foundation order: ${desktop.orderOk}`,
      `nav links: ${desktop.navLinks}`,
      `chapters found: ${desktop.chapters.length}`,
      `individual locked-preview-block: ${desktop.lockedBlocks}`,
      `compact locked items: ${desktop.lockedItems}`,
      `locked section gold CTAs: ${desktop.lockedGold}`,
      `S1 cards: ${desktop.s1Cards}`,
    ]);

    await page.setViewport(VIEWPORT);
    await page.setUserAgent(MOBILE_UA);
    await page.reload({ waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".report-viewer-nav", { timeout: 45_000 });

    const mobile = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const bodyFont = parseFloat(getComputedStyle(document.body).fontSize);
      const nav = document.querySelector(".report-viewer-nav");
      const navOverflowX = nav
        ? getComputedStyle(nav).overflowX
        : "";
      return {
        text,
        bodyFont,
        navOverflowX,
        hasViewer: Boolean(document.querySelector(".sample-report-viewer")),
      };
    });
    const overflow = await noHorizontalOverflow(page);
    const mobilePass =
      mobile.hasViewer &&
      overflow &&
      mobile.bodyFont >= 16 &&
      mobile.text.includes("preview mode") &&
      (mobile.navOverflowX === "auto" || mobile.navOverflowX === "scroll");

    record("Mobile viewer chrome", mobilePass, [
      `viewer shell: ${mobile.hasViewer}`,
      `nav overflow-x: ${mobile.navOverflowX}`,
      `no horizontal overflow: ${overflow}`,
      `body font: ${mobile.bodyFont}`,
    ]);
  } finally {
    await browser.close();
  }

  const allPass = results.every((r) => r.pass);
  const md = [
    "# Lumen QA — Sample Report Viewer Refinement v1.0 (Page 10)",
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
