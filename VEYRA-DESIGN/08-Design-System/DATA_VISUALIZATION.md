# VEYRA — Data Visualization System Architecture

> [!IMPORTANT]
> Built for integration with **Recharts** (`recharts` dependency).
> Charts use clean palette colors with high contrast, legible axis labels, and custom tooltips.

---

## 1. Recharts Semantic Theme Tokens
- `chart-series-1`: `#2563EB` (Primary VEYRA Blue)
- `chart-series-2`: `#059669` (Emerald Success)
- `chart-series-3`: `#D97706` (Amber Warning)
- `chart-series-4`: `#7C3AED` (Violet Accent)
- `chart-grid-line`: `#E2E8F0` (Light Slate Grid)
- `chart-tooltip-bg`: `#0F172A` (Navy Tooltip Body)

---

## 2. Pipeline Funnel Progress Bar Component
Visual horizontal progression bar:

```
[ Applied: 438 ] ───► [ Shortlisted: 86 ] ───► [ Interview: 52 ] ───► [ Hired: 24 ]
  ██████████████████████████████████████████████████████████████████████████
```
