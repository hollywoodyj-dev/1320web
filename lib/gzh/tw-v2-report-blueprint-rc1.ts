import contract from "@/data/1320-tw-v2/report-blueprint-data-contract-rc1.json";
import demos from "@/data/1320-tw-v2/report-blueprint-demo-candidates-rc1.json";
import projection from "@/data/1320-tw-v2/report-blueprint-protected-preview-rc1.json";

export function reportBlueprintRc1Meta() {
  return {
    packageId: demos.package_id,
    contractVersion: contract.version,
    status: demos.status,
    customerPublishable: demos.customer_publishable,
    officialApprovedCount: demos.official_approved_count,
    demoRecordCount: demos.records.length,
    reportCount: projection.reports.length,
    sampleModuleOrder: contract.tiers.sample.display_module_order,
    fullChapterCount: Object.keys(contract.tiers.full.chapters).length,
    v1Locked: contract.publish_gate.v1_locked,
    pricesLocked: contract.publish_gate.prices_locked,
    checkoutLocked: contract.publish_gate.checkout_locked,
    customerRelease: contract.publish_gate.customer_release,
    productConfig: contract.product_config,
    note: demos.note,
  };
}

export function reportBlueprintRc1Contract() {
  return contract;
}

export function reportBlueprintRc1DemoRecords() {
  return demos.records;
}

export function reportBlueprintRc1Projection() {
  return projection;
}

export function reportBlueprintRc1ForDate(dateInternal: string) {
  return projection.reports.find((report) => report.date_internal === dateInternal) ?? null;
}

export function reportBlueprintRc1DemoCodesForDate(dateInternal: string): string[] {
  return demos.records
    .filter((record) => record.example_birth_date_internal === dateInternal)
    .map((record) => record.code);
}

export function reportBlueprintRc1LockedSafety() {
  return contract.locked_safety_strings;
}

export function reportBlueprintRc1AllPending(): boolean {
  return (
    demos.status === "PENDING_REVIEW" &&
    demos.customer_publishable === false &&
    demos.official_approved_count === 0 &&
    demos.records.every(
      (record) =>
        record.editorial_status === "PENDING_REVIEW" &&
        record.customer_publishable === false &&
        record.reviewer == null &&
        record.approved_at == null,
    ) &&
    projection.reports.every(
      (report) =>
        report.editorial_status === "PENDING_REVIEW" &&
        report.reviewer == null &&
        report.approved_at == null,
    )
  );
}
