import type { ReactNode } from "react";

type InnerPageHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  children?: ReactNode;
};

export function InnerPageHero({ eyebrow, title, lead, children }: InnerPageHeroProps) {
  return (
    <header className="inner-page-hero">
      <p className="blueprint-eyebrow">{eyebrow}</p>
      <h1 className="inner-page-title text-gold-gradient">{title}</h1>
      <p className="blueprint-lead">{lead}</p>
      {children ? <div className="blueprint-hero-actions">{children}</div> : null}
    </header>
  );
}
