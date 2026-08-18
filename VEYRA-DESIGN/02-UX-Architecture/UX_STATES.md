# VEYRA — Master UX System States Specification

This document defines the standard visual behavior, user communication, and error recovery workflows for all 13 system states across VEYRA.

---

## System State Matrix

| State | User Experience Pattern | UI Feedback / Indicator | Actionable User Recovery |
| :--- | :--- | :--- | :--- |
| **1. Loading** | Skeleton loaders, pulse lines | Subtle shimmer placeholders matching container dimensions | Automatic replacement upon API payload resolve |
| **2. Empty** | Clean illustration, informative text | "No applications received yet for this job position." | Primary CTA: `[ Share Job Posting ]` or `[ Adjust Filters ]` |
| **3. Error** | Non-intrusive banner / inline alert | "Unable to process candidate data. (HTTP 500)" | Primary CTA: `[ Retry Action ]` |
| **4. Success** | Toast notification, checkmark badge | "Candidate Alex Morgan moved to Shortlisted status." | Auto-dismiss after 4 seconds with `[ Undo ]` action |
| **5. No Results** | Search empty container | "No candidates match 'Kubernetes' with >85% Match Score." | `[ Clear Filters ]` or `[ Lower Match Threshold ]` |
| **6. Permission Denied** | Security shield icon, locked state | "Recruiter level access required to perform shortlisting." | CTA: `[ Request Access ]` or `[ Switch Account ]` |
| **7. Network Failure** | Offline banner at top of viewport | "Network connection lost. Retrying connection..." | Auto-reconnect polling + `[ Manual Retry ]` |
| **8. Processing** | Progress bar / spinner button | "Saving requisition details..." | Disabled button state to prevent duplicate submissions |
| **9. AI Processing** | Glowing AI aura animation | "VEYRA AI is analyzing candidate skill graph..." | Non-blocking background process indicator |
| **10. Resume Parsing** | Document scanning shimmer | "Extracting skills, experience, and education from resume..." | Visual step checklist (Parsing → Extracting → Mapping) |
| **11. Match Calculation** | Dynamic percentage loader | "Computing TF-IDF vector similarity & fuzzy skill match..." | Real-time score ticker |
| **12. Interview Prep** | System check checklist | "Verifying audio input device & microphone permissions..." | `[ Test Microphone ]` and `[ Start Session ]` |
| **13. Interview Complete**| Evaluation badge, celebration icon | "AI Interview completed! Evaluating candidate responses..." | `[ View Preliminary Score ]` |
