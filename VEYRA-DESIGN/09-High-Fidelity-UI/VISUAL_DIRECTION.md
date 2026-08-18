# VEYRA — Visual Direction & Brand Identity System

## 1. Visual Brand Philosophy
- **Identity:** VEYRA — AI-powered Talent Intelligence Platform.
- **Visual Personality:** Professional, Light-First, Calm, Modern, Enterprise-Ready, Precise, Human.
- **Prohibited Aesthetics:** No dark supercar themes, no cyberpunk neon, no floating glassmorphism, no 3D robot graphics, no sci-fi sparkles.

---

## 2. Palette & Semantic Token Specification

```typescript
export const colorPalette = {
  primary: '#2563EB',         // VEYRA Primary Blue
  primaryDark: '#1E40AF',     // VEYRA Hover / Active Blue
  canvas: '#FFFFFF',          // Pure White Canvas Background
  surface: '#F8FAFC',         // Slate-50 Component Surface
  text: '#0F172A',            // Slate-900 Primary Body & Heading Text
  secondaryText: '#475569',   // Slate-600 Muted / Secondary Text
  border: '#E2E8F0',          // Slate-200 Component Border
  status: {
    success: '#059669',       // Emerald Success / Hired Badge
    warning: '#D97706',       // Amber Warning / Skill Gap Badge
    danger:  '#DC2626',       // Red Danger / Rejected Badge
    info:    '#2563EB',       // Info / Active Stage Badge
  }
};
```

---

## 3. Typography Architecture (Inter Font Family)
- **Display Heading:** `48px / 56px` (Bold 700, letter-spacing `-0.02em`).
- **H1 (Page Header):** `36px / 44px` (Bold 700, letter-spacing `-0.02em`).
- **H2 (Section Title):** `24px / 32px` (SemiBold 600, letter-spacing `-0.01em`).
- **H3 (Card Header):** `18px / 26px` (SemiBold 600).
- **Body Default:** `14px / 20px` (Regular 400). Tabular numbers enabled (`font-variant-numeric: tabular-nums`).
- **Badges & Labels:** `12px / 16px` (Medium 500 / SemiBold 600).
