import { BrandSeal } from "@/components/full-report-v2/brand-seal";

type MobileTopBarProps = {
  brandName: string;
  brandSubtitle?: string;
  pageIndex: string;
};

export function MobileTopBar({ brandName, brandSubtitle, pageIndex }: MobileTopBarProps) {
  return (
    <header className="mr-v2-top-bar">
      <BrandSeal size={44} className="mr-v2-mini-seal" />
      <div className="mr-v2-top-bar-brand">
        <div className="mr-v2-top-bar-title">{brandName}</div>
        {brandSubtitle ? <div className="mr-v2-top-bar-subtitle">{brandSubtitle}</div> : null}
      </div>
      <div className="mr-v2-page-index">{pageIndex}</div>
    </header>
  );
}
