/**
 * Lumen QA — Blueprint Page Refinement Spec v1.0 (light pass)
 * Run: npx tsx scripts/lumen-qa-blueprint-refinement-v1.ts
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
  "the soul blueprint",
  "four foundation layers",
  "one living mirror",
  "soul origin",
  "soul vibration",
  "soul mirror",
  "void gate",
  "blueprint vs identity",
  "generate my code",
  "view full faq",
  "your blueprint is a mirror — not a fixed identity",
];

const FORBIDDEN = ["who you attract", "spiritual maturity", "not a sentence"];

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
    console.log(`QA base URL: ${BASE}`);

    await page.goto(`${BASE}/blueprint`, { waitUntil: "networkidle2", timeout: 90_000 });
    await page.waitForSelector(".blueprint-page", { timeout: 30_000 });

    const pageText = await page.evaluate(() =>
      (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ").trim(),
    );
    const notes: string[] = [];

    const missing = REQUIRED.filter((p) => !pageText.includes(p));
    notes.push(`required missing (${missing.length}): ${missing.join(", ") || "none"}`);

    const forbidden = FORBIDDEN.filter((p) => pageText.includes(p));
    notes.push(`forbidden found: ${forbidden.join(", ") || "none"}`);

    // Trinity/Duality as primary labels only — "emptiness" may appear in S0 body copy per spec
    const mysticDominant = pageText.includes("trinity") || pageText.includes("duality");
    notes.push(`trinity/duality as labels: ${mysticDominant ? "PRESENT" : "none"}`);

    const foundationOrder = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".blueprint-foundation-code")).map(
        (el) => (el.textContent ?? "").trim().charAt(0),
      ),
    );
    notes.push(`foundation order: ${foundationOrder.join(" → ") || "not found"}`);
    const orderOk = foundationOrder.join(",") === "1,3,2,0";

    const faqCount = await page.evaluate(
      () => document.querySelectorAll(".blueprint-faq-preview li").length,
    );
    notes.push(`FAQ preview count: ${faqCount}`);

    const removedHeavy = !pageText.includes("the soul blueprint path") && !pageText.includes("how to read your result");
    notes.push(`heavy sections removed: ${removedHeavy ? "yes" : "NO"}`);

    const bodyFont = await page.evaluate(() => parseFloat(getComputedStyle(document.body).fontSize));
    notes.push(`body font-size: ${bodyFont}px`);

    const overflow = await noHorizontalOverflow(page);
    notes.push(`horizontal overflow: ${overflow ? "none" : "DETECTED"}`);

    const primaryCta = await page.evaluate(() => {
      const cta = document.querySelector(".blueprint-hero-actions .gold-button, .inner-page-hero .gold-button");
      return (cta?.textContent ?? "").trim().toLowerCase();
    });
    notes.push(`hero primary CTA: ${primaryCta || "missing"}`);

    const pass =
      missing.length === 0 &&
      forbidden.length === 0 &&
      !mysticDominant &&
      orderOk &&
      faqCount > 0 &&
      faqCount <= 4 &&
      removedHeavy &&
      bodyFont >= 16.5 &&
      overflow &&
      primaryCta.includes("generate");

    record("Blueprint Refinement v1.0 (390px mobile)", pass, notes);

    await page.setViewport(DESKTOP_VIEWPORT);
    await page.reload({ waitUntil: "networkidle2", timeout: 90_000 });
    const desktopNotes: string[] = [];
    const desktopOverflow = await noHorizontalOverflow(page);
    desktopNotes.push(`horizontal overflow: ${desktopOverflow ? "none" : "DETECTED"}`);
    const desktopOrder = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".blueprint-foundation-code")).map(
        (el) => (el.textContent ?? "").trim().charAt(0),
      ),
    );
    desktopNotes.push(`foundation order: ${desktopOrder.join(" → ")}`);
    record(
      "Blueprint desktop layout (1280px)",
      desktopOverflow && desktopOrder.join(",") === "1,3,2,0",
      desktopNotes,
    );

    const allPass = results.every((r) => r.pass);
    console.log(`\n\nOVERALL: ${allPass ? "PASS" : "FAIL WITH NOTES"}`);

    const fs = await import("node:fs");
    const path = await import("node:path");
    const artifactDir = path.join(process.cwd(), "qa-artifacts");
    fs.mkdirSync(artifactDir, { recursive: true });
    const date = new Date().toISOString().slice(0, 10);
    const artifactPath = path.join(artifactDir, `LUMEN_QA_BLUEPRINT_REFINEMENT_v1_${date}.md`);
    fs.writeFileSync(
      artifactPath,
      [
        "# Lumen QA — Blueprint Page Refinement Spec v1.0",
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
