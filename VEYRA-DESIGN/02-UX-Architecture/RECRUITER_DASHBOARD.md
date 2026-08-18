# VEYRA — Recruiter Dashboard Architecture

> [!IMPORTANT]
> **5-to-10 Second Evaluation Requirement:** The Recruiter Dashboard must provide immediate visual clarity on hiring activity, candidate volume, pipeline progression, and upcoming AI interviews within 5 to 10 seconds of landing on the page.

---

## 1. Primary KPI Cards Architecture

The top section features 4 high-impact metric cards:

```
┌───────────────────────────┐ ┌───────────────────────────┐ ┌───────────────────────────┐ ┌───────────────────────────┐
│ Total Candidates          │ │ Applications This Month   │ │ Shortlisted Candidates    │ │ Selected Candidates       │
│ 1,284                     │ │ 438                       │ │ 86                        │ │ 24                        │
│ ↑ 12.4% vs last month     │ │ ↑ 18.2% vs last month     │ │ ↑ 8.6% vs last month      │ │ ↑ 14.3% vs last month     │
└───────────────────────────┘ └───────────────────────────┘ └───────────────────────────┘ └───────────────────────────┘
```

- **Card 1: Total Candidates / Applicants:** Cumulative count of candidates across all requisitions with month-over-month growth percentage.
- **Card 2: Applications This Month:** Total application submissions logged in current 30-day window.
- **Card 3: Shortlisted Candidates:** Count of candidates with status `Shortlisted`.
- **Card 4: Selected Candidates:** Count of candidates with status `Offer` or `Hired` *(mapped to `Application` model status enum)*.

---

## 2. Growth Analytics Architecture

Interactive application volume and hiring trends visualizer:
- **Metrics Tracked:** Applications Received, Candidates Interviewed, Shortlisted Candidates, Selected/Hired Candidates.
- **Time Controls:** `7 Days` | `30 Days` | `3 Months` | `6 Months` | `1 Year`.
- **UX Requirement:** Multi-series trend chart allowing recruiters to toggle datasets and identify velocity bottlenecks over time.

---

## 3. Candidate Hiring Pipeline Section

Visual progression bar mapping active candidates across hiring stages:

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   Applied    │ → │  Screening   │ → │   Matched    │ → │  Interview   │ → │ Shortlisted  │ → │Hired/Selected│
│  438 Total   │   │  180 Active  │   │  140 High Fit│   │  52 Pending  │   │  86 Cleared  │   │  24 Placed   │
└──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
```

*Note on Status Model Mapping:* Matches `backend/src/models/Application.js` enum (`['Applied', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected']`). `Screening` and `Matched` function as UX stage filters based on Resume Match Score thresholds (>80%).

---

## 4. Applications by Job Section

Table displaying top-performing job requisitions:

| Job Title | Application Count | Growth Trend | Requisition Status | Avg Match Score |
| :--- | :--- | :--- | :--- | :--- |
| **Senior Full Stack Engineer** | 184 applicants | ↑ 24% | `Active` | **91% Match** |
| **Frontend Developer** | 142 applicants | ↑ 15% | `Active` | **87% Match** |
| **Backend Engineer** | 126 applicants | ↑ 8% | `Active` | **89% Match** |
| **AI/ML Engineer** | 98 applicants | ↑ 32% | `Active` | **93% Match** |

---

## 5. Recent Applications Roster

Live feed of incoming job applications highlighting match scores:

| Candidate Name | Applied Role | Resume Match Score | Application Date | Status Badge | Quick Actions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Alex Morgan** | Sr Full Stack Engineer | **94% Match** | Today, 10:14 AM | `Interview` | [View Profile] |
| **Sarah Wilson** | Backend Developer | **91% Match** | Today, 09:30 AM | `Shortlisted` | [View Profile] |
| **John Mathews** | Frontend Developer | **88% Match** | Yesterday | `Applied` | [View Profile] |

---

## 6. Top Candidates Spotlight Section

Surfaces top-matching candidates calculated across multiple signals:
- Candidate Name & Target Requisition.
- Composite Score Badge: **Resume Match Score (94%)** + **AI Interview Score (91%)**.
- Quality Indicator: `Strong Match` / `Top Tier Candidate`.
- Direct CTA: `[ View Candidate Intelligence ]`.

---

## 7. Upcoming AI Interviews Schedule Widget

Displays real-time schedule of preliminary AI interview sessions:
- **10:30 AM** — Alex Morgan (Sr Full Stack Engineer) — *AI Technical Assessment*
- **02:00 PM** — Sarah Wilson (Backend Developer) — *AI Behavioral Assessment*

---

## 8. Hiring Performance Metrics

Key recruitment efficiency indicators:
- **Average Time to Hire:** 14 Days *(Historical average)* `[REQUIRES FUTURE BACKEND SUPPORT]`.
- **Average Resume Match Score:** 88.4%.
- **Interview-to-Shortlist Conversion Rate:** 64% `[REQUIRES FUTURE BACKEND SUPPORT]`.
- **Shortlist-to-Selection Rate:** 28% `[REQUIRES FUTURE BACKEND SUPPORT]`.

---

## 9. Dashboard UX States
- **Loading State:** Skeleton blocks for KPI cards, animated pulse bars for charts.
- **Empty State:** "No active candidates or jobs found. Create your first job posting."
- **Error State:** "Failed to refresh dashboard analytics. [ Retry ]"
