import type { ReactNode } from "react";

type CTAButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "soft";
  onClick?: () => void;
};

export function CTAButton({ children, href, variant = "primary", onClick }: CTAButtonProps) {
  const className = [
    "fr-v2-cta-button",
    variant === "soft" ? "fr-v2-cta-button--soft" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
