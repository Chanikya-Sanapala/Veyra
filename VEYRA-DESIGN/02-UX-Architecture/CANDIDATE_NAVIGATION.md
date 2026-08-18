# VEYRA — Candidate Navigation Architecture

## 1. Navigation Principles & Rules

> [!IMPORTANT]
> **Core Architectural Rule:** Candidates understand job fit directly on job cards and recommendation feeds through match badges (`94% Match`). There is no separate, complex "Resume Matcher" navigation tab.

---

## 2. Primary Navigation Structure

```
VEYRA Platform Logo

Primary Navigation:
  ├── Overview                (Candidate Dashboard, active applications summary)
  ├── Jobs                    (Job search, category filters, saved positions)
  ├── Recommended             (AI-curated job feed based on candidate profile)
  ├── Applications            (Application tracking pipeline, status timeline)
  └── Interviews              (AI interview invitations, practice workouts)

Secondary / Profile Navigation:
  ├── My Profile              (Skills matrix, work history, education, projects)
  ├── My Resume               (Resume document manager, upload/replace parser)
  └── Settings                (Account preferences, privacy, notification toggles)
```

---

## 3. Page & Route Hierarchy

| Primary Nav Item | Sub-pages / Views | Contextual Tools | Existing API Route |
| :--- | :--- | :--- | :--- |
| **Overview** | Candidate Dashboard | Match Score highlights, Recent apps, Streaks | `/api/profile/jobseeker` |
| **Jobs** | Job Directory, Job Detail View | Search bar, Location filter, Match Badge | `/api/jobs` |
| **Recommended** | AI Job Feed | Match Score sorting (>80% fit), Skill Gap view | `/api/jobs` |
| **Applications** | Submitted Applications, Saved Jobs | Status timeline (`Applied` → `Hired`), Match score | `/api/applications` |
| **Interviews** | Pending Invitations, Interview Session, Workout History | Audio test, AI evaluation summary | `/api/interviews` |
| **My Profile** | Skill Inventory, Experience, Education, Projects | Profile completeness bar | `/api/profile/jobseeker` |
| **My Resume** | Document Manager, Parsing Preview | Upload PDF/DOCX, Extract preview | `/api/profile/upload-resume` |

---

## 4. Contextual Navigation (Workflow Integration)

Candidates access match intelligence seamlessly when browsing jobs:

```
[ Recommended Jobs Feed ]
      ↓
[ Job Card: "Senior Full Stack Engineer" — Badge: 94% Match ]
      ↓
[ Click "View Match Explanation" ]
      ↓
[ Slide-over Drawer: Strengths, Skill Gaps, AI Feedback ]
      ↓
[ Click "Apply Now" ]
```

---

## 5. Mobile & Responsive Navigation Framework
- **Desktop:** Clean horizontal top header bar with user profile dropdown on top-right.
- **Mobile / Tablet:** Fixed bottom navigation bar featuring 4 primary icons (`Overview`, `Jobs`, `Applications`, `Interviews`) plus an avatar menu for `My Profile`, `My Resume`, and `Settings`.
