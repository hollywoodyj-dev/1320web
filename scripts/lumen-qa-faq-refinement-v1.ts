/**
 * Lumen QA — FAQ Page Refinement Spec v1.0 (Page 11)
 * Run: npx tsx scripts/lumen-qa-faq-refinement-v1.ts
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
  "LUMEN_QA_FAQ_REFINEMENT_v1_2026-07-18.md",
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
    console.log(`QA URL: ${BASE}/faq`);
    await page.goto(`${BASE}/faq`, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".faq-page--refined", { timeout: 45_000 });

    const desktop = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const chips = Array.from(document.querySelectorAll(".faq-category-chip")).map((el) =>
        (el.textContent ?? "").trim().toLowerCase(),
      );
      const sectionIds = Array.from(document.querySelectorAll(".inner-section-card[id]")).map(
        (el) => el.id,
      );
      const summaryMin = Math.min(
        ...Array.from(document.querySelectorAll(".blueprint-faq-item summary")).map((el) =>
          (el as HTMLElement).getBoundingClientRect().height,
        ),
      );
      const answerFont = parseFloat(
        getComputedStyle(
          document.querySelector(".blueprint-faq-item p") ?? document.body,
        ).fontSize,
      );
      const mantra = (document.querySelector(".footer-mantra")?.textContent ?? "").trim();
      const goldInHero = document.querySelectorAll(
        ".inner-page-hero .gold-button, .blueprint-hero-actions .gold-button",
      ).length;

      return {
        text,
        chips,
        sectionIds,
        summaryMin,
        answerFont,
        mantra,
        goldInHero,
        faqCount: document.querySelectorAll(".blueprint-faq-item").length,
      };
    });

    const required = [
      "frequently asked questions",
      "begin with confidence",
      "birth time",
      "not required",
      "s1 → s3 → s2 → s0",
      "does s2 predict who i will attract",
      "not a prediction of who you will attract",
      "does s6 predict money",
      "value & receiving",
      "reflective integration only",
      "not therapy",
      "handled according to our privacy policy",
      "still have questions",
    ];
    const framingFail = [
      desktop.text.includes("never store") ? "never store" : "",
      desktop.text.includes("not a sentence") ? "not a sentence" : "",
      desktop.text.includes("financial forecast") ? "financial forecast" : "",
      /guaranteed (?!that)/.test(desktop.text) && desktop.text.includes("guaranteed outcome")
        ? "guaranteed outcome"
        : "",
      desktop.text.includes("who you attract") &&
      !desktop.text.includes("not a prediction of who you will attract")
        ? "who you attract (uncorrected)"
        : "",
    ].filter(Boolean);

    const missing = required.filter((p) => !desktop.text.includes(p));
    const chipsOk =
      desktop.chips.includes("general") &&
      desktop.chips.includes("birth date") &&
      desktop.chips.includes("privacy");
    const sectionsOk = ["general", "calculation", "reports", "reading", "privacy"].every((id) =>
      desktop.sectionIds.includes(id),
    );
    const mantraOk = desktop.mantra.toUpperCase().includes("NOT A FIXED IDENTITY");

    const desktopPass =
      missing.length === 0 &&
      framingFail.length === 0 &&
      chipsOk &&
      sectionsOk &&
      desktop.goldInHero === 1 &&
      desktop.faqCount >= 20 &&
      mantraOk;

    record("Desktop FAQ trust page", desktopPass, [
      `required missing (${missing.length}): ${missing.join(", ") || "none"}`,
      `framing fail: ${framingFail.join(", ") || "none"}`,
      `chips: ${desktop.chips.join(" | ")}`,
      `sections: ${desktop.sectionIds.join(", ")}`,
      `hero gold CTAs: ${desktop.goldInHero}`,
      `faq items: ${desktop.faqCount}`,
      `footer mantra: ${desktop.mantra}`,
    ]);

    await page.setViewport(VIEWPORT);
    await page.setUserAgent(MOBILE_UA);
    await page.reload({ waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".faq-category-chips", { timeout: 45_000 });

    const mobile = await page.evaluate(() => {
      const chips = document.querySelector(".faq-category-chips");
      const overflowX = chips ? getComputedStyle(chips).overflowX : "";
      const summaryMin = Math.min(
        ...Array.from(document.querySelectorAll(".blueprint-faq-item summary")).map((el) =>
          (el as HTMLElement).getBoundingClientRect().height,
        ),
      );
      const answerFont = parseFloat(
        getComputedStyle(
          document.querySelector(".blueprint-faq-item p") ?? document.body,
        ).fontSize,
      );
      const bodyFont = parseFloat(getComputedStyle(document.body).fontSize);
      return { overflowX, summaryMin, answerFont, bodyFont };
    });
    const overflow = await noHorizontalOverflow(page);
    const mobilePass =
      overflow &&
      mobile.summaryMin >= 44 &&
      mobile.answerFont >= 16.5 &&
      (mobile.overflowX === "auto" || mobile.overflowX === "scroll");

    record("Mobile FAQ scan + tap", mobilePass, [
      `chip overflow-x: ${mobile.overflowX}`,
      `summary min height: ${mobile.summaryMin}`,
      `answer font: ${mobile.answerFont}`,
      `body font: ${mobile.bodyFont}`,
      `no horizontal overflow: ${overflow}`,
    ]);
  } finally {
    await browser.close();
  }

  const allPass = results.every((r) => r.pass);
  const md = [
    "# Lumen QA — FAQ Page Refinement v1.0",
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
