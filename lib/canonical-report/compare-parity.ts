import {
  assertCanonicalReportComplete,
  buildCanonicalReport,
} from "@/lib/canonical-report/build-canonical-report";
import {
  mobileContainsDesktopInsight,
  normalizeSubstantiveText,
} from "@/lib/canonical-report/extract-substantive-text";
import { isExperienceParityExclusion } from "@/lib/canonical-report/experience-parity-exclusions";
import { collectPayloadPathStrings } from "@/lib/canonical-report/payload-path";
import {
  resolveDesktopPresentationText,
  resolveMobilePresentationText,
} from "@/lib/canonical-report/resolve-presentation";
import { CANONICAL_SECTION_REGISTRY, getCanonicalSection } from "@/lib/canonical-report/section-registry";
import type {
  BuildCanonicalReportInput,
  ParityFixPriority,
  ParityGap,
  ParityReport,
} from "@/lib/canonical-report/types";

export type CompareParityOptions = {
  /** Only report gaps at or below this priority band (2 = closing experience first). */
  maxPriority?: ParityFixPriority;
  /** Minimum normalized string length to treat as substantive for presentation parity. */
  minInsightLength?: number;
};

const DEFAULT_MIN_INSIGHT_LENGTH = 28;

function emptyPriorityCounts(): Record<ParityFixPriority, number> {
  return { 1: 0, 2: 0, 3: 0, 4: 0 };
}

export function compareReportParity(
  input: BuildCanonicalReportInput,
  options: CompareParityOptions = {},
): ParityReport {
  const report = buildCanonicalReport(input);
  const maxPriority = options.maxPriority ?? 4;
  const minInsightLength = options.minInsightLength ?? DEFAULT_MIN_INSIGHT_LENGTH;

  const contentParityGaps: ParityGap[] = [];
  const experienceParityGaps: ParityGap[] = [];
  const gapsByPriority = emptyPriorityCounts();

  for (const failure of assertCanonicalReportComplete(report)) {
    contentParityGaps.push({
      sectionId: "cover",
      fixPriority: 1,
      field: failure,
      desktopValue: "",
      reason: "missing_in_payload",
    });
    gapsByPriority[1] += 1;
  }

  for (const section of CANONICAL_SECTION_REGISTRY) {
    if (section.fixPriority > maxPriority) continue;

    for (const field of section.payloadFields) {
      if (field.kind !== "required" && field.kind !== "relocatable") continue;
      const strings = collectPayloadPathStrings(report.payload, field.path);
      if (strings.length === 0) {
        contentParityGaps.push({
          sectionId: section.id,
          fixPriority: section.fixPriority,
          field: field.path,
          desktopValue: "",
          reason: "missing_in_payload",
        });
        gapsByPriority[section.fixPriority] += 1;
      }
    }
  }

  const desktopText = resolveDesktopPresentationText(report.payload);
  const mobileText = resolveMobilePresentationText(report.payload);

  for (const section of CANONICAL_SECTION_REGISTRY) {
    if (section.fixPriority > maxPriority) continue;
    if (!desktopText.has(section.id) || !mobileText.has(section.id)) continue;

    const desktopStrings = desktopText.get(section.id)!;
    const mobileStrings = mobileText.get(section.id)!;
    const sectionDef = getCanonicalSection(section.id);

    for (const desktopInsight of desktopStrings) {
      if (desktopInsight.length < minInsightLength) continue;
      if (isExperienceParityExclusion(desktopInsight, section.id)) continue;
      if (mobileContainsDesktopInsight(desktopInsight, mobileStrings)) continue;

      experienceParityGaps.push({
        sectionId: section.id,
        fixPriority: sectionDef.fixPriority,
        field: "presentation",
        desktopValue: desktopInsight.slice(0, 120),
        reason: "missing_on_mobile",
      });
      gapsByPriority[sectionDef.fixPriority] += 1;
    }
  }

  return {
    birthDate: report.birthDate,
    contentParityGaps,
    experienceParityGaps,
    gapsByPriority,
  };
}

export function formatParityReport(report: ParityReport): string {
  const lines: string[] = [
    `Parity report — ${report.birthDate}`,
    `Content gaps: ${report.contentParityGaps.length}`,
    `Experience gaps: ${report.experienceParityGaps.length}`,
    `By priority: P1=${report.gapsByPriority[1]} P2=${report.gapsByPriority[2]} P3=${report.gapsByPriority[3]} P4=${report.gapsByPriority[4]}`,
  ];

  const sample = report.experienceParityGaps.slice(0, 12);
  if (sample.length > 0) {
    lines.push("", "Sample experience gaps (desktop insight missing on mobile):");
    for (const gap of sample) {
      lines.push(`- [P${gap.fixPriority}] ${gap.sectionId}: ${normalizeSubstantiveText(gap.desktopValue).slice(0, 100)}…`);
    }
    if (report.experienceParityGaps.length > sample.length) {
      lines.push(`… and ${report.experienceParityGaps.length - sample.length} more`);
    }
  }

  return lines.join("\n");
}
