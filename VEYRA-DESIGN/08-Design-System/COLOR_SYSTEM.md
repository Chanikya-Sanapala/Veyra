# VEYRA — Semantic Color System Architecture

> [!IMPORTANT]
> VEYRA establishes a **Light-First** visual language. Deep blues and slates build trust and high readability without visual fatigue.

---

## 1. Primitive Color Tokens Scale

### Primary VEYRA Blue Scale
- `primary-50`:  `#EFF6FF` (Subtle background highlight)
- `primary-100`: `#DBEAFE` (Subtle badge background)
- `primary-200`: `#BFDBFE` (Light border)
- `primary-300`: `#93C5FD` (Soft ring)
- `primary-400`: `#60A5FA` (Secondary element)
- `primary-500`: `#3B82F6` (Interactive element)
- `primary-600`: `#2563EB` (Primary Brand Action)
- `primary-700`: `#1D4ED8` (Primary Hover State)
- `primary-800`: `#1E40AF` (Primary Active State)
- `primary-900`: `#1E3A8A` (Deep Accent)

### Neutral Slate Scale
- `neutral-0`:   `#FFFFFF` (Pure White Canvas)
- `neutral-50`:  `#F8FAFC` (App Surface Background)
- `neutral-100`: `#F1F5F9` (Muted Card Surface)
- `neutral-200`: `#E2E8F0` (Default Border)
- `neutral-300`: `#CBD5E1` (Strong Border)
- `neutral-400`: `#94A3B8` (Disabled Text / Placeholder)
- `neutral-500`: `#64748B` (Secondary Text)
- `neutral-600`: `#475569` (Body Text Muted)
- `neutral-700`: `#334155` (Sub-heading Text)
- `neutral-800`: `#1E293B` (Primary Body Text)
- `neutral-900`: `#0F172A` (Heading Text & Deep Navy)
- `neutral-950`: `#020617` (Dark Mode Contrast Base)

---

## 2. Semantic Color Mapping

```typescript
export const semanticTokens = {
  background: {
    default: 'var(--neutral-50)',
    surface: 'var(--neutral-0)',
    muted: 'var(--neutral-100)',
    elevated: 'var(--neutral-0)',
  },
  foreground: {
    primary: 'var(--neutral-900)',
    secondary: 'var(--neutral-500)',
    muted: 'var(--neutral-400)',
    inverse: 'var(--neutral-0)',
  },
  primary: {
    default: 'var(--primary-600)',
    hover: 'var(--primary-700)',
    active: 'var(--primary-800)',
    subtle: 'var(--primary-50)',
  },
  status: {
    success: { main: '#059669', subtle: '#ECFDF5', text: '#065F46' },
    warning: { main: '#D97706', subtle: '#FFFBEB', text: '#92400E' },
    danger:  { main: '#DC2626', subtle: '#FEF2F2', text: '#991B1B' },
    info:    { main: '#2563EB', subtle: '#EFF6FF', text: '#1E40AF' },
  },
  border: {
    default: 'var(--neutral-200)',
    strong: 'var(--neutral-300)',
    focus: 'var(--primary-600)',
  }
};
```
