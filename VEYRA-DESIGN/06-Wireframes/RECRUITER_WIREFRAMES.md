# VEYRA — Recruiter Wireframes Specification

## Screen 01: Recruiter Overview (`/dashboard/overview`)

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  VEYRA  [ Search Candidates or Jobs... ]                       [ Notifications ]  [ Recruiter Profile ] │
├───────────────┬────────────────────────────────────────────────────────────────────────────────────────┤
│ Overview  (*) │  WELCOME BANNER                                                                        │
│ Jobs          │  Good morning, Sarah Jenkins                                                           │
│ Candidates    │  Here's your hiring activity overview for today.                 [ + Post New Job ]    │
│ Interviews    ├────────────────────────────────────────────────────────────────────────────────────────┤
│ Shortlisted   │  PRIMARY KPI ROW                                                                       │
│ Analytics     │  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐  │
│               │  │ TOTAL CANDIDATES │ │ APPLICATIONS/MO  │ │ SHORTLISTED      │ │ HIRED CANDIDATES │  │
│               │  │ 1,284            │ │ 438              │ │ 86               │ │ 24               │  │
│               │  │ ↑ 12.4% vs last  │ │ ↑ 18.2% vs last  │ │ ↑ 8.6% vs last   │ │ ↑ 14.3% vs last  │  │
│               │  └──────────────────┘ └──────────────────┘ └──────────────────┘ └──────────────────┘  │
│ Settings      ├────────────────────────────────────────────────────────────────────────────────────────┤
│ Help          │  GROWTH ANALYTICS                                [ Time Filter: 7D | 30D | 3M | 1Y ]  │
│               │  [ Recharts Multi-Series Trend Line: Applications, Shortlisted, Interviews, Hired ]    │
│               ├────────────────────────────────────────────────────────────────────────────────────────┤
│               │  CANDIDATE HIRING PIPELINE                                                             │
│               │  [ Applied: 438 ] ──► [ Shortlisted: 86 ] ──► [ Interview: 52 ] ──► [ Hired: 24 ]      │
│               ├──────────────────────────────────────────┬─────────────────────────────────────────────┤
│               │  APPLICATIONS BY JOB                     │  TOP CANDIDATES SPOTLIGHT                   │
│               │  - Sr Full Stack Eng  (184)  Avg: 91%    │  - Alex Morgan (Sr Full Stack Eng)          │
│               │  - Frontend Developer (142)  Avg: 87%    │    Match: 94% | AI Interview: 91%           │
│               │  - Backend Engineer   (126)  Avg: 89%    │    [ View Candidate Intelligence ]           │
│               ├──────────────────────────────────────────┴─────────────────────────────────────────────┤
│               │  UPCOMING AI INTERVIEWS TIMELINE                                                       │
│               │  - 10:30 AM  Alex Morgan (Sr Full Stack Eng)  — AI Technical Assessment               │
│               │  - 02:00 PM  Sarah Wilson (Backend Developer) — AI Behavioral Assessment              │
└───────────────┴────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Screen 03: Recruiter Jobs (`/dashboard/jobs`)
- **Header:** Requisition Management, Search bar, Status Filter (`All` | `Active` | `Closed`), `[ Create Requisition ]` Primary CTA.
- **Table Roster Columns:** Job Title, Requisition Status Badge (`Active`), Applicant Count, Avg Match Score Badge, Posted Date, Actions dropdown (`[ View Details ]`, `[ Edit ]`, `[ Close Job ]`).

---

## Screen 04: Recruiter Job Details (`/dashboard/jobs/:id`)
- **Multi-Tab Navigation:**
  - `[ Overview ]`: Description, Location, Salary, Expiration Date.
  - `[ Requirements ]`: Skills list (`React`, `Node.js`, `MongoDB`), Experience tier (`3-5 yrs`), Custom questions.
  - `[ Applicants ]`: Applicant table sorted by Resume Match Score (`94% Match`, `91% Match`, etc.) with direct status dropdown (`Applied`, `Shortlisted`, `Interview`, `Offer`, `Hired`, `Rejected`).
  - `[ Pipeline ]`: Visual funnel bar representing status distribution.

---

## Screen 05: Recruiter Applications (`/dashboard/applications`)
- Master filtering table by Job, Status, Match Score (>90%, 80-90%, <80%), Application Date.
- Row output: Candidate Name, Job Title, Resume Match Score Badge (`94% Match`), Database Status Badge (`Interview`), Date, Action `[ View Profile ]`.

---

## Screen 06: Recruiter Candidate Profile (`/dashboard/candidates/:id`)
- **Header:** Candidate Name, Application Role, Resume Match Score (`94% Match`), Current Status Badge (`Interview`).
- **Tab Layout:** Overview, Parsed Resume PDF Viewer, Skills Matrix, Work Experience, Education, Projects, AI Interview Transcript.
- **Sticky Recruiter Action Bar:** `[ Shortlist ]` | `[ Move to Interview ]` | `[ Reject ]` | `[ Extend Offer ]` | `[ Mark Hired ]`.

---

## Screen 09: Recruiter Interviews (`/dashboard/interviews`)
- **Tab 1: Upcoming Interviews:** Timeline of scheduled AI sessions with token status (`pending`).
- **Tab 2: Completed Reports:** Applicant evaluation roster with Overall Score (`91% Passed`), Category Radar scores, Transcript snippets, and Audio Playback links.
