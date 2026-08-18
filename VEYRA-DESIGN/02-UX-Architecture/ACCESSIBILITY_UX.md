# VEYRA — Accessibility (a11y) & Inclusive Design Architecture

> [!IMPORTANT]
> **Accessibility First Principle:** Accessibility is built into VEYRA's core UX architecture. All recruiter and candidate interfaces must comply with **WCAG 2.1 Level AA** standards.

---

## 1. Core Accessibility Standards

### A. Keyboard Navigation & Focus Management
- Every interactive element (buttons, cards, data tables, search inputs, modal triggers) must be fully navigable via Keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`, Arrow Keys).
- High-contrast, visible focus indicator outline (min 3px offset ring) on all focused elements.
- Logical tab order following DOM document layout.

### B. Screen Reader Compatibility & ARIA Specifications
- **Semantic HTML5:** Strict use of `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, `<article>`, and `<section>`.
- **Dynamic AI States:** `aria-live="polite"` regions for async AI parsing, match score calculations, and speech-to-text transcript updates.
- **Data Tables & Charts:** Accessible data tables equipped with `scope="col"`, `scope="row"`, and `aria-describedby` links explaining chart data points.
- **Match Score Badges:** Screen-reader accessible alternative text (e.g. `aria-label="Resume Match Score: 94 percent out of 100, Strong Match"`).

### C. Non-Color Dependent Status Indicators
- Statuses must never rely solely on color to convey meaning:
  - `High Match (>80%)`: Green badge **+ Checkmark Icon (✓) + Percentage text**.
  - `Moderate Match (60-79%)`: Amber badge **+ Info Icon (i) + Percentage text**.
  - `Low Match (<60%)`: Red badge **+ Warning Icon (△) + Percentage text**.

### D. Color Contrast Guidelines
- Standard Body Text: Minimum contrast ratio of **4.5:1** against background.
- Large Text & Headers (≥18pt or 14pt bold): Minimum contrast ratio of **3.0:1**.
- UI Controls & Focus Rings: Minimum contrast ratio of **3.0:1**.

### E. AI Interview Accessibility Options
- Dual response input options: Voice audio recording OR direct keyboard text entry for candidates with speech or hearing impairments.
- Transcripts available in visual text mode with customizable font size.
