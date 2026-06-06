import type { ReportDebugInfo } from "@/lib/types/integrated-soul-blueprint";

type ReportDebugPanelProps = {
  debug: ReportDebugInfo;
};

export function ReportDebugPanel({ debug }: ReportDebugPanelProps) {
  return (
    <section className="report-debug-panel glass-card" aria-label="Report debug (internal QA)">
      <h2 className="report-section-title">Report Debug</h2>
      <pre className="report-debug-pre">{JSON.stringify(debug, null, 2)}</pre>
    </section>
  );
}
