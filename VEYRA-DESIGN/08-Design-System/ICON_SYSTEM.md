# VEYRA — Iconography System Architecture

> [!IMPORTANT]
> **Primary Icon Library:** **`Lucide React`** (via `react-icons/lu` or `lucide-react`).
> Clean 2px stroke weight, geometric clarity, and extensive icon coverage for dashboard & candidate workflows.

---

## 1. Icon Size Scale
- `icon-xs`: `12px` — Inline status indicators
- `icon-sm`: `16px` — Button icons, input prefix icons, badge icons
- `icon-md`: `20px` — Primary navigation icons, card action icons
- `icon-lg`: `24px` — Metric card headers, feature section icons
- `icon-xl`: `32px` — Empty state illustrations, modal headers

---

## 2. Icon Usage Rules
- **Meaningful Support:** Icons must always support text labels; avoid standalone mystery meat icon buttons without accessible `aria-label` text.
- **Stroke Consistency:** Maintain `2px` stroke weight across all icon instances.
- **Color Matching:** Icons inherit text color (`currentColor`) or follow status color mapping.
