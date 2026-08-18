# VEYRA — Master Design System Specification

> [!IMPORTANT]
> **Stage 04 — Design System & Visual Language**
> This master document defines VEYRA's visual language, token architecture, component specifications, and design transformation rules from legacy CHANIX into a modern, light-first **AI-powered Talent Intelligence Platform**.

---

## 1. Visual Identity Transformation Matrix

| Design Dimension | Legacy CHANIX Visual Identity | New VEYRA Design System |
| :--- | :--- | :--- |
| **Theme / Scheme** | Dark, high-contrast supercar theme | **Light-first, calm, professional enterprise UI** |
| **Primary Color** | Saturated neon blue & glowing accents | **Deep Navy Blue (`#0F172A`, `#1E40AF`) & Slate** |
| **Typography** | Generic browser defaults & high-contrast headings | **Inter font family** (optimized legibility & tabular numbers) |
| **Surfaces & Cards** | Dark glassmorphism, heavy blur, neon glow | **Clean white (`#FFFFFF`) & Slate-50 (`#F8FAFC`) with subtle borders** |
| **Borders & Elevation** | Glowing 3D edges, heavy drop-shadows | **Restrained borders (`#E2E8F0`) & minimal elevation (`shadow-sm`)** |
| **AI Language** | Neon sparkles & gaming effects | **Subtle intelligence indicators, score rings & explainable badges** |
| **Layout Density** | Loose, dramatic spacing | **Structured grid system with 4px base spacing scale** |

---

## 2. Core Design System Principles

1. **AI Evaluates. Humans Decide:** Visual hierarchy highlights human decision controls (`[ Shortlist ]`, `[ Hire ]`, `[ Override ]`) while rendering AI insights as clear, explainable decision-support signals.
2. **Explainable Intelligence First:** Match scores display breakdown bars (Skills, Experience, Projects, Education) rather than isolated circular numbers.
3. **Light-First Elegance:** White and slate surfaces create high readability, reducing cognitive fatigue for recruiters scanning hundreds of profiles.
4. **Restrained & Purposeful Motion:** Micro-interactions run at 150-250ms with zero scroll-hijacking or heavy background canvas scripts.
5. **Accessibility by Default:** All contrast ratios target **WCAG 2.1 AA** compliance. Color is never used as the sole indicator of application status.

---

## 3. Design System Document Index

- [`BRAND_GUIDELINES.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/BRAND_GUIDELINES.md) — Brand identity, promise, logo direction, voice & tone.
- [`COLOR_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/COLOR_SYSTEM.md) — Primitive scales, semantic tokens, dark/light contrast rules.
- [`TYPOGRAPHY_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/TYPOGRAPHY_SYSTEM.md) — Inter font hierarchy, type scale, responsive sizes.
- [`SPACING_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/SPACING_SYSTEM.md) — 4px base spacing scale, container padding, card gutters.
- [`GRID_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/GRID_SYSTEM.md) — 12-column desktop / 8-column tablet / 4-column mobile grids.
- [`LAYOUT_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/LAYOUT_SYSTEM.md) — Layout primitives (Container, Stack, Split, Sidebar).
- [`RADIUS_AND_ELEVATION.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/RADIUS_AND_ELEVATION.md) — Restrained border radius scale & minimal shadow levels.
- [`ICON_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/ICON_SYSTEM.md) — Lucide React icon sizing, stroke rules, semantic usage.
- [`BUTTON_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/BUTTON_SYSTEM.md) — Button variants (Primary, Secondary, Ghost, Destructive) & state specs.
- [`FORM_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/FORM_SYSTEM.md) — Inputs, textareas, selects, resume file dropzone specs.
- [`CARD_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/CARD_SYSTEM.md) — Base, Metric, Candidate, Job, and Insight card specs.
- [`BADGE_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/BADGE_SYSTEM.md) — Match Score vs Application Status visual distinction rules.
- [`NAVIGATION_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/NAVIGATION_SYSTEM.md) — Recruiter sidebar, Candidate topbar, Mobile bottom nav bar.
- [`TABLE_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/TABLE_SYSTEM.md) — Recruiter candidate data tables & mobile card transformations.
- [`DATA_VISUALIZATION.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/DATA_VISUALIZATION.md) — Recharts theme tokens, accessible charts, pipeline funnel bars.
- [`MATCH_SCORE_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/MATCH_SCORE_SYSTEM.md) — Visual specs for `94% Match`, sub-scores, strengths & gaps.
- [`AI_COMPONENT_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/AI_COMPONENT_SYSTEM.md) — Visual styling for AI Insights, summaries, and recommendation boxes.
- [`INTERVIEW_COMPONENT_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/INTERVIEW_COMPONENT_SYSTEM.md) — Question cards, audio visualizers, session timers, transcript lists.
- [`FEEDBACK_STATES.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/FEEDBACK_STATES.md) — Toast alerts, empty states, skeleton loaders, inline errors.
- [`MOTION_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/MOTION_SYSTEM.md) — Framer Motion transition curves, timing tokens, reduced-motion rules.
- [`ACCESSIBILITY_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/ACCESSIBILITY_SYSTEM.md) — WCAG 2.1 AA focus rings, contrast benchmarks, screen reader ARIA specs.
- [`RESPONSIVE_SYSTEM.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/RESPONSIVE_SYSTEM.md) — Breakpoint specifications (`sm`, `md`, `lg`, `xl`, `2xl`).
- [`DESIGN_TOKENS.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/DESIGN_TOKENS.md) — 3-tier token system (Primitive → Semantic → Component).
- [`FIGMA_STRUCTURE.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/FIGMA_STRUCTURE.md) — 17-page Figma library organization blueprint.
- [`IMPLEMENTATION_MAPPING.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/IMPLEMENTATION_MAPPING.md) — CSS Variables & Tailwind v4 utility mapping rules.
- [`PERFORMANCE_DESIGN_GUIDELINES.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/08-Design-System/PERFORMANCE_DESIGN_GUIDELINES.md) — Lighthouse performance targets (90+), asset optimization guidelines.
