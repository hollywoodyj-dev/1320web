import { ReportRenderer } from "@/components/report-system/ReportRenderer";
import type { CanonicalFullReport } from "@/lib/canonical-report/types";
import type { ReportType } from "@/lib/report-system/report-surface";

type UnifiedReportPrintDocumentProps = {
  reportType: ReportType;
  data: CanonicalFullReport;
};

export function UnifiedReportPrintDocument({
  reportType,
  data,
}: UnifiedReportPrintDocumentProps) {
  return (
    <div className="report-print-document">
      <ReportRenderer reportType={reportType} surface="pdf" data={data} />
    </div>
  );
}
