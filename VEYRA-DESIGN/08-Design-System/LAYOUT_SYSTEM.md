# VEYRA — Layout System Architecture

This document defines the layout rules, viewport width limits, and structural primitives for Recruiter, Candidate, and Public interfaces.

---

## 1. Container Width Limits
- **Public Marketing Container:** `max-w-7xl` (`1280px`) centered.
- **Recruiter Dashboard Container:** `max-w-[1600px]` with fluid width for data tables.
- **Candidate Portal Container:** `max-w-6xl` (`1152px`) optimized for reading legibility.

---

## 2. Layout Structure Definitions
- **Recruiter Workspace Layout:**
  ```
  ┌───────────────────┬────────────────────────────────────────────────────────┐
  │  Sidebar (256px)  │  Header Bar (64px)                                     │
  │  Fixed Left Nav   ├────────────────────────────────────────────────────────┤
  │                   │  Main Scrollable Content Region                        │
  └───────────────────┴────────────────────────────────────────────────────────┘
  ```
- **Candidate Portal Layout:**
  ```
  ┌────────────────────────────────────────────────────────────────────────────┐
  │  Top Navbar (64px)                                                         │
  ├────────────────────────────────────────────────────────────────────────────┤
  │  Main Centered Content Container (max-w-6xl)                               │
  └────────────────────────────────────────────────────────────────────────────┘
  ```
