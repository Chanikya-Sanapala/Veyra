# VEYRA — Master Wireframes & Screen Architecture Specification

> [!IMPORTANT]
> **Stage 05 — Wireframes Specification**
> This document transforms VEYRA's Product Foundation, UX Architecture, Information Architecture, and Design System into low-to-mid fidelity structural wireframe layouts.
> All wireframe layouts respect existing CHANIX backend schemas (such as `Application.js` status enum: `['Applied', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected']`) while establishing clear visual hierarchy, component positioning, content density, responsive adaptations, and screen states.

---

## 1. Master Screen Priority Index (20 Primary Screens)

```
                       ┌────────────────────────────────────────────────────────┐
                       │               VEYRA WIREFRAME TOPOLOGY                 │
                       └───────────────────────────┬────────────────────────────┘
                                                   │
         ┌─────────────────────────────────────────┼─────────────────────────────────────────┐
         │                                         │                                         │
         ▼                                         ▼                                         ▼
┌──────────────────────────────┐        ┌──────────────────────────────┐        ┌──────────────────────────────┐
│   RECRUITER SCREENS (1-9)    │        │   CANDIDATE SCREENS (10-15)  │        │   MARKETING SCREENS (16-20)  │
├──────────────────────────────┤        ├──────────────────────────────┤        ├──────────────────────────────┤
│ 01. Recruiter Overview       │        │ 10. AI Interview (Candidate) │        │ 16. Public Homepage          │
│ 02. Candidate Overview (Dual)│        │ 11. Candidate Jobs           │        │ 17. Product: AI Interviews   │
│ 03. Recruiter Jobs           │        │ 12. Candidate Job Details    │        │ 18. Product: Talent Matching │
│ 04. Recruiter Job Details    │        │ 13. Candidate Applications   │        │ 19. Product: Candidate Intell│
│ 05. Recruiter Applications   │        │ 14. Candidate Profile        │        │ 20. Public Jobs              │
│ 06. Recruiter Candidate Prof │        │ 15. Candidate Resume Manager │        └──────────────────────────────┘
│ 07. Resume Match Analysis    │        └──────────────────────────────┘
│ 08. Candidate Intelligence   │
│ 09. Recruiter Interviews     │
└──────────────────────────────┘
```

---

## 2. Wireframe System Rules & Constraints
1. **Low-to-Mid Fidelity Focus:** Layouts use clean ASCII box diagrams, text hierarchy, component placeholders, table schemas, and clear CTAs without high-fidelity gradients or decorative assets.
2. **Strict DB Schema Compliance:** Application statuses follow the official database enum: `Applied`, `Shortlisted`, `Interview`, `Offer`, `Hired`, `Rejected`. Resume Match Score (`94% Match`) is rendered as an intelligence badge.
3. **Responsive Blueprinting:** Every screen defines Desktop (`1280px+`), Tablet (`768px-1023px`), and Mobile (`<768px`) layout transformations.

---

## 3. Wireframe Document Catalog

- [`SCREEN_INVENTORY.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/06-Wireframes/SCREEN_INVENTORY.md) — 20-screen master inventory with goals, primary CTAs, and routes.
- [`RECRUITER_WIREFRAMES.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/06-Wireframes/RECRUITER_WIREFRAMES.md) — Detailed wireframes for Screens 01, 03, 04, 05, 06, 09.
- [`CANDIDATE_WIREFRAMES.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/06-Wireframes/CANDIDATE_WIREFRAMES.md) — Detailed wireframes for Screens 02, 10, 11, 12, 13, 14, 15.
- [`MARKETING_WIREFRAMES.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/06-Wireframes/MARKETING_WIREFRAMES.md) — Detailed wireframes for Screens 16, 17, 18, 19, 20.
- [`JOB_WIREFRAMES.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/06-Wireframes/JOB_WIREFRAMES.md) — Wireframe specs for Job listings, Job details tabs, and creation modals.
- [`APPLICATION_WIREFRAMES.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/06-Wireframes/APPLICATION_WIREFRAMES.md) — Application tables, pipeline funnel bars, and application status update drawers.
- [`MATCH_SCORE_WIREFRAMES.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/06-Wireframes/MATCH_SCORE_WIREFRAMES.md) — Wireframe layout for Screen 07 (Resume Match Analysis, score ring, breakdown bars, strengths & gaps).
- [`CANDIDATE_INTELLIGENCE_WIREFRAMES.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/06-Wireframes/CANDIDATE_INTELLIGENCE_WIREFRAMES.md) — Wireframe layout for Screen 08 (Candidate Intelligence composite drawer & human decision bar).
- [`INTERVIEW_WIREFRAMES.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/06-Wireframes/INTERVIEW_WIREFRAMES.md) — Wireframe layout for 3-phase Candidate AI Interview (Screen 10) & Recruiter Interview Hub (Screen 09).
- [`RESPONSIVE_WIREFRAMES.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/06-Wireframes/RESPONSIVE_WIREFRAMES.md) — Desktop vs Tablet vs Mobile structural breakdown rules.
- [`WIREFRAME_STATES.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/06-Wireframes/WIREFRAME_STATES.md) — Wireframe layout behaviors for Loading, Empty, Error, Processing, and AI calculation states.
- [`COMPONENT_INVENTORY.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/06-Wireframes/COMPONENT_INVENTORY.md) — Reusable UI component catalog required across all 20 screens.
- [`CONTENT_HIERARCHY.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/06-Wireframes/CONTENT_HIERARCHY.md) — Primary, secondary, supporting text rules & CTA positioning.
- [`FIGMA_WIREFRAME_GUIDE.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/06-Wireframes/FIGMA_WIREFRAME_GUIDE.md) — Step-by-step guide for recreating wireframes in Figma using Auto Layout & Frames.
