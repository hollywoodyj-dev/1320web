"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

export type ReportNavZone = "prev" | "next" | "menu" | "center" | "close";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, label, [role='button'], .fr-v2-glass-panel, .fr-glass-card";

type FullReportV2ChromeProps = {
  children: ReactNode;
  closeHref?: string;
  closeAriaLabel?: string;
  pageIndex: number;
  pageCount: number;
  onPrev: () => void;
  onNext: () => void;
  cursorTag: string | null;
  cursorPos: { x: number; y: number } | null;
  showLayoutGuide: boolean;
  onStageMouseMove: (event: MouseEvent<HTMLDivElement>) => void;
  onStageMouseLeave: () => void;
};

function resolveZone(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  pageIndex: number,
  pageCount: number,
): ReportNavZone {
  const relX = (clientX - rect.left) / rect.width;
  const relY = clientY - rect.top;

  if (relY <= 72) return "menu";
  if (relX <= 0.28) return pageIndex > 0 ? "prev" : "center";
  if (relX >= 0.72) return pageIndex < pageCount - 1 ? "next" : "center";
  return "center";
}

export function zoneToCursorTag(
  zone: ReportNavZone,
  pageIndex: number,
  pageCount: number,
): string | null {
  switch (zone) {
    case "prev":
      return "← Previous page";
    case "next":
      return "Next page →";
    case "menu":
      return "Page menu";
    case "center":
      if (pageIndex <= 0 && pageCount > 1) return "Next page →";
      if (pageIndex >= pageCount - 1 && pageCount > 1) return "← Previous page";
      return "Click sides to turn pages";
    default:
      return null;
  }
}

export function FullReportV2Chrome({
  children,
  closeHref,
  closeAriaLabel = "Close report and return to account",
  pageIndex,
  pageCount,
  onPrev,
  onNext,
  cursorTag,
  cursorPos,
  showLayoutGuide,
  onStageMouseMove,
  onStageMouseLeave,
}: FullReportV2ChromeProps) {
  const handleStageClick = (event: MouseEvent<HTMLDivElement>) => {
    if (showLayoutGuide) return;

    const target = event.target as HTMLElement;
    if (target.closest(INTERACTIVE_SELECTOR)) return;
    if (target.closest(".fr-v2-nav-dock, .fr-v2-close-btn, .fr-v2-layout-guide")) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const zone = resolveZone(event.clientX, event.clientY, rect, pageIndex, pageCount);

    if (zone === "prev") onPrev();
    else if (zone === "next") onNext();
  };

  return (
    <>
      {closeHref ? (
        <Link href={closeHref} className="fr-v2-close-btn" aria-label={closeAriaLabel}>
          ×
        </Link>
      ) : null}

      <div
        className={`fr-v2-viewer-stage${showLayoutGuide ? " fr-v2-viewer-stage--guided" : ""}`}
        onClick={handleStageClick}
        onMouseMove={onStageMouseMove}
        onMouseLeave={onStageMouseLeave}
        role="region"
        aria-label={`Report page ${pageIndex + 1} of ${pageCount}`}
      >
        <div className="fr-v2-turn-zone fr-v2-turn-zone--prev" aria-hidden="true" />
        <div className="fr-v2-turn-zone fr-v2-turn-zone--next" aria-hidden="true" />

        {cursorTag && cursorPos && !showLayoutGuide ? (
          <div
            className="fr-v2-cursor-tag"
            style={{ left: cursorPos.x, top: cursorPos.y }}
            aria-hidden="true"
          >
            {cursorTag}
          </div>
        ) : null}

        {children}
      </div>
    </>
  );
}

export { resolveZone };
