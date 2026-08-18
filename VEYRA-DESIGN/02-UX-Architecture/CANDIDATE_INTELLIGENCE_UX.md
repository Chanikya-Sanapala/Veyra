# VEYRA — Candidate Intelligence UX Architecture

> [!IMPORTANT]
> **Core Product Concept:** Candidate Intelligence is the unified composite view that aggregates all signal vectors into a single actionable decision matrix for recruiters:
> `Resume Match Score + Skills Graph + Experience Fit + Project Relevance + AI Interview Results = Candidate Intelligence`

---

## 1. Candidate Intelligence Composite Card

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             CANDIDATE INTELLIGENCE                          │
│                                 ALEX MORGAN                                 │
│                        Target Role: Sr Full Stack Engineer                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                         OVERALL CANDIDATE SCORE: 93%                        │
│                               [ STRONG MATCH ]                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  Primary Signal Breakdown:                                                  │
│  - Resume Match Score:       ███████████████████░░  94%                     │
│  - Technical Skills Matrix:  ████████████████████░  96%                     │
│  - AI Interview Evaluation:  ██████████████████░░░  91%                     │
│  - Experience Relevance:     ██████████████████░░░  90%                     │
│  - Project Alignment:        ███████████████████░░  94%                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Information Architecture of Candidate Intelligence Drawer

The recruiter accesses candidate intelligence via a slide-over panel or dedicated profile tab containing 5 structured sections:

### Section 1: Executive AI Summary
- 3-sentence synthesis of overall candidate suitability.
- Highlights primary domain alignment and standout accomplishments.

### Section 2: Verified Technical Competencies
- Visual tag matrix comparing Job Required Skills vs Candidate Skills.
- Badges: `Verified via Project` | `Verified via AI Interview` | `Claimed in Resume`.

### Section 3: Project Depth & Practical Relevance
- Interactive list of candidate projects.
- Technology stack tags, github repository links, and relevance score percentage.

### Section 4: AI Interview Transcript Highlights
- Audio playback scrubber for candidate answers.
- Automated transcript snippet highlights for technical questions.

### Section 5: Risk Analysis & Suggested Recruiter Interview Questions
- Identifies missing domain experience (e.g. "Candidate has limited experience with AWS CloudFormation").
- Generates 3 targeted questions for the human recruiter's final interview round.

---

## 3. Human-In-The-Loop Enforcement ("AI Evaluates. Humans Decide.")

To prevent automated bias or algorithmic over-reliance, the Candidate Intelligence view embeds human action controls:

```
[ Override AI Recommendation ]    [ Add Recruiter Note ]    [ Move to Shortlisted ]    [ Select / Hire Candidate ]
```

- **Recruiter Notes:** Allows hiring managers to record manual interview notes alongside AI scores.
- **Score Override:** Option for recruiters to manually adjust candidate status regardless of computed match score, ensuring human decision authority.
