import Image from "next/image";
import type { CSSProperties } from "react";

const DEFAULT_ICON_SIZE = 80;

type SignatureSegmentCardIconProps = {
  imageUrl?: string;
  code: string;
  title: string;
  fallbackIcon: string;
  /** Circle diameter in px — default matches Core Signature cards */
  size?: number;
};

export function SignatureSegmentCardIcon({
  imageUrl,
  code,
  title,
  fallbackIcon,
  size = DEFAULT_ICON_SIZE,
}: SignatureSegmentCardIconProps) {
  const iconStyle = {
    "--fr-v2-signature-code-icon-size": `${size}px`,
  } as CSSProperties;

  return (
    <div className="fr-v2-signature-code-icon" style={iconStyle}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`${code} — ${title}`}
          width={size}
          height={size}
          className="fr-v2-signature-code-img"
          sizes={`${size}px`}
        />
      ) : (
        <span className="fr-v2-signature-code-fallback" aria-hidden="true">
          {fallbackIcon}
        </span>
      )}
    </div>
  );
}
