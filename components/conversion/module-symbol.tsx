import type { AdvancedModuleSymbolId } from "@/lib/full-report-content";

type ModuleSymbolProps = {
  id: AdvancedModuleSymbolId;
  className?: string;
};

/** One restrained symbol per advanced module (Wisewave Phase C). */
export function ModuleSymbol({ id, className }: ModuleSymbolProps) {
  const shared = {
    className,
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };

  if (id === "s5") {
    return (
      <svg {...shared}>
        <circle cx="24" cy="26" r="13" stroke="currentColor" strokeWidth="1.4" opacity="0.9" />
        <path
          d="M24 13 L26.2 26 L24 39 L21.8 26 Z"
          fill="currentColor"
          opacity="0.95"
        />
        <path
          d="M35 11 C37 15 36 19 33.5 22 C36 18 37.5 14 35 11 Z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
    );
  }

  if (id === "s6") {
    return (
      <svg {...shared}>
        <circle cx="24" cy="24" r="11" stroke="currentColor" strokeWidth="1.4" opacity="0.75" />
        <path
          d="M10 28 C16 22 20 30 26 24 C32 18 36 22 38 20"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M10 32 C17 26 21 34 27 28 C33 22 36 26 38 24"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.65"
        />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
      <path
        d="M24 14 C18 20 18 28 24 34 C30 28 30 20 24 14 Z"
        fill="currentColor"
        opacity="0.35"
      />
    </svg>
  );
}
