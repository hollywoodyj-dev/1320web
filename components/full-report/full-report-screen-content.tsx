import type { FullReportScreenPayload } from "@/lib/full-report/build-full-report-payload";
import { FullReportBlocks } from "@/components/full-report/full-report-blocks";

type FullReportScreenContentProps = {
  payload: FullReportScreenPayload;
};

export function FullReportScreenContent({ payload }: FullReportScreenContentProps) {
  const { screen, blocks } = payload;
  if (!blocks.length) return null;

  return <FullReportBlocks blocks={blocks} layout={screen.layout} screenId={screen.id} />;
}
