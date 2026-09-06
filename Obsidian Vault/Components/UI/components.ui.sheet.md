---
tags: [ui-primitive]
---

# sheet

`src/components/ui/sheet.tsx`

Wraps @base-ui/react/dialog (aliased as SheetPrimitive) into Sheet/Trigger/Content/Header/Footer/Title/Description implementing a slide-in side panel (top/right/bottom/left) e.g. for file details or filters.

## Depends on

- [[lib.utils]] — Exports the cn() helper that merges Tailwind class names via clsx and tailwind-merge, used throughout UI components for conditional styling.
- [[components.ui.button]] — Exports Button and buttonVariants wrapping @base-ui/react/button with cva variants (default/outline/secondary/ghost/destructive/link) and size options (xs-lg, icon) used app-wide for actions like upload/delete/share.

## Used by

*Not imported elsewhere in `src/`.*
