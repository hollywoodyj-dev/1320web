import {
  buildFullReportV2Payload,
  CANONICAL_SAMPLE_BIRTH_DATE,
} from "@/lib/full-report-v2/build-full-report-payload";
import type { FullReportV2InputClient } from "@/lib/full-report-v2/types";
import { enrichCanonicalPayload } from "@/lib/canonical-report/enrich-canonical-payload";
import { hasPayloadPathValue } from "@/lib/canonical-report/payload-path";
import { CANONICAL_SECTION_REGISTRY } from "@/lib/canonical-report/section-registry";
import {
  CANONICAL_REPORT_SCHEMA_VERSION,
  type BuildCanonicalReportInput,
  type CanonicalFieldKind,
  type CanonicalFullReport,
  type CanonicalSectionAudit,
} from "@/lib/canonical-report/types";

export { CANONICAL_SAMPLE_BIRTH_DATE };

function auditKinds(
  payload: ReturnType<typeof buildFullReportV2Payload>,
  kinds: CanonicalFieldKind[],
): CanonicalSectionAudit[] {
  return CANONICAL_SECTION_REGISTRY.map((section) => {
    const relevant = section.payloadFields.filter((field) => kinds.includes(field.kind));
    const missingRequired: string[] = [];
    const missingOptional: string[] = [];

    for (const field of relevant) {
      const present = hasPayloadPathValue(payload, field.path);
      if (!present) {
        if (field.kind === "required") missingRequired.push(field.path);
        if (field.kind === "optional" || field.kind === "relocatable") {
          missingOptional.push(field.path);
        }
      }
    }

    return {
      id: section.id,
      label: section.label,
      fixPriority: section.fixPriority,
      complete: missingRequired.length === 0,
      missingRequired,
      missingOptional,
    };
  });
}

/**
 * Single shared resolver output — both desktop and mobile renderers should
 * consume this object (via `payload`) instead of building parallel content.
 */
export function buildCanonicalReport(input: BuildCanonicalReportInput): CanonicalFullReport {
  const payload = enrichCanonicalPayload(buildFullReportV2Payload(input));

  return {
    schemaVersion: CANONICAL_REPORT_SCHEMA_VERSION,
    payload,
    birthDate: input.birth_date,
    sections: auditKinds(payload, ["required", "optional", "relocatable"]),
  };
}

export function assertCanonicalReportComplete(report: CanonicalFullReport): string[] {
  const failures: string[] = [];

  for (const section of report.sections) {
    for (const path of section.missingRequired) {
      failures.push(`${section.id}: missing required payload field \`${path}\``);
    }
  }

  const practiceSection = report.sections.find((section) => section.id === "practice");
  const practiceDays = report.payload.integration_practice?.days ?? [];
  if (practiceDays.length !== 7) {
    failures.push(`practice: expected 7 integration days, got ${practiceDays.length}`);
  }

  for (const key of ["s0", "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"] as const) {
    const slot = report.payload.modules[key];
    if (!slot?.code) {
      failures.push(`modules.${key}: missing code`);
    }
  }

  return failures;
}

export function buildCanonicalSampleReport(
  overrides: Partial<FullReportV2InputClient> = {},
): CanonicalFullReport {
  return buildCanonicalReport({
    name: "Canonical Sample",
    birth_date: CANONICAL_SAMPLE_BIRTH_DATE,
    birth_date_display: "May 22, 1980",
    ...overrides,
  });
}
