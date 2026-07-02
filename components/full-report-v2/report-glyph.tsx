/**
 * Shared gold line-art glyph set for the full report (Page 01 blocks, etc.).
 * Drawn on a 24×24 grid, stroked with `currentColor` so each glyph inherits
 * its container's gold color and scales with the container's font-size.
 */

export type ReportGlyphName =
  // How to Use This Report
  | "book"
  | "mirror"
  | "feather"
  | "eye"
  | "cycle"
  // Important Guidance
  | "unlock"
  | "choice"
  | "sprout"
  | "tuningFork"
  | "wholeness"
  // This Report Is Not
  | "crystalBall"
  | "medical"
  | "chat"
  | "coin"
  | "scales"
  | "wand"
  // Mini cards
  | "compassStar"
  | "figure"
  // Footer affirmations
  | "heart"
  | "infinity"
  | "path"
  | "pattern"
  | "flame";

const GLYPHS: Record<ReportGlyphName, React.ReactNode> = {
  book: (
    <>
      <path d="M12 6c-1.6-1.2-3.7-2-6.2-2-1 0-1.8.1-1.8.1v13s.8-.1 1.8-.1c2.5 0 4.6.8 6.2 2" />
      <path d="M12 6c1.6-1.2 3.7-2 6.2-2 1 0 1.8.1 1.8.1v13s-.8-.1-1.8-.1c-2.5 0-4.6.8-6.2 2z" />
      <path d="M12 6v13" />
    </>
  ),
  mirror: (
    <>
      <ellipse cx="12" cy="8.5" rx="6" ry="6.8" />
      <path d="M12 15.3V20" />
      <path d="M8.5 20h7" />
      <path d="M9.4 6.2a3.4 3.4 0 0 1 3-1.3" />
    </>
  ),
  feather: (
    <>
      <path d="M19.5 5c0 7-4.8 11.8-10.8 12.8L5 19l1.2-3.6C7.2 9.6 12 5 19.5 5z" />
      <path d="M15.5 8.5 7 17" />
      <path d="M14 9.5h-3" />
      <path d="M12.5 12.5h-3" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.7 12 5.7 21.5 12 21.5 12 18 18.3 12 18.3 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  cycle: (
    <>
      <path d="M5.5 9a7 7 0 0 1 11.2-2.3L18 8" />
      <path d="M18.5 4v4h-4" />
      <path d="M18.5 15a7 7 0 0 1-11.2 2.3L6 16" />
      <path d="M5.5 20v-4h4" />
    </>
  ),
  unlock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 7.3-2.4" />
      <circle cx="12" cy="15" r="1.3" />
      <path d="M12 16v2" />
    </>
  ),
  choice: (
    <>
      <path d="M12 21v-8.5" />
      <path d="M12 12.5 6.5 7" />
      <path d="M6.5 11V7h4" />
      <path d="M12 12.5 17.5 7" />
      <path d="M17.5 11V7h-4" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 20v-8" />
      <path d="M12 13c0-3.2-2.2-5.4-5.4-5.4C6.6 10.8 8.8 13 12 13z" />
      <path d="M12 13.5c0-3.2 2.2-5.4 5.4-5.4C17.4 11.3 15.2 13.5 12 13.5z" />
    </>
  ),
  tuningFork: (
    <>
      <path d="M8.5 4v7a3.5 3.5 0 0 0 7 0V4" />
      <path d="M12 14.5V20" />
      <path d="M9 20h6" />
    </>
  ),
  wholeness: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 4v1.8M12 18.2V20M4 12h1.8M18.2 12H20" />
    </>
  ),
  crystalBall: (
    <>
      <circle cx="12" cy="9.5" r="6" />
      <path d="M7.5 19h9" />
      <path d="M9.5 16 8.5 19M14.5 16l1 3" />
      <path d="M9.6 8a2.6 2.6 0 0 1 2.4-1.6" />
    </>
  ),
  medical: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v9M7.5 12h9" />
    </>
  ),
  chat: (
    <>
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-8l-4 3v-3H6a2 2 0 0 1-2-2z" />
      <path d="M8 8.5h8M8 11.5h5" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v10" />
      <path d="M14.3 9.3c0-1.2-1-1.9-2.3-1.9s-2.3.8-2.3 1.9c0 2.5 4.6 1.4 4.6 4 0 1.2-1 1.9-2.3 1.9s-2.3-.7-2.3-1.9" />
    </>
  ),
  scales: (
    <>
      <path d="M12 4.5v15.5" />
      <path d="M7 20h10" />
      <path d="M4.5 8h15" />
      <path d="M4.5 8 2 13.2a2.5 2.5 0 0 0 5 0z" />
      <path d="M19.5 8 22 13.2a2.5 2.5 0 0 1-5 0z" />
      <circle cx="12" cy="5" r="1.1" />
    </>
  ),
  wand: (
    <>
      <path d="M5 19 14.5 9.5" />
      <path d="M16 5.5l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9z" />
      <path d="M6.5 5l.6 1.4 1.4.6-1.4.6L6.5 9l-.6-1.4L4.5 7l1.4-.6z" />
    </>
  ),
  compassStar: (
    <>
      <path d="M12 2.5 13.9 10 21.5 12 13.9 14 12 21.5 10.1 14 2.5 12 10.1 10z" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  figure: (
    <>
      <circle cx="12" cy="7" r="3.3" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  heart: (
    <path d="M12 20.4c-4.1-3-6.6-5.6-6.6-8.8A3.4 3.4 0 0 1 12 10.3a3.4 3.4 0 0 1 6.6 1.3c0 3.2-2.5 5.8-6.6 8.8z" />
  ),
  infinity: (
    <path d="M8.2 8.5a3.5 3.5 0 1 0 0 7c2 0 3-1.7 3.8-3.5C12.8 10.2 13.8 8.5 15.8 8.5a3.5 3.5 0 1 1 0 7c-2 0-3-1.7-3.8-3.5C11.2 10.2 10.2 8.5 8.2 8.5z" />
  ),
  path: (
    <>
      <path d="M7 19a3 3 0 0 1 0-6h10a3 3 0 0 0 0-6" />
      <circle cx="7" cy="19" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="17" cy="7" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  pattern: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 9.3h16M4 14.7h16M9.3 4v16M14.7 4v16" />
    </>
  ),
  flame: (
    <>
      <path d="M12 22c4-3.5 6.5-7 6.5-11a6.5 6.5 0 0 0-11-4.5C5.5 9.5 4 11.5 4 14a8 8 0 0 0 8 8z" />
      <path d="M12 22V12" />
    </>
  ),
};

type ReportGlyphProps = {
  name: ReportGlyphName;
};

export function ReportGlyph({ name }: ReportGlyphProps) {
  return (
    <svg
      className="fr-v2-glyph"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {GLYPHS[name]}
    </svg>
  );
}
