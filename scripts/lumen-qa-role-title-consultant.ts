/**
 * Lumen QA — Client-facing role title: Blueprint Integration Consultant
 * Run: npx tsx scripts/lumen-qa-role-title-consultant.ts
 */
import fs from "node:fs";
import path from "node:path";
import {
  ROLE_MEET_HEADING,
  ROLE_TITLE_FULL,
  ROLE_TITLE_SHORT,
  ROLE_TITLE_ZH,
  ROLE_TITLE_ZH_SHORT,
} from "../lib/personal-integration/role-titles";

const BASE = (process.env.QA_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const OUT_DIR = path.join(process.cwd(), "qa-artifacts", "role-title-consultant");
const REPORT = path.join(process.cwd(), "qa-artifacts", "LUMEN_QA_ROLE_TITLE_CONSULTANT.md");

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

function staticSourceChecks() {
  const roots = [
    "lib/booking-content.ts",
    "lib/booking/success-content.ts",
    "lib/personal-integration/ops/intake-content.ts",
    "lib/personal-integration/prep-content.ts",
    "lib/email/send-integration-reminders.ts",
    "lib/email/send-integration-summary.ts",
    "lib/personal-integration/ops/summary-template.ts",
    "app/(site)/account/integration-sessions/[sessionId]/page.tsx",
  ];
  for (const rel of roots) {
    const text = fs.readFileSync(path.join(process.cwd(), rel), "utf8");
    const clientFacilitator =
      /\byour Facilitator\b|\byour facilitator\b|Your Facilitator|helps your facilitator/i.test(text) &&
      !text.includes("Internal Facilitator");
    record(`No client "Facilitator" in ${rel}`, !clientFacilitator, [
      clientFacilitator ? "found client Facilitator wording" : "clean",
    ]);
  }

  const dbTypes = fs.readFileSync(path.join(process.cwd(), "lib/db/types.ts"), "utf8");
  record("Internal fields unchanged (facilitator_id)", /facilitator_id/.test(dbTypes) && /assigned_facilitator_id/.test(dbTypes));
  record("Role constants present", Boolean(ROLE_TITLE_SHORT && ROLE_TITLE_FULL && ROLE_MEET_HEADING && ROLE_TITLE_ZH && ROLE_TITLE_ZH_SHORT));
  record("Avoids bare Blueprint Consultant", ROLE_TITLE_SHORT === "Blueprint Integration Consultant");
}

async function liveChecks() {
  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await resolveExecutablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: { width: 1280, height: 900 },
  });

  try {
    const page = await browser.newPage();
    await page.goto(`${BASE}/booking`, { waitUntil: "networkidle2", timeout: 90_000 });
    const booking = await page.evaluate((short, meet) => {
      const text = (document.body.textContent ?? "").replace(/\s+/g, " ");
      return {
        hasShort: text.includes(short),
        hasMeet: text.includes(meet),
        hasFacilitatorClient: /your Facilitator|your facilitator|Meet with a Facilitator/i.test(text),
        hasBareBlueprintConsultant: /Blueprint Consultant(?! Integration)/.test(text),
        nonPredictive: /will not define you|not predict|not.*diagnos/i.test(text),
      };
    }, ROLE_TITLE_SHORT, ROLE_MEET_HEADING);
    await page.screenshot({ path: path.join(OUT_DIR, "booking-desktop-1280.png"), fullPage: true });
    record(
      "Booking page uses Consultant title",
      booking.hasShort && booking.hasMeet && !booking.hasFacilitatorClient && !booking.hasBareBlueprintConsultant && booking.nonPredictive,
      [JSON.stringify(booking)],
    );
    record("Booking desktop no overflow", await noOverflow(page));

    for (const width of [320, 390, 430]) {
      await page.setViewport({ width, height: 844 });
      await page.reload({ waitUntil: "networkidle2", timeout: 90_000 });
      await page.screenshot({ path: path.join(OUT_DIR, `booking-mobile-${width}.png`), fullPage: true });
      record(`Booking mobile no overflow ${width}px`, await noOverflow(page));
    }

    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(`${BASE}/disclaimer`, { waitUntil: "networkidle2", timeout: 90_000 });
    const disclaimer = await page.evaluate((short) => {
      const text = document.body.textContent ?? "";
      return text.includes(short);
    }, ROLE_TITLE_SHORT);
    record("Disclaimer mentions Consultant", disclaimer);
  } finally {
    await browser.close();
  }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  staticSourceChecks();
  await liveChecks();

  const failed = results.filter((r) => !r.pass);
  const lines = [
    "# Lumen QA — Blueprint Integration Consultant role title",
    "",
    `Date: ${new Date().toISOString()}`,
    `Result: ${failed.length === 0 ? "PASS" : "FAIL"}`,
    "",
    `Short: ${ROLE_TITLE_SHORT}`,
    `Full: ${ROLE_TITLE_FULL}`,
    `ZH: ${ROLE_TITLE_ZH} / ${ROLE_TITLE_ZH_SHORT}`,
    "",
    ...results.map((r) => `- **${r.name}**: ${r.pass ? "PASS" : "FAIL"} — ${r.notes.join("; ")}`),
    "",
    `Screenshots: \`${OUT_DIR}\``,
    "",
    "## Internal boundary",
    "- `facilitator_id`, `assigned_facilitator_id`, facilitator workspace routes unchanged.",
    "- Summary JSON key `facilitator_label` retained; client-facing value/label use Consultant title.",
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
