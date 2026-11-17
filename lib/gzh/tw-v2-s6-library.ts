import s6Pack from "@/data/1320-tw-v2/s6-44-editorial-candidate.json";

export type S6CandidateRecord = (typeof s6Pack.records)[number];

const byCode = new Map(s6Pack.records.map((record) => [record.code, record]));

export function s6CandidatePackMeta() {
  return {
    packageId: s6Pack.package_id,
    snapshotId: s6Pack.snapshot_id,
    status: s6Pack.status,
    count: s6Pack.records.length,
    note: s6Pack.note,
    officialApprovedCount: s6Pack.official_approved_count,
    calculationRuleSource: s6Pack.calculation_rule_source,
  };
}

export function s6CandidateFor(code: string): S6CandidateRecord | null {
  return byCode.get(code) ?? null;
}

export function s6EditorialCandidateCount(): number {
  return s6Pack.records.length;
}

export function s6ApprovedCount(): number {
  return s6Pack.records.filter((record) => record.editorial_status === "APPROVED").length;
}

export function s6PendingCount(): number {
  return s6Pack.records.filter((record) => record.editorial_status === "PENDING_REVIEW").length;
}

export function s6CustomerPublishableCodes(): string[] {
  return s6Pack.records
    .filter(
      (record) =>
        record.customer_publishable === true &&
        record.editorial_status === "APPROVED" &&
        Boolean(record.reviewer) &&
        Boolean(record.approved_at),
    )
    .map((record) => record.code);
}
