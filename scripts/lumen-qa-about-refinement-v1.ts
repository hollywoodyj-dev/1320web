/**
 * Lumen QA — About 1320 Refinement Spec v1.0 (light pass)
 * Run: npx tsx scripts/lumen-qa-about-refinement-v1.ts
 * Env: QA_BASE_URL (default https://www.1320soulcode.com)
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
  "about 1320",
  "build a living relationship with your soul blueprint",
  "the four foundation mirrors",
  "soul origin",
  "soul vibration",
  "soul mirror",
  "void gate",
  "human-originated",
  "ai-supported",
  "why governance matters",
  "what 1320 is not",
  "view full faq",
  "your blueprint is a mirror — not a fixed identity",
];

const FORBIDDEN = [
  "who you attract",
  "spiritual maturity",
  "ai-created spiritual",
  "ai revealed",
  "money frequency",
];

const DOMINANT_MYSTIC = ["trinity", "duality", "emptiness"];

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

    await page.goto(`${BASE}/about-1320`, { waitUntil: "networkidle2", timeout: 90_000 });
    await page.waitForSelector(".about-page, .inner-content-page", { timeout: 30_000 });

    const pageText = await page.evaluate(() =>
      (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ").trim(),
    );
    const notes: string[] = [];

    const missing = REQUIRED.filter((p) => !pageText.includes(p));
    notes.push(`required missing (${missing.length}): ${missing.join(", ") || "none"}`);

    const forbidden = FORBIDDEN.filter((p) => pageText.includes(p));
    notes.push(`forbidden found: ${forbidden.join(", ") || "none"}`);

    // Trinity/Duality/Emptiness should not dominate over product labels
    const mysticHits = DOMINANT_MYSTIC.filter((p) => pageText.includes(p));
    const productLabelsPresent =
      pageText.includes("soul origin") &&
      pageText.includes("soul vibration") &&
      pageText.includes("soul mirror") &&
      pageText.includes("void gate");
    notes.push(`mystic-only labels present: ${mysticHits.join(", ") || "none"}`);
    notes.push(`product labels present: ${productLabelsPresent ? "yes" : "NO"}`);

    const mirrorOrder = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".about-mirror-digit")).map((el) => el.textContent?.trim() ?? ""),
    );
    notes.push(`mirror digit order: ${mirrorOrder.join(" → ") || "not found"}`);
    const orderOk = mirrorOrder.join(",") === "1,3,2,0";

    const faqCount = await page.evaluate(
      () => document.querySelectorAll(".about-faq-preview li").length,
    );
    notes.push(`FAQ preview count: ${faqCount}`);

    const fullFaqLink = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll("a"));
      return links.some((a) => (a.getAttribute("href") ?? "").includes("/faq"));
    });
    notes.push(`View Full FAQ link: ${fullFaqLink ? "yes" : "NO"}`);

    const bodyFont = await page.evaluate(() => parseFloat(getComputedStyle(document.body).fontSize));
    notes.push(`body font-size: ${bodyFont}px`);

    const overflow = await noHorizontalOverflow(page);
    notes.push(`horizontal overflow: ${overflow ? "none" : "DETECTED"}`);

    const heroCta = await page.evaluate(() => {
      const cta = document.querySelector(".gold-button");
      return (cta?.textContent ?? "").trim();
    });
    notes.push(`primary CTA: ${heroCta || "missing"}`);

    const sentenceMantra = pageText.includes("not a sentence");
    notes.push(`old “sentence” mantra absent: ${!sentenceMantra ? "yes" : "NO"}`);

    const blockCount = await page.evaluate(() => document.querySelectorAll(".about-block").length);
    notes.push(`about-block sections: ${blockCount}`);

    const pass =
      missing.length === 0 &&
      forbidden.length === 0 &&
      productLabelsPresent &&
      orderOk &&
      faqCount <= 3 &&
      faqCount >= 1 &&
      fullFaqLink &&
      bodyFont >= 16.5 &&
      overflow &&
      !sentenceMantra &&
      blockCount >= 8;

    record("About Refinement v1.0 (390px mobile)", pass, notes);

    await page.setViewport(DESKTOP_VIEWPORT);
    await page.reload({ waitUntil: "networkidle2", timeout: 90_000 });
    const desktopNotes: string[] = [];
    const desktopOverflow = await noHorizontalOverflow(page);
    desktopNotes.push(`horizontal overflow: ${desktopOverflow ? "none" : "DETECTED"}`);
    const desktopOrder = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".about-mirror-digit")).map((el) => el.textContent?.trim() ?? ""),
    );
    desktopNotes.push(`mirror digit order: ${desktopOrder.join(" → ")}`);
    record(
      "About desktop layout (1280px)",
      desktopOverflow && desktopOrder.join(",") === "1,3,2,0",
      desktopNotes,
    );

    const allPass = results.every((r) => r.pass);
    console.log(`\n\nOVERALL: ${allPass ? "PASS" : "FAIL WITH NOTES"}`);
    console.log(`Base: ${BASE}`);

    const fs = await import("node:fs");
    const path = await import("node:path");
    const artifactDir = path.join(process.cwd(), "qa-artifacts");
    fs.mkdirSync(artifactDir, { recursive: true });
    const date = new Date().toISOString().slice(0, 10);
    const artifactPath = path.join(artifactDir, `LUMEN_QA_ABOUT_REFINEMENT_v1_${date}.md`);
    const md = [
      "# Lumen QA — About 1320 Refinement Spec v1.0",
      "",
      `**Date:** ${new Date().toISOString()}`,
      `**Base URL:** ${BASE}`,
      `**Overall:** ${allPass ? "PASS" : "FAIL WITH NOTES"}`,
      "",
      "## Results",
      "",
      ...results.flatMap((r) => [
        `### ${r.name}`,
        "",
        `**Verdict:** ${r.pass ? "PASS" : "FAIL"}`,
        "",
        ...r.notes.map((n) => `- ${n}`),
        "",
      ]),
      "## Spec watchpoints (automated)",
      "",
      allPass ? "- [x] Automated watchpoints passed" : "- [ ] Review failures above",
      "",
    ].join("\n");
    fs.writeFileSync(artifactPath, md, "utf8");
    console.log(`\nArtifact: ${artifactPath}`);

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
