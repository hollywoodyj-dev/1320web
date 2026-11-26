import pack from "@/data/1320-tw-v2/report-two-reference-sets-rc3.json";

export function twoReferenceSetsRc3Meta() {
  return {
    packageId: pack.package_id,
    status: pack.status,
    customerPublishable: pack.customer_publishable,
    officialApprovedCount: pack.official_approved_count,
    narrativeRecordCount: pack.narrative_records.length,
    reportKeys: Object.keys(pack.reports),
    note: pack.note,
  };
}

export function twoReferenceSetsRc3Reports() {
  return pack.reports;
}

export function twoReferenceSetsRc3Narratives() {
  return pack.narrative_records;
}

export function twoReferenceSetsRc3ForDate(dateInternal: string) {
  return pack.narrative_records.filter((record) => record.example_date_internal === dateInternal);
}

export function twoReferenceSetsRc3LockedSafety() {
  return pack.locked_safety;
}

export function twoReferenceSetsRc3AllPending(): boolean {
  return (
    pack.status === "PENDING_REVIEW" &&
    pack.customer_publishable === false &&
    pack.official_approved_count === 0 &&
    pack.narrative_records.every(
      (record) =>
        record.review_status === "PENDING_REVIEW" &&
        record.customer_publishable === false &&
        record.reviewer == null &&
        record.approved_at == null,
    )
  );
}
