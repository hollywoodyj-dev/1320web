import type { SoulCodeLogo } from "@/lib/full-report-v2/soul-code-logos";
import { SOUL_CODE_LOGO_SRC } from "@/lib/full-report-v2/soul-code-logos";

type SoulCodeLogoImageProps = {
  icon: SoulCodeLogo;
  className?: string;
};

export function SoulCodeLogoImage({ icon, className }: SoulCodeLogoImageProps) {
  return (
    <img
      className={className}
      src={SOUL_CODE_LOGO_SRC[icon]}
      alt=""
      aria-hidden="true"
    />
  );
}
