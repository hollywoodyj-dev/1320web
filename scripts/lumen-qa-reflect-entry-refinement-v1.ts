/**
 * Lumen QA — Wisewave Reflection Entry Page Refinement Spec v1.0 (Page 18)
 * Run: npx tsx scripts/lumen-qa-reflect-entry-refinement-v1.ts
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
  "LUMEN_QA_REFLECT_ENTRY_REFINEMENT_v1_2026-07-18.md",
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
    const url = `${BASE}/reflect`;
    console.log(`QA URL: ${url}`);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".reflect-page--refined", { timeout: 45_000 });

    const desktop = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const labels = Array.from(document.querySelectorAll("label, legend")).map((el) =>
        (el.textContent ?? "").toLowerCase().replace(/\s+/g, " ").trim(),
      );
      const firstNameField = labels.some((l) => l.includes("first name"));
      const birthTime = text.includes("birth time");
      const birthLocation = text.includes("birth location");
      const s1Dash = text.includes("s1–s0") || text.includes("s1-s0");
      const textarea = document.querySelector("textarea[name='openingMessage']");
      const email = document.querySelector('input[name="email"], input[type="email"]');
      const month = document.querySelector('input[name="month"]');
      const day = document.querySelector('input[name="day"]');
      const year = document.querySelector('input[name="year"]');
      const dateInput = document.querySelector('input[type="date"]');
      const goldButtons = Array.from(
        document.querySelectorAll(".reflect-page--refined .gold-button"),
      ).length;
      const sessionSecondary = text.includes("personal integration session");
      const compactFooter = Boolean(document.querySelector(".auth-compact-footer"));
      const fullFooterGrid = Boolean(document.querySelector(".site-footer .footer-column"));
      const mantra = (
        document.querySelector(".auth-compact-footer-mantra, .footer-mantra")?.textContent ?? ""
      ).trim();

      let openingBeforeConnect = true;
      if (textarea && email) {
        const position = textarea.compareDocumentPosition(email);
        openingBeforeConnect = Boolean(position & Node.DOCUMENT_POSITION_FOLLOWING);
      }

      return {
        text,
        firstNameField,
        birthTime,
        birthLocation,
        s1Dash,
        hasTextarea: Boolean(textarea),
        hasMonthDayYear: Boolean(month && day && year),
        hasDateInput: Boolean(dateInput),
        goldButtons,
        sessionSecondary,
        compactFooter,
        fullFooterGrid,
        mantra,
        openingBeforeConnect,
        hasGenerate: text.includes("generate my code"),
        hasSignIn: text.includes("sign in"),
        hasBegin: text.includes("begin reflection"),
      };
    });

    const required = [
      "reflect with your soul blueprint",
      "what feels most present",
      "begin reflection",
      "symbolic self-awareness",
      "not therapy",
    ];
    const missing = required.filter((p) => !desktop.text.includes(p));
    const framingFail = [
      desktop.firstNameField ? "first name field on anonymous entry" : "",
      desktop.birthTime ? "birth time" : "",
      desktop.birthLocation ? "birth location" : "",
      desktop.s1Dash ? "S1–S0 shorthand" : "",
      desktop.hasDateInput ? "generic date input" : "",
      !desktop.openingBeforeConnect ? "connect fields before reflection prompt" : "",
      desktop.fullFooterGrid ? "full marketing footer" : "",
      desktop.text.includes("not a sentence") ? "old mantra" : "",
      desktop.goldButtons > 1 ? `too many gold buttons (${desktop.goldButtons})` : "",
    ].filter(Boolean);

    const mantraOk =
      desktop.mantra.toUpperCase().includes("YOUR BLUEPRINT IS A MIRROR") &&
      desktop.mantra.toUpperCase().includes("NOT A FIXED IDENTITY");

    const desktopPass =
      missing.length === 0 &&
      framingFail.length === 0 &&
      desktop.hasTextarea &&
      desktop.hasMonthDayYear &&
      desktop.compactFooter &&
      desktop.sessionSecondary &&
      desktop.hasGenerate &&
      desktop.hasSignIn &&
      desktop.hasBegin &&
      mantraOk;

    record("Desktop reflection doorway", desktopPass, [
      `required missing (${missing.length}): ${missing.join(", ") || "none"}`,
      `framing fail: ${framingFail.join(", ") || "none"}`,
      `compact footer: ${desktop.compactFooter}`,
      `month/day/year: ${desktop.hasMonthDayYear}`,
      `gold buttons: ${desktop.goldButtons}`,
      `footer mantra: ${desktop.mantra}`,
    ]);

    await page.setViewport(VIEWPORT);
    await page.setUserAgent(MOBILE_UA);
    await page.reload({ waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".reflect-page--refined", { timeout: 45_000 });

    const mobile = await page.evaluate(() => {
      const input = document.querySelector(
        "textarea.conversion-input, .conversion-input",
      ) as HTMLElement | null;
      const font = input ? parseFloat(getComputedStyle(input).fontSize) : 0;
      const tap = input ? input.getBoundingClientRect().height : 0;
      return { font, tap };
    });
    const overflow = await noHorizontalOverflow(page);
    const mobilePass = overflow && mobile.font >= 16;

    record("Mobile reflection entry", mobilePass, [
      `input font: ${mobile.font}`,
      `textarea/input height: ${mobile.tap}`,
      `no horizontal overflow: ${overflow}`,
    ]);
  } finally {
    await browser.close();
  }

  const allPass = results.every((r) => r.pass);
  const md = [
    "# Lumen QA — Wisewave Reflection Entry Page Refinement v1.0",
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
  console.log(`\nVerdict: ${allPass ? "PASS" : "FAIL"}`);
  if (!allPass) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
