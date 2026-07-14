import {
  buildFullReportPages,
  buildSampleReportPages,
  FULL_REPORT_PAGE_COUNT,
  FULL_REPORT_PAGE_MAP,
  normalizeReportSegment,
  SAMPLE_REPORT_ACCESS,
} from "@/lib/report-system";
import { buildCanonicalSampleReport } from "@/lib/canonical-report";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
}

const report = buildCanonicalSampleReport();
const fullPages = buildFullReportPages();
const samplePages = buildSampleReportPages();

assert(fullPages.length === FULL_REPORT_PAGE_COUNT, "full page count matches map");
assert(samplePages.length === FULL_REPORT_PAGE_COUNT, "sample page count matches map");

const foundationOrder = FULL_REPORT_PAGE_MAP.filter(
  (page): page is Extract<(typeof FULL_REPORT_PAGE_MAP)[number], { segment: string }> =>
    page.pageType === "segment" && "segment" in page,
)
  .slice(0, 4)
  .map((page) => page.segment);
assert(
  foundationOrder.join(",") === "S1,S3,S2,S0",
  `foundation order is S1→S3→S2→S0 (got ${foundationOrder.join("→")})`,
);

const advancedOrder = FULL_REPORT_PAGE_MAP.filter(
  (page): page is Extract<(typeof FULL_REPORT_PAGE_MAP)[number], { segment: string }> =>
    page.pageType === "segment" &&
    "segment" in page &&
    ["S4", "S5", "S6", "S7", "S8", "S9"].includes(page.segment),
).map((page) => page.segment);
assert(
  advancedOrder.join(",") === "S4,S5,S6,S7,S8,S9",
  `advanced order is S4→S9 (got ${advancedOrder.join("→")})`,
);

const lockedSamplePages = samplePages.filter((page) => page.access === "locked-preview");
assert(lockedSamplePages.length >= 9, "sample report locks advanced + tail sections");

for (const pageId of Object.keys(SAMPLE_REPORT_ACCESS)) {
  const samplePage = samplePages.find((page) => page.pageId === pageId);
  assert(Boolean(samplePage), `sample page exists for ${pageId}`);
  assert(
    samplePage!.access === SAMPLE_REPORT_ACCESS[pageId as keyof typeof SAMPLE_REPORT_ACCESS],
    `sample access matches for ${pageId}`,
  );
}

for (const segment of ["S1", "S3", "S2", "S0", "S6", "S7"] as const) {
  const view = normalizeReportSegment(report, segment);
  assert(view.displayName.length > 0, `${segment} display name resolves`);
  assert(Object.keys(view.commercialBlocks).length > 0, `${segment} has renderable blocks`);
}

const s6View = normalizeReportSegment(report, "S6");
assert(
  s6View.segmentName.includes("Value") && s6View.segmentName.includes("Receiving"),
  "S6 remains Value & Receiving",
);

const s7Text = Object.values(normalizeReportSegment(report, "S7").commercialBlocks).join(" ").toLowerCase();
assert(!/\b\d{1,3}%\b/.test(s7Text), "S7 blocks avoid percentage language");
assert(!/\b(score|rank|ranking)\b/.test(s7Text), "S7 blocks avoid score/rank language");

console.log("PASS smoke:report-system");
console.log(`  pages=${FULL_REPORT_PAGE_COUNT} sampleLocked=${lockedSamplePages.length}`);

export {};
