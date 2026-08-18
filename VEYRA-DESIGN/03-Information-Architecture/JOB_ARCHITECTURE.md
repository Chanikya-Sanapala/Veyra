# VEYRA — Job Information Architecture

> [!IMPORTANT]
> This document defines the information model, layout hierarchy, and field mappings for Job Requisitions across both Recruiter and Candidate environments, strictly adhering to [`backend/src/models/Job.js`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/backend/src/models/Job.js).

---

## 1. Job Information Object Model

Mapped directly to Mongoose `Job` schema:

```typescript
interface JobInformationObject {
  _id: string;                      // MongoDB ObjectId
  title: string;                    // Required (e.g. "Senior Full Stack Engineer")
  company: string;                  // Company name
  description: string;              // Full job description markdown
  skillsRequired: string[];         // Target skill tags (e.g. ["React", "Node.js", "MongoDB"])
  experience: string;               // Experience level (e.g. "3-5 years")
  location: string;                 // Location / Remote status
  jobType: string;                  // "Full-time", "Part-time", "Contract"
  salary: string;                   // Display salary string
  minSalary?: number;               // Lower range
  maxSalary?: number;               // Upper range
  deadline?: Date;                  // Application closing date
  postedDate: Date;                 // Date created
  urgent: boolean;                  // Urgent hiring badge flag
  featured: boolean;                // Featured listing badge flag
  applicants: number;               // Application count counter
  recruiterId: string;              // Associated recruiter User ID
  status: 'Active' | 'Closed' | 'Draft'; // Requisition status enum
  customQuestions?: Array<{         // Custom candidate application screening questions
    id: string;
    question: string;
    isRequired: boolean;
  }>;
}
```

---

## 2. Recruiter Job View Architecture (`/dashboard/jobs/:id`)

When a recruiter views a job requisition, the screen is organized into 4 distinct tabs:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ JOB HEADER: Senior Full Stack Engineer                    [ STATUS: ACTIVE ]│
│ Posted: Aug 10, 2026 | Applicants: 184 | Avg Match: 91%  │ [ Edit Job ]     │
├─────────────────────────────────────────────────────────────────────────────┤
│  [ Overview ]     [ Requirements ]     [ Applicants (184) ]     [ Pipeline ]│
└─────────────────────────────────────────────────────────────────────────────┘
```

- **Tab 1: Overview:** Core description, company context, salary, location, and application deadline.
- **Tab 2: Requirements:** Target skills list, experience requirements, custom screening questions.
- **Tab 3: Applicants:** Ranked candidate roster ordered by Resume Match Score (`94% Match`, `91% Match`, etc.) with direct status dropdown (`Applied`, `Shortlisted`, `Interview`, `Offer`, `Hired`, `Rejected`).
- **Tab 4: Pipeline:** Visual candidate breakdown across official application database statuses.

---

## 3. Candidate Job View Architecture (`/candidate/jobs/:id`)

When a candidate views a job posting:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ JOB HEADER: Senior Full Stack Engineer                     [ 94% MATCH ]    │
│ Company: TechCorp | Location: Remote | Salary: $120k-$150k  [ Apply Now ]   │
├─────────────────────────────────────────────────────────────────────────────┤
│  [ Job Description & Requirements ]   │   [ Why You Match (Match Score) ]   │
│  - Responsibilities                   │   - Skills Match: 96%               │
│  - Skills Required                    │   - Verified Strengths: React, Node │
│  - Experience Needed                  │   - Skill Gaps: Kubernetes          │
└───────────────────────────────────────┴─────────────────────────────────────┘
```

---

## 4. Job Search & Filtering Controls
- **Keywords:** Matches `title`, `description`, `skillsRequired`.
- **Match Score Threshold:** Filter jobs by fit percentage (`>90% Fit`, `>80% Fit`, `All Jobs`).
- **Job Status:** `Active` vs `Closed`.
