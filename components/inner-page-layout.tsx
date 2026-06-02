import type { ReactNode } from "react";

type InnerPageLayoutProps = {
  children: ReactNode;
  className?: string;
};

/** Full-bleed cosmic background + centered column (report / marketing inner pages). */
export function InnerPageLayout({ children, className }: InnerPageLayoutProps) {
  return (
    <div className={["inner-content-page", className].filter(Boolean).join(" ")}>
      <div className="inner-content-page__frame space-y-5">{children}</div>
    </div>
  );
}
