/**
 * Lumen QA — Sign In Page Refinement Spec v1.0 (Page 15)
 * Run: npx tsx scripts/lumen-qa-sign-in-refinement-v1.ts
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
  "LUMEN_QA_SIGN_IN_REFINEMENT_v1_2026-07-18.md",
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
    const url = `${BASE}/login?next=${encodeURIComponent("/my-report/demo")}`;
    console.log(`QA URL: ${url}`);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".auth-page--refined", { timeout: 45_000 });

    const desktop = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const email = document.querySelector('input[type="email"]') as HTMLInputElement | null;
      const password = document.querySelector(
        'input[autocomplete="current-password"], input[type="password"]',
      ) as HTMLInputElement | null;
      const submit = document.querySelector(
        ".auth-form-submit, .auth-submit",
      ) as HTMLButtonElement | null;
      const compactFooter = Boolean(document.querySelector(".auth-compact-footer"));
      const fullFooterGrid = Boolean(document.querySelector(".site-footer .footer-column"));
      const forgot = Array.from(document.querySelectorAll("a")).some((a) =>
        (a.textContent ?? "").toLowerCase().includes("forgot password"),
      );
      const createAccount = Array.from(document.querySelectorAll("a")).some((a) =>
        (a.textContent ?? "").toLowerCase().includes("create an account"),
      );
      const mantra = (
        document.querySelector(".auth-compact-footer-mantra, .footer-mantra")?.textContent ?? ""
      ).trim();
      return {
        text,
        emailAuto: email?.autocomplete ?? "",
        passwordAuto: password?.autocomplete ?? "",
        passwordPlaceholder: (password?.placeholder ?? "").toLowerCase(),
        submitDisabledAttr: submit?.hasAttribute("disabled") ?? false,
        compactFooter,
        fullFooterGrid,
        forgot,
        createAccount,
        mantra,
      };
    });

    const required = [
      "welcome back",
      "sign in to access your full report",
      "return to your report",
      "forgot password",
      "create an account",
    ];
    const missing = required.filter((p) => !desktop.text.includes(p));
    const framingFail = [
      desktop.passwordPlaceholder.includes("8+") ? "signup password hint in placeholder" : "",
      desktop.text.includes("not a sentence") ? "not a sentence" : "",
      desktop.fullFooterGrid ? "full marketing footer still present" : "",
    ].filter(Boolean);

    const mantraOk = desktop.mantra.toUpperCase().includes("NOT A FIXED IDENTITY");
    const desktopPass =
      missing.length === 0 &&
      framingFail.length === 0 &&
      desktop.compactFooter &&
      desktop.forgot &&
      desktop.createAccount &&
      desktop.emailAuto === "email" &&
      desktop.passwordAuto === "current-password" &&
      mantraOk;

    record("Desktop sign-in gateway", desktopPass, [
      `required missing (${missing.length}): ${missing.join(", ") || "none"}`,
      `framing fail: ${framingFail.join(", ") || "none"}`,
      `compact footer: ${desktop.compactFooter}`,
      `full footer grid: ${desktop.fullFooterGrid}`,
      `email autocomplete: ${desktop.emailAuto}`,
      `password autocomplete: ${desktop.passwordAuto}`,
      `password placeholder: ${desktop.passwordPlaceholder}`,
      `footer mantra: ${desktop.mantra}`,
    ]);

    await page.goto(`${BASE}/forgot-password`, {
      waitUntil: "domcontentloaded",
      timeout: 90_000,
    });
    const forgotPage = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      return {
        hasContact: text.includes("email support") || text.includes("info@1320soulcode.com"),
        hasCreate: text.includes("create an account"),
        hasBack: text.includes("back to sign in"),
        compactFooter: Boolean(document.querySelector(".auth-compact-footer")),
      };
    });
    record("Forgot password recovery path", forgotPage.hasContact && forgotPage.hasCreate && forgotPage.hasBack && forgotPage.compactFooter, [
      `contact: ${forgotPage.hasContact}`,
      `create account: ${forgotPage.hasCreate}`,
      `back to sign in: ${forgotPage.hasBack}`,
      `compact footer: ${forgotPage.compactFooter}`,
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

    record("Mobile sign-in tap targets", mobilePass, [
      `input font: ${mobile.font}`,
      `input height: ${mobile.tap}`,
      `no horizontal overflow: ${overflow}`,
    ]);
  } finally {
    await browser.close();
  }

  const allPass = results.every((r) => r.pass);
  const md = [
    "# Lumen QA — Sign In Page Refinement v1.0",
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
