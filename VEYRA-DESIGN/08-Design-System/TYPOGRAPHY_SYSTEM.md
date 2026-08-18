# VEYRA — Typography System Architecture

> [!IMPORTANT]
> **Primary Font Selection:** **`Inter`** (Variable Font).
> *Evaluation Rationale:* Selected over Manrope due to superior legibility at small sizes (table data, candidate metadata), tabular numeric support (`font-variant-numeric: tabular-nums`), and extensive browser performance optimization.

---

## 1. Type Scale & Hierarchy Specs

| Style Role | Font Weight | Desktop Size / Line Height | Mobile Size / Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | 700 (Bold) | `48px / 56px` (3rem) | `36px / 44px` (2.25rem) | `-0.02em` |
| **H1 (Page Title)** | 700 (Bold) | `36px / 44px` (2.25rem) | `28px / 36px` (1.75rem) | `-0.02em` |
| **H2 (Section Header)**| 600 (SemiBold) | `24px / 32px` (1.5rem) | `20px / 28px` (1.25rem) | `-0.01em` |
| **H3 (Card Header)** | 600 (SemiBold) | `18px / 26px` (1.125rem) | `16px / 24px` (1rem) | `0em` |
| **H4 (Sub-heading)** | 600 (SemiBold) | `16px / 24px` (1rem) | `14px / 20px` (0.875rem) | `0em` |
| **Body Large** | 400 (Regular) | `16px / 24px` (1rem) | `15px / 22px` (0.9375rem) | `0em` |
| **Body Default** | 400 (Regular) | `14px / 20px` (0.875rem) | `14px / 20px` (0.875rem) | `0em` |
| **Body Small** | 400 (Regular) | `13px / 18px` (0.8125rem) | `13px / 18px` (0.8125rem) | `0em` |
| **Caption / Meta** | 500 (Medium) | `12px / 16px` (0.75rem) | `12px / 16px` (0.75rem) | `0.01em` |
| **Label / Button** | 600 (SemiBold) | `14px / 20px` (0.875rem) | `14px / 20px` (0.875rem) | `0.01em` |
