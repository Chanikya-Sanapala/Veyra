# VEYRA — Job Wireframes Specification

## 1. Job Requisition Roster Wireframe (`/dashboard/jobs`)
- Search bar, Status filter dropdown (`All`, `Active`, `Closed`), `[ Create Job ]` CTA.
- Table layout showing Job Title, Status Badge (`Active`), Applicant Count, Avg Match Score Badge (`91% Match`), Posted Date, Actions menu.

---

## 2. Job Creation Modal Wireframe (`/dashboard/jobs/create`)
- Form fields: Title, Company, Location, Job Type, Experience Level, Salary Range, Skills Required tags, Description markdown textarea, Custom Screening Questions builder.

---

## 3. Candidate Job Details Wireframe (`/candidate/jobs/:id`)
- Header card with Job Title, Company, Location, Salary, Match Badge (`94% Match`), `[ Apply Now ]` CTA.
- "Why You Match" side panel detailing sub-scores (Skills 96%, Experience 91%), verified strengths (`✓ React`), missing skill gaps (`△ Kubernetes`), and AI match explanation.
