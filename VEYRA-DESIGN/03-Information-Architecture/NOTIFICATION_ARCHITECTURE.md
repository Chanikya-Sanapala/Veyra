# VEYRA — Notification Information Architecture

This document defines the trigger events, delivery channels, and message payload structures for Recruiter and Candidate notifications.

---

## 1. Recruiter Notification Triggers

```
EVENT: New Candidate Application Submitted
  ├── Delivery Channel: Email (Nodemailer) + In-App Toast
  └── Message: "New application received for Senior Full Stack Engineer from Alex Morgan (94% Match)."

EVENT: High-Match Candidate Alert (>90% Fit)
  ├── Delivery Channel: In-App Highlight Badge
  └── Message: "Top-tier candidate matched for AI/ML Engineer position."

EVENT: AI Interview Session Completed
  ├── Delivery Channel: Email + Notification Hub
  └── Message: "Alex Morgan completed AI Interview for Sr Full Stack Engineer (Score: 91% Passed)."
```

---

## 2. Candidate Notification Triggers

```
EVENT: Application Received Confirmation
  ├── Delivery Channel: Welcome Email + In-App Toast
  └── Message: "Application submitted successfully for Senior Full Stack Engineer at TechCorp."

EVENT: Candidate Shortlisted
  ├── Delivery Channel: Email + Dashboard Banner
  └── Message: "Great news! Your application for Senior Full Stack Engineer has been Shortlisted."

EVENT: AI Interview Invitation Received
  ├── Delivery Channel: Email + In-App Banner
  └── Message: "You're invited to complete a preliminary AI Interview session for Senior Full Stack Engineer."
```

---

## 3. Supported vs Future Notification Infrastructure

- `Welcome & Application Emails`: **`[EXISTING]`** ([`backend/src/routes/mail/emailService.js`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/backend/src/routes/mail/emailService.js))
- `Interview Invitation Emails`: **`[EXISTING]`** (`emailService.js` + `booking.py`)
- `In-App Real-time Notification Center (WebSockets)`: **`[FUTURE / REQUIRES BACKEND]`**
- `SMS / Push Notifications`: **`[FUTURE / REQUIRES BACKEND]`**
