---
tags: [ui-primitive]
---

# button

`src/components/ui/button.tsx`

Exports Button and buttonVariants wrapping @base-ui/react/button with cva variants (default/outline/secondary/ghost/destructive/link) and size options (xs-lg, icon) used app-wide for actions like upload/delete/share.

## Depends on

- [[lib.utils]] — Exports the cn() helper that merges Tailwind class names via clsx and tailwind-merge, used throughout UI components for conditional styling.

## Used by

- [[app.search.page]] — Client component providing debounced file search UI (name query + type filter) that calls GET /api/search, renders results as FileCards, and supports favorite/delete/preview actions.
- [[components.files.create-folder-dialog]] — Modal dialog component with a name input that calls an onSubmit callback to create a new Folder, resetting state and closing on submit.
- [[components.files.file-preview]] — Full-screen lightbox overlay that streams a file from /api/files/[id]/download (image/video preview), supports keyboard/arrow prev-next navigation, favoriting, and download.
- [[components.layout.topbar]] — Header bar with a search form (navigates to /search?q=...), New Folder button, and hidden multi-file input wired to onUpload/onCreateFolder callback props for drive pages.
- [[components.ui.dialog]] — Wraps @base-ui/react/dialog into Dialog/DialogTrigger/Content/Header/Footer/Title/Description for modal dialogs (e.g. rename, create-folder, confirm-delete prompts) with a Button-based close icon.
- [[components.ui.sheet]] — Wraps @base-ui/react/dialog (aliased as SheetPrimitive) into Sheet/Trigger/Content/Header/Footer/Title/Description implementing a slide-in side panel (top/right/bottom/left) e.g. for file details or filters.
