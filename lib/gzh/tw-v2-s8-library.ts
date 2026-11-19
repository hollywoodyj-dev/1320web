import s8Pack from "@/data/1320-tw-v2/s8-8-editorial-candidate.json";

export type S8CandidateRecord = (typeof s8Pack.records)[number];

const byCode = new Map(s8Pack.records.map((record) => [record.code, record]));

export function s8CandidatePackMeta() {
  return {
    packageId: s8Pack.package_id,
    snapshotId: s8Pack.snapshot_id,
    status: s8Pack.status,
    count: s8Pack.records.length,
    note: s8Pack.note,
    officialApprovedCount: s8Pack.official_approved_count,
    calculationRuleSource: s8Pack.calculation_rule_source,
    editorialStandardAlignsWith: s8Pack.editorial_standard_aligns_with,
  };
}

export function s8CandidateFor(code: string): S8CandidateRecord | null {
  return byCode.get(code) ?? null;
}

export function s8EditorialCandidateCount(): number {
  return s8Pack.records.length;
}

export function s8ApprovedCount(): number {
  return s8Pack.records.filter((record) => record.editorial_status === "APPROVED").length;
}

export function s8PendingCount(): number {
  return s8Pack.records.filter((record) => record.editorial_status === "PENDING_REVIEW").length;
}

export function s8CustomerPublishableCodes(): string[] {
  return s8Pack.records
    .filter(
      (record) =>
        record.customer_publishable === true &&
        record.editorial_status === "APPROVED" &&
        Boolean(record.reviewer) &&
        Boolean(record.approved_at),
    )
    .map((record) => record.code);
}
