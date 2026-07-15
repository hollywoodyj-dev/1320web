"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/** Opens the browser print dialog when `?autoprint=1` is present (PDF fallback). */
export function ReportPrintAutoTrigger() {
  const searchParams = useSearchParams();
  const autoPrint = searchParams.get("autoprint") === "1";

  useEffect(() => {
    if (!autoPrint) return;
    const timer = window.setTimeout(() => {
      window.print();
    }, 600);
    return () => window.clearTimeout(timer);
  }, [autoPrint]);

  return null;
}
