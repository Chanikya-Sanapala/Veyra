# VEYRA — Recruiter Application Information Architecture

## 1. Overview & Navigation Hierarchy

The Recruiter Application is structured into 6 primary modules and 2 utility areas:

```
/dashboard
├── Overview                    [Command Center & KPI Metrics]
├── Jobs                        [Requisitions & Applicant Pools]
├── Candidates                  [Talent Intelligence & Match Profiles]
├── Interviews                  [AI Interview Hub & Evaluation Reports]
├── Shortlisted                 [Shortlisted Candidate Pipeline]
├── Analytics                   [Hiring Trends & Velocity Metrics]
├── Settings                    [Recruiter Account & Company Context]
└── Help                        [Support & Documentation]
```

---

## 2. Detailed Module Breakdown

### 1. Overview (`/dashboard/overview`) `[REDESIGN]`
- **Header:** Recruiter Welcome, Active Requisitions summary, Date range filter.
- **Top KPI Cards:** Total Candidates, Monthly Applications, Shortlisted Candidates, Hired/Selected Candidates.
- **Application Growth Section:** Interactive trend chart (7D/30D/3M/6M/1Y).
- **Candidate Pipeline Bar:** `Applied` → `Shortlisted` → `Interview` → `Offer` → `Hired`.
- **Applications by Job:** Requisition list with application counts and match score averages.
- **Recent Applications:** Incoming candidates feed with match badges.
- **Top Candidates Spotlight:** High-scoring candidates across Match Score + AI Interview.
- **Upcoming AI Interviews:** Scheduled evaluation timeline.

### 2. Jobs (`/dashboard/jobs`) `[REDESIGN]`
- **Sub-pages:**
  - All Jobs listing (`/dashboard/jobs`)
  - Create Requisition (`/dashboard/jobs/create`)
  - Job Detail View (`/dashboard/jobs/:id`)
    - *Tab 1: Overview* (Description, Salary, Location, Status)
    - *Tab 2: Requirements* (Skills list, experience tier, custom questions)
    - *Tab 3: Applications* (Ranked applicant pool, match scores, status dropdown)

### 3. Candidates (`/dashboard/candidates`) `[NEW BUT SUPPORTED]`
- **Sub-pages:**
  - Talent Roster (`/dashboard/candidates/all`) — search candidates by skills, experience, match score.
  - Candidate Intelligence Profile (`/dashboard/candidates/:id`)
    - *View 1: Overview & Contact*
    - *View 2: Parsed Resume & Skill Graph*
    - *View 3: Match Score Breakdown* (Skills, Experience, Projects, Education, Role Relevance)
    - *View 4: AI Interview Transcript & Audio Playback*
    - *View 5: Candidate Intelligence Card & Human Recruiter Decision Actions*

### 4. Interviews (`/dashboard/interviews`) `[REDESIGN]`
- **Sub-pages:**
  - Upcoming Interviews (`/dashboard/interviews/upcoming`)
  - Completed Evaluation Reports (`/dashboard/interviews/completed`)
  - Interview Detail View (`/dashboard/interviews/:id`) (Category breakdown, audio player, AI summary)

### 5. Shortlisted (`/dashboard/shortlisted`) `[NEW BUT SUPPORTED]`
- Candidate pipeline view filtered strictly by `Application.status === 'Shortlisted'`.

### 6. Analytics (`/dashboard/analytics`) `[REDESIGN]`
- Application Volume, Hiring Growth, Candidate Pipeline conversion, Match Score distribution.

### 7. Settings (`/dashboard/settings`) `[REDESIGN]`
- Recruiter Profile details, Company Name, Team permissions, Notification preferences.
