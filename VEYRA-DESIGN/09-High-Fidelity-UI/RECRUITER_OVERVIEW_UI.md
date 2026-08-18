# VEYRA — Flagship Screen 01: Recruiter Overview UI Specification

> [!IMPORTANT]
> **Command Center Purpose:** Answers all key hiring questions in **5 to 10 seconds**: Candidate volume, monthly growth, pipeline progression, top candidate matches, and upcoming AI interviews.

---

## 1. Desktop Layout Structure (`1440px x 1024px`)

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  VEYRA  [ 🔍 Search candidates, jobs, skills... ]              [ 🔔 (3) ]  [ Sarah Jenkins (Recruiter) ]│
├───────────────┬────────────────────────────────────────────────────────────────────────────────────────┤
│ Overview  (*) │  WELCOME HEADER BANNER                                                                 │
│ Jobs          │  Good morning, Sarah Jenkins                                                           │
│ Candidates    │  Here is your recruitment overview for today.                     [ + Post New Job ]   │
│ Interviews    ├────────────────────────────────────────────────────────────────────────────────────────┤
│ Shortlisted   │  4 PRIMARY KPI METRIC CARDS                                                            │
│ Analytics     │  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐  │
│               │  │ TOTAL CANDIDATES │ │ APPLICATIONS/MO  │ │ SHORTLISTED      │ │ SELECTED/HIRED   │  │
│               │  │ 1,284            │ │ 438              │ │ 86               │ │ 24               │  │
│               │  │ ↑ 12.4% vs last  │ │ ↑ 18.2% vs last  │ │ ↑ 8.6% vs last   │ │ ↑ 14.3% vs last  │  │
│               │  └──────────────────┘ └──────────────────┘ └──────────────────┘ └──────────────────┘  │
│ Settings      ├────────────────────────────────────────────────────────────────────────────────────────┤
│ Help          │  APPLICATION GROWTH ANALYTICS                       [ Time Filter: 7D | 30D | 3M | 1Y ]│
│               │  [ Recharts Clean Area Chart: Applications, Shortlisted, Interviews, Hired ]           │
│               ├────────────────────────────────────────────────────────────────────────────────────────┤
│               │  CANDIDATE HIRING PIPELINE FUNNEL                                                      │
│               │  [ Applied: 438 ] ──► [ Shortlisted: 86 ] ──► [ Interview: 52 ] ──► [ Hired: 24 ]      │
│               ├──────────────────────────────────────────┬─────────────────────────────────────────────┤
│               │  APPLICATIONS BY JOB                     │  TOP CANDIDATES SPOTLIGHT                   │
│               │  - Sr Full Stack Eng  (184)  Avg: 91%    │  - Alex Morgan (Sr Full Stack Eng)          │
│               │  - Frontend Developer (142)  Avg: 87%    │    Match: [ 94% Match ] | Status: Interview │
│               │  - Backend Engineer   (126)  Avg: 89%    │    [ View Candidate Intelligence ]           │
│               ├──────────────────────────────────────────┴─────────────────────────────────────────────┤
│               │  UPCOMING AI INTERVIEWS TIMELINE                                                       │
│               │  - 10:30 AM  Alex Morgan (Sr Full Stack Eng)  — AI Technical Assessment               │
│               │  - 02:00 PM  Sarah Wilson (Backend Developer) — AI Behavioral Assessment              │
└───────────────┴────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. High-Fidelity Visual Specs for Screen 01

### A. Left Navigation Sidebar
- Width: `256px` fixed desktop sidebar.
- Surface: Deep Navy `#0F172A` with white `#FFFFFF` text.
- Active Item (`Overview`): `bg-primary-600` (`#2563EB`) with `4px` left border indicator.

### B. KPI Metric Cards
- Surface: `#FFFFFF`, Border: `1px solid #E2E8F0`, Radius: `8px`, Elevation: `shadow-sm`.
- Number Styling: `36px` Inter Bold (Tabular alignment `font-variant-numeric: tabular-nums`).
- Trend Pill: `#ECFDF5` fill with `#059669` green text and `↑` arrow icon.

### C. Application Growth Chart
- Powered by Recharts. Series lines: Primary Blue `#2563EB` (Applications), Emerald `#059669` (Shortlisted), Violet `#7C3AED` (Interviews).
- Minimalist horizontal grid lines (`#E2E8F0`), non-intrusive tooltip (`#0F172A`).

### D. Applications by Job & Top Candidates
- Applicant Roster Rows: `#FFFFFF` background, hover `#F8FAFC`, bottom border `#F1F5F9`.
- Match Score Badge: Pill shape `[ 94% Match ]` (`#EFF6FF` background, `#1E40AF` text).
- Status Badge: Rectangular tag `[ Interview ]` (`#EEF2FF` background, `#4F46E5` text). Distinct from score badge!
