---
tags: [page]
---

# search/page

`src/app/search/page.tsx`

Client component providing debounced file search UI (name query + type filter) that calls GET /api/search, renders results as FileCards, and supports favorite/delete/preview actions.

## Depends on

- [[components.ui.input]] — Exports a styled Input wrapping @base-ui/react/input, a single text/file input control used across forms (rename, search, login) with focus/invalid/disabled styling.
- [[components.ui.button]] — Exports Button and buttonVariants wrapping @base-ui/react/button with cva variants (default/outline/secondary/ghost/destructive/link) and size options (xs-lg, icon) used app-wide for actions like upload/delete/share.
- [[components.files.file-card]] — Renders a single FileItem tile (thumbnail via /api/files/[id]/thumbnail, size, favorite star, dropdown menu for download/rename/favorite/delete) in the file grid.
- [[components.files.file-preview]] — Full-screen lightbox overlay that streams a file from /api/files/[id]/download (image/video preview), supports keyboard/arrow prev-next navigation, favoriting, and download.
- [[types.index]] — Shared TypeScript types (FileItem, FolderItem, UploadProgress, SearchParams) mirroring the Prisma File/Folder/Tag models for client-side use.

## Used by

*Not imported elsewhere in `src/`.*
