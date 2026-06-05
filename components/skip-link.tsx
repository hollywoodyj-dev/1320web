/** First tab stop — jumps past chrome to primary content (WCAG 2.4.1). */
export function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  );
}
