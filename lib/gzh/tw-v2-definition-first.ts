import standard from "@/data/1320-tw-v2/definition-first-editorial-standard-v1.json";

export function definitionFirstStandardMeta() {
  return {
    packageId: standard.package_id,
    packageType: standard.package_type,
    status: standard.status,
    snapshotId: standard.snapshot_id,
    officialApprovedCount: standard.official_approved_count,
    customerPublishable: standard.customer_publishable,
    existingReleaseStateUnchanged: standard.existing_release_state_unchanged,
    requiredFieldCount: standard.required_fields.length,
    exampleCode: standard.example.code,
    note: standard.note,
  };
}

export function definitionFirstExample() {
  return standard.example;
}

export function definitionFirstRequiredFields(): string[] {
  return [...standard.required_fields];
}
