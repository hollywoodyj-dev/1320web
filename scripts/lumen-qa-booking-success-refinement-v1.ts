/**
 * Lumen QA — Booking Success / Personal Integration Session scheduling bridge
 * Run: npx tsx scripts/lumen-qa-booking-success-refinement-v1.ts
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
  "LUMEN_QA_BOOKING_SUCCESS_REFINEMENT_v1_2026-07-19.md",
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
    const url = `${BASE}/booking/success`;
    console.log(`QA URL: ${url}`);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".booking-success-page--refined", { timeout: 45_000 });

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
      const mantra = (
        document.querySelector(".auth-compact-footer-mantra, .footer-mantra")?.textContent ?? ""
      ).trim();
      const sessionLeak =
        text.includes("session_id") ||
        text.includes("cs_test_") ||
        text.includes("cs_live_") ||
        text.includes("checkout.session");
      const hasScheduleSection = text.includes("schedule your session");
      const hasCalendarState =
        text.includes("loading scheduling calendar") ||
        text.includes("could not load the scheduling calendar") ||
        Boolean(document.querySelector(".booking-success-iframe, .booking-success-schedule-panel"));
      const bookAnother = Array.from(document.querySelectorAll("a")).find((a) =>
        (a.textContent ?? "").toLowerCase().includes("book another"),
      );
      const account = Array.from(document.querySelectorAll("a")).find((a) =>
        (a.textContent ?? "").toLowerCase().includes("return to account"),
      );
      const bookIsTertiary = bookAnother
        ? bookAnother.classList.contains("booking-success-tertiary")
        : true;
      return {
        compactFooter,
        fullFooterGrid,
        newsletter,
        generateCta,
        mantra,
        sessionLeak,
        hasTitle: text.includes("payment confirmed") && text.includes("schedule your session"),
        hasPaidReassure: text.includes("personal integration session is paid"),
        hasScheduleSection,
        hasCalendarState,
        hasAccount: Boolean(account),
        hasSupport: text.includes("contact support"),
        hasBookAnother: Boolean(bookAnother),
        bookIsTertiary,
        notASentence: text.includes("not a sentence"),
      };
    });

    const framingFail = [
      desktop.fullFooterGrid ? "full marketing footer" : "",
      desktop.newsletter ? "newsletter" : "",
      desktop.notASentence ? "not a sentence" : "",
      desktop.generateCta ? "generate CTA" : "",
      desktop.sessionLeak ? "session/technical leak" : "",
      !desktop.bookIsTertiary ? "book another not tertiary" : "",
    ].filter(Boolean);

    const mantraOk =
      desktop.mantra.toUpperCase().includes("YOUR BLUEPRINT IS A MIRROR") &&
      desktop.mantra.toUpperCase().includes("NOT A FIXED IDENTITY");

    const desktopPass =
      framingFail.length === 0 &&
      desktop.compactFooter &&
      desktop.hasTitle &&
      desktop.hasPaidReassure &&
      desktop.hasScheduleSection &&
      desktop.hasCalendarState &&
      desktop.hasAccount &&
      desktop.hasSupport &&
      desktop.hasBookAnother &&
      mantraOk;

    record("Desktop booking success bridge", desktopPass, [
      `framing fail: ${framingFail.join(", ") || "none"}`,
      `compact footer: ${desktop.compactFooter}`,
      `generate CTA: ${desktop.generateCta}`,
      `schedule section: ${desktop.hasScheduleSection}`,
      `calendar state: ${desktop.hasCalendarState}`,
      `footer mantra: ${desktop.mantra}`,
    ]);

    await page.setViewport(VIEWPORT);
    await page.setUserAgent(MOBILE_UA);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".booking-success-page--refined", { timeout: 45_000 });
    const overflow = await noHorizontalOverflow(page);
    record("Mobile no overflow", overflow, [`no horizontal overflow: ${overflow}`]);
  } finally {
    await browser.close();
  }

  const allPass = results.every((r) => r.pass);
  const md = [
    "# Lumen QA — Booking Success Refinement v1.0",
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
