/**
 * Lumen QA — Terms of Service Page Refinement Spec v1.0 (Page 14)
 * Run: npx tsx scripts/lumen-qa-terms-refinement-v1.ts
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
  "LUMEN_QA_TERMS_REFINEMENT_v1_2026-07-18.md",
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
    console.log(`QA URL: ${BASE}/terms`);
    await page.goto(`${BASE}/terms`, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".terms-page--refined", { timeout: 45_000 });

    const desktop = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const bullets = document.querySelectorAll(".terms-bullet-list li").length;
      const cards = document.querySelectorAll(".terms-card").length;
      const mantra = (document.querySelector(".footer-mantra")?.textContent ?? "").trim();
      const goldInCta = document.querySelectorAll(".terms-cta .gold-button").length;
      const copyFont = parseFloat(
        getComputedStyle(document.querySelector(".terms-copy") ?? document.body).fontSize,
      );
      return { text, bullets, cards, mantra, goldInCta, copyFont };
    });

    const required = [
      "terms of service",
      "code generator",
      "full soul blueprint report",
      "account-based report access",
      "payment processing",
      "third-party payment",
      "purchases, access & refunds",
      "refunds may be limited",
      "no professional advice",
      "not a fixed identity",
      "acceptable use",
      "intellectual property",
      "info@1320soulcode.com",
    ];
    const forbidden = [
      "phase 1",
      "waitlist and booking request only",
      "no checkout",
      "no user accounts",
      "no payment processing",
      "not a sentence",
      "phase 1 has no user accounts",
      "does not include paid checkout",
    ];

    const missing = required.filter((p) => !desktop.text.includes(p));
    const foundForbidden = forbidden.filter((p) => desktop.text.includes(p));
    const mantraOk = desktop.mantra.toUpperCase().includes("NOT A FIXED IDENTITY");

    const desktopPass =
      missing.length === 0 &&
      foundForbidden.length === 0 &&
      desktop.bullets >= 6 &&
      desktop.cards >= 8 &&
      desktop.goldInCta === 1 &&
      mantraOk;

    record("Desktop terms product-state alignment", desktopPass, [
      `required missing (${missing.length}): ${missing.join(", ") || "none"}`,
      `outdated language found: ${foundForbidden.join(", ") || "none"}`,
      `provides bullets: ${desktop.bullets}`,
      `terms cards: ${desktop.cards}`,
      `CTA gold buttons: ${desktop.goldInCta}`,
      `copy font: ${desktop.copyFont}`,
      `footer mantra: ${desktop.mantra}`,
    ]);

    await page.setViewport(VIEWPORT);
    await page.setUserAgent(MOBILE_UA);
    await page.reload({ waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".terms-page--refined", { timeout: 45_000 });

    const mobile = await page.evaluate(() => {
      const copyFont = parseFloat(
        getComputedStyle(document.querySelector(".terms-copy") ?? document.body).fontSize,
      );
      return { copyFont };
    });
    const overflow = await noHorizontalOverflow(page);
    const mobilePass = overflow && mobile.copyFont >= 16.5;

    record("Mobile terms readability", mobilePass, [
      `copy font: ${mobile.copyFont}`,
      `no horizontal overflow: ${overflow}`,
    ]);
  } finally {
    await browser.close();
  }

  const allPass = results.every((r) => r.pass);
  const md = [
    "# Lumen QA — Terms of Service Page Refinement v1.0",
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
