# VEYRA — Analytics Information Architecture

> [!IMPORTANT]
> Mapped directly to existing CHANIX backend routes ([`backend/src/routes/analyticsRoutes.js`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/backend/src/routes/analyticsRoutes.js)) and controller ([`analyticsController.js`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/backend/src/controllers/analyticsController.js)).

---

## 1. Recruiter Analytics Information Structure (`/dashboard/analytics`)

```
/dashboard/analytics
├── Volume Analytics            [Total Applicants, Monthly Applications]
├── Pipeline Funnel             [Applied → Shortlisted → Interview → Offer → Hired]
├── Requisition Breakdown       [Applications per Job Requisition]
├── Match Score Distribution    [High Fit (>80%), Medium Fit (60-80%), Low Fit (<60%)]
└── Recruitment Velocity        [Time to Hire, Funnel Conversion Rates]
```

---

## 2. Supported vs Future Analytics Classification

| Metric Category | Data Indicator / Metric | Status / Classification |
| :--- | :--- | :--- |
| **Volume Metrics** | Total Candidate Count | **`[EXISTING]`** (`/api/analytics`) |
| **Volume Metrics** | Applications This Month (30-day window) | **`[EXISTING]`** (`/api/analytics`) |
| **Volume Metrics** | Requisitions Count by Status (`Active`/`Closed`) | **`[EXISTING]`** (`/api/analytics`) |
| **Pipeline Metrics** | Candidates by DB Status (`Applied`, `Shortlisted`, `Interview`, `Hired`) | **`[EXISTING]`** (`/api/analytics`) |
| **Quality Metrics** | Average Resume Match Score across Applicants | **`[EXISTING]`** (`/api/analytics`) |
| **Quality Metrics** | Match Score Distribution (>80%, 60-80%, <60%) | **`[NEW BUT SUPPORTED]`** |
| **Velocity Metrics** | Average Time to Hire (days) | **`[FUTURE / REQUIRES BACKEND]`** |
| **Velocity Metrics** | Interview-to-Shortlist Conversion % | **`[FUTURE / REQUIRES BACKEND]`** |
| **Velocity Metrics** | Shortlist-to-Hire Conversion % | **`[FUTURE / REQUIRES BACKEND]`** |

---

## 3. Time Filter Controls
- **Available Time Ranges:** `7 Days` | `30 Days` | `3 Months` | `6 Months` | `1 Year`
