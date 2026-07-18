/**
 * Lumen QA — Create Account Page Refinement Spec v1.0 (Page 16)
 * Run: npx tsx scripts/lumen-qa-sign-up-refinement-v1.ts
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
  "LUMEN_QA_SIGN_UP_REFINEMENT_v1_2026-07-18.md",
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
    const url = `${BASE}/signup?next=${encodeURIComponent("/my-report/demo")}`;
    console.log(`QA URL: ${url}`);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".auth-page--refined", { timeout: 45_000 });

    const desktop = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const birthInputs = Array.from(
        document.querySelectorAll('input[name="birthDate"], input[type="date"]'),
      );
      const birthTime = Array.from(document.querySelectorAll("input, label")).some((el) =>
        (el.textContent ?? el.getAttribute("name") ?? "").toLowerCase().includes("birth time"),
      );
      const birthLocation = Array.from(document.querySelectorAll("input, label")).some((el) =>
        (el.textContent ?? el.getAttribute("name") ?? "").toLowerCase().includes("birth location"),
      );
      const passwordHint = Array.from(document.querySelectorAll(".auth-form-hint")).some((el) =>
        (el.textContent ?? "").toLowerCase().includes("8"),
      );
      const signIn = Array.from(document.querySelectorAll("a")).some((a) =>
        (a.textContent ?? "").toLowerCase().includes("sign in"),
      );
      const compactFooter = Boolean(document.querySelector(".auth-compact-footer"));
      const fullFooterGrid = Boolean(document.querySelector(".site-footer .footer-column"));
      const newsletter = Boolean(document.querySelector(".footer-subscribe, .footer-column"));
      const mantra = (
        document.querySelector(".auth-compact-footer-mantra, .footer-mantra")?.textContent ?? ""
      ).trim();
      return {
        text,
        birthFieldCount: birthInputs.length,
        birthTime,
        birthLocation,
        passwordHint,
        signIn,
        compactFooter,
        fullFooterGrid,
        newsletter,
        mantra,
      };
    });

    const required = [
      "create your account",
      "soul blueprint",
      "return to your report",
      "already have an account",
      "sign in",
      "first name",
      "last name",
      "email",
      "password",
      "confirm password",
    ];
    const missing = required.filter((p) => !desktop.text.includes(p));
    const framingFail = [
      desktop.text.includes("soul code") && !desktop.text.includes("soul blueprint")
        ? "soul code without blueprint"
        : "",
      desktop.text.includes("tell us once who you are") ? "old birth-date lead copy" : "",
      desktop.text.includes("not a sentence") ? "not a sentence mantra" : "",
      desktop.fullFooterGrid ? "full marketing footer still present" : "",
      desktop.birthFieldCount > 0 ? "birth date still on form" : "",
      desktop.birthTime ? "birth time field" : "",
      desktop.birthLocation ? "birth location field" : "",
    ].filter(Boolean);

    const mantraOk =
      desktop.mantra.toUpperCase().includes("YOUR BLUEPRINT IS A MIRROR") &&
      desktop.mantra.toUpperCase().includes("NOT A FIXED IDENTITY");
    const desktopPass =
      missing.length === 0 &&
      framingFail.length === 0 &&
      desktop.compactFooter &&
      desktop.passwordHint &&
      desktop.signIn &&
      mantraOk;

    record("Desktop create-account gateway", desktopPass, [
      `required missing (${missing.length}): ${missing.join(", ") || "none"}`,
      `framing fail: ${framingFail.join(", ") || "none"}`,
      `compact footer: ${desktop.compactFooter}`,
      `full footer grid: ${desktop.fullFooterGrid}`,
      `birth fields: ${desktop.birthFieldCount}`,
      `password helper: ${desktop.passwordHint}`,
      `sign in link: ${desktop.signIn}`,
      `footer mantra: ${desktop.mantra}`,
    ]);

    await page.goto(`${BASE}/login`, { waitUntil: "domcontentloaded", timeout: 90_000 });
    const loginPage = await page.evaluate(() => {
      const hints = Array.from(document.querySelectorAll(".auth-form-hint")).map((el) =>
        (el.textContent ?? "").toLowerCase(),
      );
      return {
        passwordHelperOnLogin: hints.some((h) => h.includes("8") && h.includes("letter")),
      };
    });
    record("Password helper only on Create Account", !loginPage.passwordHelperOnLogin, [
      `login has signup password helper: ${loginPage.passwordHelperOnLogin}`,
    ]);

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.setViewport(VIEWPORT);
    await page.setUserAgent(MOBILE_UA);
    await page.reload({ waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".auth-page--refined", { timeout: 45_000 });

    const mobile = await page.evaluate(() => {
      const input = document.querySelector(".auth-field input, .conversion-input") as HTMLElement | null;
      const font = input ? parseFloat(getComputedStyle(input).fontSize) : 0;
      const tap = input ? input.getBoundingClientRect().height : 0;
      return { font, tap };
    });
    const overflow = await noHorizontalOverflow(page);
    const mobilePass = overflow && mobile.font >= 16 && mobile.tap >= 44;

    record("Mobile create-account tap targets", mobilePass, [
      `input font: ${mobile.font}`,
      `input height: ${mobile.tap}`,
      `no horizontal overflow: ${overflow}`,
    ]);
  } finally {
    await browser.close();
  }

  const allPass = results.every((r) => r.pass);
  const md = [
    "# Lumen QA — Create Account Page Refinement v1.0",
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
