export {
  assertCanonicalReportComplete,
  buildCanonicalReport,
  buildCanonicalSampleReport,
  CANONICAL_SAMPLE_BIRTH_DATE,
} from "@/lib/canonical-report/build-canonical-report";
export { enrichCanonicalPayload } from "@/lib/canonical-report/enrich-canonical-payload";
export {
  resolveSharedClosingSection,
  resolveSharedDisclaimerSection,
  resolveSharedJournalSection,
  resolveSharedPracticeSection,
} from "@/lib/canonical-report/shared-tail-resolvers";
export {
  classifyExperienceParityExclusion,
  isExperienceParityExclusion,
} from "@/lib/canonical-report/experience-parity-exclusions";
export type { ExperienceParityExclusionKind } from "@/lib/canonical-report/experience-parity-exclusions";
export { compareReportParity, formatParityReport } from "@/lib/canonical-report/compare-parity";
export {
  collectSubstantiveStrings,
  mobileContainsDesktopInsight,
  normalizeSubstantiveText,
} from "@/lib/canonical-report/extract-substantive-text";
export {
  collectPayloadPathStrings,
  getPayloadPathValue,
  hasPayloadPathValue,
} from "@/lib/canonical-report/payload-path";
export {
  PRESENTATION_PARITY_SECTIONS,
  resolveDesktopPresentationText,
  resolveMobilePresentationText,
} from "@/lib/canonical-report/resolve-presentation";
export {
  CANONICAL_SECTION_REGISTRY,
  getCanonicalSection,
} from "@/lib/canonical-report/section-registry";
export type {
  BuildCanonicalReportInput,
  CanonicalFieldDef,
  CanonicalFieldKind,
  CanonicalFullReport,
  CanonicalSectionAudit,
  CanonicalSectionDef,
  CanonicalSectionId,
  ParityFixPriority,
  ParityGap,
  ParityReport,
} from "@/lib/canonical-report/types";
export { CANONICAL_REPORT_SCHEMA_VERSION } from "@/lib/canonical-report/types";
