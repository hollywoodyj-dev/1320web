/**
 * Lumen QA — Homepage Refinement Spec v1.0
 * Run: npx tsx scripts/lumen-qa-homepage-refinement-v1.ts
 * Env: QA_BASE_URL (default https://www.1320soulcode.com)
 */
const BASE = (process.env.QA_BASE_URL ?? "https://www.1320soulcode.com").replace(/\/$/, "");
const VIEWPORT = { width: 390, height: 844 };
const DESKTOP_VIEWPORT = { width: 1280, height: 900 };
const MOBILE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

type CheckResult = {
  name: string;
  pass: boolean;
  notes: string[];
};

const results: CheckResult[] = [];

function record(name: string, pass: boolean, notes: string[]) {
  results.push({ name, pass, notes });
  console.log(`\n=== ${name}: ${pass ? "PASS" : "FAIL"} ===`);
  for (const note of notes) notes.length && console.log(`  - ${note}`);
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
  return page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
}

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

async function pageTextNormalized(page: import("puppeteer-core").Page): Promise<string> {
  return page.evaluate(() => (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ").trim());
}

const FORBIDDEN_PHRASES = [
  "does this sound familiar",
  "who you attract",
  "spiritual maturity",
  "money frequency",
  "fortune-telling",
];

const REQUIRED_PHRASES = [
  "1320 soulcode",
  "meet your soul blueprint",
  "not your fate",
  "your mirror",
  "generate my code",
  "your four foundation mirrors",
  "s1 · soul origin",
  "s3 · soul vibration",
  "s2 · soul mirror",
  "s0 · void gate",
  "value & receiving",
  "reflection over prediction",
  "your blueprint is a mirror — not a fixed identity",
];

async function main() {
  const puppeteer = await import("puppeteer-core");
  const executablePath = await resolveExecutablePath();
  const browser = await puppeteer.default.launch({
    executablePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: VIEWPORT,
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(MOBILE_UA);

    console.log(`QA base URL: ${BASE}`);

    await page.goto(`${BASE}/`, { waitUntil: "networkidle2", timeout: 90_000 });
    await page.waitForSelector(".hero-panel", { timeout: 30_000 });

    const pageText = await pageTextNormalized(page);
    const notes: string[] = [];

    // Removed sections
    notes.push(`curiosity block absent: ${!pageText.includes("does this sound familiar") ? "yes" : "NO"}`);
    notes.push(`stats band absent: ${!pageText.includes("soul codes") || pageText.includes("1320 soulcode") ? "yes" : "check manually"}`);

    // Required copy
    const missingRequired = REQUIRED_PHRASES.filter((p) => !pageText.includes(p));
    notes.push(`required phrases missing (${missingRequired.length}): ${missingRequired.join(", ") || "none"}`);

    const forbiddenFound = FORBIDDEN_PHRASES.filter((p) => pageText.includes(p));
    notes.push(`forbidden phrases found: ${forbiddenFound.join(", ") || "none"}`);

    // Hero structure
    const hero = await page.evaluate(() => {
      const eyebrow = document.querySelector(".hero-eyebrow")?.textContent?.trim() ?? "";
      const miniLabels = document.querySelectorAll(".hero-mini-labels li").length;
      const ctaSupport = document.querySelector(".hero-cta-support")?.textContent?.trim() ?? "";
      const ctas = Array.from(document.querySelectorAll(".hero-panel .hero-actions a")).map((a) =>
        (a.textContent ?? "").trim(),
      );
      const sub = document.querySelector(".hero-text")?.textContent?.trim() ?? "";
      return { eyebrow, miniLabels, ctaSupport, ctas, sub };
    });
    notes.push(`hero eyebrow: "${hero.eyebrow}"`);
    notes.push(`hero mini-labels removed: ${hero.miniLabels === 0 ? "yes" : `NO (${hero.miniLabels})`}`);
    notes.push(`hero cta support removed: ${hero.ctaSupport.length === 0 ? "yes" : "NO"}`);
    notes.push(`hero CTAs (${hero.ctas.length}): ${hero.ctas.join(" | ")}`);
    notes.push(`hero subheadline length: ${hero.sub.length} chars`);

    // Section order
    const sectionOrder = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".home-section, .hero-panel"))
        .map((el) => {
          if (el.classList.contains("hero-panel")) return "hero";
          if (el.classList.contains("entry-panel")) return "birth-date";
          if (el.classList.contains("homepage-what-is")) return "what-is";
          if (el.classList.contains("homepage-origin")) return "origin";
          if (el.classList.contains("homepage-blueprint-intro")) return "mirrors-intro";
          if (el.querySelector(".pillar-grid")) return "pillar-grid";
          if (el.classList.contains("homepage-not-this")) return "boundary";
          if (el.classList.contains("how-section")) return "integration";
          if (el.classList.contains("homepage-preview-stack")) return "full-report";
          if (el.classList.contains("home-section--closing")) return "closing";
          if (el.classList.contains("homepage-reflection")) return "reflection";
          if (el.classList.contains("homepage-final-cta")) return "final-cta";
          return el.className.split(" ").slice(0, 2).join("-");
        })
        .filter(Boolean),
    );
    notes.push(`section order: ${sectionOrder.join(" → ")}`);
    const orderOk =
      sectionOrder.indexOf("hero") === 0 &&
      sectionOrder.indexOf("birth-date") > 0 &&
      sectionOrder.indexOf("what-is") > sectionOrder.indexOf("birth-date") &&
      sectionOrder.indexOf("pillar-grid") > sectionOrder.indexOf("origin") &&
      sectionOrder.indexOf("full-report") > sectionOrder.indexOf("integration") &&
      (sectionOrder.includes("closing") ||
        (sectionOrder.indexOf("reflection") > sectionOrder.indexOf("full-report") &&
          sectionOrder.indexOf("final-cta") > sectionOrder.indexOf("reflection")));

    // Foundation mirror order
    const pillarCodes = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".pillar-card .pillar-code")).map((el) => el.textContent?.trim() ?? ""),
    );
    notes.push(`pillar order: ${pillarCodes.join(" → ")}`);
    const pillarOrderOk = pillarCodes.join(",") === "S1,S3,S2,S0";

    // S6 label (include compact list even when hidden on mobile)
    const s6Present = await page.evaluate(() =>
      (document.body.textContent ?? "").toLowerCase().includes("value & receiving"),
    );
    notes.push(`S6 Value & Receiving present: ${s6Present ? "yes" : "NO"}`);

    // Full report CTAs (max 2 in section)
    const previewCtas = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".homepage-preview-actions a")).map((a) =>
        (a.textContent ?? "").trim(),
      ),
    );
    notes.push(`full-report CTAs (${previewCtas.length}): ${previewCtas.join(" | ")}`);

    // Birth date entry
    const entry = await page.evaluate(() => {
      const panel = document.querySelector("#entry-panel");
      const rect = panel?.getBoundingClientRect();
      const privacyUnderForm = document.querySelector(".entry-form .privacy-note") !== null;
      return {
        exists: Boolean(panel),
        title: document.querySelector("#entry-panel .homepage-section-title")?.textContent?.trim() ?? "",
        privacyUnderForm,
        top: rect ? Math.round(rect.top) : null,
      };
    });
    notes.push(`birth-date section title: "${entry.title}"`);
    notes.push(`privacy note under form: ${entry.privacyUnderForm ? "YES (should be no)" : "no"}`);

    // Mobile typography & overflow
    const bodyFont = await page.evaluate(() => parseFloat(getComputedStyle(document.body).fontSize));
    notes.push(`body font-size: ${bodyFont}px`);
    const overflow = await noHorizontalOverflow(page);
    notes.push(`horizontal overflow: ${overflow ? "none" : "DETECTED"}`);

    // First viewport CTA
    const heroCtaVisible = await page.evaluate(() => {
      const cta = document.querySelector(".hero-panel .gold-button") as HTMLElement | null;
      if (!cta) return false;
      const rect = cta.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.height > 0;
    });
    notes.push(`hero primary CTA in first screen: ${heroCtaVisible ? "yes" : "no"}`);

    // Footer mantra
    const mantra = await page.evaluate(() => document.querySelector(".footer-mantra")?.textContent?.trim() ?? "");
    notes.push(`footer mantra: "${mantra}"`);

    // Copy density heuristic
    const visibleParagraphs = await page.evaluate(
      () => document.querySelectorAll(".homepage-section-body, .hero-text, .pillar-card-copy").length,
    );
    notes.push(`visible copy blocks (body/card): ${visibleParagraphs}`);

    const pass =
      missingRequired.length === 0 &&
      forbiddenFound.length === 0 &&
      hero.miniLabels === 0 &&
      hero.ctaSupport.length === 0 &&
      hero.ctas.length <= 2 &&
      pillarOrderOk &&
      previewCtas.length <= 2 &&
      !entry.privacyUnderForm &&
      bodyFont >= 16.5 &&
      overflow &&
      heroCtaVisible &&
      s6Present &&
      mantra.toLowerCase().includes("your blueprint is a mirror") &&
      orderOk &&
      !pageText.includes("does this sound familiar");

    record("Homepage Refinement v1.0 (390px mobile)", pass, notes);

    // Desktop spot-check
    await page.setViewport(DESKTOP_VIEWPORT);
    await page.reload({ waitUntil: "networkidle2", timeout: 90_000 });
    const desktopNotes: string[] = [];
    const desktopOverflow = await noHorizontalOverflow(page);
    desktopNotes.push(`horizontal overflow: ${desktopOverflow ? "none" : "DETECTED"}`);
    const homeSectionCount = await page.evaluate(
      () => document.querySelectorAll(".home-section, .hero-panel.home-section--hero").length,
    );
    desktopNotes.push(`.home-section wrappers: ${homeSectionCount}`);
    record("Homepage desktop layout (1280px)", desktopOverflow && homeSectionCount >= 8, desktopNotes);

    const allPass = results.every((r) => r.pass);
    console.log(`\n\nOVERALL: ${allPass ? "PASS" : "FAIL WITH NOTES"}`);
    console.log(`Base: ${BASE}`);

    // Write artifact
    const fs = await import("node:fs");
    const path = await import("node:path");
    const artifactDir = path.join(process.cwd(), "qa-artifacts");
    fs.mkdirSync(artifactDir, { recursive: true });
    const date = new Date().toISOString().slice(0, 10);
    const artifactPath = path.join(artifactDir, `LUMEN_QA_HOMEPAGE_REFINEMENT_v1_${date}.md`);
    const md = [
      "# Lumen QA — Homepage Refinement Spec v1.0",
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
      "## Spec watchpoints",
      "",
      results.every((r) => r.pass)
        ? "- [x] All automated watchpoints passed"
        : "- [ ] Review failures above",
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
