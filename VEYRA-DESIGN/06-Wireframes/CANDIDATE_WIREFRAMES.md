# VEYRA — Candidate Wireframes Specification

## Screen 02: Candidate Overview (`/candidate/overview`)

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  VEYRA    Overview(*)   Jobs   Recommended   Applications   Interviews           [ Profile Dropdown ]  │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  WELCOME BANNER                                                                                        │
│  Welcome back, Alex Rivera                                                                             │
│  Profile Completeness: [████████████████████░░ 85%]                                  [ Edit Profile ]  │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  RECOMMENDED JOBS SPOTLIGHT (Based on your skills)                                                     │
│  ┌─────────────────────────────────────┐  ┌─────────────────────────────────────┐                  │
│  │ Sr Full Stack Engineer              │  │ Lead Backend Developer              │                  │
│  │ TechCorp • Remote • $120k-$150k     │  │ DataScale • San Francisco, CA       │                  │
│  │ [ 94% MATCH ]                       │  │ [ 91% MATCH ]                       │                  │
│  │ [ View Job ]           [ Apply ]    │  │ [ View Job ]           [ Apply ]    │                  │
│  └─────────────────────────────────────┘  └─────────────────────────────────────┘                  │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  RECENT APPLICATION TIMELINE                                                                           │
│  - Sr Full Stack Engineer at TechCorp ──► Status: [ INTERVIEW ] (Applied: Aug 12)                      │
│  - Backend Developer at CloudScale    ──► Status: [ SHORTLISTED ] (Applied: Aug 10)                    │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  UPCOMING AI INTERVIEW BANNER                                                                          │
│  - You have 1 pending AI Interview session for Senior Full Stack Engineer.  [ Start AI Interview ]     │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  PROFILE IMPROVEMENT SUGGESTIONS                                                                       │
│  - 💡 Add Docker & Kubernetes to your projects to boost match score across 14 active listings.         │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Screen 10: AI Interview — Candidate (`/candidate/interviews/:token`)
- **Phase 1: Preparation:** Interview Title, Duration (~25 mins), Question Count (10 questions), Evaluation Categories list, Microphone Hardware Test button, `[ Start AI Interview ]` CTA.
- **Phase 2: Active Session:** Question Counter (`Question 04 / 10`), Session Timer (`12:42`), Audio Question Prompt Button (`🔊`), Dual Response Input (Voice Recording Waveform or Textarea), Controls `[ Previous ]` | `[ Submit & Next Question ]`.
- **Phase 3: Completion:** Success Celebration Card, Overall Score (`91% Passed`), Category Radar Breakdown, AI Summary, Key Strengths, Improvement areas.

---

## Screen 11: Candidate Jobs (`/candidate/jobs`)
- Search Input, Location Filter, Job Type Filter, Match Score Threshold Filter (`>90% Fit`, `>80% Fit`).
- Job Cards Grid displaying Job Title, Company, Location, Salary, Match Badge (`94% Match`), `[ View Job ]` CTA.

---

## Screen 12: Candidate Job Details (`/candidate/jobs/:id`)
- Job Header: Title, Company, Location, Salary, Match Badge (`94% Match`), `[ Apply Now ]` CTA.
- "Why You Match" Drawer: Sub-scores breakdown, Verified Strengths (`✓ React`), Skill Gaps (`△ Kubernetes`), AI Feedback text.
- Job Description, Responsibilities, Requirements, Custom Application Questions.

---

## Screen 13: Candidate Applications (`/candidate/applications`)
- List of submitted applications. Application Card displays Job Title, Company, Date, Match Score Badge, and Visual Application Status Timeline (`Applied` → `Shortlisted` → `Interview` → `Offer` → `Hired`).

---

## Screen 14: Candidate Profile (`/candidate/profile`)
- Personal Info, Verified Skills Inventory, Work History, Education, Projects, Profile Completeness indicator.

---

## Screen 15: Candidate Resume (`/candidate/resume`)
- Resume File Dropzone (`/api/profile/upload-resume`), Uploading/Parsing progress states, Auto-extracted parsed text preview, Match history log.
