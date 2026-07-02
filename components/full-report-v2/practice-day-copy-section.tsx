"use client";

import { useLayoutEffect, useRef, useState } from "react";

type PracticeDayCopySectionProps = {
  title: string;
  copy: string;
  copyClassName?: string;
};

export function PracticeDayCopySection({
  title,
  copy,
  copyClassName,
}: PracticeDayCopySectionProps) {
  const copyRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    const element = copyRef.current;
    if (!element) return;

    const measure = () => {
      setIsTruncated(element.scrollHeight > element.clientHeight + 1);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [copy]);

  return (
    <div className="fr-v2-practice-day-section">
      <div className="fr-v2-practice-day-section-title">{title}</div>
      <div
        className={
          isTruncated
            ? "fr-v2-practice-day-copy-wrap fr-v2-practice-day-copy-wrap--truncated"
            : "fr-v2-practice-day-copy-wrap"
        }
        tabIndex={isTruncated ? 0 : undefined}
        aria-label={isTruncated ? `${title}: ${copy}` : undefined}
      >
        <div
          ref={copyRef}
          className={["fr-v2-practice-day-copy", copyClassName].filter(Boolean).join(" ")}
        >
          {copy}
        </div>
        {isTruncated ? (
          <div className="fr-v2-practice-day-tooltip" role="tooltip">
            <span className="fr-v2-practice-day-tooltip-title">{title}</span>
            <span className="fr-v2-practice-day-tooltip-copy">{copy}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
