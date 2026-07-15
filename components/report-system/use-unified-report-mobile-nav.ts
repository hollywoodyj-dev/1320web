"use client";

import { type RefObject, useEffect } from "react";
import type { ReportType } from "@/lib/report-system/report-surface";

function storageKeyForReport(reportType: ReportType): string {
  return `1320-unified-report-mobile-index-${reportType}`;
}

export function readStoredMobilePageIndex(reportType: ReportType, pageCount: number): number {
  if (typeof window === "undefined") return 0;
  const raw = window.sessionStorage.getItem(storageKeyForReport(reportType));
  const parsed = Number.parseInt(raw ?? "0", 10);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.min(pageCount - 1, parsed));
}

export function writeStoredMobilePageIndex(reportType: ReportType, index: number): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(storageKeyForReport(reportType), String(index));
}

/** Sync v2 viewport height + restore/persist horizontal page index on the swipe track. */
export function useUnifiedReportMobileTrack(
  trackRef: RefObject<HTMLDivElement | null>,
  reportType: ReportType,
  pageCount: number,
): void {
  useEffect(() => {
    const track = trackRef.current;
    if (!track || pageCount <= 0) return;

    let pageIndex = readStoredMobilePageIndex(reportType, pageCount);

    const syncViewport = () => {
      track.style.setProperty("--mr-v2-viewport", `${track.clientHeight}px`);
      const width = track.clientWidth;
      if (width > 0) {
        track.scrollLeft = pageIndex * width;
      }
    };

    const onScroll = () => {
      const width = track.clientWidth;
      if (width <= 0) return;
      pageIndex = Math.round(track.scrollLeft / width);
      writeStoredMobilePageIndex(reportType, pageIndex);
    };

    syncViewport();
    const resizeObserver = new ResizeObserver(syncViewport);
    resizeObserver.observe(track);
    track.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      track.removeEventListener("scroll", onScroll);
    };
  }, [trackRef, reportType, pageCount]);
}
