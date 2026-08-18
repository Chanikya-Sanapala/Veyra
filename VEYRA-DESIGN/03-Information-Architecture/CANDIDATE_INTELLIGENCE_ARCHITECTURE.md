# VEYRA — Candidate Intelligence Information Architecture

> [!IMPORTANT]
> **Core Product Philosophy:** "AI evaluates. Humans decide."
> Candidate Intelligence is a unified composite information layer combining 5 underlying signal vectors. It provides decision support for recruiters without taking autonomous hiring actions.

---

## 1. Candidate Intelligence Signal Composition

```
  ┌───────────────────────┐
  │   Resume Match (94%)  │
  └───────────┬───────────┘
              │
  ┌───────────┴───────────┐
  │   Skills Graph (96%)  │
  └───────────┬───────────┘
              │
  ┌───────────┴───────────┐     ┌───────────────────────────────┐
  │  Experience Fit (90%) ├────►│     CANDIDATE INTELLIGENCE    │
  └───────────┬───────────┘     │      COMPOSITE SCORE: 93%     │
              │                 │        [ STRONG MATCH ]       │
  ┌───────────┴───────────┐     └───────────────────────────────┘
  │ Project Relevance(94%)│
  └───────────┬───────────┘
              │
  ┌───────────┴───────────┐
  │ AI Interview Eval(91%)│
  └───────────────────────┘
```

---

## 2. Information Structure of Candidate Intelligence Drawer

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ CANDIDATE INTELLIGENCE: ALEX MORGAN                      OVERALL FIT: 93%   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. EXECUTIVE AI SYNTHESIS                                                   │
│    3-sentence summary of candidate strength, experience depth, and fit.     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. COMPOSITE SIGNAL BREAKDOWN                                               │
│    - Resume Match: 94% | Skills: 96% | Experience: 90%                      │
│    - Projects: 94%     | AI Interview: 91%                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. VERIFIED COMPETENCIES MATRIX                                             │
│    - React.js [Verified via Projects & Interview]                           │
│    - Node.js  [Verified via Resume & Interview]                             │
│    - Kubernetes [Identified Skill Gap]                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. HUMAN RECRUITER DECISION & OVERRIDE ACTIONS                              │
│    [ Recruiter Notes Text Area ]                                            │
│    [ Shortlist Candidate ]  [ Schedule Final Interview ]  [ Extend Offer ]  │
│    [ Override AI Rating ]                                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Human Control & Non-Autonomous Decision Rule
- The AI Composite Score (93%) is explicitly labeled as **"Decision Support Signal"**.
- Recruiters have full authority to override ratings, add manual evaluation notes, and manually advance candidates across pipeline stages (`Applied` → `Shortlisted` → `Interview` → `Offer` → `Hired`).
