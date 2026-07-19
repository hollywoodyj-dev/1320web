/**
 * Lumen QA — Checkout Success / Full Report Unlock bridge
 * Run: npx tsx scripts/lumen-qa-checkout-success-refinement-v1.ts
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
  "LUMEN_QA_CHECKOUT_SUCCESS_REFINEMENT_v1_2026-07-19.md",
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
    const url = `${BASE}/checkout/success`;
    console.log(`QA URL: ${url}`);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".checkout-success-page--refined", { timeout: 45_000 });

    const desktop = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const compactFooter = Boolean(document.querySelector(".auth-compact-footer"));
      const fullFooterGrid = Boolean(document.querySelector(".site-footer .footer-column"));
      const newsletter = Boolean(
        document.querySelector(".footer-subscribe, [class*='subscribe'] input[type='email']"),
      );
      const generateCta = Array.from(document.querySelectorAll(".topbar-cta, a.gold-button")).some(
        (el) => (el.textContent ?? "").toLowerCase().includes("generate"),
      );
      const brokenReportCta = Array.from(document.querySelectorAll("a.gold-button")).some((a) => {
        const href = a.getAttribute("href") ?? "";
        const label = (a.textContent ?? "").toLowerCase();
        return href === "/my-report" && label.includes("report");
      });
      const mantra = (
        document.querySelector(".auth-compact-footer-mantra, .footer-mantra")?.textContent ?? ""
      ).trim();
      const sessionLeak =
        text.includes("session_id") ||
        text.includes("cs_test_") ||
        text.includes("cs_live_") ||
        text.includes("checkout.session");
      return {
        text,
        compactFooter,
        fullFooterGrid,
        newsletter,
        generateCta,
        brokenReportCta,
        mantra,
        sessionLeak,
        hasTitle: text.includes("your full report is opening"),
        hasReassure: text.includes("purchase was received"),
        hasHome: text.includes("return home"),
        hasSupport: text.includes("contact support"),
        hasAccount: text.includes("my account") || text.includes("recover report"),
      };
    });

    const framingFail = [
      desktop.fullFooterGrid ? "full marketing footer" : "",
      desktop.newsletter ? "newsletter" : "",
      desktop.text.includes("not a sentence") ? "not a sentence" : "",
      desktop.generateCta ? "generate CTA" : "",
      desktop.brokenReportCta ? "hardcoded /my-report CTA" : "",
      desktop.sessionLeak ? "session/technical leak" : "",
    ].filter(Boolean);

    const mantraOk =
      desktop.mantra.toUpperCase().includes("YOUR BLUEPRINT IS A MIRROR") &&
      desktop.mantra.toUpperCase().includes("NOT A FIXED IDENTITY");

    const desktopPass =
      framingFail.length === 0 &&
      desktop.compactFooter &&
      desktop.hasTitle &&
      desktop.hasReassure &&
      desktop.hasHome &&
      desktop.hasSupport &&
      desktop.hasAccount &&
      mantraOk;

    record("Desktop checkout success bridge", desktopPass, [
      `framing fail: ${framingFail.join(", ") || "none"}`,
      `compact footer: ${desktop.compactFooter}`,
      `generate CTA: ${desktop.generateCta}`,
      `broken report CTA: ${desktop.brokenReportCta}`,
      `footer mantra: ${desktop.mantra}`,
    ]);

    await page.setViewport(VIEWPORT);
    await page.setUserAgent(MOBILE_UA);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".checkout-success-page--refined", { timeout: 45_000 });
    const overflow = await noHorizontalOverflow(page);
    record("Mobile no overflow", overflow, [`no horizontal overflow: ${overflow}`]);
  } finally {
    await browser.close();
  }

  const allPass = results.every((r) => r.pass);
  const md = [
    "# Lumen QA — Checkout Success Refinement v1.0",
    "",
    `Date: 2026-07-19`,
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
  console.log(`\nVerdict: ${allPass ? "PASS" : "FAIL"}`);
  if (!allPass) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
