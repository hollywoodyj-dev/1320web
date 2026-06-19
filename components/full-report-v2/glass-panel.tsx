import type { CSSProperties, ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function GlassPanel({ children, className, style }: GlassPanelProps) {
  return (
    <div
      className={["fr-v2-glass-panel", className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
