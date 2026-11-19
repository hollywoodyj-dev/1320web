import s9Pack from "@/data/1320-tw-v2/s9-9-editorial-candidate.json";

export type S9CandidateRecord = (typeof s9Pack.records)[number];

const byCode = new Map(s9Pack.records.map((record) => [record.code, record]));

export function s9CandidatePackMeta() {
  return {
    packageId: s9Pack.package_id,
    snapshotId: s9Pack.snapshot_id,
    status: s9Pack.status,
    count: s9Pack.records.length,
    note: s9Pack.note,
    officialApprovedCount: s9Pack.official_approved_count,
    calculationRuleSource: s9Pack.calculation_rule_source,
    editorialStandardAlignsWith: s9Pack.editorial_standard_aligns_with,
  };
}

export function s9CandidateFor(code: string): S9CandidateRecord | null {
  return byCode.get(code) ?? null;
}

export function s9EditorialCandidateCount(): number {
  return s9Pack.records.length;
}

export function s9ApprovedCount(): number {
  return s9Pack.records.filter((record) => record.editorial_status === "APPROVED").length;
}

export function s9PendingCount(): number {
  return s9Pack.records.filter((record) => record.editorial_status === "PENDING_REVIEW").length;
}

export function s9CustomerPublishableCodes(): string[] {
  return s9Pack.records
    .filter(
      (record) =>
        record.customer_publishable === true &&
        record.editorial_status === "APPROVED" &&
        Boolean(record.reviewer) &&
        Boolean(record.approved_at),
    )
    .map((record) => record.code);
}
