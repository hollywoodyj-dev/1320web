import s5Pack from "@/data/1320-tw-v2/s5-44-editorial-candidate.json";

export type S5CandidateRecord = (typeof s5Pack.records)[number];

const byCode = new Map(s5Pack.records.map((record) => [record.code, record]));

export function s5CandidatePackMeta() {
  return {
    packageId: s5Pack.package_id,
    snapshotId: s5Pack.snapshot_id,
    status: s5Pack.status,
    count: s5Pack.records.length,
    note: s5Pack.note,
    officialApprovedCount: s5Pack.official_approved_count,
    calculationRuleSource: s5Pack.calculation_rule_source,
  };
}

export function s5CandidateFor(code: string): S5CandidateRecord | null {
  return byCode.get(code) ?? null;
}

export function s5EditorialCandidateCount(): number {
  return s5Pack.records.length;
}

export function s5ApprovedCount(): number {
  return s5Pack.records.filter((record) => record.editorial_status === "APPROVED").length;
}

export function s5PendingCount(): number {
  return s5Pack.records.filter((record) => record.editorial_status === "PENDING_REVIEW").length;
}

export function s5CustomerPublishableCodes(): string[] {
  return s5Pack.records
    .filter(
      (record) =>
        record.customer_publishable === true &&
        record.editorial_status === "APPROVED" &&
        Boolean(record.reviewer) &&
        Boolean(record.approved_at),
    )
    .map((record) => record.code);
}
