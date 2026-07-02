import { resolveS6PageContent } from "@/lib/full-report-v2/resolve-s6-page-content";
import { resolveS7PageContent } from "@/lib/full-report-v2/resolve-s7-page-content";
import { resolveS8PageContent } from "@/lib/full-report-v2/resolve-s8-page-content";
import { resolveS9PageContent } from "@/lib/full-report-v2/resolve-s9-page-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

/** Shared S6 section — canonical source for desktop page 11 and mobile pages 20–21. */
export function resolveSharedS6Section(payload: FullReportV2Payload) {
  return resolveS6PageContent(payload);
}

/** Shared S7 section — canonical source for desktop page 12 and mobile pages 22–23. */
export function resolveSharedS7Section(payload: FullReportV2Payload) {
  return resolveS7PageContent(payload);
}

/** Shared S8 section — canonical source for desktop page 13 and mobile pages 24–25. */
export function resolveSharedS8Section(payload: FullReportV2Payload) {
  return resolveS8PageContent(payload);
}

/** Shared S9 section — canonical source for desktop page 14 and mobile pages 26–27. */
export function resolveSharedS9Section(payload: FullReportV2Payload) {
  return resolveS9PageContent(payload);
}
