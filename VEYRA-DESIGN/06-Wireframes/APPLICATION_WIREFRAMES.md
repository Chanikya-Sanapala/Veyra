# VEYRA — Application Wireframes Specification

## 1. Master Application Roster Wireframe (`/dashboard/applications`)
- Filter bar: Job select, Database Status filter (`Applied`, `Shortlisted`, `Interview`, `Offer`, `Hired`, `Rejected`), Match Score threshold (`>90%`, `80-90%`, `<80%`).
- Table layout displaying Candidate Name, Applied Role, Resume Match Score Badge (`94% Match`), Application Status Badge (`Interview`), Date, `[ View Profile ]` Action.

---

## 2. Application Progress Timeline Component (Candidate View)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ APPLICATION TIMELINE: Senior Full Stack Engineer at TechCorp                │
├─────────────────────────────────────────────────────────────────────────────┤
│  (✓) Applied       ──► (✓) Shortlisted ──► (🔵) Interview ──► ( ) Offer ──► ( ) Hired  │
│  Aug 12, 10:14 AM      Aug 13, 02:30 PM    Aug 14, 09:00 AM (Active Stage)   │
└─────────────────────────────────────────────────────────────────────────────┘
```
