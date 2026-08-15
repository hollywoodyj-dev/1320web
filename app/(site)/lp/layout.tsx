import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/** Shared shell for paid LPs — page_view / paid_landing_view inherit from site analytics. */
export default function LpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
