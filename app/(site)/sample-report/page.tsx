import { redirect } from "next/navigation";
import { SAMPLE_REPORT_HREF } from "@/lib/site-nav";

/** Legacy v1 route — permanent redirect to Full Report v2 sample. */
export default function SampleReportPage() {
  redirect(SAMPLE_REPORT_HREF);
}
