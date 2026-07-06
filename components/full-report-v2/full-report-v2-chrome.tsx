"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

export type ReportNavZone = "prev" | "next" | "menu" | "center" | "close";

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
  onTurnZoneMouseMove: (zone: "prev" | "next", event: MouseEvent<HTMLButtonElement>) => void;
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
  onTurnZoneMouseMove,
}: FullReportV2ChromeProps) {
  const canGoPrev = pageIndex > 0;
  const canGoNext = pageIndex < pageCount - 1;

  return (
    <>
      {closeHref ? (
        <Link href={closeHref} className="fr-v2-close-btn" aria-label={closeAriaLabel}>
          ×
        </Link>
      ) : null}

      <div
        className={`fr-v2-viewer-stage${showLayoutGuide ? " fr-v2-viewer-stage--guided" : ""}`}
        onMouseMove={onStageMouseMove}
        onMouseLeave={onStageMouseLeave}
        role="region"
        aria-label={`Report page ${pageIndex + 1} of ${pageCount}`}
      >
        {children}

        {!showLayoutGuide && canGoPrev ? (
          <button
            type="button"
            className="fr-v2-turn-zone fr-v2-turn-zone--prev"
            aria-label="Previous page"
            onClick={onPrev}
            onMouseMove={(event) => onTurnZoneMouseMove("prev", event)}
          />
        ) : null}

        {!showLayoutGuide && canGoNext ? (
          <button
            type="button"
            className="fr-v2-turn-zone fr-v2-turn-zone--next"
            aria-label="Next page"
            onClick={onNext}
            onMouseMove={(event) => onTurnZoneMouseMove("next", event)}
          />
        ) : null}

        {cursorTag && cursorPos && !showLayoutGuide ? (
          <div
            className="fr-v2-cursor-tag"
            style={{ left: cursorPos.x, top: cursorPos.y }}
            aria-hidden="true"
          >
            {cursorTag}
          </div>
        ) : null}
      </div>
    </>
  );
}

export { resolveZone };
