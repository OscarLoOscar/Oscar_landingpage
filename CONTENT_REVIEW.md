# Landing page content review — 2026-11-06

## Content source and decisions

Primary source: the CV supplied by Oscar in this conversation. Employment,
education and performance claims are author-provided; this implementation does
not independently certify them.

- Cantonese is the primary reading language; technical names remain in English.
- Codex usage duration is omitted because the supplied CV says both four months
  and one year.
- Salary expectation and notice period are omitted from the public homepage.
- At Oscar’s request, the latest About content omits qualification dates; Asana Workflow Specialist
  retains its name without dates. WSET is omitted.
- Personal Codex/Grok workflows are separated from employer achievements.
- Product visuals are labelled functional flow diagrams, not screenshots.
- Prompt Atlas counts are omitted to avoid publishing a potentially stale count.
- Existing logistics curriculum, evidence caveats and downloadable practice pack
  are preserved. No new price, scarcity, testimonial or guarantee is introduced.

## Internal proof bank

These IDs are internal editorial references; they are not displayed on the page.

| ID | Claim or artifact | Source / boundary |
| --- | --- | --- |
| PB-01 | Approx. 60% → 85%+ unit test coverage | Supplied CV; key IBM modules, Apr–Aug 2025; self-reported |
| PB-02 | More than 10 hours/week saved | Supplied CV; Venturenix recruitment automation, Jun 2023–Mar 2025; self-reported |
| PB-03 | 40% administrative processing reduction | Supplied CV; Venturenix Job Opening System, same employment period; self-reported |
| PB-04 | Prompt Atlas | Existing public tool link; functional description from supplied CV |
| PB-05 | Gemini Notebook | Existing public tool link; functional description from supplied CV |
| PB-06 | Cashline | Existing GitHub link; teaching demonstration, not a customer outcome |
| PB-07 | 1,488 summaries / 286 adverts | Supplied CV; personal Codex-assisted research, not autonomous hiring or placement results |
| PB-08 | Logistics case material | Existing CorporateTraining.jsx; preserves simulated/real-case distinctions and limitations |

## Paragraph sequence

Hero + CTA → scoped outcomes → public projects → teaching problem + three-step
mechanism → curriculum + formats → professional experience → background → FAQ
→ Instagram contact CTA. Additional projects, qualifications and formats use native
disclosures so the main reading path remains short.

## Verification

- Node SSR regression test: unique headings/IDs, anchor targets, local images,
  content sequence, contact routes, evidence boundaries and six course panels.
- Production build to a temporary directory, leaving published docs untouched.
- Browser: 320, 390, 393, 402, 440, 768 and 1440px; no page horizontal overflow.
- All six tabs, arrow/Home/End keys, corporate deep links, image viewer paging,
  dismissal and focus restoration checked.
- CV assertions and external project functionality were not independently audited.

Contact uses Instagram only; email, phone and WhatsApp are omitted.

Release deployment uses the existing main branch /docs GitHub Pages source.
