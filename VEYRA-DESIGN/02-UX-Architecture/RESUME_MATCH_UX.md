# VEYRA — Resume Match Score UX Architecture

> [!IMPORTANT]
> **Core Principle:** Resume Match Score is a core product capability, never a decorative widget. It must provide full transparency into how skills, experience, education, and project highlights align with job description requirements.

---

## 1. Match Score Presentation Framework

Every Resume Match Score presents a primary composite percentage accompanied by a quality qualifier badge and granular sub-score indicators:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          OVERALL RESUME MATCH: 94%                          │
│                                [ STRONG MATCH ]                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Component Breakdown:                                                       │
│  - Skills Alignment:      ████████████████████░░  96%                       │
│  - Experience Depth:      ██████████████████░░░░  91%                       │
│  - Project Relevance:     ███████████████████░░░  94%                       │
│  - Education Relevance:   █████████████████░░░░░  88%                       │
│  - Role Relevance:        ███████████████████░░░  95%                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Granular Evidence & Breakdown Component

### A. Verified Strengths Section
Displays exact matching terms and skills verified from the candidate's parsed resume:
- `✓ React.js` (Extracted from 3 projects + work history)
- `✓ Node.js & Express` (Matched against mandatory job requirements)
- `✓ MongoDB & Database Design` (TF-IDF keyword overlap confirmed)
- `✓ RESTful API Architecture` (Exact match in resume technical summary)

### B. Skill Gaps Section
Explicitly highlights missing mandatory or preferred skills from the job description:
- `△ Kubernetes` *(Required in Job Description, absent from candidate resume)*
- `△ Redis Caching` *(Preferred skill, not explicitly listed)*

### C. Natural Language AI Match Explanation
Generated natural language summary providing contextual guidance:
> *"The candidate demonstrates exceptional technical alignment with core frontend and backend stack requirements (React, Node.js, MongoDB). Project history confirms hands-on microservice implementation. Minor skill gap identified in container orchestration (Kubernetes)."*

---

## 3. Recruiter vs Candidate UX Perspectives

| UX Dimension | Recruiter Perspective | Candidate Perspective |
| :--- | :--- | :--- |
| **Primary Goal** | Assess candidate fit quickly & verify skill claims | Understand profile fit & receive actionable improvement advice |
| **Score Placement** | Applicant tables, candidate drawer, candidate profile | Recommended jobs feed, job details page, application status |
| **Actionable Step** | Filter candidate pool, schedule AI interview, shortlist | Apply for job, update profile skills, address skill gaps |
| **Privacy / Control** | Inspect detailed sub-scores and internal recruiter notes | View personal match score and profile optimization tips |

---

## 4. Resume Match UX States

- **Loading State:** "Analyzing resume against job requirements... (Extracting skills, computing TF-IDF vector similarity)" with animated progress indicator.
- **Success State:** Displays composite score card, sub-scores, strengths, skill gaps, and AI summary.
- **Error State:** "Match calculation failed. Ensure both job description and resume files are readable. [ Retry Match ]"
- **No-Match State (<40% Fit):** "Low Alignment (34% Match). Key required technical skills are missing from this candidate resume."
