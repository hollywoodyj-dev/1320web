import Image from "next/image";

type S5PrimaryIconProps = {
  imageUrl?: string;
  svgMarkup?: string;
  alt: string;
  size?: number;
  className?: string;
};

/**
 * Renders the official S5 primary icon from steward assets.
 * No generic glyph fallback — missing assets surface a QA warning.
 */
export function S5PrimaryIcon({
  imageUrl,
  svgMarkup,
  alt,
  size = 110,
  className = "",
}: S5PrimaryIconProps) {
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
    <span className={`fr-v2-s5-icon-missing ${className}`.trim()} role="img" aria-label={alt}>
      <span className="fr-v2-s5-icon-missing-label">Missing official S5 icon</span>
      <span className="fr-v2-s5-icon-missing-code">{alt}</span>
    </span>
  );
}
