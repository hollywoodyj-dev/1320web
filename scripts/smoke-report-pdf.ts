import {
  buildEntitledReportPrintUrl,
  buildSampleReportPrintUrl,
  buildReportSystemPreviewPrintUrl,
} from "@/lib/report-system/report-print-urls";
import { FULL_REPORT_PAGE_COUNT } from "@/lib/report-system";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
}

const base = "https://www.1320soulcode.com";

assert(
  buildSampleReportPrintUrl("full", base) ===
    "https://www.1320soulcode.com/sample-report/print?type=full",
  "sample full print URL",
);
assert(
  buildSampleReportPrintUrl("sample", base) ===
    "https://www.1320soulcode.com/sample-report/print?type=sample",
  "sample locked print URL",
);
assert(
  buildEntitledReportPrintUrl("abc-123", base) ===
    "https://www.1320soulcode.com/report/abc-123/print",
  "entitled print URL",
);
assert(
  buildReportSystemPreviewPrintUrl("full", base).includes("/report-system-preview/print"),
  "preview print URL",
);

console.log("PASS smoke:report-pdf");
console.log(`  unifiedPages=${FULL_REPORT_PAGE_COUNT}`);

export {};
