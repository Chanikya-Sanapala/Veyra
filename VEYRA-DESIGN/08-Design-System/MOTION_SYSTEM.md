# VEYRA — Motion System Architecture

> [!IMPORTANT]
> Integrated with **Framer Motion** (`framer-motion` dependency). Motion is subtle, fast (150-250ms), and respects `prefers-reduced-motion`.

---

## 1. Transition Timing Scale
- `duration-fast`: `150ms` — Hover states, button clicks, tab switches.
- `duration-normal`: `200ms` — Dropdowns, tooltips, accordion expansion.
- `duration-slow`: `250ms` — Modal dialog enter/exit, drawer slide-overs.

---

## 2. Easing Curves
- `ease-standard`: `cubic-bezier(0.2, 0.0, 0.0, 1.0)` — Default interface motion.
- `ease-in`: `cubic-bezier(0.3, 0.0, 1.0, 1.0)` — Exit transitions.
- `ease-out`: `cubic-bezier(0.0, 0.0, 0.2, 1.0)` — Entrance transitions.

---

## 3. Accessibility & Reduced Motion
- All Framer Motion variants check `useReducedMotion()` hook to disable scale and transform animations, defaulting to immediate opacity fade-ins.
