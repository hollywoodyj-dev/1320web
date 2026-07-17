/**
 * Lumen QA — Generating Page Refinement Spec v1.0 (light pass)
 * Run: npx tsx scripts/lumen-qa-generating-refinement-v1.ts
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
    const url = `${BASE}/generating?year=${SAMPLE.year}&month=${SAMPLE.month}&day=${SAMPLE.day}`;
    console.log(`QA base URL: ${url}`);

    await page.goto(url, { waitUntil: "networkidle2", timeout: 90_000 });
    await page.waitForSelector(".generating-chamber--refined", { timeout: 30_000 });

    // Capture early loading state quickly
    const early = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const cta = document.querySelector(".generating-cta");
      const disabled =
        cta?.tagName === "BUTTON" &&
        ((cta as HTMLButtonElement).disabled || cta.classList.contains("is-disabled"));
      const ctaText = (cta?.textContent ?? "").trim().toLowerCase();
      return {
        text,
        ctaText,
        disabled,
        hasNeverStored: text.includes("never stored"),
        hasForming: ctaText.includes("forming your blueprint"),
        hasViewActive:
          cta?.tagName === "A" && ctaText.includes("view my result"),
        hasPredictionBoundary: text.includes("this is not a prediction"),
        hasFourMirrors: text.includes("origin, vibration, mirror, and void"),
        railLabels: Array.from(document.querySelectorAll(".generating-rail-label")).map(
          (el) => el.textContent?.trim() ?? "",
        ),
      };
    });

    const earlyNotes = [
      `CTA text: "${early.ctaText}"`,
      `CTA disabled while loading: ${early.disabled ? "yes" : "NO"}`,
      `no "never stored": ${!early.hasNeverStored ? "yes" : "NO"}`,
      `boundary present: ${early.hasPredictionBoundary ? "yes" : "NO"}`,
      `four foundation mirrors copy: ${early.hasFourMirrors ? "yes" : "NO"}`,
      `progress labels: ${early.railLabels.join(" → ") || "none"}`,
      `overflow: ${(await noHorizontalOverflow(page)) ? "none" : "DETECTED"}`,
    ];

    const earlyPass =
      early.disabled &&
      early.hasForming &&
      !early.hasViewActive &&
      !early.hasNeverStored &&
      early.hasPredictionBoundary &&
      early.hasFourMirrors &&
      early.railLabels.join(",") === "Origin,Vibration,Mirror,Void" &&
      (await noHorizontalOverflow(page));

    record("Generating loading state (390px)", earlyPass, earlyNotes);

    // Wait for complete state (steps ~4.8s + buffer)
    await page.waitForFunction(
      () => {
        const cta = document.querySelector(".generating-cta");
        const text = (cta?.textContent ?? "").toLowerCase();
        return cta?.tagName === "A" && text.includes("view my result");
      },
      { timeout: 15_000 },
    );

    const complete = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const cta = document.querySelector(".generating-cta");
      const statuses = Array.from(document.querySelectorAll(".generating-rail-status")).map(
        (el) => el.textContent?.trim() ?? "",
      );
      return {
        ready: text.includes("your blueprint is ready"),
        ctaText: (cta?.textContent ?? "").trim(),
        ctaIsLink: cta?.tagName === "A",
        statuses,
        hasNeverStored: text.includes("never stored"),
      };
    });

    const completeNotes = [
      `ready copy: ${complete.ready ? "yes" : "NO"}`,
      `CTA: "${complete.ctaText}" (${complete.ctaIsLink ? "link" : "not link"})`,
      `statuses: ${complete.statuses.join(", ")}`,
      `no never stored: ${!complete.hasNeverStored ? "yes" : "NO"}`,
    ];
    const completePass =
      complete.ready &&
      complete.ctaIsLink &&
      complete.ctaText.toLowerCase().includes("view my result") &&
      complete.statuses.every((s) => s === "Complete") &&
      !complete.hasNeverStored;

    record("Generating complete state (390px)", completePass, completeNotes);

    // Error state (invalid date)
    await page.goto(`${BASE}/generating?year=0&month=1&day=1`, {
      waitUntil: "networkidle2",
      timeout: 90_000,
    });
    const error = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      return {
        interrupted: text.includes("something interrupted"),
        tryAgain: text.includes("try again"),
      };
    });
    record("Generating error state", error.interrupted && error.tryAgain, [
      `interrupted message: ${error.interrupted ? "yes" : "NO"}`,
      `try again CTA: ${error.tryAgain ? "yes" : "NO"}`,
    ]);

    await page.setViewport(DESKTOP_VIEWPORT);
    await page.goto(url, { waitUntil: "networkidle2", timeout: 90_000 });
    await page.waitForSelector(".generating-chamber--refined", { timeout: 30_000 });
    const desktopOverflow = await noHorizontalOverflow(page);
    record("Generating desktop layout (1280px)", desktopOverflow, [
      `horizontal overflow: ${desktopOverflow ? "none" : "DETECTED"}`,
    ]);

    const allPass = results.every((r) => r.pass);
    console.log(`\n\nOVERALL: ${allPass ? "PASS" : "FAIL WITH NOTES"}`);

    const fs = await import("node:fs");
    const path = await import("node:path");
    const artifactDir = path.join(process.cwd(), "qa-artifacts");
    fs.mkdirSync(artifactDir, { recursive: true });
    const date = new Date().toISOString().slice(0, 10);
    const artifactPath = path.join(artifactDir, `LUMEN_QA_GENERATING_REFINEMENT_v1_${date}.md`);
    fs.writeFileSync(
      artifactPath,
      [
        "# Lumen QA — Generating Page Refinement Spec v1.0",
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
