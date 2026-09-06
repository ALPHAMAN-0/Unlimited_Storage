---
tags: [component-layout]
---

# topbar

`src/components/layout/topbar.tsx`

Header bar with a search form (navigates to /search?q=...), New Folder button, and hidden multi-file input wired to onUpload/onCreateFolder callback props for drive pages.

## Depends on

- [[components.ui.input]] — Exports a styled Input wrapping @base-ui/react/input, a single text/file input control used across forms (rename, search, login) with focus/invalid/disabled styling.
- [[components.ui.button]] — Exports Button and buttonVariants wrapping @base-ui/react/button with cva variants (default/outline/secondary/ghost/destructive/link) and size options (xs-lg, icon) used app-wide for actions like upload/delete/share.

## Used by

- [[app.drive.(folderId).page]] — Client component rendering a specific Drive folder: fetches files/folders via useFiles(folderId), wires upload/create/rename/delete/favorite handlers (calling /api/files and /api/folders) and renders FileGrid, DropZone, FilePreview, and CreateFolderDialog.
- [[app.drive.page]] — Client component for the Drive root (no folderId): fetches root-level files/folders via useFiles(null), handles upload/create/rename/delete/favorite actions against /api/files and /api/folders, and renders FileGrid/FilePreview.
- [[app.favorites.page]] — Client component listing starred files via useFavorites(), letting users toggle favorite status or delete a file (PATCH/DELETE to /api/files/[id]) and preview it in FilePreview.
- [[app.photos.page]] — Client component showing image-type Files grouped by date-taken (via usePhotos()), rendering a lazy-loaded thumbnail grid (/api/files/[id]/thumbnail) with FilePreview on click.
