# VEYRA — Spacing System Architecture

> [!IMPORTANT]
> Based on a strict **4px Base System** (`rem` units calculated from 16px base font size).

---

## 1. Spacing Tokens Scale

- `space-1`:  `4px`  (`0.25rem`) — Micro spacing, tight icon gap
- `space-2`:  `8px`  (`0.5rem`)  — Inline component gap, badge padding
- `space-3`:  `12px` (`0.75rem`) — Button vertical padding, dense table cell
- `space-4`:  `16px` (`1rem`)    — Standard card padding, input padding
- `space-5`:  `20px` (`1.25rem`) — Stack gap, card internal sectioning
- `space-6`:  `24px` (`1.5rem`)  — Standard container padding, modal padding
- `space-8`:  `32px` (`2rem`)    — Dashboard section gap, grid column gap
- `space-10`: `40px` (`2.5rem`)  — Major page section gap
- `space-12`: `48px` (`3rem`)    — Hero section vertical padding
- `space-16`: `64px` (`4rem`)    — Landing page major block padding
- `space-20`: `80px` (`5rem`)    — Large section separation
- `space-24`: `96px` (`6rem`)    — Page boundary margin

---

## 2. Component Application Rules
- **Buttons:** Height `40px` (Medium) with `space-4` (`16px`) horizontal padding.
- **Card Content:** Padding `space-6` (`24px`).
- **Dashboard Grid Gaps:** `space-6` (`24px`) on desktop, `space-4` (`16px`) on mobile.
