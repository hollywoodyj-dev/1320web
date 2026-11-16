import s2Pack from "@/data/1320-tw-v2/s2-50-editorial-candidate.json";

export type S2CandidateRecord = (typeof s2Pack.records)[number];

const SAFETY =
  "如果關係裡存在威脅、操控或傷害，保護自身安全比尋找任何『靈魂意義』更重要。";

const byCode = new Map(s2Pack.records.map((record) => [record.code, record]));

export function s2CandidatePackMeta() {
  return {
    packageId: s2Pack.package_id,
    snapshotId: s2Pack.snapshot_id,
    status: s2Pack.status,
    count: s2Pack.records.length,
    note: s2Pack.note,
    officialApprovedCount: s2Pack.official_approved_count,
    requiredRelationshipSafetyBoundary: s2Pack.required_relationship_safety_boundary,
  };
}

export function s2RequiredSafetyBoundary(): string {
  return s2Pack.required_relationship_safety_boundary || SAFETY;
}

export function s2CandidateFor(code: string): S2CandidateRecord | null {
  return byCode.get(code) ?? null;
}

export function s2EditorialCandidateCount(): number {
  return s2Pack.records.length;
}

export function s2ApprovedCount(): number {
  return s2Pack.records.filter((record) => record.editorial_status === "APPROVED").length;
}

export function s2PendingCount(): number {
  return s2Pack.records.filter((record) => record.editorial_status === "PENDING_REVIEW").length;
}

export function s2UnreachableCodes(): string[] {
  return s2Pack.records.filter((record) => record.reachable_by_current_formula === false).map((record) => record.code);
}

export function s2CustomerPublishableCodes(): string[] {
  return s2Pack.records
    .filter(
      (record) =>
        record.customer_publishable === true &&
        record.editorial_status === "APPROVED" &&
        Boolean(record.reviewer) &&
        Boolean(record.approved_at),
    )
    .map((record) => record.code);
}

export function s2AllHaveRequiredSafetyBoundary(): boolean {
  const required = s2RequiredSafetyBoundary();
  return s2Pack.records.every(
    (record) => record.content_zh_tw_candidate.required_relationship_safety_boundary === required,
  );
}
