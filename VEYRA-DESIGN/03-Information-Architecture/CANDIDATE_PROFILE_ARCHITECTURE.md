# VEYRA — Candidate Profile Information Architecture

> [!IMPORTANT]
> This document distinguishes between 3 distinct data layers within the candidate profile:
> 1. **Candidate Profile Data** (User-entered profile inputs)
> 2. **Parsed Resume Data** (Extracted text/terms from PDF/DOCX resume file)
> 3. **AI-Derived Insights** (Computed match scores, skill gap vectors, and interview scores)

---

## 1. Candidate Profile Data Architecture

```
                               ┌──────────────────────────────────────────────┐
                               │           CANDIDATE PROFILE VIEW             │
                               └──────────────────────┬───────────────────────┘
                                                      │
         ┌────────────────────────────────────────────┼────────────────────────────────────────────┐
         │                                            │                                            │
         ▼                                            ▼                                            ▼
┌──────────────────────────────┐            ┌──────────────────────────────┐            ┌──────────────────────────────┐
│  LAYER 1: USER PROFILE DATA  │            │ LAYER 2: PARSED RESUME DATA  │            │ LAYER 3: AI-DERIVED INSIGHTS │
├──────────────────────────────┤            ├──────────────────────────────┤            ├──────────────────────────────┤
│ - Personal Name & Headline   │            │ - Raw Resume Text Extract    │            │ - Resume Match Score (94%)   │
│ - Verified Skills Array      │            │ - Extracted Work History     │            │ - Sub-scores Breakdown       │
│ - Work Experience History    │            │ - Extracted Education        │            │ - Verified Strengths List    │
│ - Education Credentials      │            │ - Parsed Project Highlights  │            │ - Skill Gap Vectors          │
│ - Portfolio Projects & Links │            │ - Contact Information Email  │            │ - AI Interview Ratings (91%) │
└──────────────────────────────┘            └──────────────────────────────┘            └──────────────────────────────┘
```

---

## 2. Database Schema Alignment (`JobSeekerProfile.js`)

Mapped to existing Mongoose schema fields:

```typescript
interface JobSeekerProfileSchema {
  userId: string;                   // Reference to User._id
  fullName: string;                 // User full name
  phone?: string;                   // Contact phone
  location?: string;                // City / Country
  headline?: string;                // Professional title
  summary?: string;                 // Bio / summary text
  skills: string[];                 // Skills array
  experience: Array<{               // Work experience
    company: string;
    role: string;
    startDate: Date;
    endDate?: Date;
    description: string;
  }>;
  education: Array<{                // Education history
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startYear: number;
    endYear?: number;
  }>;
  projects: Array<{                 // Portfolio projects
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  resumeUrl?: string;               // Path to uploaded resume file in /uploads/
}
```

---

## 3. Recruiter Candidate View vs Candidate Profile View

| Profile Element | Recruiter View (`/dashboard/candidates/:id`) | Candidate View (`/candidate/profile`) |
| :--- | :--- | :--- |
| **Headline & Bio** | Read-only candidate executive summary | Editable personal summary & links |
| **Resume Document** | Embedded PDF viewer + Download button | File Uploader (`/api/profile/upload-resume`) |
| **Skills Graph** | Verified skills vs Job Requirement alignment | Add/Remove skill badges |
| **Match Analysis** | Full sub-score breakdown & skill gaps | Job match highlights & improvement tips |
| **AI Interview** | Full evaluation transcript & audio playback | Practice workout scores & interview invitation |
| **Recruiter Decision** | Action bar: `Shortlist`, `Move to Interview`, `Hire` | Application progress tracker |
