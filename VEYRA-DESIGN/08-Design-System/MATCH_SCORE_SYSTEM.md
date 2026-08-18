# VEYRA — Match Score Visual Component System

> [!IMPORTANT]
> **Core Visual Element:** Defines the visual representations for Resume Match Score (`94% Match`) across score rings, breakdown bars, verified strengths, and skill gap cards.

---

## 1. Match Score Representation Component Types

### Type A: Compact Match Pill Badge
- Dimensions: Height `24px`, Border Radius `9999px`.
- Fill: `#EFF6FF`, Border: `#BFDBFE`, Text: `#1E40AF` (Bold 12px).
- Output: `[ 94% Match ]`.

### Type B: Score Ring Component
- SVG circular ring gauge with stroke-dasharray animation (250ms).
- Primary ring color `#2563EB`, background ring `#E2E8F0`. Center text `94%`.

### Type C: Multi-Factor Breakdown Bars Component
```
Skills Alignment     ████████████████████░░  96%  (#2563EB)
Experience Depth     ██████████████████░░░░  91%  (#059669)
Project Relevance    ███████████████████░░░  94%  (#2563EB)
Education Relevance  █████████████████░░░░░  88%  (#7C3AED)
```

---

## 2. Strengths & Skill Gap Visual Cards
- **Verified Strengths Card:** Background `#ECFDF5`, Border `#A7F3D0`, Icon `✓` Green.
- **Skill Gaps Card:** Background `#FFFBEB`, Border `#FDE68A`, Icon `△` Amber.
