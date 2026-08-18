# VEYRA — Search, Filter & Sort Architecture

This document defines the query controls and sorting logic for jobs, applicants, and candidate talent pools.

---

## 1. Candidate Job Search Architecture (`/candidate/jobs`)

```
SEARCH INPUT: [ Keyword: "Full Stack Developer", "React", "Python" ]

FILTER CONTROLS:
  ├── Match Score Threshold   [ >90% Match | >80% Match | >70% Match | All ]
  ├── Job Location            [ Remote | On-site | Hybrid | City Name ]
  ├── Job Type                [ Full-time | Part-time | Contract ]
  └── Salary Range            [ Min Salary Slider / Inputs ]

SORT OPTIONS:
  ├── Highest Match Score (Default for Candidate)
  ├── Most Recent (Posted Date)
  └── Highest Salary
```

---

## 2. Recruiter Applicant Pool Search Architecture (`/dashboard/jobs/:id`)

```
SEARCH INPUT: [ Candidate Name, Skill Keyword: "Node.js", "MongoDB" ]

FILTER CONTROLS:
  ├── Application Status      [ Applied | Shortlisted | Interview | Offer | Hired | Rejected ]
  ├── Resume Match Score      [ Top Tier (>90%) | High Fit (80-90%) | Moderate Fit (<80%) ]
  └── AI Interview Status     [ Completed | Pending | Not Scheduled ]

SORT OPTIONS:
  ├── Highest Resume Match Score (Default for Recruiter)
  ├── AI Interview Score
  └── Application Date (Newest to Oldest)
```

---

## 3. Supported vs Future Filter Classification

- `Job Title Keyword Search`: **`[EXISTING]`** (`Job.js` regex query)
- `Application Status Filter`: **`[EXISTING]`** (`Application.js` enum filter)
- `Match Score Threshold Filter`: **`[NEW BUT SUPPORTED]`** (Filter applications by `matchScore` field)
- `Advanced Skill Graph Filter`: **`[FUTURE / REQUIRES BACKEND]`**
