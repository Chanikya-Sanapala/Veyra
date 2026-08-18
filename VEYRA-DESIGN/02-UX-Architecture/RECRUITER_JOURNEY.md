# VEYRA — Recruiter Experience Journey

## 1. Persona & Journey Goal
- **Primary Persona:** Lead Recruiter / Hiring Manager
- **User Goal:** "Find the right candidates quickly and make confident hiring decisions."
- **Core Value Proposition:** Accelerate resume screening, eliminate evaluation bias, and pinpoint top talent using explainable AI match scores.

---

## 2. Step-by-Step Recruiter Flow

```
Recruiter Dashboard
    ↓
Create / Select Job Requisition
    ↓
Review Job Requirements & Skills Weights
    ↓
View Job Applications & Candidate Roster
    ↓
Inspect Resume Match Scores & Component Breakdowns
    ↓
Review Candidate Ranking & Filter Top Matches
    ↓
Inspect Unified Candidate Profile
    ↓
Trigger / Review AI Interview Evaluation
    ↓
Analyze Candidate Intelligence Card
    ↓
Shortlist Candidate
    ↓
Move Candidate to Selected / Hired Stage
```

---

## 3. Journey Phase Breakdown

### Phase 1: Dashboard Overview
- **Entry Point:** Authenticated Recruiter Login (`/api/auth/login`) → `/recruiter-dashboard`.
- **Required Information:** Active job requisitions count, total candidate volume, monthly application growth, pending AI interviews, pipeline counts.
- **Main Actions:** Scan KPI cards, inspect growth charts, view top candidate recommendations, jump to active jobs.
- **Success State:** Instant visual clarity on hiring activity within 5-10 seconds.
- **Empty State:** "No active requisitions found. Post a job to start receiving matched candidates."

### Phase 2: Job Requisition & Applicant Pool
- **Entry Point:** Click "Jobs" or select a specific job from "Applications by Job".
- **Required Information:** Job title, target skills, experience level, applicant count, average match score.
- **Main Actions:** Filter applicants by Resume Match Score threshold, status (`Applied`, `Shortlisted`, `Interview`), or skill keywords.
- **Success State:** Sortable candidate roster ordered by AI Resume Match Score.
- **Error State:** Failed API fetch displays "Unable to load applicant roster. Retry connection."

### Phase 3: Resume Match & Profile Deep-Dive
- **Entry Point:** Click candidate row or "View Match Breakdown".
- **Required Information:**
  - Composite Match Score (e.g. 94%).
  - Sub-scores (Skills 96%, Experience 91%, Projects 94%, Education 88%, Role Relevance 95%).
  - Verified Strengths vs Skill Gaps.
  - Parsed Resume text & highlighted keywords.
- **Main Actions:** Review match breakdown, toggle candidate status, trigger AI Interview invitation.
- **Success State:** Recruiter gains total confidence in candidate fit rationale.

### Phase 4: AI Interview Orchestration & Intelligence Review
- **Entry Point:** Select candidate → "Review AI Interview".
- **Required Information:** AI Interview transcript, video/audio playback link, category scores (Technical, Problem Solving, Communication), AI summary recommendation.
- **Main Actions:** Play audio recording, inspect question answers, update candidate pipeline stage.
- **Success State:** Objective, standardized interview evaluation available for hiring manager sign-off.

### Phase 5: Pipeline Progression & Shortlisting
- **Entry Point:** Candidate Profile → Action Bar.
- **Required Information:** Current status, target pipeline stage, email notification confirmation.
- **Main Actions:** Move candidate from `Applied` → `Interview` → `Shortlisted` → `Selected/Hired`.
- **Success State:** Candidate status updated in MongoDB database, email notification queued.

---

## 4. UX Risks & Future UI Requirements
- **Risk:** Recruiter over-reliance on raw Match Score percentage without reading breakdown.
  - *Mitigation:* Require interactive hover/click to inspect sub-scores before shortlisting.
- **Future UI Requirement:** Bulk pipeline status updates for top-ranked candidate cohorts `[REQUIRES FUTURE BACKEND SUPPORT]`.
