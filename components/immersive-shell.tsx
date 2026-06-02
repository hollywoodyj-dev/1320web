import type { ReactNode } from "react";

type ImmersiveShellProps = {
  children: ReactNode;
};

/** Full-viewport cosmic shell — no site header/footer (generating chamber only). */
export function ImmersiveShell({ children }: ImmersiveShellProps) {
  return (
    <main className="page-shell page-shell-immersive">
      <div className="page-stars" aria-hidden="true" />
      <div className="page-glow page-glow-left" aria-hidden="true" />
      <div className="page-glow page-glow-right" aria-hidden="true" />
      <div className="immersive-frame">{children}</div>
    </main>
  );
}
