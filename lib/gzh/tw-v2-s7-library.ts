import s7Pack from "@/data/1320-tw-v2/s7-7-editorial-candidate.json";

export type S7CandidateRecord = (typeof s7Pack.records)[number];

const byCode = new Map(s7Pack.records.map((record) => [record.code, record]));

export function s7CandidatePackMeta() {
  return {
    packageId: s7Pack.package_id,
    snapshotId: s7Pack.snapshot_id,
    status: s7Pack.status,
    count: s7Pack.records.length,
    note: s7Pack.note,
    officialApprovedCount: s7Pack.official_approved_count,
    editorialStandardAlignsWith: s7Pack.editorial_standard_aligns_with,
  };
}

export function s7CandidateFor(code: string): S7CandidateRecord | null {
  return byCode.get(code) ?? null;
}

export function s7EditorialCandidateCount(): number {
  return s7Pack.records.length;
}

export function s7ApprovedCount(): number {
  return s7Pack.records.filter((record) => record.editorial_status === "APPROVED").length;
}

export function s7PendingCount(): number {
  return s7Pack.records.filter((record) => record.editorial_status === "PENDING_REVIEW").length;
}

export function s7CustomerPublishableCodes(): string[] {
  return s7Pack.records
    .filter(
      (record) =>
        record.customer_publishable === true &&
        record.editorial_status === "APPROVED" &&
        Boolean(record.reviewer) &&
        Boolean(record.approved_at),
    )
    .map((record) => record.code);
}
