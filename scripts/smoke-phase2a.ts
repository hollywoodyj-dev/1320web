/**
 * Phase 2A wiring smoke — file presence + exports (no live DB/Stripe required).
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error("FAIL:", message);
    process.exit(1);
  }
}

const required = [
  "db/schema.sql",
  "lib/platform-config.ts",
  "lib/db/client.ts",
  "lib/auth/session.ts",
  "lib/auth/magic-link.ts",
  "lib/stripe/client.ts",
  "app/api/checkout/route.ts",
  "app/api/webhooks/stripe/route.ts",
  "app/auth/verify/route.ts",
  "app/(site)/checkout/page.tsx",
  "app/(site)/my-report/page.tsx",
  "app/(site)/my-report/[reportId]/page.tsx",
];

for (const rel of required) {
  assert(fs.existsSync(path.join(root, rel)), `Missing ${rel}`);
}

const resultPage = fs.readFileSync(path.join(root, "app/(site)/result/page.tsx"), "utf8");
assert(resultPage.includes("resolveResultReportMode"), "Result page must gate free vs full access");

const leadsRoute = fs.readFileSync(path.join(root, "app/api/leads/route.ts"), "utf8");
assert(leadsRoute.includes("insertLead"), "Leads API must persist to database");

console.log("smoke:phase2a OK — Phase 2A foundation files present");
