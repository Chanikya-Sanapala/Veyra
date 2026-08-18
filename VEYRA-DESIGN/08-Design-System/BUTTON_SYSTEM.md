# VEYRA — Button System Architecture

## 1. Button Variants & Token Specs

| Variant | Background Color | Text Color | Border Color | Hover State |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | `primary-600` (`#2563EB`) | `white` (`#FFFFFF`) | None | `primary-700` (`#1D4ED8`) |
| **Secondary** | `white` (`#FFFFFF`) | `neutral-800` (`#1E293B`) | `neutral-200` (`#E2E8F0`) | `neutral-50` (`#F8FAFC`) |
| **Ghost / Muted** | Transparent | `neutral-600` (`#475569`) | None | `neutral-100` (`#F1F5F9`) |
| **Destructive** | `danger-600` (`#DC2626`) | `white` (`#FFFFFF`) | None | `danger-700` (`#B91C1C`) |

---

## 2. Size Specifications
- **Small (`sm`):** Height `32px`, Padding `0 12px`, Font Size `13px` (Caption/Label).
- **Medium (`md`):** Height `40px` (Default), Padding `0 16px`, Font Size `14px` (Button).
- **Large (`lg`):** Height `48px`, Padding `0 24px`, Font Size `16px` (H4/Label).

---

## 3. Interactive States
- **Focus:** `outline-none ring-2 ring-primary-600 ring-offset-2`.
- **Disabled:** `opacity-50 pointer-events-none bg-neutral-100 text-neutral-400`.
- **Loading:** Displays 16px spinner icon, replaces left icon, preserves button dimensions.
