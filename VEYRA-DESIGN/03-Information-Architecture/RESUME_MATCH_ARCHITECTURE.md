# VEYRA — Resume Match Score Reusable Architecture

> [!IMPORTANT]
> **Core Architecture Rule:** Resume Match Score is a reusable information object consumed across multiple UI views in both Recruiter and Candidate environments. It is powered by `ai/resume_matchmaker2.py` without modifying existing calculation logic.

---

## 1. Resume Match Score Information Object

```typescript
interface ResumeMatchScoreObject {
  matchScore: number;               // Overall percentage (e.g. 94)
  qualifierBadge: 'Strong Match' | 'Good Match' | 'Moderate Fit' | 'Low Alignment';
  subScores: {
    skillsAlignment: number;       // e.g. 96%
    experienceDepth: number;       // e.g. 91%
    projectRelevance: number;      // e.g. 94%
    educationRelevance: number;    // e.g. 88%
    roleRelevance: number;         // e.g. 95%
  };
  matchedTerms: string[];           // Verified skills & terms (e.g. ["React", "Node.js", "MongoDB"])
  missingTerms: string[];           // Identified skill gaps (e.g. ["Kubernetes", "Redis"])
  aiExplanation: string;            // Natural language match summary
  suggestions: string[];            // Profile optimization recommendations
}
```

---

## 2. Universal UI Placement Matrix

| Environment | UI Placement Location | Visual Component Representation | Primary Context / Purpose |
| :--- | :--- | :--- | :--- |
| **Recruiter** | Recruiter Dashboard (`/dashboard/overview`) | Metric Badge (`94% Match`) | Instant visual ranking of top applicants |
| **Recruiter** | Applicant Roster (`/dashboard/jobs/:id`) | Table Badge + Expandable Drawer | Filter & sort candidates by job fit |
| **Recruiter** | Candidate Intelligence (`/dashboard/candidates/:id`)| Full Composite Breakdown Card | Evaluate applicant skills prior to shortlisting |
| **Candidate** | Recommended Jobs (`/candidate/recommended`) | Card Badge (`94% Match`) | Highlight top-fit opportunities |
| **Candidate** | Job Details Page (`/candidate/jobs/:id`) | "Why You Match" Drawer | Show verified strengths & missing skills |
| **Candidate** | Application Details (`/candidate/applications/:id`) | Timeline Score Indicator | Track match score submitted with application |

---

## 3. Score Breakdown Layout Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ RESUME MATCH SCORE: 94%                        QUALIFIER: [ STRONG MATCH ]  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. SUB-SCORE BREAKDOWN                                                      │
│    - Skills Alignment: 96%  |  Experience Depth: 91%  | Projects: 94%        │
│    - Education Relevance: 88% | Role Relevance: 95%                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. VERIFIED STRENGTHS                                                       │
│    - ✓ React.js (3 projects)  - ✓ Node.js API  - ✓ MongoDB                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. SKILL GAPS                                                               │
│    - △ Kubernetes (Required) - △ Redis (Preferred)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. NATURAL LANGUAGE AI EXPLANATION                                          │
│    "Strong technical alignment in core stack. Minor gap in Kubernetes."     │
└─────────────────────────────────────────────────────────────────────────────┘
```
