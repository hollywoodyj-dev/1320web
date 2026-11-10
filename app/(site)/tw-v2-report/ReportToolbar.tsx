"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  year: number;
  month: number;
  day: number;
  product: "FULL" | "SAMPLE";
  hasNarrative: boolean;
};

export function ReportToolbar({ year, month, day, product, hasNarrative }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const hideBirthday = params.get("hideBirthday") === "1";
  const query = new URLSearchParams({
    year: String(year),
    month: String(month),
    day: String(day),
  });
  if (product === "SAMPLE") query.set("product", "sample");
  const focus = params.get("focus");
  if (focus) query.set("focus", focus);

  function toggleBirthday() {
    const next = new URLSearchParams(params.toString());
    if (hideBirthday) next.delete("hideBirthday");
    else next.set("hideBirthday", "1");
    router.replace(`${pathname}?${next.toString()}`);
  }

  return (
    <div className="v2-toolbar no-print">
      <a href={`/tw-v2-report?${query.toString()}`}>完整閱讀</a>
      {hasNarrative ? <a href={`/tw-v2-report/summary?${query.toString()}`}>一頁摘要</a> : null}
      <a href="/tw-v2-report/difference">免費與完整差異</a>
      {hasNarrative ? (
        <button type="button" onClick={() => window.print()}>
          列印／存成 PDF
        </button>
      ) : null}
      {pathname.endsWith("/summary") ? (
        <button type="button" onClick={toggleBirthday}>
          {hideBirthday ? "顯示出生日期" : "隱藏出生日期"}
        </button>
      ) : null}
    </div>
  );
}
