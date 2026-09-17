import {
  PURCHASE_CONTEXT_INTERNAL_QA,
  resolvePurchaseContext,
} from "@/lib/funnel/qa-traffic-exclusion";

/** Merge purchase_context=internal_qa into Stripe / conversion metadata when QA-tagged. */
export function withPurchaseContextMetadata(
  metadata: Record<string, string>,
): Record<string, string> {
  const purchaseContext = resolvePurchaseContext({
    source: metadata.utm_source,
    metadata,
  });
  if (!purchaseContext) return metadata;
  return {
    ...metadata,
    purchase_context: PURCHASE_CONTEXT_INTERNAL_QA,
  };
}
