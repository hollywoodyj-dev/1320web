/**
 * Lumen QA — Full Report purchase page Refinement Spec v1.0 (light pass)
 * Run: npx tsx scripts/lumen-qa-full-report-refinement-v1.ts
 */
const BASE = (process.env.QA_BASE_URL ?? "https://www.1320soulcode.com").replace(/\/$/, "");
const VIEWPORT = { width: 390, height: 844 };
const DESKTOP_VIEWPORT = { width: 1280, height: 900 };
const MOBILE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

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
  const fs = await import("node:fs");
  if (fs.existsSync(winChrome)) return winChrome;
  const chromium = await import("@sparticuz/chromium");
  return chromium.default.executablePath();
}

async function noHorizontalOverflow(page: import("puppeteer-core").Page): Promise<boolean> {
  return page.evaluate(
    () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
  );
}

const REQUIRED = [
  "full soul blueprint report",
  "explore your complete soul blueprint",
  "not a fixed identity",
  "unlock my full report",
  "view sample report",
  "foundation mirrors",
  "advanced integration layers",
  "go to checkout",
  "prefer live integration",
  "your blueprint is a mirror — not a fixed identity",
];

async function main() {
  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await resolveExecutablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: VIEWPORT,
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(MOBILE_UA);
    const url = `${BASE}/full-report`;
    console.log(`QA URL: ${url}`);

    await page.goto(url, { waitUntil: "networkidle2", timeout: 90_000 });
    await page.waitForSelector(".full-report-marketing--refined", { timeout: 45_000 });

    const mobile = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const hero = document.querySelector(".full-report-hero");
      const heroGold = hero
        ? Array.from(hero.querySelectorAll(".gold-button")).map((el) =>
            (el.textContent ?? "").trim().toLowerCase(),
          )
        : [];
      const heroBookingGold = heroGold.some((t) => t.includes("book") && t.includes("integration"));
      const foundation = Array.from(
        document.querySelectorAll(".full-report-marketing--refined .conversion-module-card"),
      )
        .map((el) => el.querySelector(".conversion-module-code")?.textContent?.trim() ?? "")
        .filter((code) => /^S[0-9]$/.test(code));
      const faqCount = document.querySelectorAll(".blueprint-faq-item").length;
      const bodyFont = parseFloat(getComputedStyle(document.body).fontSize);
      const advancedGroupTitles = Array.from(
        document.querySelectorAll(".full-report-group-title"),
      ).filter((el) =>
        (el.textContent ?? "").toLowerCase().includes("advanced integration layers"),
      ).length;
      return {
        text,
        heroGold,
        heroBookingGold,
        foundation,
        faqCount,
        bodyFont,
        advancedGroupTitles,
        hasLivePath: Boolean(document.querySelector(".full-report-live-path")),
        liveIsGold: Boolean(
          document.querySelector(".full-report-live-path .gold-button"),
        ),
      };
    });

    // Booking may appear as secondary text — remove false forbidden for page body
    const forbiddenCheck = [
      "who you attract",
      "spiritual maturity",
      "not a sentence",
      "a deeper map — not a sentence",
    ].filter((p) => mobile.text.includes(p));

    const missing = REQUIRED.filter((p) => !mobile.text.includes(p));
    const overflow = await noHorizontalOverflow(page);

    const foundationOrder = mobile.foundation.slice(0, 4).join(",");
    const advancedOrder = mobile.foundation.slice(4, 10).join(",");
    const foundationOk = foundationOrder === "S1,S3,S2,S0";
    const advancedOk = advancedOrder === "S4,S5,S6,S7,S8,S9";

    const notes = [
      `required missing (${missing.length}): ${missing.join(", ") || "none"}`,
      `forbidden found: ${forbiddenCheck.join(", ") || "none"}`,
      `hero gold CTAs: ${mobile.heroGold.join(" | ") || "none"}`,
      `hero booking not gold: ${!mobile.heroBookingGold ? "yes" : "NO"}`,
      `foundation order: ${mobile.foundation.slice(0, 4).join(" → ")}`,
      `advanced order: ${mobile.foundation.slice(4, 10).join(" → ")}`,
      `advanced group title count: ${mobile.advancedGroupTitles}`,
      `live path secondary (no gold): ${mobile.hasLivePath && !mobile.liveIsGold ? "yes" : "NO"}`,
      `FAQ count: ${mobile.faqCount}`,
      `body font: ${mobile.bodyFont}px`,
      `horizontal overflow: ${overflow ? "none" : "DETECTED"}`,
    ];

    const pass =
      missing.length === 0 &&
      forbiddenCheck.length === 0 &&
      !mobile.heroBookingGold &&
      mobile.heroGold.length === 1 &&
      foundationOk &&
      advancedOk &&
      mobile.advancedGroupTitles === 1 &&
      mobile.hasLivePath &&
      !mobile.liveIsGold &&
      mobile.faqCount <= 5 &&
      mobile.bodyFont >= 16.5 &&
      overflow;

    record("Full Report marketing refinement (390px)", pass, notes);

    await page.setViewport(DESKTOP_VIEWPORT);
    await page.reload({ waitUntil: "networkidle2", timeout: 90_000 });
    const desktopOverflow = await noHorizontalOverflow(page);
    record("Full Report marketing desktop (1280px)", desktopOverflow, [
      `horizontal overflow: ${desktopOverflow ? "none" : "DETECTED"}`,
    ]);

    const allPass = results.every((r) => r.pass);
    console.log(`\n\nOVERALL: ${allPass ? "PASS" : "FAIL WITH NOTES"}`);

    const fs = await import("node:fs");
    const path = await import("node:path");
    const artifactDir = path.join(process.cwd(), "qa-artifacts");
    fs.mkdirSync(artifactDir, { recursive: true });
    const date = new Date().toISOString().slice(0, 10);
    const artifactPath = path.join(artifactDir, `LUMEN_QA_FULL_REPORT_REFINEMENT_v1_${date}.md`);
    fs.writeFileSync(
      artifactPath,
      [
        "# Lumen QA — Full Report Page Refinement Spec v1.0",
        "",
        `**Date:** ${new Date().toISOString()}`,
        `**Base URL:** ${BASE}`,
        `**Overall:** ${allPass ? "PASS" : "FAIL WITH NOTES"}`,
        "",
        ...results.flatMap((r) => [
          `### ${r.name}`,
          "",
          `**Verdict:** ${r.pass ? "PASS" : "FAIL"}`,
          "",
          ...r.notes.map((n) => `- ${n}`),
          "",
        ]),
      ].join("\n"),
      "utf8",
    );
    console.log(`Artifact: ${artifactPath}`);
    process.exit(allPass ? 0 : 1);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export {};
