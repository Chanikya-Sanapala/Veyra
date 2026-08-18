# VEYRA — Radius, Border & Elevation System

> [!IMPORTANT]
> VEYRA avoids overly rounded components or heavy 3D drop shadows. Clean borders and subtle elevation levels maintain a professional, high-density interface.

---

## 1. Border Radius Scale
- `radius-none`: `0px` — Full-bleed dividers & tables.
- `radius-sm`:   `4px` — Badges, small tags, inline code snippets.
- `radius-md`:   `6px` — Form inputs, select menus, small buttons.
- `radius-lg`:   `8px` — Standard cards, modals, dropdown panels.
- `radius-xl`:   `12px` — Featured hero cards & composite drawers.
- `radius-full`: `9999px` — Circular avatars & pill badges.

---

## 2. Elevation & Shadow Levels
- `shadow-none`: `0 0 #0000` — Flat surface default.
- `shadow-sm`:   `0 1px 2px 0 rgba(15, 23, 42, 0.05)` — Subtle card elevation.
- `shadow-md`:   `0 4px 6px -1px rgba(15, 23, 42, 0.08)` — Dropdowns & tooltips.
- `shadow-lg`:   `0 10px 15px -3px rgba(15, 23, 42, 0.10)` — Modals & drawers.

---

## 3. Border Rules
- **Default Surface Border:** `1px solid var(--neutral-200)` (`#E2E8F0`).
- **Focus Ring Border:** `2px solid var(--primary-600)` with `2px` offset outline.
