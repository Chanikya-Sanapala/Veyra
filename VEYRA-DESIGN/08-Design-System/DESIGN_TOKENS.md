# VEYRA — Design Tokens Architecture

This document defines the 3-tier token flow:
`Primitive Tokens → Semantic Tokens → Component Tokens`

```json
{
  "primitive": {
    "blue": { "600": "#2563EB" },
    "slate": { "50": "#F8FAFC", "200": "#E2E8F0", "900": "#0F172A" }
  },
  "semantic": {
    "color": {
      "primary": "{primitive.blue.600}",
      "background": "{primitive.slate.50}",
      "surface": "#FFFFFF",
      "text": "{primitive.slate.900}",
      "border": "{primitive.slate.200}"
    }
  },
  "component": {
    "button": {
      "primary": {
        "background": "{semantic.color.primary}",
        "text": "#FFFFFF"
      }
    }
  }
}
```
