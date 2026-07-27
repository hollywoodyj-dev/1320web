/**
 * Lumen QA — P0 Legal Product-State Alignment
 * Run: npx tsx scripts/lumen-qa-p0-legal.ts
 */
import fs from "node:fs";
import path from "node:path";

const BASE = (process.env.QA_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const OUT_DIR = path.join(process.cwd(), "qa-artifacts", "conversion-ui-p0-legal");
const REPORT = path.join(process.cwd(), "qa-artifacts", "LUMEN_QA_P0_LEGAL.md");

type Check = { name: string; pass: boolean; notes: string[] };
const results: Check[] = [];

function record(name: string, pass: boolean, notes: string[] = []) {
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

async function noOverflow(page: import("puppeteer-core").Page): Promise<boolean> {
  return page.evaluate(
    () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
  );
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await resolveExecutablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: { width: 1280, height: 900 },
  });

  try {
    const page = await browser.newPage();

    // Terms
    await page.goto(`${BASE}/terms`, { waitUntil: "networkidle2", timeout: 90_000 });
    const terms = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").replace(/\s+/g, " ");
      return {
        free: /Free Soul Blueprint/i.test(text),
        full: /Full Soul Blueprint Report purchase/i.test(text),
        account: /Account-based entitled access/i.test(text),
        surfaces: /Web, Mobile, and PDF/i.test(text),
        sessions: /Personal Integration Session purchase and booking/i.test(text),
        outdated:
          /Phase 1 only|No checkout|No user accounts|No payment processing|Waitlist or booking request only/i.test(
            text,
          ),
        cta: /Discover My Free Soul Blueprint/i.test(text),
      };
    });
    await page.screenshot({ path: path.join(OUT_DIR, "terms-desktop-1280.png"), fullPage: true });
    record(
      "Terms live product-state",
      terms.free && terms.full && terms.account && terms.surfaces && terms.sessions && !terms.outdated,
      [JSON.stringify(terms)],
    );
    record("Terms desktop no overflow", await noOverflow(page));

    await page.setViewport({ width: 390, height: 844 });
    await page.reload({ waitUntil: "networkidle2", timeout: 90_000 });
    await page.screenshot({ path: path.join(OUT_DIR, "terms-mobile-390.png"), fullPage: true });
    record("Terms mobile no overflow", await noOverflow(page));

    // Privacy
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(`${BASE}/privacy`, { waitUntil: "networkidle2", timeout: 90_000 });
    const privacy = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").replace(/\s+/g, " ");
      return {
        purchase: /purchase|checkout|entitlement/i.test(text),
        transactional: /Transactional emails/i.test(text),
        marketing: /opted in|recorded consent/i.test(text),
        noSell: /do not sell your personal information/i.test(text),
        freeNoAccount: /without creating an account/i.test(text),
      };
    });
    await page.screenshot({ path: path.join(OUT_DIR, "privacy-desktop-1280.png"), fullPage: true });
    record(
      "Privacy live product-state",
      privacy.purchase && privacy.transactional && privacy.marketing && privacy.noSell && privacy.freeNoAccount,
      [JSON.stringify(privacy)],
    );

    // Disclaimer
    await page.goto(`${BASE}/disclaimer`, { waitUntil: "networkidle2", timeout: 90_000 });
    const disclaimer = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").replace(/\s+/g, " ");
      return {
        consultant: /Blueprint Integration Consultant/i.test(text),
        nonDirective: /facilitative, reflective, and non-directive/i.test(text),
        notPrediction: /prediction|diagnosis/i.test(text),
      };
    });
    await page.screenshot({ path: path.join(OUT_DIR, "disclaimer-desktop-1280.png"), fullPage: true });
    record(
      "Disclaimer consultant posture",
      disclaimer.consultant && disclaimer.nonDirective && disclaimer.notPrediction,
      [JSON.stringify(disclaimer)],
    );

    await page.setViewport({ width: 390, height: 844 });
    await page.reload({ waitUntil: "networkidle2", timeout: 90_000 });
    await page.screenshot({ path: path.join(OUT_DIR, "disclaimer-mobile-390.png"), fullPage: true });
    record("Disclaimer mobile no overflow", await noOverflow(page));
  } finally {
    await browser.close();
  }

  const failed = results.filter((r) => !r.pass);
  const lines = [
    "# Lumen QA — P0 Legal Product-State Alignment",
    "",
    `Base: ${BASE}`,
    `Date: ${new Date().toISOString()}`,
    `Result: ${failed.length === 0 ? "PASS" : "FAIL"}`,
    "",
    ...results.map((r) => `- **${r.name}**: ${r.pass ? "PASS" : "FAIL"} — ${r.notes.join("; ")}`),
    "",
    `Screenshots: \`${OUT_DIR}\``,
    "",
    "## External review flags",
    "- `docs/governance/LEGAL_EXTERNAL_REVIEW_FLAGS_P0_2026-07-28.md`",
    "",
  ];
  fs.writeFileSync(REPORT, lines.join("\n"), "utf8");
  console.log(`\nWrote ${REPORT}`);
  if (failed.length) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
