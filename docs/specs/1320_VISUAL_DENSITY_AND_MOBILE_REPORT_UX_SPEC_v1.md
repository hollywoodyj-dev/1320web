# 1320 Soulcode Visual Density & Mobile Report UX Optimization Spec v1.0

**Document Type:** UI / UX / Frontend Implementation Spec  
**Version:** v1.0  
**Status:** Ready for Nova Implementation  
**Target Site:** 1320soulcode.com  
**Primary Surface:** Mobile Full Report / Report Preview / Homepage Content Density  
**Owner:** Tree / 信伊咲  
**Implementation Owner:** Nova  
**QA Owner:** Lumen  

## Executive Directive

The website has completed meaning-layer and content-layer upgrades. The next priority is **reading experience**.

The issue is visual density: thin fonts, crowded sections, long copy blocks, weak card hierarchy, and effortful mobile reading.

**Goal:** Do not remove meaning. Make the meaning easier to enter.

## Design Direction

The interface should feel: spacious, premium, mystical but readable, soft but clear, guided, calm, structured, commercial-quality.

Avoid: dense, academic, thin, cold, text-heavy, over-explained, PDF-pasted-into-webpage.

## Primary UX Principle

- One screen = one main idea  
- One card = one action or one insight  
- One section = one emotional movement  

Use progressive disclosure: Overview → cards → tap/expand/continue → deeper meaning.

## Key Visual Changes

### Typography tokens (global)

See `styles/site-density-v1.css` and `styles/mobile-report-v2/mobile-density-v1.css`.

- Body: 16.5–17px, line-height 1.65, font-weight 400  
- Headings: font-weight 600, tighter letter-spacing  
- `--text-main`, `--text-soft`, `--text-muted` gold/panel tokens per Wisewave spec  

### Mobile report pattern

Move from dense paragraphs to: hero title → short intro → stacked insight cards → icon-led hierarchy → clear navigation.

Baseline reference: **Mobile Page 28 · 7-Day Integration Practice Overview** (Wisewave HTML prototype).

## Reusable Components (Nova)

| Component | Path |
|-----------|------|
| MobileReportHero | `components/mobile-report-v2/density/mobile-report-hero.tsx` |
| MobileReportPracticeCard | `components/mobile-report-v2/density/mobile-report-practice-card.tsx` |
| MobileReportTipsPanel | `components/mobile-report-v2/density/mobile-report-tips-panel.tsx` |
| MobileReportInsightCard | `components/mobile-report-v2/density/mobile-report-insight-card.tsx` |

CSS shell classes: `.mr-density-shell`, `.mr-density-hero`, `.mr-density-practice-card`, `.mr-density-tips-panel`, `.report-insight-card`, `.report-nav-button`.

## Content Density Rules (mobile report)

- Max hero description: 2 lines on mobile  
- Max card subtitle: 1 line  
- Max visible list items: 7  
- Max paragraph: 45–65 words  
- No nested paragraph blocks inside cards  
- Max 2 text weights per card  

## Homepage Density Pass

Keep homepage lightweight: Hero + date entry, what 1320 gives you, four foundation mirrors, Full Report preview, origin/trust, final CTA.

Move detailed philosophy to About / Blueprint / FAQ / Sample Report / Disclaimer.

Each section: one eyebrow, one heading, one 2–3 line paragraph, optional 3–4 cards.

## Lumen QA Checklist

- [ ] Mobile report pages feel less dense than previous version  
- [ ] Body text readable on iPhone width  
- [ ] No overly thin font weight  
- [ ] Section spacing increased  
- [ ] Cards visually scannable  
- [ ] S1 → S3 → S2 → S0 order unchanged  
- [ ] S7 no percentage/score language  
- [ ] S6 Value & Receiving language preserved  
- [ ] Homepage visible copy reduced ~35–45%  
- [ ] CTAs clearly visible  
- [ ] Mobile navigation feels guided  
- [ ] No commercial source-layer template leaks  

## Final Principle

> 1320 should feel like a mirror the user can enter, not a document they must survive.
