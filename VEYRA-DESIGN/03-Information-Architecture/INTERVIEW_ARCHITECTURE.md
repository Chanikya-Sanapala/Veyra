# VEYRA — AI Interview Information Architecture

> [!IMPORTANT]
> Mapped directly to existing CHANIX backend routes (`/api/interviews`), model (`Interview.js`), and Python AI engine (`ai/interview.py`, `ai/question_gen.py`).

---

## 1. Interview Workflow State Machine

```
┌─────────────────────────┐
│  Interview Preparation  │ Overview, rules, duration (~25 mins), evaluation categories
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│     Hardware Check      │ Microphone permission test, audio input volume preview
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│    Active Session       │ Question delivery (1/10 to 10/10), timer, audio/text recorder
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  Evaluation & Scoring   │ Automated response scoring via AI engine
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  Results & Transcripts  │ Overall score (91%), category radar, transcript playback
└─────────────────────────┘
```

---

## 2. Recruiter Interview Information View (`/dashboard/interviews/:id`)

When recruiters inspect completed AI interviews:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ AI INTERVIEW EVALUATION: ALEX MORGAN                      SCORE: 91% PASSED │
│ Requisition: Sr Full Stack Engineer | Completed: Aug 14, 2026               │
├─────────────────────────────────────────────────────────────────────────────┤
│  CATEGORY BREAKDOWN:                                                        │
│  - Technical Knowledge: 95%   - Problem Solving: 90%                        │
│  - Communication: 92%         - Domain Proficiency: 87%                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  AI EVALUATION SUMMARY & RECOMMENDATION:                                    │
│  "Candidate demonstrated thorough knowledge of REST API design and Redis.   │
│   Strong candidate recommendation for final hiring manager interview."      │
├─────────────────────────────────────────────────────────────────────────────┤
│  QUESTION TRANSCRIPTS & AUDIO RECORDINGS:                                   │
│  - Question 01: API Scaling Architecture   [ ▶ Play Audio ] [ View Text ]   │
│  - Question 02: Database Indexing Strategy [ ▶ Play Audio ] [ View Text ]   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Candidate Active Interview View (`/candidate/interviews/:token`)

- **Header:** Question Counter (`Question 04 / 10`), Session Timer (`12:42`).
- **Prompt Display:** Clear question text + Listen icon (`🔊 Audio Prompt`).
- **Response Section:** Live Speech-to-Text Voice Recording (`[ Record Answer ]`) or Direct Text Entry (`[ Type Answer ]`).
- **Controls:** `[ Previous ]` | `[ Submit & Next Question ]`.
