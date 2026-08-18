# VEYRA — Master Information Architecture Specification

> [!IMPORTANT]
> **Stage 03 — Information Architecture & System Topology**
> This document defines the comprehensive information structure for VEYRA, organizing three primary digital environments: **Public Marketing Website**, **Recruiter Application**, and **Candidate Application**.
> All structures conform strictly to existing CHANIX backend schemas (e.g. `Application.js` status enum: `['Applied', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected']`).

---

## 1. System Environments Topology

VEYRA partitions system functionality into 3 distinct information environments:

```
                               ┌──────────────────────────────────────────────┐
                               │                    VEYRA                     │
                               │         Talent Intelligence Ecosystem        │
                               └──────────────────────┬───────────────────────┘
                                                      │
         ┌────────────────────────────────────────────┼────────────────────────────────────────────┐
         │                                            │                                            │
         ▼                                            ▼                                            ▼
┌──────────────────────────────┐            ┌──────────────────────────────┐            ┌──────────────────────────────┐
│       1. PUBLIC WEBSITE      │            │   2. RECRUITER APPLICATION   │            │   3. CANDIDATE APPLICATION   │
├──────────────────────────────┤            ├──────────────────────────────┤            ├──────────────────────────────┤
│ Product Showcase, Features,  │            │ Workspace Dashboard, Jobs,   │            │ Candidate Portal, Recommended│
│ For Recruiters, For Job      │            │ Candidates, AI Interviews,   │            │ Jobs, Applications, Profile, │
│ Seekers, Auth Entry Points   │            │ Pipeline & Hiring Analytics  │            │ AI Practice & Resume Manager │
└──────────────────────────────┘            └──────────────────────────────┘            └──────────────────────────────┘
```

---

## 2. Core Information Architecture Principles

1. **Backend Schema Preservation:** Information structures mirror MongoDB schemas (`User`, `JobSeekerProfile`, `RecruiterProfile`, `Job`, `Application`, `Interview`).
2. **Match Score as Signal (Not Status):** Resume Match Score (`94% Match`) is treated as a reusable candidate intelligence metric attached to profiles and applications, NEVER as an application database status.
3. **Official Application Database Statuses:**
   - `Applied` (Initial submission)
   - `Shortlisted` (Passed recruiter review)
   - `Interview` (AI/Human interview stage)
   - `Offer` (Job offer extended)
   - `Hired` (Candidate selected and onboarded)
   - `Rejected` (Terminal decision state)
4. **"AI Evaluates. Humans Decide":** AI evaluation metrics populate candidate intelligence views, but final stage transitions require explicit recruiter action.

---

## 3. Environment Summary Matrix

| Environment | Primary Users | Key Information Objects | Primary Actions |
| :--- | :--- | :--- | :--- |
| **Public Website** | Visitors, Prospects | Product Features, Enterprise Value, Public Jobs | Learn about VEYRA, Register, Sign In |
| **Recruiter Application** | Talent Acquisition | Requisitions, Candidates, Match Scores, AI Interviews | Post jobs, Review matches, Shortlist, Hire |
| **Candidate Application** | Job Seekers | Profile, Resume, Recommended Jobs, Applications | Build profile, Upload resume, Apply, Interview |

---

## 4. Current vs Future Capability Classification Legend
Throughout all Stage 03 documentation, features are explicitly classified as:
- **`[EXISTING]`**: Currently functional in the CHANIX backend codebase.
- **`[REDESIGN]`**: Existing backend feature receiving upgraded UI/UX architecture.
- **`[NEW BUT SUPPORTED]`**: New UI capability supported by existing schema fields.
- **`[FUTURE / REQUIRES BACKEND]`**: Requires future database schema or API endpoint expansion.
- **`[FUTURE / REQUIRES PRODUCT DECISION]`**: Pending strategic business/product decision.
