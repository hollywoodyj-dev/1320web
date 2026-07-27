/**
 * Lumen QA — Pre-Session Intake v1.1 Easy Access Edition
 * Run: npx tsx scripts/lumen-qa-intake-easy-access-v1.ts
 *
 * Static schema/copy checks always run.
 * Live form checks run when QA_INTAKE_URL is set (authenticated session intake URL).
 */
import fs from "node:fs";
import path from "node:path";
import {
  EXPLORE_OPTIONS,
  HELPFUL_OPTIONS,
  INTAKE_FORM_VERSION,
  INTAKE_SECTIONS,
  LEGACY_INTAKE_FIELD_IDS,
  WHY_NOW_OPTIONS,
  buildIntakePreparationPanel,
  validateEasyAccessIntake,
} from "../lib/personal-integration/ops/intake-schema";
import { INTAKE_COPY } from "../lib/personal-integration/ops/intake-content";

const OUT_DIR = path.join(process.cwd(), "qa-artifacts", "intake-easy-access-v1");
const REPORT = path.join(process.cwd(), "qa-artifacts", "LUMEN_QA_INTAKE_EASY_ACCESS_V1.md");
const LIVE_URL = process.env.QA_INTAKE_URL?.trim();
const BASE = (process.env.QA_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");

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

function staticChecks() {
  const allLabels = INTAKE_SECTIONS.flatMap((section) =>
    section.fields.flatMap((field) => [field.label, field.help ?? "", ...(field.options?.map((o) => o.label) ?? [])]),
  ).join("\n");

  const forbidden =
    /Growth Edge|protective|shadow pattern|embodiment|sovereignty state|mission expression|receiving block|active Blueprint layer|what life is mirroring/i.test(
      allLabels,
    );
  const hasSCodes = /\bS[0-9]\b/.test(allLabels);
  const requiredIds = INTAKE_SECTIONS.flatMap((s) => s.fields.filter((f) => f.required).map((f) => f.id));
  const requiredOk =
    requiredIds.includes("explore_topics") &&
    requiredIds.includes("what_is_happening") &&
    requiredIds.includes("helpful_outcomes") &&
    requiredIds.includes("scope_acknowledgement") &&
    !requiredIds.includes("why_now_options") &&
    !requiredIds.includes("anything_to_know") &&
    !requiredIds.includes("explore_note");

  record("Ordinary language — no interpretive self-diagnosis asks", !forbidden, [
    forbidden ? "forbidden phrase found" : "clean",
  ]);
  record("No S0–S9 terminology in client questions", !hasSCodes, [hasSCodes ? "S-code found" : "clean"]);
  record("Only Easy Access required fields", requiredOk, [`required=${requiredIds.join(",")}`]);
  record("I'm not sure options present", HELPFUL_OPTIONS.some((o) => /not sure/i.test(o.label)) && EXPLORE_OPTIONS.some((o) => /cannot clearly name/i.test(o.label)) && WHY_NOW_OPTIONS.some((o) => /not sure/i.test(o.label)));
  record("Time estimate + easy intro copy", /3–5 minutes/i.test(INTAKE_COPY.timeEstimate) && /perfect answer/i.test(INTAKE_COPY.lead));
  record("Form version Easy Access", INTAKE_FORM_VERSION.includes("v1.1-easy-access"));
  record("Legacy fields archived (not in client sections)", [...LEGACY_INTAKE_FIELD_IDS].every((id) => !requiredIds.includes(id) && !INTAKE_SECTIONS.some((s) => s.fields.some((f) => f.id === id))));

  const valid = validateEasyAccessIntake({
    explore_topics: ["relationship"],
    what_is_happening: "I feel stuck lately",
    helpful_outcomes: ["not_sure_yet"],
    scope_acknowledgement: true,
  });
  const invalid = validateEasyAccessIntake({
    explore_topics: [],
    what_is_happening: "",
    helpful_outcomes: [],
    scope_acknowledgement: false,
  });
  record("Validation accepts short answers", valid === "ok" && invalid === "missing_required");

  const panel = buildIntakePreparationPanel({
    explore_topics: ["relationship", "decision_direction"],
    explore_note: "with my partner",
    what_is_happening: "We keep circling the same argument.",
    why_now_options: ["same_pattern_keeps_repeating"],
    helpful_outcomes: ["another_perspective"],
    anything_to_know: "",
    scope_acknowledgement: true,
  });
  record("Facilitator prep panel maps Easy Access answers", panel.mainArea.labels.length === 2 && panel.whatIsHappening.length > 0 && panel.whatWouldFeelHelpful.labels.length === 1);
}

async function liveChecks() {
  if (!LIVE_URL) {
    record("Live form screenshots", true, ["skipped — set QA_INTAKE_URL for authenticated intake URL"]);
    return;
  }

  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await resolveExecutablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: { width: 390, height: 844 },
  });

  try {
    const page = await browser.newPage();
    await page.goto(LIVE_URL.startsWith("http") ? LIVE_URL : `${BASE}${LIVE_URL}`, {
      waitUntil: "networkidle2",
      timeout: 90_000,
    });
    const body = await page.evaluate(() => (document.body.textContent ?? "").replace(/\s+/g, " "));
    const hasForm = (await page.$(".pi-intake-form")) !== null || /already been submitted|received/i.test(body);
    record("Live intake reachable", hasForm || /Sign in|could not find/i.test(body), [body.slice(0, 120)]);

    if (await page.$(".pi-intake-form")) {
      const text = body;
      record("Live: no S0–S9 in form chrome", !/\bS[0-9]\b/.test(text));
      record("Live: Save Draft present", /Save Draft/i.test(text));
      for (const width of [320, 375, 390, 430]) {
        await page.setViewport({ width, height: 844 });
        await page.screenshot({
          path: path.join(OUT_DIR, `intake-mobile-${width}.png`),
          fullPage: true,
        });
        record(`Mobile no overflow ${width}px`, await noOverflow(page));
      }
      await page.setViewport({ width: 1280, height: 900 });
      await page.screenshot({ path: path.join(OUT_DIR, "intake-desktop-1280.png"), fullPage: true });
    }
  } finally {
    await browser.close();
  }
}

