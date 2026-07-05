import type { CanonicalFullReport } from "@/lib/canonical-report/types";
import type { SoulReportRow } from "@/lib/db/types";
import { SOUL_BLUEPRINT_DOMAIN_VERSION, type SoulBlueprintRef, type SoulBlueprintSnapshot } from "@/lib/platform-domain/types";

/**
 * Map a persisted soul report + canonical builder output to immutable Soul Blueprint ref.
 * Downstream code must treat `canonical.payload` as read-only.
 */
export function toSoulBlueprintRef(
  report: SoulReportRow,
  canonical: CanonicalFullReport,
): SoulBlueprintRef {
  return {
    domainVersion: SOUL_BLUEPRINT_DOMAIN_VERSION,
    reportId: report.id,
    userId: report.user_id,
    birthDate: report.birth_date,
    combinationSignature: report.combination_signature,
    schemaVersion: canonical.schemaVersion,
    codes: {
      s1: report.s1_code,
      s3: report.s3_code,
      s2: report.s2_code,
      s0: report.s0_code,
    },
  };
}

export function freezeSoulBlueprintSnapshot(
  ref: SoulBlueprintRef,
  canonical: CanonicalFullReport,
): SoulBlueprintSnapshot {
  return {
    ref,
    canonical: structuredClone(canonical),
  };
}

/** Guard for FS-005 Platform Principle: Blueprint is immutable. */
export function assertSoulBlueprintReadOnly<T extends CanonicalFullReport>(canonical: T): T {
  return Object.freeze(canonical) as T;
}
