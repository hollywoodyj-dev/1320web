/** True for phone/tablet user agents that should see mobile-report-v2. */
export function isMobileReportClient(userAgent: string): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(
    userAgent,
  );
}
