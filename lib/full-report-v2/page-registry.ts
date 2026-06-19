/** Full report page registry (00 Cover through 18 Final Disclaimer). */

export type FullReportPageDef = {
  index: number;
  id: string;
  label: string;
};

export const FULL_REPORT_PAGE_COUNT = 18;

export const FULL_REPORT_PAGE_REGISTRY: FullReportPageDef[] = [
  { index: 0, id: "page-00-cover", label: "00 Cover" },
  { index: 1, id: "page-01-opening", label: "01 Opening" },
  { index: 2, id: "page-02-dimensions", label: "02 Dimensions" },
  { index: 3, id: "page-03-calculation", label: "03 Calculation" },
  { index: 4, id: "page-04-s1", label: "04 S1" },
  { index: 5, id: "page-05-s3", label: "05 S3" },
  { index: 6, id: "page-06-s2", label: "06 S2" },
  { index: 7, id: "page-07-s0", label: "07 S0" },
  { index: 8, id: "page-08-integrated", label: "08 Integrated" },
  { index: 9, id: "page-09-s4", label: "09 S4" },
  { index: 10, id: "page-10-s5", label: "10 S5" },
  { index: 11, id: "page-11-s6", label: "11 S6" },
  { index: 12, id: "page-12-s7", label: "12 S7" },
  { index: 13, id: "page-13-s8", label: "13 S8" },
  { index: 14, id: "page-14-s9", label: "14 S9" },
  { index: 15, id: "page-15-practice", label: "15 Practice" },
  { index: 16, id: "page-16-journal", label: "16 Journal" },
  { index: 17, id: "page-17-closing", label: "17 Closing" },
  { index: 18, id: "page-18-disclaimer", label: "18 Disclaimer" },
];

/** Three consecutive page indices shown in the nav (e.g. 0→0,1,2 · 18→16,17,18). */
export function getNavPageWindow(activeIndex: number): number[] {
  const start = Math.max(0, Math.min(activeIndex - 1, FULL_REPORT_PAGE_COUNT - 2));
  return [start, start + 1, start + 2];
}

export function getPageDefByIndex(index: number): FullReportPageDef | undefined {
  return FULL_REPORT_PAGE_REGISTRY.find((p) => p.index === index);
}

export function getPageDefById(id: string): FullReportPageDef | undefined {
  return FULL_REPORT_PAGE_REGISTRY.find((p) => p.id === id);
}
