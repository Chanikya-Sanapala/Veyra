# VEYRA — Master UX Architecture

> [!IMPORTANT]
> **Stage 02 — UX Architecture & Documentation**
> This document defines the overarching user experience framework for VEYRA, transforming CHANIX into a unified, dual-persona **AI-powered Talent Intelligence Platform**. All specifications align strictly with existing CHANIX backend schemas while paving the way for intuitive, explainable talent workflows.

---

## 1. Dual-Persona Architecture Paradigm

VEYRA serves two distinct user classes within a single cohesive product ecosystem:

```
                      ┌─────────────────────────────────────────┐
                      │                 VEYRA                   │
                      │      Talent Intelligence Platform       │
                      └────────────────────┬────────────────────┘
                                           │
                 ┌─────────────────────────┴─────────────────────────┐
                 │                                                   │
                 ▼                                                   ▼
  ┌─────────────────────────────┐                     ┌─────────────────────────────┐
  │     RECRUITER WORKSPACE     │                     │      CANDIDATE PORTAL       │
  ├─────────────────────────────┤                     ├─────────────────────────────┤
  │ Primary Goal:               │                     │ Primary Goal:               │
  │ "Find the right candidates  │                     │ "Understand fit, discover   │
  │ quickly and make confident  │                     │ suitable opportunities, &   │
  │ hiring decisions."          │                     │ improve hiring chances."    │
  └─────────────────────────────┘                     └─────────────────────────────┘
```

---

## 2. Core UX Philosophy: "AI Evaluates. Humans Decide."

1. **AI as an Intelligence Multiplier:** VEYRA synthesizes complex multi-modal data (resumes, skills graphs, TF-IDF term overlaps, AI interview recordings) to compute transparent ratings.
2. **Transparent Decision Support:** AI outputs are never presented as black-box mandates or automated rejections. Every match score and candidate ranking includes granular component breakdowns and evidence links.
3. **Recruiter Agency:** Final shortlisting, stage progression, interview scheduling, and hiring decisions remain 100% under human recruiter control.

---

## 3. High-Level System UX Map

```
                  ┌──────────────────────────────────────────────┐
                  │                 Job Creation                 │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                             Resume Intelligence                             │
  │                   Parsing → Skill & Experience Extraction                   │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         │
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                         Resume-to-Job Matching                              │
  │         Multi-factor Match Score (Skills, Experience, Projects, Ed)         │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         │
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                             AI Interview Session                            │
  │                 Dynamic Questions → Audio/Text Evaluation                   │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         │
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                         Candidate Intelligence View                         │
  │           Composite Score + Strengths + Skill Gaps + AI Summary             │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         │
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                       Recruiter Review & Decision                           │
  │            Applied → Interview → Shortlisted → Selected / Hired              │
  └─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Existing Database Model to UX Feature Mapping

Cross-referenced against [`CURRENT_PRODUCT_AUDIT.md`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/VEYRA-DESIGN/01-Product-Foundation/CURRENT_PRODUCT_AUDIT.md) and [`backend/src/models/`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/backend/src/models/):

| Backend Mongoose Model | Existing Schema Fields | VEYRA UX Surface / Feature |
| :--- | :--- | :--- |
| **`User`** | `username`, `email`, `userType`, `isActive`, `isProfileCompleted` | Authentication, Recruiter vs Candidate role routing |
| **`JobSeekerProfile`** | `skills`, `experience`, `education`, `projects`, `resumeUrl` | Candidate Workspace, My Profile, Skill Gap matching |
| **`RecruiterProfile`** | `companyName`, `companyWebsite`, `designation` | Recruiter Workspace header, Company context |
| **`Job`** | `title`, `skillsRequired`, `experience`, `status` (`Active`/`Closed`) | Jobs list, Applications by Job, Job details |
| **`Application`** | `status` (`Applied`, `Shortlisted`, `Interview`, `Offer`, `Hired`, `Rejected`), `matchScore` | Pipeline metrics, Candidate table badges, Recent applications |
| **`Interview`** | `status` (`pending`, `completed`), `questions`, `recordingAudioPath` | AI Interview portal, Candidate Intelligence summary |

---

## 5. Architectural Principles for Stage 02
- **Zero Backend Mutation:** Stage 02 defines UX architecture only. No database models or APIs are modified.
- **Workflow-Embedded Match Scores:** Resume matching is embedded naturally within hiring flows, not isolated as a standalone gimmick.
- **Explainable Metrics:** Every composite indicator features inspectable sub-scores.