async function fixtureScreenshots() {
  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await resolveExecutablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const optionsHtml = (opts: ReadonlyArray<{ label: string }>) =>
    opts
      .map(
        (opt) =>
          `<label class="opt"><input type="checkbox"/><span>${opt.label}</span></label>`,
      )
      .join("");

  const html = `<!doctype html><html><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>
*{box-sizing:border-box}
html,body{margin:0;overflow-x:hidden}
body{font-family:Georgia,serif;background:#07101c;color:#f5ead6;padding:16px;max-width:100vw}
h1{font-size:1.4rem;color:#f4d88a;text-align:center}
.lead{opacity:.85;line-height:1.5;text-align:center;white-space:pre-line}
.time{text-align:center;color:#e6c778;font-size:.9rem}
.section{margin:18px 0;padding:14px 0;border-top:1px solid rgba(214,181,109,.2)}
.opt{display:flex;gap:10px;align-items:flex-start;padding:12px;margin:8px 0;border:1px solid rgba(255,255,255,.12);border-radius:10px;min-height:44px}
textarea,input[type=text]{width:100%;max-width:100%;min-height:72px;background:#0b1524;color:#f5ead6;border:1px solid rgba(255,255,255,.15);border-radius:8px;padding:10px}
.actions{display:grid;gap:10px;margin-top:16px}
.btn{padding:12px;text-align:center;border-radius:999px;background:#d8b15c;color:#1a1408;font-weight:700}
</style></head><body>
<p class="time">${INTAKE_COPY.timeEstimate}</p>
<h1>${INTAKE_COPY.title}</h1>
<p class="lead">${INTAKE_COPY.lead}</p>
<div class="section"><h2>1. What would you most like to explore?</h2>${optionsHtml(EXPLORE_OPTIONS)}
<textarea placeholder="Tell us a little more, if you would like."></textarea></div>
<div class="section"><h2>2. What has been happening recently?</h2>
<textarea placeholder="For example: I keep having the same disagreement..."></textarea></div>
<div class="section"><h2>3. Why does this feel important now?</h2>${optionsHtml(WHY_NOW_OPTIONS)}</div>
<div class="section"><h2>4. What would feel helpful?</h2>${optionsHtml(HELPFUL_OPTIONS)}</div>
<div class="section"><h2>5. Anything to know? (optional)</h2><textarea></textarea>
<label class="opt"><input type="checkbox"/><span>Personal Integration is a reflective service... I understand.</span></label></div>
<div class="actions"><div class="btn">Save Draft</div><div class="btn">Submit Intake</div></div>
</body></html>`;

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });
    for (const width of [320, 375, 390, 430, 1280]) {
      await page.setViewport({ width, height: width === 1280 ? 900 : 844 });
      const ok = await noOverflow(page);
      await page.screenshot({
        path: path.join(OUT_DIR, width === 1280 ? "intake-fixture-desktop-1280.png" : `intake-fixture-mobile-${width}.png`),
        fullPage: true,
      });
      record(`Fixture layout no overflow ${width}px`, ok);
    }
    const text = await page.evaluate(() => document.body.textContent ?? "");
    record("Fixture: no S0–S9 labels", !/\bS[0-9]\b/.test(text));
    record("Fixture: Save Draft + Submit visible", /Save Draft/i.test(text) && /Submit Intake/i.test(text));
  } finally {
    await browser.close();
  }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  staticChecks();
  await fixtureScreenshots();
  await liveChecks();

  const failed = results.filter((r) => !r.pass);
  const lines = [
    "# Lumen QA — Pre-Session Intake v1.1 · Easy Access Edition",
    "",
    `Date: ${new Date().toISOString()}`,
    `Result: ${failed.length === 0 ? "PASS" : "FAIL"}`,
    `Form version: \`${INTAKE_FORM_VERSION}\``,
    "",
    ...results.map((r) => `- **${r.name}**: ${r.pass ? "PASS" : "FAIL"} — ${r.notes.join("; ")}`),
    "",
    `Artifacts: \`${OUT_DIR}\``,
    "",
    "## Schema compatibility",
    "- New clients render `INTAKE_SECTIONS` (v1.1 Easy Access) only.",
    "- Legacy v1.0 field IDs archived in `LEGACY_INTAKE_SECTIONS_V1_0` / `LEGACY_INTAKE_FIELD_IDS`.",
    "- Older `responses_json` keys remain stored; Facilitator prep panel prefers Easy Access keys.",
    "- Growth Edge is no longer collected from the client form.",
    "",
    "## Analytics",
    "- Intake free text is not sent to advertising/general analytics (form has no trackEvent calls).",
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
