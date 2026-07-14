import type { ReactNode } from "react";

type MobileReportHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  ornament?: ReactNode;
  showDivider?: boolean;
};

export function MobileReportHero({
  eyebrow,
  title,
  description,
  ornament = "✦",
  showDivider = true,
}: MobileReportHeroProps) {
  return (
    <section className="mr-density-hero">
      <div className="mr-density-ornament" aria-hidden="true">
        {ornament}
      </div>
      <p className="mr-density-eyebrow">{eyebrow}</p>
      <h1 className="mr-density-hero-title">{title}</h1>
      {showDivider ? <div className="mr-density-divider" aria-hidden="true" /> : null}
      <p className="mr-density-hero-desc">{description}</p>
    </section>
  );
}
