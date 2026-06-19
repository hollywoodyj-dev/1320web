import type { SVGProps } from "react";

type BrandSealProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function BrandSeal({ size = 60, className, ...props }: BrandSealProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      {...props}
    >
      <g className="fr-v2-svg-gold" strokeWidth="1.4">
        <circle cx="50" cy="50" r="42" />
        <circle cx="50" cy="50" r="24" />
        <circle cx="50" cy="26" r="24" />
        <circle cx="50" cy="74" r="24" />
        <circle cx="26" cy="50" r="24" />
        <circle cx="74" cy="50" r="24" />
        <circle cx="33" cy="33" r="24" />
        <circle cx="67" cy="67" r="24" />
        <circle cx="33" cy="67" r="24" />
        <circle cx="67" cy="33" r="24" />
      </g>
    </svg>
  );
}
