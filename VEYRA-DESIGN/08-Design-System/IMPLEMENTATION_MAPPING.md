# VEYRA — Implementation Mapping Architecture

Maps design tokens to Next.js 15 + Tailwind CSS v4 variables:

```css
@theme {
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-surface: #FFFFFF;
  --color-background: #F8FAFC;
  --color-border: #E2E8F0;
  --font-inter: 'Inter', sans-serif;
}
```

React Component Mapping Strategy:
- `Button` → `components/ui/Button.jsx`
- `Badge` → `components/ui/Badge.jsx`
- `Card` → `components/ui/Card.jsx`
- `MatchScore` → `components/ui/MatchScore.jsx`
