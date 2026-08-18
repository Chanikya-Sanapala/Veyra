# VEYRA — Mobile UX Architecture

> [!IMPORTANT]
> **Mobile-First UX Principle:** Mobile is not an afterthought. All candidate workflows (job discovery, application, match score review, AI interview workouts) and key recruiter actions (applicant review, match score inspection, candidate shortlisting) must deliver responsive, native-feeling experiences on smartphone and tablet screens.

---

## 1. Navigation Adaptation

### Recruiter Mobile Navigation
- **Desktop:** Vertical sidebar menu.
- **Mobile (<768px):** Fixed bottom navigation bar with 4 primary touch targets:
  - 🏠 **Overview** (Dashboard)
  - 💼 **Jobs** (Requisitions)
  - 👥 **Candidates** (Applicant Roster)
  - 🎙️ **Interviews** (AI Sessions)
  - ☰ **More** (Drawer containing Shortlisted, Analytics, Settings, Help).

### Candidate Mobile Navigation
- **Mobile (<768px):** Fixed bottom navigation bar:
  - 🏠 **Overview** (Dashboard)
  - 🔍 **Jobs** (Search & Filters)
  - 📄 **Applications** (Pipeline Tracker)
  - 🎙️ **Interviews** (Practice & Sessions)
  - 👤 **Profile** (My Profile & Resume)

---

## 2. Component Adaptations for Mobile Screens

### A. Recruiter Dashboard KPI Cards
- Stack vertically into 2x2 grid on tablet, or 1x1 full-width swipeable card stack on mobile screens.

### B. Growth Analytics & Charts
- Render responsive single-column charts with horizontal pan/scroll and simplified touch tooltips.

### C. Candidate Data Tables
- Convert complex desktop tables into touch-friendly **Candidate Cards**:
  ```
  ┌──────────────────────────────────────────────┐
  │ Alex Morgan                 94% MATCH BADGE  │
  │ Senior Full Stack Engineer                   │
  │ Status: Interview  • Applied: Today          │
  │ [ View Intelligence ]  [ Shortlist Candidate ]│
  └──────────────────────────────────────────────┘
  ```

### D. Resume Match Score Breakdown
- Multi-column score cards collapse into single-column vertical bar charts with expandable sub-score accordions.

### E. AI Interview Mobile Viewport
- Responsive camera/waveform viewport optimized for portrait orientation.
- Large touch-friendly microphone recording and text response toggles.
- Fixed sticky bottom controls: `[ Previous ]` | `[ Next Question ]`.
