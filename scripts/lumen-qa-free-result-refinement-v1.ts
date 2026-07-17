/**
 * Lumen QA — Free Result Page Refinement Spec v1.0 (light pass)
 * Run: npx tsx scripts/lumen-qa-free-result-refinement-v1.ts
 */
const BASE = (process.env.QA_BASE_URL ?? "https://www.1320soulcode.com").replace(/\/$/, "");
const VIEWPORT = { width: 390, height: 844 };
const DESKTOP_VIEWPORT = { width: 1280, height: 900 };
const MOBILE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const SAMPLE = { year: 1990, month: 6, day: 15 };

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
  "your code has opened",
  "your 1320 soul origin code",
  "four-part mirror",
  "soul origin",
  "soul vibration",
  "soul mirror",
  "void gate",
  "your integrated soul blueprint",
  "unlock my full report",
  "keep your code",
  "your blueprint is a mirror — not a fixed identity",
];

const FORBIDDEN = [
  "who you attract",
  "spiritual maturity",
  "not a sentence",
  "your code is only the beginning",
  "this page shows your free first layer",
  "core gift",
  "growth edge",
  "one-week practice",
  "how this may show up",
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
    const url = `${BASE}/result?year=${SAMPLE.year}&month=${SAMPLE.month}&day=${SAMPLE.day}`;
    console.log(`QA URL: ${url}`);

    await page.goto(url, { waitUntil: "networkidle2", timeout: 90_000 });
    await page.waitForSelector(".report-dashboard--refined", { timeout: 45_000 });

    const mobile = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const sidebar = document.querySelector(".report-sidebar--desktop");
      const sidebarHidden = !sidebar || getComputedStyle(sidebar).display === "none";
      const chips = document.querySelector(".report-mobile-chips");
      const foundation = Array.from(document.querySelectorAll("#four-part .pillar-code")).map(
        (el) => el.textContent?.trim().slice(0, 2) ?? "",
      );
      const goldCtas = Array.from(document.querySelectorAll(".gold-button")).filter((el) => {
        const style = getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden";
      });
      const bodyFont = parseFloat(getComputedStyle(document.body).fontSize);
      const previewCards = Array.from(document.querySelectorAll(".report-module-card--preview")).map(
        (card) => {
          const lines = Array.from(card.querySelectorAll(".report-module-preview-essence")).map(
            (el) => (el.textContent ?? "").trim(),
          );
          const words = lines.join(" ").split(/\s+/).filter(Boolean).length;
          const hasReflection = Boolean(
            card.querySelector(".report-module-reflection")?.textContent?.trim(),
          );
          return { lines: lines.length, words, hasReflection };
        },
      );
      return {
        text,
        sidebarHidden,
        chipsVisible: Boolean(chips) && getComputedStyle(chips!).display !== "none",
        foundation,
        goldCtaCount: goldCtas.length,
        bodyFont,
        faqCount: document.querySelectorAll(".report-extras .blueprint-faq-item").length,
        hasPreviewCards: previewCards.length,
        previewCards,
        hasGoDeeperBlock: Boolean(document.querySelector("#go-deeper")),
        hasFinalBeginning: text.includes("your code is only the beginning"),
      };
    });

    const missing = REQUIRED.filter((p) => !mobile.text.includes(p));
    const forbidden = FORBIDDEN.filter((p) => mobile.text.includes(p));
    const overflow = await noHorizontalOverflow(page);
    const essenceOk =
      mobile.previewCards.length === 4 &&
      mobile.previewCards.every(
        (card) =>
          card.lines >= 1 &&
          card.lines <= 3 &&
          card.words >= 1 &&
          card.words <= 55 &&
          card.hasReflection,
      );

    const notes = [
      `required missing (${missing.length}): ${missing.join(", ") || "none"}`,
      `forbidden found: ${forbidden.join(", ") || "none"}`,
      `foundation order: ${mobile.foundation.join(" → ") || "none"}`,
      `sidebar hidden on mobile: ${mobile.sidebarHidden ? "yes" : "NO"}`,
      `mobile chips visible: ${mobile.chipsVisible ? "yes" : "NO"}`,
      `preview segment cards: ${mobile.hasPreviewCards}`,
      `freeEssence depth: ${mobile.previewCards
        .map((c, i) => `#${i + 1} ${c.lines} lines / ${c.words} words`)
        .join("; ")}`,
      `freeEssence within 1–3 lines & ≤55 words + reflection: ${essenceOk ? "yes" : "NO"}`,
      `FAQ count: ${mobile.faqCount}`,
      `upgrade block present: ${mobile.hasGoDeeperBlock ? "yes" : "NO"}`,
      `body font: ${mobile.bodyFont}px`,
      `horizontal overflow: ${overflow ? "none" : "DETECTED"}`,
    ];

    const orderOk =
      mobile.foundation.length === 4 &&
      mobile.foundation[0].startsWith("S1") &&
      mobile.foundation[1].startsWith("S3") &&
      mobile.foundation[2].startsWith("S2") &&
      mobile.foundation[3].startsWith("S0");

    const pass =
      missing.length === 0 &&
      forbidden.length === 0 &&
      orderOk &&
      mobile.sidebarHidden &&
      mobile.chipsVisible &&
      mobile.hasPreviewCards === 4 &&
      essenceOk &&
      mobile.faqCount <= 4 &&
      mobile.hasGoDeeperBlock &&
      !mobile.hasFinalBeginning &&
      mobile.bodyFont >= 16.5 &&
      overflow;

    record("Free Result refinement (390px)", pass, notes);

    await page.setViewport(DESKTOP_VIEWPORT);
    await page.reload({ waitUntil: "networkidle2", timeout: 90_000 });
    await page.waitForSelector(".report-dashboard--refined", { timeout: 30_000 });
    const desktop = await page.evaluate(() => {
      const sidebar = document.querySelector(".report-sidebar--desktop");
      const chips = document.querySelector(".report-mobile-chips");
      return {
        sidebarVisible: Boolean(sidebar) && getComputedStyle(sidebar!).display !== "none",
        chipsHidden: !chips || getComputedStyle(chips).display === "none",
      };
    });
    const desktopOverflow = await noHorizontalOverflow(page);
    record(
      "Free Result desktop (1280px)",
      desktop.sidebarVisible && desktop.chipsHidden && desktopOverflow,
      [
        `sidebar visible: ${desktop.sidebarVisible ? "yes" : "NO"}`,
        `chips hidden: ${desktop.chipsHidden ? "yes" : "NO"}`,
        `overflow: ${desktopOverflow ? "none" : "DETECTED"}`,
      ],
    );

    const allPass = results.every((r) => r.pass);
    console.log(`\n\nOVERALL: ${allPass ? "PASS" : "FAIL WITH NOTES"}`);

    const fs = await import("node:fs");
    const path = await import("node:path");
    const artifactDir = path.join(process.cwd(), "qa-artifacts");
    fs.mkdirSync(artifactDir, { recursive: true });
    const date = new Date().toISOString().slice(0, 10);
    const artifactPath = path.join(artifactDir, `LUMEN_QA_FREE_RESULT_REFINEMENT_v1_${date}.md`);
    fs.writeFileSync(
      artifactPath,
      [
        "# Lumen QA — Free Result Page Refinement Spec v1.0",
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
