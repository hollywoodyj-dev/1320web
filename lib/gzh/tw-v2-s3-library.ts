import s3Pack from "@/data/1320-tw-v2/s3-12-editorial-candidate.json";

export type S3CandidateRecord = (typeof s3Pack.records)[number];

const byCode = new Map(s3Pack.records.map((record) => [record.code, record]));

export function s3CandidatePackMeta() {
  return {
    packageId: s3Pack.package_id,
    snapshotId: s3Pack.snapshot_id,
    status: s3Pack.status,
    count: s3Pack.records.length,
    note: s3Pack.note,
    officialApprovedCount: s3Pack.official_approved_count,
  };
}

export function s3CandidateFor(code: string): S3CandidateRecord | null {
  return byCode.get(code) ?? null;
}

export function s3EditorialCandidateCount(): number {
  return s3Pack.records.length;
}

export function s3ApprovedCount(): number {
  return s3Pack.records.filter((record) => record.editorial_status === "APPROVED").length;
}

export function s3PendingCount(): number {
  return s3Pack.records.filter((record) => record.editorial_status === "PENDING_REVIEW").length;
}

export function s3UnreachableCodes(): string[] {
  return s3Pack.records.filter((record) => record.reachable_by_current_formula === false).map((record) => record.code);
}

export function s3CustomerPublishableCodes(): string[] {
  return s3Pack.records
    .filter(
      (record) =>
        record.customer_publishable === true &&
        record.editorial_status === "APPROVED" &&
        Boolean(record.reviewer) &&
        Boolean(record.approved_at),
    )
    .map((record) => record.code);
}
