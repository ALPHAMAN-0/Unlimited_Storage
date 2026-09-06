---
tags: [ui-primitive]
---

# sonner

`src/components/ui/sonner.tsx`

Exports Toaster, a themed wrapper around the 'sonner' toast library (using next-themes) with custom success/info/warning/error/loading icons for app-wide toast notifications (e.g. upload success/failure).

## Depends on

*No local dependencies — leaf module.*

## Used by

- [[app.layout]] — Root Next.js layout: loads Geist fonts, wraps the app in next-themes ThemeProvider (class-based, system default) and renders the global Toaster and page metadata.
