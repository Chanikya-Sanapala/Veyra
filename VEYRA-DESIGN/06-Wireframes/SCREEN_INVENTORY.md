# VEYRA — Screen Inventory Specification

This document inventories the 20 primary wireframe screens required for VEYRA.

---

## Screen Inventory Table

| # | Screen Name | Environment | Target Route Path | Primary Purpose & CTA |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **Recruiter Overview** | Recruiter App | `/dashboard/overview` | 5-10 sec hiring command center. CTA: `[ Post New Job ]` |
| **02** | **Candidate Overview** | Candidate App | `/candidate/overview` | Personal career hub. CTA: `[ Explore Recommended Jobs ]` |
| **03** | **Recruiter Jobs** | Recruiter App | `/dashboard/jobs` | Requisition management roster. CTA: `[ Create Requisition ]` |
| **04** | **Recruiter Job Details** | Recruiter App | `/dashboard/jobs/:id` | 4-Tab job details (Overview, Requirements, Applicants, Pipeline) |
| **05** | **Recruiter Applications** | Recruiter App | `/dashboard/applications` | Master applicant tracking table with Match Score badges |
| **06** | **Recruiter Candidate Profile**| Recruiter App | `/dashboard/candidates/:id` | Unified evaluation page. CTA: `[ Shortlist ]` / `[ Move to Interview ]` |
| **07** | **Resume Match Analysis** | Recruiter / Cand | `/candidate/recommended/:id/match`| Explainable score card (`94% Match`, sub-scores, strengths, gaps) |
| **08** | **Candidate Intelligence** | Recruiter App | `/dashboard/candidates/:id/intelligence` | 5-Signal composite decision drawer + Human decision override bar |
| **09** | **Recruiter Interviews** | Recruiter App | `/dashboard/interviews` | Upcoming & completed AI interview hub + evaluation report |
| **10** | **AI Interview — Candidate** | Candidate App | `/candidate/interviews/:token` | 3-Phase candidate interview experience (Prep, Active, Summary) |
| **11** | **Candidate Jobs** | Candidate App | `/candidate/jobs` | Job search directory with match score badges. CTA: `[ View Job ]` |
| **12** | **Candidate Job Details** | Candidate App | `/candidate/jobs/:id` | Job description, "Why You Match" drawer, `[ Apply Now ]` CTA |
| **13** | **Candidate Applications** | Candidate App | `/candidate/applications` | Application status timeline tracker (`Applied` → `Hired`) |
| **14** | **Candidate Profile** | Candidate App | `/candidate/profile` | Personal profile manager (Skills matrix, Experience, Education) |
| **15** | **Candidate Resume** | Candidate App | `/candidate/resume` | Resume PDF/DOCX dropzone, text parser preview, match history |
| **16** | **Public Homepage** | Public Website | `/` | Product narrative, hero UI preview, CTA: `[ See VEYRA in Action ]` |
| **17** | **Product: AI Interviews** | Public Website | `/product/ai-interviews` | Marketing wireframe explaining 3-phase interview features |
| **18** | **Product: Talent Matching** | Public Website | `/product/talent-matching` | Marketing wireframe for TF-IDF matching engine & match score |
| **19** | **Product: Candidate Intell** | Public Website | `/product/candidate-intelligence` | Marketing wireframe highlighting 5-signal composite analysis |
| **20** | **Public Jobs** | Public Website | `/jobs` | Public job board directory & job detail view |
