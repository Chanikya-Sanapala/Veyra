# VEYRA — AI Interview UX Architecture

> [!IMPORTANT]
> **Stage 02 UX Specification:** Defines the end-to-end candidate and recruiter interactive experience for AI-powered structured interviews without modifying the underlying Python/Node backend interview APIs.

---

## 1. The 3 Major AI Interview Stages

```
┌────────────────────────────────┐
│      1. BEFORE INTERVIEW       │  Prep, system checks, instructions, evaluation criteria
└───────────────┬────────────────┘
                │
                ▼
┌────────────────────────────────┐
│      2. DURING INTERVIEW       │  Interactive question delivery, timer, voice/text response
└───────────────┬────────────────┘
                │
                ▼
┌────────────────────────────────┐
│       3. AFTER INTERVIEW       │  AI scoring report, category evaluation, transcript playback
└────────────────────────────────┘
```

---

## 2. Phase 1: Before Interview (Preparation Screen)

- **Header:** Job Requisition Title (e.g., *Senior Full Stack Engineer*).
- **Session Specifications:** 10 Questions | ~25 Minutes Estimated Duration.
- **Evaluation Criteria Overview:**
  - Technical Knowledge & Architectural Logic
  - Problem Solving & Analytical Thinking
  - Communication Clarity & Professional Articulation
  - Role-Specific Domain Proficiency
- **Interactive Controls:**
  - Microphones & Audio Input Hardware Test Widget.
  - Video Camera Preview (optional/supported).
  - Clear Instructions Accordion.
  - Primary CTA Button: `[ Start AI Interview ]`.

---

## 3. Phase 2: During Interview (Active Session Screen)

- **Header Bar:** Progress Indicator (`Question 04 / 10`), Session Countdown Timer (`12:42 remaining`).
- **Question Display Card:** High-contrast, legible typography presenting the current AI prompt:
  > *"How would you design a scalable RESTful API architecture to handle sudden spikes in high-traffic write requests?"*
- **Audio TTS Widget:** Speaker icon to listen to AI-generated question audio.
- **Response Section:**
  - Dual Input Mode: Live Speech-to-Text Voice Recording (`[ Record Answer ]`) or Direct Text Area (`[ Type Answer ]`).
  - Audio Waveform Visualizer during active recording.
- **Footer Navigation:** `[ Previous Question ]` | `[ Submit & Next Question ]`.

---

## 4. Phase 3: After Interview (Evaluation & Intelligence View)

Presented to recruiters upon completion and summarised for candidates:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       OVERALL INTERVIEW SCORE: 91%                          │
│                                [ PASSED ]                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Evaluation Categories:                                                     │
│  - Technical Knowledge:      ████████████████████░░  95%                    │
│  - Problem Solving:          ██████████████████░░░░  90%                    │
│  - Communication Clarity:    ███████████████████░░░  92%                    │
│  - Role Domain Alignment:    █████████████████░░░░░  87%                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  AI Summary & Analysis:                                                     │
│  "Candidate demonstrated thorough understanding of microservice messaging   │
│   queues and caching layers. Clear communication throughout response."       │
│                                                                             │
│  Key Strengths:                                                             │
│  - Articulated Redis pub/sub pattern accurately for rate limiting.          │
│  - Highlighted database indexing strategies for write optimization.         │
│                                                                             │
│  Potential Concerns:                                                        │
│  - Did not mention circuit breaker pattern when discussing service failure. │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Error & Fallback States
- **Microphone Permission Denied:** "Audio input access required for voice response mode. Enable permissions or switch to Text Response Mode."
- **Network Failure During Session:** "Connection interrupted. Your progress up to Question 04 has been saved locally. [ Resume Session ]"
- **AI Processing Delay:** "Generating interview transcript and evaluation score... Please wait."
