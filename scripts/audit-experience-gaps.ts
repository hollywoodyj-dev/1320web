/**
 * Audit experience parity gaps across smoke dates.
 * Run: npx tsx scripts/audit-experience-gaps.ts
 */
import { compareReportParity } from "../lib/canonical-report/compare-parity";
import {
  classifyExperienceParityExclusion,
  isExperienceParityExclusion,
} from "../lib/canonical-report/experience-parity-exclusions";
import { normalizeSubstantiveText } from "../lib/canonical-report/extract-substantive-text";
import type { CanonicalSectionId } from "../lib/canonical-report/types";

const dates = [
  { birth_date: "1980-05-22", label: "canonical" },
  { birth_date: "1982-02-03", label: "lumen-baseline" },
  { birth_date: "1977-11-12", label: "wisewave-1977" },
];

type GapEntry = {
  sectionId: CanonicalSectionId;
  fixPriority: number;
  text: string;
  dates: Set<string>;
  exclusion: ReturnType<typeof classifyExperienceParityExclusion>;
};

const byNorm = new Map<string, GapEntry>();
let totalInstances = 0;

for (const entry of dates) {
  const report = compareReportParity({ name: "Gap audit", birth_date: entry.birth_date });
  totalInstances += report.experienceParityGaps.length;

  for (const gap of report.experienceParityGaps) {
    const text = normalizeSubstantiveText(gap.desktopValue);
    const key = `${gap.sectionId}|P${gap.fixPriority}|${text}`;
    const existing = byNorm.get(key);
    if (existing) {
      existing.dates.add(entry.label);
    } else {
      byNorm.set(key, {
        sectionId: gap.sectionId,
        fixPriority: gap.fixPriority,
        text,
        dates: new Set([entry.label]),
        exclusion: classifyExperienceParityExclusion(text, gap.sectionId),
      });
    }
  }
}

const items = [...byNorm.values()].sort(
  (a, b) =>
    a.fixPriority - b.fixPriority ||
    a.sectionId.localeCompare(b.sectionId) ||
    a.text.localeCompare(b.text),
);

console.log(`Actionable instance gaps: ${totalInstances}`);
console.log(`Actionable unique gap strings: ${items.length}`);
console.log("");

if (items.length === 0) {
  console.log("No actionable experience gaps — decorative/intentional exclusions applied in compare-parity.");
} else {
  const byBucket = new Map<string, GapEntry[]>();
  for (const item of items) {
    const bucket = `P${item.fixPriority}/${item.sectionId}`;
    const list = byBucket.get(bucket) ?? [];
    list.push(item);
    byBucket.set(bucket, list);
  }

  for (const bucket of [...byBucket.keys()].sort()) {
    const list = byBucket.get(bucket)!;
    console.log(`=== ${bucket} (${list.length} unique) ===`);
    for (const item of list) {
      const freq = `${item.dates.size}/3`;
      console.log(`[${freq}] ${item.text}`);
    }
    console.log("");
  }
}

// Sanity: list Phase B exclusion patterns against empty set (documentation aid)
const sampleExcluded = [
  "s3-03 explorer practice icon",
  "material & energy flow map logo",
  "what truth is already trying to move through your inner authority?",
  "mature sovereignty appears as discernment",
];
console.log("Exclusion pattern check:");
for (const sample of sampleExcluded) {
  const normalized = normalizeSubstantiveText(sample);
  const excluded = isExperienceParityExclusion(normalized, "s7");
  console.log(`  ${excluded ? "skip" : "keep"}: ${sample}`);
}
