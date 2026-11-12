import s1Pack from "@/data/1320-tw-v2/s1-44-editorial-candidate.json";
import s1Review from "@/data/1320-tw-v2/s1-44-editorial-review-rc2.json";
import contentStatus from "@/data/1320-tw-v2/approved-content-status.json";
import releaseGate from "@/data/1320-tw-v2/release-gate-2026-11-12.json";

export type S1CandidateRecord = (typeof s1Pack.records)[number];

const byCode = new Map(s1Pack.records.map((record) => [record.code, record]));

export function s1CandidatePackMeta() {
  return {
    packageId: s1Pack.package_id,
    snapshotId: s1Pack.snapshot_id,
    status: s1Pack.status,
    count: s1Pack.records.length,
    note: s1Pack.note,
    reviewPackageId: s1Pack.review_package_id,
    reviewSummary: s1Pack.review_summary,
  };
}

export function s1CandidateFor(code: string): S1CandidateRecord | null {
  return byCode.get(code) ?? null;
}

export function s1EditorialCandidateCount(): number {
  return s1Pack.records.length;
}

export function s1NeedsRevisionCount(): number {
  return s1Pack.records.filter((record) => record.editorial_status === "NEEDS_REVISION").length;
}

export function s1ApprovedCount(): number {
  return s1Pack.records.filter((record) => record.editorial_status === "APPROVED").length;
}

export function s1PriorityCounts(): { P0: number; P1: number } {
  return {
    P0: s1Pack.records.filter((record) => record.priority === "P0").length,
    P1: s1Pack.records.filter((record) => record.priority === "P1").length,
  };
}

export function s1ReviewMeta() {
  return {
    reviewPackageId: s1Review.review_package_id,
    reviewType: s1Review.review_type,
    decisions: s1Review.decisions,
    formalApprovedCount: s1Review.formal_approved_count,
    readyForLongForm: s1Review.ready_for_long_form,
    nextModule: s1Review.next_module,
    duplicateNames: s1Review.duplicate_names,
  };
}

/** Customer delivery stays blocked until real human approval fields exist. */
export function s1CustomerPublishableCodes(): string[] {
  return s1Pack.records
    .filter(
      (record) =>
        record.customer_publishable === true &&
        record.editorial_status === "APPROVED" &&
        Boolean(record.reviewer) &&
        Boolean(record.approved_at),
    )
    .map((record) => record.code);
}

export function releaseGateSummary() {
  return {
    contractVersion: releaseGate.contract_version,
    publicReleaseEnabled: releaseGate.public_release_enabled,
    approvedZhTwCount: releaseGate.approved_zh_tw_count,
    customerState: releaseGate.preview_modes.CUSTOMER_DELIVERY.current_state,
    candidateContentId: releaseGate.candidate_snapshot_ids.content,
    candidateIntegrationId: releaseGate.candidate_snapshot_ids.integration,
    contentStatus: contentStatus.status,
    approvedTotal: Object.values(contentStatus.modules).reduce((sum, item) => sum + item.approved, 0),
    s1Candidates: contentStatus.modules.S1.editorial_candidates,
    s1NeedsRevision: contentStatus.modules.S1.needs_revision ?? 0,
  };
}
