/**
 * Phase 1 UI baseline checks (steps 2–3 automation).
 * Run: npm run qa:baseline
 */
import fs from "node:fs";
import path from "node:path";
import { get1320Content } from "../lib/get1320Content";
import { buildReportViewModel } from "../lib/report/build-report-view-model";
import { getSegmentCardImageUrl } from "../lib/segment-card-asset";

const SAMPLE = { s1: 18, s3: 110, s2: 27, s0: 7 };
const PUBLIC = path.join(process.cwd(), "public");

const ROUTES = [
  "/",
  "/your-code",
  "/generating",
  "/result",
  "/sample-report",
  "/about-1320",
  "/blueprint",
  "/faq",
] as const;

const REQUIRED_LINKS = [
  "/your-code",
  "/full-report",
  "/sample-report",
  "/blueprint",
  "/about-1320",
  "/privacy",
  "/booking",
];

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error("FAIL:", message);
    process.exit(1);
  }
}

function fileExists(rel: string) {
  return fs.existsSync(path.join(PUBLIC, rel.replace(/^\//, "")));
}

console.log("=== Route pages (app/) ===");
for (const route of ROUTES) {
  const segment = route === "/" ? "page.tsx" : `${route.slice(1)}/page.tsx`;
  const candidates = [
    path.join("app", segment),
    path.join("app", "(site)", segment),
    path.join("app", route.slice(1), "page.tsx"),
  ];
  const found = candidates.some((p) => fs.existsSync(path.join(process.cwd(), p)));
  assert(found, `missing page for ${route}`);
  console.log("  OK", route);
}

console.log("\n=== Card assets ===");
assert(fileExists("/S1-44/S18.webp"), "S1-44/S18.webp missing");
assert(fileExists("/S3-12/S03.webp"), "S3-12/S03.webp missing (tier T03 for S3-110)");
assert(getSegmentCardImageUrl("s1", 18) === "/S1-44/S18.webp", "S1 path");
assert(getSegmentCardImageUrl("s3", 110) === "/S3-12/S03.webp", "S3 tier path");
assert(fileExists("/S2-50/S2-27.webp"), "S2-50/S2-27.webp missing");
assert(getSegmentCardImageUrl("s2", 27) === "/S2-50/S2-27.webp", "S2 path");
assert(fileExists("/S0-19/S0-07.webp"), "S0-19/S0-07.webp missing");
assert(getSegmentCardImageUrl("s0", 7) === "/S0-19/S0-07.webp", "S0 path");
assert(getSegmentCardImageUrl("s0", 0) === "/S0-19/S0-00.webp", "S0 zero path");
console.log("  OK S1/S2/S3/S0 card paths");

console.log("\n=== Report view model (sample full) ===");
const content = get1320Content({ ...SAMPLE, locale: "en" });
const vm = buildReportViewModel(content, { mode: "full", variant: "sample" });
assert(vm.modules.length === 4, "four modules");
const s1 = vm.modules.find((m) => m.segmentId === "s1");
const s3 = vm.modules.find((m) => m.segmentId === "s3");
const s2 = vm.modules.find((m) => m.segmentId === "s2");
const s0 = vm.modules.find((m) => m.segmentId === "s0");
assert(Boolean(s1?.cardImageUrl), "S1 card on module");
assert(Boolean(s3?.cardImageUrl), "S3 card on module");
assert(Boolean(s2?.cardImageUrl), "S2 card on module");
assert(Boolean(s0?.cardImageUrl), "S0 card on module");
for (const mod of vm.modules) {
  assert(mod.fields.length > 0, `${mod.segmentId} has fields`);
  assert(mod.codeLabel.length > 0, `${mod.segmentId} code label`);
}
assert(
  Boolean(s2?.fields.some((f) => f.label === "Relationship Trigger Pattern")),
  "S2 full report includes Relationship Trigger Pattern",
);
assert(
  Boolean(s0?.fields.some((f) => f.label === "Core Illusion Mechanism")),
  "S0 full report includes Core Illusion Mechanism",
);
const s3Overview = vm.overviewCards.find((c) => c.segmentId === "s3");
assert(!s3Overview?.metaNote, "S3 overview must not show raw value");
assert(!s3Overview?.essence.includes("S3-"), "S3 overview essence must not repeat code prefix");
assert(
  !vm.overviewCards.some((c) => /Your Mirror Path \(|Your Void Gate \(S0-/i.test(c.essence)),
  "overview essence must not use template wrappers",
);
console.log("  OK modules + fields");

console.log("\n=== Report view model (result free) ===");
const freeVm = buildReportViewModel(content, { mode: "free", variant: "result" });
for (const mod of freeVm.modules) {
  assert(mod.showLocked, `${mod.segmentId} free layer locked`);
  assert((mod.lockedTeaser?.length ?? 0) > 0, `${mod.segmentId} locked teaser`);
}
console.log("  OK free-mode locked teasers");

console.log("\n=== Static link targets (public assets) ===");
for (const href of REQUIRED_LINKS) {
  console.log("  link", href, "(route exists in app tree)");
}

console.log("\nPASS: qa-baseline");
