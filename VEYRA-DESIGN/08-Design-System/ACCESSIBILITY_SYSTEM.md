# VEYRA — Accessibility System Architecture

> [!IMPORTANT]
> Target Compliance: **WCAG 2.1 Level AA**.

---

## 1. Contrast Ratios & Visual Accessibility Benchmark
- Normal Text (<18pt): **4.5:1 minimum contrast ratio** against surface background.
- Large Text (≥18pt or 14pt bold): **3.0:1 minimum contrast ratio**.
- UI Icons & Focus Indicators: **3.0:1 minimum contrast ratio**.

---

## 2. Keyboard & Screen Reader Accessibility
- Focus Indicator: `outline-2 outline-offset-2 outline-primary-600` on all focused controls.
- Screen Reader Live Updates: `aria-live="polite"` for background resume parsing and score calculation updates.
- Touch Target Minimum Size: `44px x 44px` touch target areas on mobile devices.
