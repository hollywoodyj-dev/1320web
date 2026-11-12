import s1Pack from "@/data/1320-tw-v2/s1-44-editorial-candidate.json";
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
  };
}

export function s1CandidateFor(code: string): S1CandidateRecord | null {
  return byCode.get(code) ?? null;
}

export function s1EditorialCandidateCount(): number {
  return s1Pack.records.filter((record) => record.editorial_status === "PENDING_REVIEW").length;
}

export function s1ApprovedCount(): number {
  return s1Pack.records.filter((record) => record.editorial_status === "APPROVED").length;
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
  };
}
