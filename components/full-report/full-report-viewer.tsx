"use client";

import { useCallback, useEffect, useMemo, useState, type MouseEvent } from "react";
import type { Get1320ContentResult } from "@/lib/types/1320-content";
import {
  buildFullReportPayload,
  type FullReportBuildOptions,
} from "@/lib/full-report/build-full-report-payload";
import { FullReportFlipControls } from "@/components/full-report/full-report-flip-controls";
import { FullReportProgress } from "@/components/full-report/full-report-progress";
import { FullReportScreen } from "@/components/full-report/full-report-screen";
import { FullReportSideNav } from "@/components/full-report/full-report-side-nav";
import { usePreferFlip } from "@/components/full-report/use-prefer-flip";
import { trackEvent } from "@/lib/analytics";

type FullReportViewerProps = {
  content: Get1320ContentResult;
  options?: FullReportBuildOptions;
  analyticsEvent?: "sample_report_view" | "result_view" | "full_report_view";
  /** Custom screen payloads (v2 test route, future new UI). */
  screenPayloads?: ReturnType<typeof buildFullReportPayload>;
};

export function FullReportViewer({
  content,
  options,
  analyticsEvent,
  screenPayloads,
}: FullReportViewerProps) {
  const preferFlip = usePreferFlip();
  const screens = useMemo(
    () => screenPayloads ?? buildFullReportPayload(content, options),
    [content, options, screenPayloads],
  );
  const screenIds = screens.map((s) => s.screen.id);
  const [pageIndex, setPageIndex] = useState(0);

  const navAnchors = screens.reduce<{ group: string; screenId: string }[]>(
    (acc, payload) => {
      const group = payload.screen.navGroup;
      if (!acc.some((a) => a.group === group)) {
        acc.push({ group, screenId: payload.screen.id });
      }
      return acc;
    },
    [],
  );

  const activeScreenId = screenIds[pageIndex] ?? "cover";
  const activeTitle = screens[pageIndex]?.screen.title ?? "";

  const goToScreen = useCallback(
    (screenId: string) => {
      const idx = screenIds.indexOf(screenId);
      if (idx >= 0) setPageIndex(idx);
    },
    [screenIds],
  );

  const goPrev = useCallback(() => {
    setPageIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setPageIndex((i) => Math.min(screens.length - 1, i + 1));
  }, [screens.length]);

  useEffect(() => {
    if (analyticsEvent) trackEvent(analyticsEvent);
  }, [analyticsEvent]);

  useEffect(() => {
    if (!preferFlip) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        goNext();
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preferFlip, goNext, goPrev]);

  const handleStageClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!preferFlip) return;
      const target = event.target as HTMLElement;
      if (target.closest("a, button, input, textarea, .fr-glass-card")) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      if (x < rect.width * 0.28) goPrev();
      else if (x > rect.width * 0.72) goNext();
    },
    [preferFlip, goPrev, goNext],
  );

  useEffect(() => {
    if (preferFlip) return;

    const sections = screenIds
      .map((id) => document.getElementById(`fr-screen-${id}`))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const id = visible[0].target.id.replace("fr-screen-", "");
        const idx = screenIds.indexOf(id);
        if (idx >= 0) setPageIndex(idx);
      },
      { rootMargin: "-30% 0px -40% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [preferFlip, screenIds]);

  return (
    <div
      className={`full-report-viewer${preferFlip ? " full-report-viewer--flip" : " full-report-viewer--scroll"}${
        options?.fictionBanner ? " full-report-viewer--fiction" : ""
      }`}
    >
      {options?.fictionBanner ? (
        <p className="fr-fiction-banner" role="note">
          {options.fictionBanner}
        </p>
      ) : null}

      <div className="fr-layout">
        <FullReportSideNav
          navAnchors={navAnchors}
          activeScreenId={activeScreenId}
          onJump={goToScreen}
        />

        <div className="fr-main">
          {preferFlip ? (
            <div className="fr-flip-shell">
              <div
                className="fr-flip-stage"
                onClick={handleStageClick}
                role="region"
                aria-label={`Report page ${pageIndex + 1}: ${activeTitle}`}
              >
                <div className="fr-flip-hint" aria-hidden>
                  <span>← Click left</span>
                  <span>Click right →</span>
                </div>
                <FullReportScreen
                  key={screens[pageIndex].screen.id}
                  payload={screens[pageIndex]}
                  index={pageIndex}
                  backgroundVariant="desktop"
                  active
                />
              </div>
              <FullReportFlipControls
                pageIndex={pageIndex}
                pageCount={screens.length}
                title={activeTitle}
                onPrev={goPrev}
                onNext={goNext}
              />
            </div>
          ) : (
            <div className="fr-scroll">
              {screens.map((payload, index) => (
                <FullReportScreen
                  key={payload.screen.id}
                  payload={payload}
                  index={index}
                  backgroundVariant="desktop"
                  active
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {!preferFlip ? <FullReportProgress screenIds={screenIds} navAnchors={navAnchors} /> : null}
    </div>
  );
}
