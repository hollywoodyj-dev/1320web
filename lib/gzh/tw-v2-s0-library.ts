import s0Pack from "@/data/1320-tw-v2/s0-20-editorial-candidate.json";

export type S0CandidateRecord = (typeof s0Pack.records)[number];

const byCode = new Map(s0Pack.records.map((record) => [record.code, record]));

export function s0CandidatePackMeta() {
  return {
    packageId: s0Pack.package_id,
    snapshotId: s0Pack.snapshot_id,
    status: s0Pack.status,
    count: s0Pack.records.length,
    note: s0Pack.note,
    officialApprovedCount: s0Pack.official_approved_count,
  };
}

export function s0CandidateFor(code: string): S0CandidateRecord | null {
  return byCode.get(code) ?? null;
}

export function s0EditorialCandidateCount(): number {
  return s0Pack.records.length;
}

export function s0ApprovedCount(): number {
  return s0Pack.records.filter((record) => record.editorial_status === "APPROVED").length;
}

export function s0PendingCount(): number {
  return s0Pack.records.filter((record) => record.editorial_status === "PENDING_REVIEW").length;
}

export function s0CustomerPublishableCodes(): string[] {
  return s0Pack.records
    .filter(
      (record) =>
        record.customer_publishable === true &&
        record.editorial_status === "APPROVED" &&
        Boolean(record.reviewer) &&
        Boolean(record.approved_at),
    )
    .map((record) => record.code);
}
