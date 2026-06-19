"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 900;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function estimateScale(width: number, height: number): number {
  if (width <= 0 || height <= 0) return 1;
  return Math.min(1, width / CANVAS_WIDTH, height / CANVAS_HEIGHT);
}

type PageScalerProps = {
  children: ReactNode;
};

/**
 * Keeps the fixed 1600×900 report canvas proportional, scaled to fit both the
 * available width and height (so the full page — including footer — stays visible).
 */
export function PageScaler({ children }: PageScalerProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  // Keep initial scale at 1 so SSR and the first client render match (avoids hydration mismatch).
  const [scale, setScale] = useState(1);

  const update = useCallback(() => {
    const node = outerRef.current;
    if (!node) return;

    // Measure the parent (viewer-page) rather than the node itself: we resize the
    // node down to the scaled canvas size below, so measuring the node would feed
    // back its own shrunk width and the scale would collapse.
    const parent = node.parentElement;
    const width = parent?.clientWidth ?? node.clientWidth;
    const height = parent?.clientHeight ?? window.innerHeight - 72;
    if (width <= 0 || height <= 0) return;

    setScale(estimateScale(width, height));
  }, []);

  useIsomorphicLayoutEffect(() => {
    const node = outerRef.current;
    if (!node) return;

    update();

    const observer = new ResizeObserver(update);
    const parent = node.parentElement;
    if (parent) observer.observe(parent);
    const scrollHost = node.closest(".fr-v2-viewer-scroll");
    if (scrollHost) observer.observe(scrollHost);

    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return (
    <div
      ref={outerRef}
      className="fr-v2-page-scaler"
      style={{ width: CANVAS_WIDTH * scale, height: CANVAS_HEIGHT * scale }}
    >
      <div
        className="fr-v2-page-scaler__canvas"
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
