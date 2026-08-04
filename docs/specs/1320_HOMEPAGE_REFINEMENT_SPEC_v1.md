# Page 01 · Home Page Refinement Spec v1.0

**Document type:** Wisewave → Nova / Lumen  
**Page:** Home (`/`)  
**Target:** https://1320soulcode.com  
**Design direction:** Sacred · Simple · Quiet · Spacious · Luminous · Grounded  
**Owner:** Tree / 信伊咲  
**Implementation:** Nova  
**QA:** Lumen  
**Status:** Hierarchy Correction — **Accepted and Closed** (Wisewave 2026-08-04)  
**Hierarchy commits:** `d5821cc` (desktop hierarchy) · `cf66751` (mobile corrections)  
**Closure record:** `docs/governance/HOMEPAGE_HIERARCHY_CORRECTION_ACCEPTED_AND_CLOSED.md`

---

## Core principle

> Do not remove depth. Hide depth more elegantly.

Reduce visible homepage copy by **40–55%**. Move detail to About, Your Code, Sample Report, Full Report, FAQ, Disclaimer.

Homepage should answer only: **What is this? · Why does it matter? · Where do I begin?**

---

## Final section order (target)

1. Hero  
2. Birth Date Entry  
3. What Is 1320  
4. Origin Story  
5. Four Foundation Mirrors (S1 → S3 → S2 → S0)  
6. Boundary Block (compressed “What 1320 Is Not”)  
7. From Recognition to Integration  
8. Full Report Preview  
9. Reflection over Prediction  
10. Final CTA  
11. Footer  

**Remove or soften:** “Does This Sound Familiar?” curiosity block · stats band · secondary links nav · mid-CTA duplicate · about preview card (move to footer/about) · excess CTAs in full-report section

**Optional combine:** What Is 1320 + Boundary Block; Reflection into Boundary Block if still too long.

---

## Key copy (approved final)

### Hero

- Eyebrow: **1320 Soulcode**
- Headline: **Meet Your Soul Blueprint**
- Subheadline: A reflective intelligence platform for remembering who you are beneath adaptation.
- Mirror line: Not your fate. Not your label. Your mirror.
- Primary CTA: **Generate My Code**
- Optional secondary: **View Sample Report**

### Birth date entry

- Title: Start with your birth date  
- Body: Your birth date opens the symbolic structure of your Soul Blueprint.  
- CTA: Generate My Code  
- Move privacy/technical copy to FAQ/footer

### Four Foundation Mirrors

| Code | Title | One-line |
|------|-------|----------|
| S1 | Soul Origin | Who you are beneath adaptation. |
| S3 | Soul Vibration | How your essence naturally expresses. |
| S2 | Soul Mirror | What relationships reflect back to you. |
| S0 | Void Gate | How you meet the unknown and return to self. |

### Boundary block

A mirror — not a label. Symbolic reflection, not prediction, diagnosis, therapy, or professional advice. CTA: Read Full Disclaimer.

### Full report preview

Groups: Foundation (S1·S3·S2·S0) · Integration (S4·S5·S6) · Evolution (S7·S8·S9). CTAs: Unlock Full Report · View Sample Report (max 2).

---

## Governance (must preserve)

- Foundation order: **S1 → S3 → S2 → S0**
- S6 = **Value & Receiving**
- S2 = relationship mirror (no “who you attract”)
- S3 = expression (no “spiritual maturity”)
- S7 = qualitative sovereignty (no scores/percentages)
- Avoid: prediction, diagnosis, spiritual rank, fixed identity, money frequency

---

## Visual / layout (Nova)

```css
.home-section { padding-block: clamp(84px, 10vw, 148px); }
.home-section.compact { padding-block: clamp(56px, 7vw, 96px); }
.home-section-inner { width: min(1120px, calc(100% - 48px)); margin-inline: auto; }
```

Typography: body 17px / 1.65; hero title clamp(52px, 8vw, 92px); section title clamp(34px, 5vw, 58px). Mobile body ≥ 16.5px.

CTA rule: max **2 CTAs per section**. Card copy max 25–40 words; foundation cards **one sentence**.

---

## Lumen QA watchpoints

- [ ] 40–55% copy reduction vs current
- [ ] First viewport clear in ~8 seconds
- [ ] Hero not crowded; birth date visible
- [ ] S1→S3→S2→S0 order; S6 Value & Receiving
- [ ] No governance language violations
- [ ] Mobile: no overflow, CTAs visible, footer mantra preserved

---

## Acceptance

First-time user understands 1320 within 8 seconds. Page feels sacred, simple, quiet, spacious, luminous, grounded. Clear next step: **Generate My Code**.

---

## Current vs target (Nova gap analysis)

| Current | Target action |
|---------|----------------|
| Hero: journey line, mini S-labels, cta support microcopy | Remove/reduce; add eyebrow “1320 Soulcode”; shorten subheadline |
| Curiosity “Does this sound familiar?” | Remove or replace with quiet mirror statement |
| Secondary links nav | Remove from homepage flow |
| Pillar cards: 4 text layers + LEARN MORE each | One sentence + optional single learn-more pattern |
| NOT THIS: bullet list | Compress to boundary block |
| Stats band | Remove from homepage |
| Full report: 4 CTAs + long lists | 2 CTAs + grouped modules |
| About preview card in preview stack | Move to footer/about only |
| Mid-CTA inside how section | Remove duplicate; keep final CTA |

**Implementation files:** `lib/homepage-content.ts`, `app/page.tsx`, `app/globals.css` / homepage styles, `components/home-birthdate-entry.tsx`
