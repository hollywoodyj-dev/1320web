"use client";

import { type RefObject, useEffect } from "react";
import type { ReportType } from "@/lib/report-system/report-surface";

const AXIS_LOCK_PX = 10;
const SWIPE_THRESHOLD_PX = 48;

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

export function useUnifiedReportMobileSwipe(
  stageRef: RefObject<HTMLElement | null>,
  pageIndex: number,
  pageCount: number,
  onPageChange: (index: number) => void,
): void {
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || pageCount <= 1) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;
    let axis: "none" | "horizontal" | "vertical" = "none";

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      tracking = true;
      axis = "none";
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!tracking || event.touches.length !== 1) return;
      const dx = event.touches[0].clientX - startX;
      const dy = event.touches[0].clientY - startY;

      if (axis === "none") {
        if (Math.abs(dx) < AXIS_LOCK_PX && Math.abs(dy) < AXIS_LOCK_PX) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
      }

      if (axis === "horizontal") {
        event.preventDefault();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!tracking) return;
      tracking = false;

      if (axis !== "horizontal") {
        axis = "none";
        return;
      }

      const dx = event.changedTouches[0].clientX - startX;
      if (dx <= -SWIPE_THRESHOLD_PX && pageIndex < pageCount - 1) {
        onPageChange(pageIndex + 1);
      } else if (dx >= SWIPE_THRESHOLD_PX && pageIndex > 0) {
        onPageChange(pageIndex - 1);
      }

      axis = "none";
    };

    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: false });
    stage.addEventListener("touchend", onTouchEnd, { passive: true });
    stage.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      stage.removeEventListener("touchend", onTouchEnd);
      stage.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [stageRef, pageIndex, pageCount, onPageChange]);
}
