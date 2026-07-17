/**
 * Lumen QA — Your Code Page Refinement Spec v1.0 (light pass)
 * Run: npx tsx scripts/lumen-qa-your-code-refinement-v1.ts
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
  "start with your birth date",
  "birth time and location are not required",
  "generate your code",
  "generate my code",
  "soul origin",
  "soul vibration",
  "soul mirror",
  "void gate",
  "why your birth date",
  "your blueprint is a mirror — not a fixed identity",
];

const FORBIDDEN = ["who you attract", "spiritual maturity", "not a sentence", "birth time of birth location"];

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

    await page.goto(`${BASE}/your-code`, { waitUntil: "networkidle2", timeout: 90_000 });
    await page.waitForSelector(".your-code-page", { timeout: 30_000 });

    const pageText = await page.evaluate(() =>
      (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ").trim(),
    );
    const notes: string[] = [];

    const missing = REQUIRED.filter((p) => !pageText.includes(p));
    notes.push(`required missing (${missing.length}): ${missing.join(", ") || "none"}`);

    const forbidden = FORBIDDEN.filter((p) => pageText.includes(p));
    notes.push(`forbidden found: ${forbidden.join(", ") || "none"}`);

    const fields = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll("#birth-date-form input, .birthdate-form input"));
      return {
        count: inputs.length,
        names: inputs.map((el) => (el.getAttribute("name") ?? "").toLowerCase()),
        hasTime: inputs.some((el) => /time|hour|minute/i.test(el.getAttribute("name") ?? "") || /time|hour/i.test(el.getAttribute("id") ?? "")),
        hasLocation: inputs.some((el) => /location|city|place/i.test(el.getAttribute("name") ?? "")),
      };
    });
    notes.push(`form fields (${fields.count}): ${fields.names.join(", ") || "none"}`);
    notes.push(`no birth time field: ${!fields.hasTime ? "yes" : "NO"}`);
    notes.push(`no location field: ${!fields.hasLocation ? "yes" : "NO"}`);

    const pillarOrder = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".inner-receive-pillar-grid .pillar-code")).map(
        (el) => el.textContent?.trim() ?? "",
      ),
    );
    notes.push(`receive cards order: ${pillarOrder.join(" → ") || "not found"}`);
    const orderOk = pillarOrder.join(",") === "S1,S3,S2,S0";

    const faqCount = await page.evaluate(
      () => document.querySelectorAll(".your-code-faq-preview li").length,
    );
    notes.push(`FAQ preview count: ${faqCount}`);

    const bodyFont = await page.evaluate(() => parseFloat(getComputedStyle(document.body).fontSize));
    notes.push(`body font-size: ${bodyFont}px`);

    const overflow = await noHorizontalOverflow(page);
    notes.push(`horizontal overflow: ${overflow ? "none" : "DETECTED"}`);

    const formVisible = await page.evaluate(() => {
      const form = document.querySelector("#birth-date-form");
      return Boolean(form);
    });
    notes.push(`birth-date form present: ${formVisible ? "yes" : "NO"}`);

    const pass =
      missing.length === 0 &&
      forbidden.length === 0 &&
      fields.count === 3 &&
      !fields.hasTime &&
      !fields.hasLocation &&
      orderOk &&
      faqCount > 0 &&
      faqCount <= 5 &&
      bodyFont >= 16.5 &&
      overflow &&
      formVisible;

    record("Your Code Refinement v1.0 (390px mobile)", pass, notes);

    await page.setViewport(DESKTOP_VIEWPORT);
    await page.reload({ waitUntil: "networkidle2", timeout: 90_000 });
    const desktopNotes: string[] = [];
    const desktopOverflow = await noHorizontalOverflow(page);
    desktopNotes.push(`horizontal overflow: ${desktopOverflow ? "none" : "DETECTED"}`);
    const desktopOrder = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".inner-receive-pillar-grid .pillar-code")).map(
        (el) => el.textContent?.trim() ?? "",
      ),
    );
    desktopNotes.push(`receive cards order: ${desktopOrder.join(" → ")}`);
    record(
      "Your Code desktop layout (1280px)",
      desktopOverflow && desktopOrder.join(",") === "S1,S3,S2,S0",
      desktopNotes,
    );

    const allPass = results.every((r) => r.pass);
    console.log(`\n\nOVERALL: ${allPass ? "PASS" : "FAIL WITH NOTES"}`);

    const fs = await import("node:fs");
    const path = await import("node:path");
    const artifactDir = path.join(process.cwd(), "qa-artifacts");
    fs.mkdirSync(artifactDir, { recursive: true });
    const date = new Date().toISOString().slice(0, 10);
    const artifactPath = path.join(artifactDir, `LUMEN_QA_YOUR_CODE_REFINEMENT_v1_${date}.md`);
    fs.writeFileSync(
      artifactPath,
      [
        "# Lumen QA — Your Code Page Refinement Spec v1.0",
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
