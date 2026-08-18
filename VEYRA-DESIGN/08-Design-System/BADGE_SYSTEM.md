# VEYRA — Badge System Architecture

> [!IMPORTANT]
> **Strict Rule:** Resume Match Score Badges and Application Status Badges MUST remain visually distinct. They must never be confused for the same semantic category.

---

## 1. Resume Match Score Badges vs Application Status Badges

```
┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
│       RESUME MATCH SCORE BADGES      │     │      APPLICATION STATUS BADGES       │
├──────────────────────────────────────┤     ├──────────────────────────────────────┤
│ Format: Circular score pill          │     │ Format: Rectangular status tag       │
│ Style: Solid background + % symbol   │     │ Style: Sub-colored fill + text label │
│                                      │     │                                      │
│  [ 94% Match ] (Primary Blue Fill)   │     │  [ Applied ]     (Slate Subtle Fill) │
│  [ 82% Match ] (Emerald Fill)        │     │  [ Shortlisted ] (Blue Subtle Fill)  │
│  [ 68% Match ] (Amber Fill)          │     │  [ Interview ]   (Indigo Subtle Fill)│
│  [ 42% Match ] (Red Fill)            │     │  [ Offer ]       (Purple Subtle Fill)│
│                                      │     │  [ Hired ]       (Emerald Fill)      │
│                                      │     │  [ Rejected ]    (Red Subtle Fill)   │
└──────────────────────────────────────┘     └──────────────────────────────────────┘
```

---

## 2. Skill Badges & AI Insight Badges
- **Skill Tag Badge:** `#F1F5F9` background, `#334155` text, `4px` radius. (e.g. `React.js`).
- **AI Verified Skill Badge:** `#EFF6FF` background, `#1E40AF` text, with verified checkmark icon (`✓ React.js`).
