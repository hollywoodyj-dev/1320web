import Image from "next/image";

import { S7_FALLBACK_SYMBOL } from "@/lib/full-report-v2/s7-page-static";

type S7PrimaryIconProps = {
  imageUrl?: string;
  svgMarkup?: string;
  alt: string;
  size?: number;
  className?: string;
};

/**
 * Renders the official S7 primary icon from steward assets.
 * Approved fallback ♛ when both URL and SVG are missing.
 */
export function S7PrimaryIcon({
  imageUrl,
  svgMarkup,
  alt,
  size = 108,
  className = "",
}: S7PrimaryIconProps) {
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
      className={`fr-v2-s7-icon-missing ${className}`.trim()}
      role="img"
      aria-label={alt}
    >
      <span className="fr-v2-s7-sovereignty-fallback-icon">{S7_FALLBACK_SYMBOL}</span>
      <span className="fr-v2-s7-icon-missing-label">Missing official S7 icon</span>
      <span className="fr-v2-s7-icon-missing-code">{alt}</span>
    </span>
  );
}
