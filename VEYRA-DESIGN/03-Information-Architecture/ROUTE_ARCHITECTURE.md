# VEYRA — Route Mapping Architecture

This document provides a clear side-by-side mapping between current CHANIX frontend routes and proposed VEYRA route paths.

---

## Route Mapping Table

| Current CHANIX Route Path | Proposed VEYRA Route Path | Environment | Status / Classification |
| :--- | :--- | :--- | :--- |
| `/` (`Landingpage`) | `/` | Public Website | **`[REDESIGN]`** |
| `/Login` | `/signin` | Authentication | **`[REDESIGN]`** |
| `/Signup` | `/register` | Authentication | **`[REDESIGN]`** |
| `/ForgotPassword` | `/forgot-password` | Authentication | **`[REDESIGN]`** |
| `/ResetPassword` | `/reset-password` | Authentication | **`[REDESIGN]`** |
| `/recruiter-dashboard` | `/dashboard/overview` | Recruiter App | **`[REDESIGN]`** |
| `/recruiter-dashboard/Analytics` | `/dashboard/analytics` | Recruiter App | **`[REDESIGN]`** |
| *(embedded in recruiter page)* | `/dashboard/jobs` | Recruiter App | **`[NEW BUT SUPPORTED]`** |
| *(embedded in recruiter page)* | `/dashboard/jobs/create` | Recruiter App | **`[NEW BUT SUPPORTED]`** |
| *(embedded in recruiter page)* | `/dashboard/jobs/[id]` | Recruiter App | **`[NEW BUT SUPPORTED]`** |
| *(embedded in recruiter page)* | `/dashboard/candidates` | Recruiter App | **`[NEW BUT SUPPORTED]`** |
| *(embedded in recruiter page)* | `/dashboard/candidates/[id]` | Recruiter App | **`[NEW BUT SUPPORTED]`** |
| *(embedded in recruiter page)* | `/dashboard/interviews` | Recruiter App | **`[NEW BUT SUPPORTED]`** |
| *(embedded in recruiter page)* | `/dashboard/shortlisted` | Recruiter App | **`[NEW BUT SUPPORTED]`** |
| `/jobseeker-dashboard` | `/candidate/overview` | Candidate App | **`[REDESIGN]`** |
| *(embedded in jobseeker page)* | `/candidate/jobs` | Candidate App | **`[REDESIGN]`** |
| *(embedded in jobseeker page)* | `/candidate/recommended` | Candidate App | **`[NEW BUT SUPPORTED]`** |
| *(embedded in jobseeker page)* | `/candidate/applications` | Candidate App | **`[REDESIGN]`** |
| `/interview/[token]` | `/candidate/interviews/[token]` | Candidate App | **`[REDESIGN]`** |
| `/JobseekerProfile` | `/candidate/profile` | Candidate App | **`[REDESIGN]`** |
| `/ResumeMatcher` | `/candidate/recommended/match` | Candidate App / Shared | **`[REDESIGN]`** (Embedded matcher) |
| `/RecruiterProfile` | `/dashboard/settings` | Recruiter App | **`[REDESIGN]`** |
| `/admin-dashboard` | `/admin/overview` | Admin Workspace | **`[EXISTING]`** |
| *(none)* | `/product/*` | Public Website | **`[FUTURE / REQUIRES IMPLEMENTATION]`** |
| *(none)* | `/for-recruiters` | Public Website | **`[FUTURE / REQUIRES IMPLEMENTATION]`** |
| *(none)* | `/for-candidates` | Public Website | **`[FUTURE / REQUIRES IMPLEMENTATION]`** |

---

## Route Transition Guidelines
- **Zero Breaking Changes:** Existing routes can remain as alias redirects (`/recruiter-dashboard` → `/dashboard/overview`) during transition.
- **RESTful Cleanliness:** VEYRA introduces structured nested routes (`/dashboard/jobs/:id/applications`) for cleaner component boundaries and contextual breadcrumbs.
