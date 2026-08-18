# VEYRA — Candidate Experience Journey

## 1. Persona & Journey Goal
- **Primary Persona:** Candidate / Job Seeker
- **User Goal:** "Understand my fit, discover suitable opportunities, and improve my chances of getting hired."
- **Core Value Proposition:** Eliminate black-hole applications through instant match scoring, actionable skill gap feedback, and AI interview preparation.

---

## 2. Step-by-Step Candidate Flow

```
Candidate Dashboard
    ↓
Build / Upload Profile & Resume
    ↓
Explore Recommended Jobs Feed
    ↓
Inspect Job Details
    ↓
View Personalized Resume Match Score
    ↓
Read Match Explanation & Skill Gaps
    ↓
Submit Job Application
    ↓
Receive & Complete AI Interview Session
    ↓
Track Application Status Timeline
    ↓
Apply Skill Gap Suggestions for Profile Improvement
```

---

## 3. Journey Phase Breakdown

### Phase 1: Onboarding & Resume Parsing
- **Entry Point:** Login → Candidate Dashboard (`/jobseeker-dashboard`).
- **Required Information:** Profile completion percentage, active resume status, skill inventory.
- **Main Actions:** Upload PDF/DOCX resume file (`/api/profile/upload-resume`), edit skills matrix, view auto-extracted education and work experience.
- **Success State:** Resume text parsed; skills and experience populated into Candidate Profile.
- **Error State:** File parsing failure displays "Invalid resume format. Please upload a standard PDF or DOCX file."

### Phase 2: Job Discovery & Match Analysis
- **Entry Point:** "Recommended Jobs" tab or "Jobs" search.
- **Required Information:** Job title, company context, location, salary range, personalized **Resume Match Score Badge** (e.g. `94% Match`).
- **Main Actions:** Filter jobs by match score threshold (e.g. >80% Match), view job details, inspect match breakdown.
- **Success State:** Candidate immediately sees why they are a strong fit for recommended roles.

### Phase 3: Match Explanation & Skill Gap Feedback
- **Entry Point:** Click "Why Am I A Match?" on job detail page.
- **Required Information:**
  - Skill alignment breakdown (Matched skills: React, Node.js, MongoDB).
  - Explicit Skill Gaps (Missing: Kubernetes, Redis).
  - Actionable Suggestions ("Highlight Docker containerization in your projects section to boost match score").
- **Main Actions:** Review gaps, update profile or proceed to application.
- **Success State:** Candidate understands exact strengths and improvement areas before applying.

### Phase 4: Application Submission
- **Entry Point:** Click "Apply Now".
- **Required Information:** Attached resume version, optional cover letter, custom application questions.
- **Main Actions:** Submit application (`POST /api/applications`).
- **Success State:** Application status set to `Applied`, confirmation toast displayed, application timeline initiated.

### Phase 5: AI Interview Experience
- **Entry Point:** Notification / Email link / "Interviews" tab → "Start AI Interview".
- **Required Information:** Interview duration (~25 mins), question count (10 questions), evaluation topics, audio recorder permissions.
- **Main Actions:** Answer interactive questions via voice or text, submit responses.
- **Success State:** Interview completed; responses sent for AI evaluation (`/api/interviews`).

### Phase 6: Application Tracking & Profile Evolution
- **Entry Point:** "Applications" tab.
- **Required Information:** Visual status pipeline (`Applied` → `Interview` → `Shortlisted` → `Selected/Hired`).
- **Main Actions:** View progress updates, re-take practice AI workouts, refine resume based on skill gap insights.
- **Success State:** Real-time visibility into hiring status.

---

## 4. UX Risks & Future UI Requirements
- **Risk:** Candidate discouragement from seeing low match scores on target roles.
  - *Mitigation:* Frame skill gaps constructively with actionable profile improvement recommendations.
- **Future UI Requirement:** Automated profile enhancement suggestions based on successful applicant benchmarks `[REQUIRES FUTURE BACKEND SUPPORT]`.
