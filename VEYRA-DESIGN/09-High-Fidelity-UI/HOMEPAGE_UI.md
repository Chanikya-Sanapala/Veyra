# VEYRA — Flagship Screen 03: Public Homepage UI Specification

> [!IMPORTANT]
> **Product-First Marketing Experience:** Uses real VEYRA product interfaces as the hero visual—zero generic stock photos, robot illustrations, or sci-fi 3D scenes.

---

## 1. High-Fidelity Layout Structure (`1440px Canvas`)

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  VEYRA    Product ▾   Solutions ▾   For Recruiters   For Candidates   Jobs      [ Sign In ] [ Get Started ]│
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  HERO SECTION                                                                                          │
│  Headline: "See potential. Hire with confidence."                                                       │
│  Subtitle: "VEYRA provides an explainable intelligence layer for modern recruitment—matching resumes, │
│            conducting structured AI interviews, and empowering teams to hire with confidence."         │
│                                                                                                        │
│  [ Get Started ] (Primary Blue CTA)           [ Explore VEYRA ] (Secondary Ghost CTA)                  │
│                                                                                                        │
│  HERO PRODUCT PREVIEW CARD (Real Product UI Mockup)                                                    │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Alex Morgan — Sr Full Stack Engineer                          94% MATCH [ STRONG MATCH ]         │  │
│  │ Skills: 96%  •  Experience: 91%  •  Projects: 94%  •  AI Interview: 91% Passed                    │  │
│  └──────────────────────────────────────────────────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  ENTERPRISE TRUST METRICS                                                                              │
│  - 50% Reduction in Time-to-Hire  •  100k+ Matched Candidates  •  94% Average Match Precision          │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  PROBLEM vs VEYRA SOLUTION                                                                             │
│  "Hiring shouldn't depend on keyword guesswork."                                                       │
│  - 01. Resume Intelligence (Automated parsing & skill extraction)                                      │
│  - 02. Multi-Factor Matching (Skills, Experience, Projects, Education)                                 │
│  - 03. AI Interviews (Structured, bias-free candidate evaluation)                                      │
│  - 04. Candidate Intelligence (Unified composite decision support)                                     │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  RESPONSIBLE AI COMMITMENT STATEMENT                                                                   │
│  "AI evaluates. Humans decide."                                                                        │
│  VEYRA provides evidence and transparent insights, leaving ultimate hiring decisions with recruiters.  │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  FINAL CONVERSION SECTION                                                                              │
│  "Build a better hiring process today."                                  [ Start Free Trial ]           │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  FOOTER                                                                                                │
│  Product, Solutions, Recruiters, Candidates, Jobs, Company, Privacy Policy, Terms, © 2026 VEYRA.       │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Specs for Screen 03

### A. Navigation Header
- Height: `64px` fixed header with backdrop blur filter (`backdrop-blur-md bg-white/90`).
- Logo: VEYRA geometric wordmark in Navy `#0F172A`.
- CTA: Primary Blue button `[ Get Started ]` (`#2563EB`).

### B. Hero Visual Mockup
- Embedded product card showcasing real VEYRA Candidate Intelligence metrics (`94% Match`, `91% Passed`).
- Border `1px solid #E2E8F0`, Elevation `shadow-xl`, Radius `12px`.

### C. Responsible AI Section
- Background: Slate-50 `#F8FAFC` with subtle left border indicator `#2563EB`.
- Text: `#0F172A` H2 heading + `#475569` body text explaining human agency.
