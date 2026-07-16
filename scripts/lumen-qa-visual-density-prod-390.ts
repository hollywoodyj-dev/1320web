/**
 * Production 390px spot-check — Visual Density & Mobile Report UX v1.0
 * Run: npx tsx scripts/lumen-qa-visual-density-prod-390.ts
 */
const BASE = "https://www.1320soulcode.com";
const VIEWPORT = { width: 390, height: 844 };
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
  return page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth <= doc.clientWidth + 1;
  });
}

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

    // 1. Homepage mobile first screen
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.waitForSelector(".hero-panel .gold-button", { timeout: 20_000 });
    const homeNotes: string[] = [];
    const homeOverflow = await noHorizontalOverflow(page);
    homeNotes.push(`horizontal overflow: ${homeOverflow ? "none" : "DETECTED"}`);

    const homeHasDensityCss = await page.evaluate(() => {
      const densityVar = getComputedStyle(document.documentElement)
        .getPropertyValue("--density-body-size")
        .trim();
      return densityVar === "17px";
    });
    homeNotes.push(`site density token (--density-body-size): ${homeHasDensityCss ? "17px active" : "not detected"}`);

    const ctaInfo = await page.evaluate(() => {
      const cta = document.querySelector(".hero-panel .gold-button") as HTMLElement | null;
      if (!cta) return { exists: false, inFirstScreen: false, text: "" };
      const rect = cta.getBoundingClientRect();
      return {
        exists: true,
        inFirstScreen: rect.top < window.innerHeight && rect.bottom > 0 && rect.height > 0,
        text: (cta.textContent ?? "").trim(),
        top: Math.round(rect.top),
      };
    });
    homeNotes.push(`hero gold CTA: ${ctaInfo.text || "missing"}`);
    homeNotes.push(
      `hero CTA in first screen (${ctaInfo.top ?? "?"}px from top): ${ctaInfo.inFirstScreen ? "yes" : "below fold"}`,
    );

    const heroText = await page.evaluate(() => {
      const hero = document.querySelector("main, .homepage-hero, [class*='hero']");
      return (hero?.textContent ?? document.body.textContent ?? "").slice(0, 120);
    });
    homeNotes.push(`hero content present: ${heroText.trim().length > 20 ? "yes" : "no"}`);

    const bodyFontSize = await page.evaluate(() =>
      parseFloat(getComputedStyle(document.body).fontSize),
    );
    homeNotes.push(`body font-size: ${bodyFontSize}px`);

    record(
      "1. Homepage mobile first screen (390px)",
      homeOverflow && homeHasDensityCss && ctaInfo.exists,
      homeNotes,
    );

    // 2. Unified mobile sample report — cover + overview
    await page.goto(`${BASE}/mobile-report-v2?year=1980&month=5&day=22`, {
      waitUntil: "domcontentloaded",
      timeout: 60_000,
    });
    await page.waitForSelector(".report-root[data-surface='mobile']", { timeout: 20_000 });

    const mobileNotes: string[] = [];
    const surface = await page.$eval(".report-root", (el) => ({
      surface: el.getAttribute("data-surface"),
      reportType: el.getAttribute("data-report-type"),
    }));
    mobileNotes.push(`renderer: surface=${surface.surface}, reportType=${surface.reportType}`);

    const coverVisible = await page.evaluate(() => {
      const h1 = document.querySelector(".report-hero h1");
      return Boolean(h1?.textContent?.includes("Soul Blueprint"));
    });
    mobileNotes.push(`cover hero present: ${coverVisible ? "yes" : "no"}`);

    const headerLogos = await page.evaluate(() => ({
      logo1320: Boolean(document.querySelector(".report-mobile-header-logo-1320")),
      pageMeta: document.querySelector(".report-mobile-header-meta strong")?.textContent ?? "",
    }));
    mobileNotes.push(`header 1320 logo: ${headerLogos.logo1320 ? "yes" : "no"}`);
    mobileNotes.push(`page indicator: ${headerLogos.pageMeta}`);

    const mobileOverflowCover = await noHorizontalOverflow(page);
    mobileNotes.push(`cover horizontal overflow: ${mobileOverflowCover ? "none" : "DETECTED"}`);

    // Swipe to blueprint overview (page 2)
    await page.evaluate(() => {
      const track = document.querySelector(".mr-v2-page-track");
      if (track instanceof HTMLElement) {
        track.style.transform = "translateX(-100%)";
      }
    });
    await new Promise((r) => setTimeout(r, 300));

    const overviewActive = await page.evaluate(() => {
      const panel = document.querySelector("#blueprint-overview");
      const title = panel?.querySelector(".report-hero h1")?.textContent ?? "";
      return title.includes("Four Foundation");
    });
    mobileNotes.push(`blueprint overview reachable: ${overviewActive ? "yes" : "no"}`);

    const overviewOverflow = await noHorizontalOverflow(page);
    mobileNotes.push(`overview horizontal overflow: ${overviewOverflow ? "none" : "DETECTED"}`);

    const overviewGrid = await page.evaluate(() => {
      const grid = document.querySelector(
        "#blueprint-overview .report-card-grid",
      ) as HTMLElement | null;
      if (!grid) return null;
      const style = getComputedStyle(grid);
      return style.gridTemplateColumns;
    });
    mobileNotes.push(`overview grid: ${overviewGrid ?? "not found"}`);

    record(
      "2. Unified mobile sample — cover + overview (390px)",
      coverVisible &&
        mobileOverflowCover &&
        overviewActive &&
        overviewOverflow &&
        headerLogos.pageMeta.includes("17"),
      mobileNotes,
    );

    // 3. Seven-day practice page (unified page 14/17)
    await page.evaluate(() => {
      const track = document.querySelector(".mr-v2-page-track");
      if (track instanceof HTMLElement) {
        track.style.transform = "translateX(-1300%)";
      }
    });
    await new Promise((r) => setTimeout(r, 300));

    const practiceNotes: string[] = [];
    const practicePanel = await page.evaluate(() => {
      const panel = document.querySelector("#seven-day-practice");
      const title = panel?.querySelector(".report-hero h1")?.textContent ?? "";
      const cards = panel?.querySelectorAll(".report-insight-card").length ?? 0;
      const locked = panel?.querySelector(".locked-preview-block") !== null;
      return { title, cards, locked };
    });
    practiceNotes.push(`practice page title: ${practicePanel.title || "missing"}`);
    practiceNotes.push(
      `sample locked preview: ${practicePanel.locked ? "yes (expected for sample)" : "no"}`,
    );
    practiceNotes.push(`day cards rendered: ${practicePanel.cards}`);

    const practiceOverflow = await noHorizontalOverflow(page);
    practiceNotes.push(`practice horizontal overflow: ${practiceOverflow ? "none" : "DETECTED"}`);

    record(
      "3. Unified mobile seven-day-practice page (390px)",
      (practicePanel.title.includes("7-Day") || practicePanel.locked) && practiceOverflow,
      practiceNotes,
    );

    // 4. Full report sample path (mobile redirect)
    await page.goto(`${BASE}/full-report-v2?year=1980&month=5&day=22`, {
      waitUntil: "domcontentloaded",
      timeout: 60_000,
    });

    const sampleNotes: string[] = [];
    const finalUrl = page.url();
    sampleNotes.push(`final URL: ${finalUrl}`);
    const onMobileSample =
      finalUrl.includes("/mobile-report-v2") ||
      (await page.$(".report-root[data-surface='mobile']")) !== null;
    sampleNotes.push(`mobile sample path active: ${onMobileSample ? "yes" : "no"}`);

    if (onMobileSample) {
      await page.waitForSelector(".report-root[data-surface='mobile']", { timeout: 15_000 });
    }

    const sampleOverflow = await noHorizontalOverflow(page);
    sampleNotes.push(`horizontal overflow: ${sampleOverflow ? "none" : "DETECTED"}`);

    const banner = await page.evaluate(() =>
      document.querySelector(".unified-report-mobile-banner")?.textContent?.trim().slice(0, 80),
    );
    sampleNotes.push(`sample banner: ${banner ?? "not found"}`);

    record(
      "4. Full Report sample path — mobile (390px)",
      onMobileSample && sampleOverflow,
      sampleNotes,
    );

    const allPass = results.every((r) => r.pass);
    console.log(`\n\nOVERALL: ${allPass ? "PASS" : "FAIL WITH NOTES"}`);
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
