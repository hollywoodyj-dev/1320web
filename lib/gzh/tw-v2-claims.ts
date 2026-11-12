import claims1980 from "@/data/1320-tw-v2/1980-05-22.claims.json";
import claims1982 from "@/data/1320-tw-v2/1982-02-03.claims.json";
import claims2008 from "@/data/1320-tw-v2/2008-12-08.claims.json";

export const RELATION_TYPES = ["REINFORCEMENT", "TENSION", "BRIDGE", "GROUNDING"] as const;
export const CLAIM_STATUSES = ["PENDING_REVIEW", "NEEDS_REVISION", "APPROVED", "REJECTED"] as const;

const FOUNDATION = new Set(["S0", "S1", "S2", "S3"]);
const CODE_PATTERN = /^S([0-9])-(\d{2})$/;
const RANGES: Record<string, [number, number]> = {
  S0: [0, 19],
  S1: [1, 44],
  S2: [1, 50],
  S3: [1, 12],
  S4: [0, 19],
  S5: [1, 44],
  S6: [1, 44],
  S7: [0, 6],
  S8: [0, 7],
  S9: [0, 8],
};

const claims = [...claims1980, ...claims1982, ...claims2008];

export type IntegrationClaim = (typeof claims)[number];

export function claimsForSignature(codes: string[]): IntegrationClaim[] {
  const signature = new Set(codes);
  return claims.filter((claim) => claim.code_ids.every((code) => signature.has(code)));
}

export function moduleOf(code: string): string {
  return code.slice(0, 2);
}

export function codeInRange(code: string): boolean {
  const match = CODE_PATTERN.exec(code);
  if (!match) return false;
  const range = RANGES[`S${match[1]}`];
  if (!range) return false;
  const number = Number(match[2]);
  return number >= range[0] && number <= range[1];
}

export function claimProblems(claim: IntegrationClaim, signature: string[]): string[] {
  const problems: string[] = [];
  const signatureSet = new Set(signature);
  if (claim.locale !== "zh-TW") problems.push("locale");
  if (claim.scenario_status !== "HYPOTHETICAL") problems.push("scenario");
  if (claim.reader_claim_status !== "NO_INFERRED_HISTORY") problems.push("reader-claim");
  if (!(RELATION_TYPES as readonly string[]).includes(claim.relation_type)) problems.push("relation");
  if (!(CLAIM_STATUSES as readonly string[]).includes(claim.editorial_status)) problems.push("status");
  if (claim.code_ids.length < 2 || claim.code_ids.length > 4) problems.push("code-count");
  if (new Set(claim.code_ids).size !== claim.code_ids.length) problems.push("duplicate-code");
  if (claim.editorial_relation_reason.length < 25) problems.push("reason");
  if (claim.customer_text_zh_tw.length < 25) problems.push("customer-text");
  if (claim.source_snapshot_id.length < 1 || claim.rule_set_version.length < 1) problems.push("version");
  if (claim.anchors.length < 2) problems.push("anchors");
  for (const code of claim.code_ids) {
    if (!codeInRange(code)) problems.push(`range:${code}`);
    if (!signatureSet.has(code)) problems.push(`outside-signature:${code}`);
    if (!claim.anchors.some((anchor) => anchor.code === code)) problems.push(`missing-anchor:${code}`);
  }
  for (const anchor of claim.anchors) {
    if (!claim.code_ids.includes(anchor.code)) problems.push(`extra-anchor:${anchor.code}`);
    if (anchor.source_field.length < 4 || anchor.approval_id.length < 3) problems.push("anchor-field");
  }
  if (claim.editorial_status === "APPROVED") {
    const reviewer = "reviewer" in claim ? claim.reviewer : "";
    const approvedAt = "approved_at" in claim ? claim.approved_at : "";
    if (!reviewer || !approvedAt) problems.push("approval-signoff");
  }
  return problems;
}

export function claimSetProblems(items: IntegrationClaim[]): string[] {
  const problems: string[] = [];
  if (items.length < 4 || items.length > 5) problems.push("thread-count");
  const seen = new Set<string>();
  const modules = new Set<string>();
  let crossesLayers = false;
  for (const claim of items) {
    const key = [...claim.code_ids].sort().join("|");
    if (seen.has(key)) problems.push("duplicate-thread");
    seen.add(key);
    let foundation = false;
    let extension = false;
    for (const code of claim.code_ids) {
      const moduleId = moduleOf(code);
      modules.add(moduleId);
      if (FOUNDATION.has(moduleId)) foundation = true;
      else extension = true;
    }
    if (foundation && extension) crossesLayers = true;
  }
  if (!crossesLayers) problems.push("no-cross-layer");
  if (modules.size < 8) problems.push("module-coverage");
  return problems;
}
