import Image from "next/image";

import { S6_FALLBACK_SYMBOL } from "@/lib/full-report-v2/s6-page-static";

type S6PrimaryIconProps = {
  imageUrl?: string;
  svgMarkup?: string;
  alt: string;
  size?: number;
  className?: string;
};

/**
 * Renders the official S6 primary icon from steward assets.
 * Approved fallback ◇ when both URL and SVG are missing — logs via QA styling.
 */
export function S6PrimaryIcon({
  imageUrl,
  svgMarkup,
  alt,
  size = 108,
  className = "",
}: S6PrimaryIconProps) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        width={size}
        height={size}
        className={className}
        sizes={`${size}px`}
      />
    );
  }

  if (svgMarkup) {
    return (
      <span
        className={className}
        role="img"
        aria-label={alt}
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
    );
  }

  return (
    <span
      className={`fr-v2-s6-icon-missing ${className}`.trim()}
      role="img"
      aria-label={alt}
    >
      <span className="fr-v2-s6-value-fallback-icon">{S6_FALLBACK_SYMBOL}</span>
      <span className="fr-v2-s6-icon-missing-label">Missing official S6 icon</span>
      <span className="fr-v2-s6-icon-missing-code">{alt}</span>
    </span>
  );
}
