type QuoteBlockProps = {
  children: React.ReactNode;
};

export function QuoteBlock({ children }: QuoteBlockProps) {
  return <blockquote className="fr-v2-quote-block">{children}</blockquote>;
}
