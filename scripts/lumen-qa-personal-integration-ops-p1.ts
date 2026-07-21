/**
 * Lumen QA — Personal Integration Ops Phase 1 (privacy + ungated surfaces).
 * Run: npx tsx scripts/lumen-qa-personal-integration-ops-p1.ts
 */
import fs from "node:fs";
import path from "node:path";

const BASE = (process.env.QA_BASE_URL ?? "https://www.1320soulcode.com").replace(/\/$/, "");
const ARTIFACT = path.join(
  process.cwd(),
  "qa-artifacts",
  "LUMEN_QA_PERSONAL_INTEGRATION_OPS_P1_2026-07-22.md",
);

type Check = { name: string; pass: boolean; notes: string[] };
const results: Check[] = [];

function record(name: string, pass: boolean, notes: string[]) {
  results.push({ name, pass, notes });
  console.log(`\n=== ${name}: ${pass ? "PASS" : "FAIL"} ===`);
  for (const n of notes) console.log(`  - ${n}`);
}

async function resolveExecutablePath(): Promise<string> {
  const localPath = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  if (localPath) return localPath;
  const winChrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  if (fs.existsSync(winChrome)) return winChrome;
  const chromium = await import("@sparticuz/chromium");
  return chromium.default.executablePath();
}

async function main() {
  const sourceNotes: string[] = [];
  const shell = fs.readFileSync(path.join(process.cwd(), "components/page-shell.tsx"), "utf8");
  const mw = fs.readFileSync(path.join(process.cwd(), "middleware.ts"), "utf8");
  const auth = fs.readFileSync(
    path.join(process.cwd(), "lib/personal-integration/facilitator-auth.ts"),
    "utf8",
  );
  const list = fs.readFileSync(
    path.join(process.cwd(), "components/personal-integration/facilitator-session-list.tsx"),
    "utf8",
  );

  const checks: Array<[boolean, string]> = [
    [shell.includes("/facilitator/"), "member/quiet chrome includes facilitator"],
    [mw.includes("/facilitator/:path*"), "middleware no-store for facilitator"],
    [mw.includes("/integration/intake/"), "middleware no-store for intake"],
    [!list.toLowerCase().includes("personal_integration_facilitator_key"), "no env var name in UI"],
    [!list.includes("process.env"), "no process.env in facilitator list UI"],
    [auth.includes("PERSONAL_INTEGRATION_FACILITATOR_KEY"), "server-side key validation exists"],
    [
      fs.existsSync(path.join(process.cwd(), "db/platform-domain-v1.7-integration-ops.sql")),
      "v1.7 migration present",
    ],
  ];
  let sourcePass = true;
  for (const [ok, label] of checks) {
    sourceNotes.push(`${ok ? "ok" : "FAIL"}: ${label}`);
    if (!ok) sourcePass = false;
  }
  record("Source privacy / governance", sourcePass, sourceNotes);

  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await resolveExecutablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: { width: 1280, height: 900 },
  });

  try {
    const page = await browser.newPage();
    await page.goto(`${BASE}/facilitator/sessions`, { waitUntil: "domcontentloaded", timeout: 90_000 });
    const gate = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase();
      return {
        hasGate: text.includes("access key") || text.includes("facilitator"),
        leakedSession:
          text.includes("@") && text.includes("intake") && text.includes("needs intake review"),
        envLeak: text.includes("personal_integration_facilitator_key") || text.includes("process.env"),
        robots: document.querySelector("meta[name='robots']")?.getAttribute("content") ?? "",
      };
    });

    record("Facilitator list ungated", !gate.leakedSession && !gate.envLeak && gate.hasGate, [
      `gate present: ${gate.hasGate}`,
      `session list leaked without auth: ${gate.leakedSession}`,
      `env leak: ${gate.envLeak}`,
      `robots: ${gate.robots}`,
    ]);

    const api = await fetch(`${BASE}/api/personal-integration/facilitator/workspace`);
    const apiJson = (await api.json()) as { ok?: boolean; sessions?: unknown };
    record("Facilitator API rejects missing key", api.status === 401 && !apiJson.sessions, [
      `status: ${api.status}`,
      `has sessions payload: ${Boolean(apiJson.sessions)}`,
    ]);
  } finally {
    await browser.close();
  }

  const allPass = results.every((r) => r.pass);
  const md = [
    "# Lumen QA — Personal Integration Ops Phase 1",
    "",
    `Date: 2026-07-22`,
    `Base: ${BASE}`,
    `Verdict: **${allPass ? "PASS" : "FAIL"}**`,
    "",
    ...results.flatMap((r) => [`## ${r.name}: ${r.pass ? "PASS" : "FAIL"}`, ...r.notes.map((n) => `- ${n}`), ""]),
  ].join("\n");
  fs.mkdirSync(path.dirname(ARTIFACT), { recursive: true });
  fs.writeFileSync(ARTIFACT, md, "utf8");
  console.log(`\nWrote ${ARTIFACT}`);
  console.log(`Verdict: ${allPass ? "PASS" : "FAIL"}`);
  if (!allPass) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
