import Image from "next/image";

import { S8_FALLBACK_SYMBOL } from "@/lib/full-report-v2/s8-page-static";

type S8PrimaryIconProps = {
  imageUrl?: string;
  svgMarkup?: string;
  alt: string;
  size?: number;
  className?: string;
};

/**
 * Renders the official S8 primary icon from steward assets.
 * Approved fallback ✺ when both URL and SVG are missing.
 */
export function S8PrimaryIcon({
  imageUrl,
  svgMarkup,
  alt,
  size = 112,
  className = "",
}: S8PrimaryIconProps) {
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
      className={`fr-v2-s8-icon-missing ${className}`.trim()}
      role="img"
      aria-label={alt}
    >
      <span className="fr-v2-s8-contribution-fallback-icon">{S8_FALLBACK_SYMBOL}</span>
      <span className="fr-v2-s8-icon-missing-label">Missing official S8 icon</span>
      <span className="fr-v2-s8-icon-missing-code">{alt}</span>
    </span>
  );
}
