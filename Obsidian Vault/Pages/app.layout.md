---
tags: [page]
---

# app/layout

`src/app/layout.tsx`

Root Next.js layout: loads Geist fonts, wraps the app in next-themes ThemeProvider (class-based, system default) and renders the global Toaster and page metadata.

## Depends on

- [[components.ui.sonner]] — Exports Toaster, a themed wrapper around the 'sonner' toast library (using next-themes) with custom success/info/warning/error/loading icons for app-wide toast notifications (e.g. upload success/failure).

## Used by

*Not imported elsewhere in `src/`.*
