"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 900;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type PageScalerProps = {
  children: ReactNode;
};

/**
 * Keeps the fixed 1600x900 report canvas at its true proportions while
 * scaling it down to fit the available width, so no page content is clipped.
 */
export function PageScaler({ children }: PageScalerProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useIsomorphicLayoutEffect(() => {
    const node = outerRef.current;
    if (!node) return;

    const update = () => {
      const available = node.clientWidth;
      const next = Math.min(1, available / CANVAS_WIDTH);
      setScale(next > 0 ? next : 1);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(node);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      className="fr-v2-page-scaler"
      style={{ height: CANVAS_HEIGHT * scale }}
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
