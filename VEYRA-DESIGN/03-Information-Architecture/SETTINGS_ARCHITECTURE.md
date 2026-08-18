# VEYRA — Settings Information Architecture

This document defines the settings hierarchy for Recruiter and Candidate environments, mapped to existing user account routes (`/api/profile`, `/api/auth`).

---

## 1. Recruiter Settings Hierarchy (`/dashboard/settings`)

```
/dashboard/settings
├── Account & Profile           [Name, Designation, Email, Password Change]
├── Company Information         [Company Name, Website, Industry, Logo]
├── Recruitment Preferences     [Default Match Score Thresholds]
├── Email & Notifications       [New Applicant Alerts, Interview Reminders]
└── Security & Password         [JWT Session Timeout, Password Update]
```

---

## 2. Candidate Settings Hierarchy (`/candidate/settings`)

```
/candidate/settings
├── Personal Account            [Name, Email, Phone Number, Password]
├── Job Alerts & Preferences    [Target Roles, Salary Expectations, Location]
├── Privacy & Visibility        [Profile Visibility, Recruiter Searchable]
├── Email Notifications         [Application Status Updates, Interview Invites]
└── Account Management          [Deactivate Account, Export Data]
```

---

## 3. Supported vs Future Settings Classification

- `Account Profile Edit`: **`[EXISTING]`** (`/api/profile/jobseeker`, `/api/profile/recruiter`)
- `Password Reset`: **`[EXISTING]`** (`/api/auth/reset-password`)
- `Company Metadata`: **`[EXISTING]`** (`RecruiterProfile.js`)
- `Notification Frequency Preferences`: **`[FUTURE / REQUIRES BACKEND]`**
- `Custom Match Threshold Defaults`: **`[FUTURE / REQUIRES BACKEND]`**
