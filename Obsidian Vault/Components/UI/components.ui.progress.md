---
tags: [ui-primitive]
---

# progress

`src/components/ui/progress.tsx`

Wraps @base-ui/react/progress into Progress/Track/Indicator/Label/Value, rendering an upload/download progress bar with numeric value display.

## Depends on

- [[lib.utils]] — Exports the cn() helper that merges Tailwind class names via clsx and tailwind-merge, used throughout UI components for conditional styling.

## Used by

- [[components.upload.upload-progress]] — Fixed-position panel reading the Zustand useUploadStore to list in-flight uploads with per-file progress bars, status icons, remove/clear-completed actions.
