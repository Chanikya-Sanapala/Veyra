# VEYRA — Navigation Component System Architecture

## 1. Recruiter Left Sidebar Navigation Component
- Width: `256px` fixed desktop sidebar.
- Surface: `#0F172A` (Navy/Slate) or `#FFFFFF` (Light mode toggle supported).
- Items: `Overview`, `Jobs`, `Candidates`, `Interviews`, `Shortlisted`, `Analytics`.
- Active Item Indicator: `border-l-4 border-primary-600 bg-primary-50 text-primary-700`.

---

## 2. Candidate Topbar Navigation Component
- Height: `64px` fixed header bar.
- Surface: `white` (`#FFFFFF`) with bottom border `1px solid #E2E8F0`.
- Items: `Overview`, `Jobs`, `Recommended`, `Applications`, `Interviews`. Right profile menu dropdown.

---

## 3. Mobile Bottom Navigation Component (<768px Viewport)
- Height: `64px` fixed bottom bar.
- Touch target: Min `44px x 44px`.
- Items: 4 primary navigation icons + label text (`xs`).
