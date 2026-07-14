import type { ReactNode } from "react";

export type MobileReportPracticeCardAccent =
  | "origin"
  | "expression"
  | "mirror"
  | "void"
  | "shadow"
  | "mission"
  | "value"
  | "contribution"
  | "sovereignty"
  | "return";

type MobileReportPracticeCardProps = {
  dayLabel: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  accent?: MobileReportPracticeCardAccent;
};

export function MobileReportPracticeCard({
  dayLabel,
  title,
  subtitle,
  icon,
  accent = "origin",
}: MobileReportPracticeCardProps) {
  return (
    <article className="mr-density-practice-card">
      <div className={`mr-density-practice-icon mr-density-practice-icon--${accent}`}>
        {icon}
      </div>
      <div className="mr-density-practice-meta">
        <div className="mr-density-practice-title-row">
          <span className="mr-density-practice-day">{dayLabel}</span>
          <span className="mr-density-practice-title">{title}</span>
        </div>
        <p className="mr-density-practice-subtitle">{subtitle}</p>
      </div>
      <div className="mr-density-chevron" aria-hidden="true">
        ›
      </div>
    </article>
  );
}
