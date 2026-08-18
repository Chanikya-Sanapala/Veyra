# VEYRA — Mobile Information Architecture

This document specifies the responsive menu hierarchy, drawer relationships, and screen adaptations for mobile and tablet viewports.

---

## 1. Recruiter Mobile Architecture (<768px Viewport)

```
PRIMARY MOBILE BOTTOM NAV BAR:
  ├── [1] Overview            -> /dashboard/overview
  ├── [2] Jobs                -> /dashboard/jobs
  ├── [3] Candidates          -> /dashboard/candidates
  └── [4] Interviews          -> /dashboard/interviews

MOBILE "MORE" DRAWER (SLIDE-OVER MENU):
  ├── Shortlisted Candidates  -> /dashboard/shortlisted
  ├── Hiring Analytics        -> /dashboard/analytics
  ├── Recruiter Settings      -> /dashboard/settings
  └── Help & Support          -> /dashboard/help
```

---

## 2. Candidate Mobile Architecture (<768px Viewport)

```
PRIMARY MOBILE BOTTOM NAV BAR:
  ├── [1] Overview            -> /candidate/overview
  ├── [2] Jobs                -> /candidate/jobs
  ├── [3] Applications        -> /candidate/applications
  └── [4] Interviews          -> /candidate/interviews

MOBILE "PROFILE & MORE" MENU:
  ├── Recommended Jobs        -> /candidate/recommended
  ├── My Profile              -> /candidate/profile
  ├── My Resume               -> /candidate/resume
  └── Account Settings        -> /candidate/settings
```

---

## 3. Screen Structure Adaptations
- **Data Tables:** Converted into single-column touch-friendly candidate cards.
- **Match Score Drawers:** Full-width slide-up modal sheets on mobile viewports.
- **AI Interview Viewport:** Vertical single-column camera/waveform layout with sticky bottom controls (`[ Record ]` | `[ Next Question ]`).
