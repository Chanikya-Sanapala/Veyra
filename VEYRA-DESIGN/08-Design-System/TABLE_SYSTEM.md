# VEYRA — Table System Architecture

## 1. Recruiter Applicant Data Table Specifications
- **Header Row:** Height `44px`, Background `#F8FAFC`, Text `#64748B` (Uppercase 12px bold), Border Bottom `#E2E8F0`.
- **Data Rows:** Height `64px`, Background `#FFFFFF`, Hover State `#F8FAFC`, Border Bottom `#F1F5F9`.
- **Numeric Columns:** Right-aligned with tabular font feature (`font-variant-numeric: tabular-nums`).

---

## 2. Table Column Structure & Badges

| Candidate Column | Match Score Column | Status Column | Date Column | Action Column |
| :--- | :--- | :--- | :--- | :--- |
| Avatar + Full Name + Role | `94% Match` (Pill Badge) | `Interview` (Status Badge) | `Aug 12, 2026` | `[ View Intelligence ]` |

---

## 3. Mobile Transformation Rule
On screens `<768px`, data tables automatically transform into touch-friendly stacked **Candidate Cards**.
