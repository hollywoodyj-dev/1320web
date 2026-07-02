import { resolveIntegratedPageContent } from "@/lib/full-report-v2/resolve-integrated-page-content";
import { resolveS0PageContent } from "@/lib/full-report-v2/resolve-s0-page-content";
import { resolveS1PageContent } from "@/lib/full-report-v2/resolve-s1-page-content";
import { resolveS2PageContent } from "@/lib/full-report-v2/resolve-s2-page-content";
import { resolveS3PageContent } from "@/lib/full-report-v2/resolve-s3-page-content";
import { resolveS4PageContent } from "@/lib/full-report-v2/resolve-s4-page-content";
import { resolveS5PageContent } from "@/lib/full-report-v2/resolve-s5-page-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export function resolveSharedS0Section(payload: FullReportV2Payload) {
  return resolveS0PageContent(payload);
}

export function resolveSharedS1Section(payload: FullReportV2Payload) {
  return resolveS1PageContent(payload);
}

export function resolveSharedS2Section(payload: FullReportV2Payload) {
  return resolveS2PageContent(payload);
}

export function resolveSharedS3Section(payload: FullReportV2Payload) {
  return resolveS3PageContent(payload);
}

export function resolveSharedS4Section(payload: FullReportV2Payload) {
  return resolveS4PageContent(payload);
}

export function resolveSharedS5Section(payload: FullReportV2Payload) {
  return resolveS5PageContent(payload);
}

export function resolveSharedIntegratedSection(payload: FullReportV2Payload) {
  return resolveIntegratedPageContent(payload);
}
