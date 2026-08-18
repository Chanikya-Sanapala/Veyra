# VEYRA — Grid & Layout Primitives System

## 1. Responsive Grid Specifications

| Breakpoint Target | Screen Width | Grid Columns | Gutter Width | Screen Margins |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop (`lg` / `xl`)** | `≥1024px` | **12 Columns** | `24px` (`space-6`) | `32px` (`space-8`) |
| **Tablet (`md`)** | `768px - 1023px` | **8 Columns** | `20px` (`space-5`) | `24px` (`space-6`) |
| **Mobile (`sm`)** | `<768px` | **4 Columns** | `16px` (`space-4`) | `16px` (`space-4`) |

---

## 2. Reusable Layout Primitives

- **Container:** `max-w-7xl` (`1280px`) centered container with responsive side padding.
- **Section:** Vertical block wrapper with `py-8` (desktop) / `py-6` (mobile).
- **Sidebar-Main Layout:** Fixed `256px` left sidebar + flexible `1fr` main content area.
- **Split View:** 2-column layout (50/50 or 60/40) for Candidate Profile & Intelligence drawers.
- **Cluster:** Flex row wrapping tags, badges, and metadata inline.
