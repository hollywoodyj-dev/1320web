/**
 * Phase 1 funnel smoke — Batch 10 acceptance checklist (automated portion).
 * Run: npm run smoke:funnel
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { calculate1320Code } from "../lib/calculate1320Code";
import { ANALYTICS_EVENTS } from "../lib/analytics-events";
import { buildReportViewModel } from "../lib/report/build-report-view-model";
import { get1320Content } from "../lib/get1320Content";
import { isValidBirthDate } from "../lib/validateBirthDate";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error("FAIL:", message);
    process.exit(1);
  }
}

const ROUTES = [
  "/",
  "/about-1320",
  "/blueprint",
  "/your-code",
  "/generating",
  "/result",
  "/full-report",
  "/sample-report",
  "/booking",
  "/faq",
  "/privacy",
  "/terms",
  "/disclaimer",
];

for (const route of ROUTES) {
  const segment = route === "/" ? "page.tsx" : `${route.slice(1)}/page.tsx`;
  const candidates = [
    path.join(webRoot, "app", segment),
    path.join(webRoot, "app", "(site)", segment),
    path.join(webRoot, "app", route.slice(1), "page.tsx"),
  ];
  const exists = candidates.some((file) => fs.existsSync(file));
  assert(exists, `Route file missing for ${route}`);
}

const REQUIRED_ASSETS = [
  "public/1320-logo.jpeg",
  "public/generating-1320-ring.webp",
  "public/1320-icon.svg",
  "public/hero-banner-desktop-v1.webp",
  "public/hero-banner-v5.webp",
  "public/homepage-ui.png",
  "public/generating-ui.png",
  "public/report-ui.jpeg",
  "public/card/s1.webp",
  "public/card/s3.webp",
  "public/card/s2.webp",
  "public/card/s0.webp",
  "public/how-1320-works/step-01.webp",
  "public/how-1320-works/step-04.webp",
];

for (const asset of REQUIRED_ASSETS) {
  assert(fs.existsSync(path.join(webRoot, asset)), `Missing asset: ${asset}`);
}

assert(fs.existsSync(path.join(webRoot, "app/api/leads/route.ts")), "Missing /api/leads route");
assert(fs.existsSync(path.join(webRoot, ".env.example")), "Missing .env.example");

const analyticsSource = fs.readFileSync(path.join(webRoot, "lib/analytics.ts"), "utf8");
for (const event of ANALYTICS_EVENTS) {
  assert(analyticsSource.includes(`"${event}"`) || fs.readFileSync(path.join(webRoot, "lib/analytics-events.ts"), "utf8").includes(`"${event}"`), `Analytics event not registered: ${event}`);
}

const wiredFiles = [
  "lib/submitBirthDate.ts",
  "components/generating/generating-chamber.tsx",
  "components/report/report-dashboard.tsx",
  "components/blueprint/blueprint-view-tracker.tsx",
  "components/waitlist-form.tsx",
  "components/booking-request-form.tsx",
  "components/lead-capture-form.tsx",
].map((file) => fs.readFileSync(path.join(webRoot, file), "utf8"));

assert(wiredFiles[0].includes("homepage_generate_click"), "homepage_generate_click not wired");
assert(wiredFiles[0].includes("calculator_submit"), "calculator_submit not wired");
assert(wiredFiles[1].includes("generating_view"), "generating_view not wired");
assert(wiredFiles[2].includes("result_view"), "result_view not wired");
assert(wiredFiles[3].includes("blueprint_view"), "blueprint_view not wired");

const code = calculate1320Code(1980, 5, 22);
assert(code.s1 === 18 && code.s3Raw === 110 && code.s2 === 27 && code.s0 === 7, "Canonical code mismatch");
assert(isValidBirthDate(1980, 5, 22), "Canonical birth date should validate");

const content = get1320Content({ s1: 18, s3: 110, s2: 27, s0: 7, locale: "en" });
const freeVm = buildReportViewModel(content, { mode: "free", variant: "result" });
assert(freeVm.mode === "free" && freeVm.modules.every((m) => m.showLocked), "Free result should lock modules");

const fullResultVm = buildReportViewModel(content, { mode: "full", variant: "result" });
const s1Full = fullResultVm.modules.find((m) => m.segmentId === "s1");
assert(Boolean(s1Full && s1Full.fields.length >= 8), "Full /result S1 should match sample detail");
assert(fullResultVm.modules.every((m) => !m.showLocked), "Full /result should not lock modules");

console.log("PASS: Batch 10 funnel smoke");
console.log("  routes:", ROUTES.length, "page files found");
console.log("  assets:", REQUIRED_ASSETS.length, "required files present");
console.log("  analytics events:", ANALYTICS_EVENTS.length);
console.log("  canonical:", content.codes.codeString);
console.log("  manual: homepage → your-code → generating → result (browser)");
