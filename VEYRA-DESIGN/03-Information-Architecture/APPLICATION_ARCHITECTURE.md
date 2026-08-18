# VEYRA — Application Information Architecture

> [!IMPORTANT]
> **Strict Application Status Rule:**
> The official application status enum defined in [`backend/src/models/Application.js`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/backend/src/models/Application.js) is strictly:
> **`Applied` | `Shortlisted` | `Interview` | `Offer` | `Hired` | `Rejected`**
>
> Terms such as `Screening`, `Matched`, or `Selected` are NEVER stored as application database statuses. Resume Match Score (`94% Match`) is an intelligence metric attached to an application, NOT a status.

---

## 1. Application Data Model & Status Lifecycle

```
                           ┌───────────────────────────┐
                           │          Applied          │ (Initial Submission)
                           └─────────────┬─────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 │                                               │
                 ▼                                               ▼
  ┌───────────────────────────┐                   ┌───────────────────────────┐
  │        Shortlisted        │                   │         Rejected          │ (Terminal State)
  └──────────────┬────────────┘                   └───────────────────────────┘
                 │
                 ▼
  ┌───────────────────────────┐
  │         Interview         │ (AI / Technical Interview Session)
  └──────────────┬────────────┘
                 │
                 ▼
  ┌───────────────────────────┐
  │           Offer           │ (Job Offer Extended)
  └──────────────┬────────────┘
                 │
                 ▼
  ┌───────────────────────────┐
  │           Hired           │ (Candidate Selected & Placed)
  └───────────────────────────┘
```

---

## 2. Application Detail View Structure

Accessible by recruiters (`/dashboard/candidates/:id`) and candidate tracking (`/candidate/applications/:id`):

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ APPLICATION: Sr Full Stack Engineer                      STATUS: INTERVIEW  │
│ Applicant: Alex Morgan | Applied: Aug 12, 2026 | Match: 94% [Change Status] │
├─────────────────────────────────────────────────────────────────────────────┤
│  SECTION 1: Candidate Overview & Resume Download                            │
│  - Candidate Name, Email, Profile Link, Attached Resume PDF/DOCX            │
├─────────────────────────────────────────────────────────────────────────────┤
│  SECTION 2: Resume Match Intelligence                                       │
│  - Composite Match Score (94%)                                              │
│  - Sub-scores: Skills (96%), Experience (91%), Projects (94%), Education (88%)│
│  - Verified Strengths & Skill Gaps                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  SECTION 3: AI Interview Results (if completed)                             │
│  - Overall Score: 91% Passed | Audio Transcript & Response Highlights        │
├─────────────────────────────────────────────────────────────────────────────┤
│  SECTION 4: Status History & Recruiter Timeline                             │
│  - Applied: Aug 12, 10:14 AM                                                │
│  - Shortlisted by Recruiter: Aug 13, 02:30 PM                               │
│  - Moved to Interview: Aug 14, 09:00 AM                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Recruiter vs Candidate Status Visibility

| DB Status Enum | Recruiter Interface View | Candidate Portal Interface View |
| :--- | :--- | :--- |
| **`Applied`** | "New Application — Review Required" | "Application Submitted — Under Review" |
| **`Shortlisted`** | "Candidate Shortlisted for Interview" | "Application Shortlisted" |
| **`Interview`** | "AI / Technical Interview In Progress" | "Interview Invitation — Action Required" |
| **`Offer`** | "Job Offer Sent to Candidate" | "Job Offer Received — Review Details" |
| **`Hired`** | "Candidate Hired & Placed" | "Application Successful — Hired!" |
| **`Rejected`** | "Candidate Rejected" | "Application Process Concluded" |
