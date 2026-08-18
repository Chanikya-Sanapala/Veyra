# VEYRA — Flagship Screen 02: Resume Match Analysis UI Specification

> [!IMPORTANT]
> **Core AI Decision-Support Screen:** Displays transparent, multi-factor match ratings, verified strengths, missing skill gaps, and an AI assessment summary without making autonomous hiring decisions.

---

## 1. High-Fidelity Layout Structure

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CANDIDATE: ALEX MORGAN  •  REQUISITION: SENIOR FULL STACK ENGINEER            STATUS: [ INTERVIEW ]    │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  PRIMARY COMPOSITE SCORE CARD                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │                                          94% MATCH                                               │  │
│  │                                      [ STRONG MATCH ]                                            │  │
│  └──────────────────────────────────────────────────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  MULTI-FACTOR COMPONENT SUB-SCORES                                                                     │
│  - Skills Alignment:      ████████████████████░░  96%  (#2563EB)                                       │
│  - Experience Depth:      ██████████████████░░░░  91%  (#059669)                                       │
│  - Project Relevance:     ███████████████████░░░  94%  (#2563EB)                                       │
│  - Education Relevance:   █████████████████░░░░░  88%  (#7C3AED)                                       │
│  - Role Relevance:        ███████████████████░░░  95%  (#2563EB)                                       │
├────────────────────────────────────────────────────────────────────────┬───────────────────────────────┤
│  VERIFIED STRENGTHS                                                    │  IDENTIFIED SKILL GAPS        │
│  - ✓ React.js (Verified across 3 portfolio projects)                   │  - △ Kubernetes (Required)    │
│  - ✓ Node.js & Express (Exact match against core requirement)          │  - △ Redis (Preferred skill)  │
│  - ✓ MongoDB & Database Architecture (Extracted from resume)           │                               │
├────────────────────────────────────────────────────────────────────────┴───────────────────────────────┤
│  NATURAL LANGUAGE AI ASSESSMENT SUMMARY                                                                │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │  [ 💡 VEYRA AI INSIGHT ]                                                                         │  │
│  │  "Candidate demonstrates exceptional technical alignment across React, Node.js, and API           │  │
│  │   architecture. Minor skill gap identified in Kubernetes container orchestration."                │  │
│  │                                                                                                  │  │
│  │  ℹ️ AI-generated assessment to support human decision-making. Does not automate hiring decisions.  │  │
│  └──────────────────────────────────────────────────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  STICKY HUMAN RECRUITER DECISION ACTION BAR                                                            │
│  [ Add Recruiter Note ]       [ Shortlist Candidate ]       [ Move to Interview ]       [ Reject ]     │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Specs for Screen 02

### A. Primary Score Card
- Surface: `#FFFFFF`, Border: `1px solid #E2E8F0`, Radius: `12px`, Elevation: `shadow-md`.
- Score Display: `48px` Inter Bold `#1E40AF` with tabular number rendering.
- Qualifier Pill: `#EFF6FF` background, `#1E40AF` text, `9999px` radius.

### B. Sub-Score Progress Bars
- Skill Bar Fill: `#2563EB` (Primary Blue).
- Experience Bar Fill: `#059669` (Emerald Success).
- Role Relevance Fill: `#2563EB`.
- Track Background: `#F1F5F9` (`neutral-100`).

### C. Strengths & Skill Gap Cards
- Verified Strengths Card: Background `#ECFDF5`, Border `#A7F3D0`, Icon `✓` Emerald Green.
- Skill Gap Card: Background `#FFFBEB`, Border `#FDE68A`, Icon `△` Amber.

### D. Sticky Human Decision Bar
- Position: Sticky bottom container (`height: 64px`, background `#FFFFFF`, top border `1px solid #E2E8F0`).
- Primary Actions: `[ Shortlist ]` (`bg-primary-600`), `[ Move to Interview ]` (`bg-indigo-600`), `[ Reject ]` (`bg-danger-600 text-white`).
