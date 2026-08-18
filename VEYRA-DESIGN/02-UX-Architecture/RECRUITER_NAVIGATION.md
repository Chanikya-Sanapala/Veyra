# VEYRA — Recruiter Navigation Architecture

## 1. Navigation Principles & Rules

> [!IMPORTANT]
> **Core Architectural Rule:** Resume Matching is NOT an isolated top-level navigation item.
> Resume matching is a core feature that belongs naturally embedded inside the recruiter hiring workflow:
> `Jobs → Job Details → Applications → Candidate Roster → Resume Match Score`.

---

## 2. Primary Navigation Structure

```
VEYRA Platform Logo

Primary Navigation:
  ├── Overview                (Recruiter Dashboard command center)
  ├── Jobs                    (Requisitions, job creator, active job listings)
  ├── Candidates              (Talent search, candidate pool, resume database)
  ├── Interviews              (AI interview orchestration, transcripts, results)
  ├── Shortlisted             (Shortlisted candidate pipeline)
  └── Analytics               (Hiring performance, application conversion metrics)

Secondary / Utility Navigation:
  ├── Settings                (Account, team permissions, notification preferences)
  └── Help                    (Documentation, support, system status)
```

---

## 3. Page & Route Hierarchy

| Primary Nav Item | Sub-pages / Views | Contextual Tools | Existing API Route |
| :--- | :--- | :--- | :--- |
| **Overview** | Recruiter Dashboard | KPI Cards, Growth Chart, Pipeline, Top Candidates | `/api/analytics`, `/api/jobs` |
| **Jobs** | All Requisitions, Post New Job, Job Details | Applicant count, Filter by active/closed | `/api/jobs` |
| **Candidates** | Candidate Directory, Candidate Profile View | Resume Match Score badge, Skill filter | `/api/profile/recruiter`, `/api/applications` |
| **Interviews** | Upcoming Sessions, Completed Interviews, Evaluation Report | Audio playback, Question generator | `/api/interviews` |
| **Shortlisted** | Shortlist Pipeline, Selected Talent | Stage movement actions | `/api/applications?status=Shortlisted` |
| **Analytics** | Application Trends, Score Distribution | Export reports, Time range filters | `/api/analytics` |

---

## 4. Contextual Navigation (Workflow Integration)

Resume matching is accessed contextually within candidate views:

```
[ Jobs Listing ]
      ↓
[ Select Job: "Senior Full Stack Engineer" ]
      ↓
[ Job Applicants Tab ]
      ↓
[ Applicant Row: Alex Morgan — 94% Match ]
      ↓
[ Open Candidate Intelligence Drawer / Modal ]
```

---

## 5. Mobile & Responsive Navigation Framework
- **Desktop:** Vertical left-hand sidebar menu with collapsed state toggle.
- **Mobile / Tablet:** Fixed bottom navigation bar featuring 4 primary icons (`Overview`, `Jobs`, `Candidates`, `Interviews`) plus a slide-out drawer ("More") containing `Shortlisted`, `Analytics`, `Settings`, and `Help`.
