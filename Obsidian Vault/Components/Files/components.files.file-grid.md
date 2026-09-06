---
tags: [component-files]
---

# file-grid

`src/components/files/file-grid.tsx`

Lays out FolderCard and FileCard grids for a directory view, showing an empty-state illustration when no files or folders exist and wiring click/rename/delete/favorite callbacks.

## Depends on

- [[components.files.file-card]] — Renders a single FileItem tile (thumbnail via /api/files/[id]/thumbnail, size, favorite star, dropdown menu for download/rename/favorite/delete) in the file grid.
- [[components.files.folder-card]] — Renders a FolderItem as a clickable card linking to /drive/[folderId], showing child file/folder counts and a rename/delete dropdown menu.
- [[types.index]] — Shared TypeScript types (FileItem, FolderItem, UploadProgress, SearchParams) mirroring the Prisma File/Folder/Tag models for client-side use.

## Used by

- [[app.drive.(folderId).page]] — Client component rendering a specific Drive folder: fetches files/folders via useFiles(folderId), wires upload/create/rename/delete/favorite handlers (calling /api/files and /api/folders) and renders FileGrid, DropZone, FilePreview, and CreateFolderDialog.
- [[app.drive.page]] — Client component for the Drive root (no folderId): fetches root-level files/folders via useFiles(null), handles upload/create/rename/delete/favorite actions against /api/files and /api/folders, and renders FileGrid/FilePreview.
