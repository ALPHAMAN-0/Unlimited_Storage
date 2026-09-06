---
tags: [ui-primitive]
---

# input

`src/components/ui/input.tsx`

Exports a styled Input wrapping @base-ui/react/input, a single text/file input control used across forms (rename, search, login) with focus/invalid/disabled styling.

## Depends on

- [[lib.utils]] — Exports the cn() helper that merges Tailwind class names via clsx and tailwind-merge, used throughout UI components for conditional styling.

## Used by

- [[app.search.page]] — Client component providing debounced file search UI (name query + type filter) that calls GET /api/search, renders results as FileCards, and supports favorite/delete/preview actions.
- [[components.files.create-folder-dialog]] — Modal dialog component with a name input that calls an onSubmit callback to create a new Folder, resetting state and closing on submit.
- [[components.layout.topbar]] — Header bar with a search form (navigates to /search?q=...), New Folder button, and hidden multi-file input wired to onUpload/onCreateFolder callback props for drive pages.
