import s4Pack from "@/data/1320-tw-v2/s4-20-editorial-candidate.json";

export type S4CandidateRecord = (typeof s4Pack.records)[number];

const SAFETY = "涉及人身安全、健康、法律或財務風險的事項，仍應遵守必要的專業標準。";

const byCode = new Map(s4Pack.records.map((record) => [record.code, record]));

export function s4CandidatePackMeta() {
  return {
    packageId: s4Pack.package_id,
    snapshotId: s4Pack.snapshot_id,
    status: s4Pack.status,
    count: s4Pack.records.length,
    note: s4Pack.note,
    officialApprovedCount: s4Pack.official_approved_count,
    requiredProfessionalSafetyBoundary: s4Pack.required_professional_safety_boundary,
  };
}

export function s4RequiredSafetyBoundary(): string {
  return s4Pack.required_professional_safety_boundary || SAFETY;
}

export function s4CandidateFor(code: string): S4CandidateRecord | null {
  return byCode.get(code) ?? null;
}

export function s4EditorialCandidateCount(): number {
  return s4Pack.records.length;
}

export function s4ApprovedCount(): number {
  return s4Pack.records.filter((record) => record.editorial_status === "APPROVED").length;
}

export function s4PendingCount(): number {
  return s4Pack.records.filter((record) => record.editorial_status === "PENDING_REVIEW").length;
}

export function s4CustomerPublishableCodes(): string[] {
  return s4Pack.records
    .filter(
      (record) =>
        record.customer_publishable === true &&
        record.editorial_status === "APPROVED" &&
        Boolean(record.reviewer) &&
        Boolean(record.approved_at),
    )
    .map((record) => record.code);
}

export function s4AllHaveRequiredSafetyBoundary(): boolean {
  const required = s4RequiredSafetyBoundary();
  return s4Pack.records.every(
    (record) => record.content_zh_tw_candidate.required_professional_safety_boundary === required,
  );
}
