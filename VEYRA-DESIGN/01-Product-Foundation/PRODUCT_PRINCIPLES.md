# VEYRA — Product & Design Principles

---

## Principle 1: AI Evaluates. Humans Decide.
AI models compute scores, extract insights, and evaluate response quality, but VEYRA never makes autonomous hiring or rejection decisions. The platform functions strictly as a high-precision decision-support engine for recruiters and hiring managers.

---

## Principle 2: Explain the Score.
Never present a raw score in isolation (e.g. simply showing "94% Match"). Every match score must be backed by a clear component breakdown:

```
Total Resume Match Score: 94%

 breakdown:
 - Skills Alignment:      96%
 - Experience Depth:      91%
 - Project Relevance:     94%
 - Education Relevance:   88%
 - Role Relevance:        95%

Strengths:
 - Strong alignment in Node.js, React, and MongoDB.
 - Project history aligns directly with microservice architecture requirements.

Skill Gaps:
 - AWS Lambda experience not explicitly detailed in resume.
```

---

## Principle 3: Evidence Over Hype.
Avoid generic AI buzzwords or meaningless claims. Ground all AI insights in concrete evidence—extracted resume text, verified skill graphs, quantifiable project outcomes, and recorded interview response transcripts.

---

## Principle 4: Product-First Design.
The platform design should highlight real, interactive product interfaces and functional data visualizations rather than decorative vector illustrations or stock imagery. UI components must demonstrate active utility.

---

## Principle 5: Simple Over Complicated.
Complex talent intelligence algorithms should be presented through clean, structured, and legible visual layouts. Avoid visual clutter, redundant controls, or unnecessary steps in recruiter and candidate workflows.

---

## Principle 6: Accessibility First.
Ensure inclusive user experience across all interfaces. Maintain WCAG 2.1 AA compliant color contrast, keyboard navigable components, screen-reader friendly markup, and accessible semantic HTML across recruiters and candidates views.

---

## Principle 7: Performance Is Part of Design.
Fast response times, smooth screen transitions, and rapid data loading are critical to user trust. Visual design must be lightweight and optimized for quick rendering without unnecessary animation overhead.

---

## Principle 8: Mobile Is Not an Afterthought.
All candidate workflows (job discovery, application, profile building, match score review, and AI interviews) and core recruiter actions (candidate review, scoring, status updates) must offer fully responsive, native-feeling experiences on mobile and tablet screens.

---

## Principle 9: Reusable Design System.
Establish a consistent, modular UI component design system across the platform. Layouts, color tokens, typography scales, cards, modals, and buttons must adhere to unified visual rules for maximum scalability.

---

## Principle 10: Preserve Existing Business Logic.
During all phases of UI and brand redesign, the underlying CHANIX application architecture—backend endpoints, MongoDB schemas, JWT authentication, Python AI matching algorithms, and scoring logic—must be preserved intact.
