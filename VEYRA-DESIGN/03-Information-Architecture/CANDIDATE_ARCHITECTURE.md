# VEYRA — Candidate Application Information Architecture

## 1. Overview & Navigation Hierarchy

The Candidate Portal is structured into 5 primary modules and 3 profile management areas:

```
/candidate
├── Overview                    [Candidate Dashboard & Match Summary]
├── Jobs                        [Job Search, Filters, & Detail View]
├── Recommended                 [AI-Curated Job Feed & Match Breakdown]
├── Applications                [Application Tracker & Progress Timeline]
├── Interviews                  [AI Interview Practice & Active Sessions]
├── My Profile                  [Skills Matrix, Work History, & Projects]
├── My Resume                   [Resume Manager & Parser Preview]
└── Settings                    [Account & Privacy Settings]
```

---

## 2. Detailed Module Breakdown

### 1. Overview (`/candidate/overview`) `[REDESIGN]`
- **Welcome Banner:** Candidate greeting, profile completeness bar (e.g. `85% Complete`).
- **Match Score Highlights:** Top matching jobs for the candidate (`94% Match`).
- **Application Status Widget:** Active applications summary (`Applied`, `Interview`, `Shortlisted`).
- **Upcoming AI Interviews:** Scheduled interview sessions banner with direct `[ Start Interview ]` CTA.
- **Profile Improvement Cards:** Actionable tips to boost match score (e.g. *"Add Docker experience to match 12 active roles"*).

### 2. Jobs (`/candidate/jobs`) `[REDESIGN]`
- **Sub-pages:**
  - Job Search Directory (`/candidate/jobs`) — keyword search, location filter, salary range, match score badge.
  - Candidate Job Detail View (`/candidate/jobs/:id`) — job overview, requirements, match badge, `Apply` CTA.

### 3. Recommended (`/candidate/recommended`) `[NEW BUT SUPPORTED]`
- **Sub-pages:**
  - AI Recommended Jobs Feed (`/candidate/recommended`) — sorted by match fit (>80% Match).
  - Match Explanation Drawer (`/candidate/recommended/:id/match`) — strengths checklist (`✓ React`), skill gaps (`△ Kubernetes`), and AI feedback.

### 4. Applications (`/candidate/applications`) `[REDESIGN]`
- **Sub-pages:**
  - Application Roster (`/candidate/applications`) — list of submitted job applications.
  - Application Detail View (`/candidate/applications/:id`) — status timeline tracker (`Applied` → `Shortlisted` → `Interview` → `Offer` → `Hired`), submitted resume version, match score.

### 5. Interviews (`/candidate/interviews`) `[REDESIGN]`
- **Sub-pages:**
  - AI Interview Hub (`/candidate/interviews`) — practice workouts, active invitations.
  - Active Interview Session (`/candidate/interviews/:token`) — hardware test, live questions, audio recorder.

### 6. My Profile (`/candidate/profile`) `[REDESIGN]`
- Personal information, verified skills inventory, work experience, education history, portfolio projects.

### 7. My Resume (`/candidate/resume`) `[REDESIGN]`
- Upload PDF/DOCX resume file (`/api/profile/upload-resume`), view auto-extracted skills/text preview.

### 8. Settings (`/candidate/settings`) `[REDESIGN]`
- Account credentials, email notification toggles, privacy preferences.
