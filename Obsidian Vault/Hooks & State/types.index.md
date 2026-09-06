---
tags: [types]
---

# types/index

`src/types/index.ts`

Shared TypeScript types (FileItem, FolderItem, UploadProgress, SearchParams) mirroring the Prisma File/Folder/Tag models for client-side use.

## Depends on

*No local dependencies — leaf module.*

## Used by

- [[app.drive.(folderId).page]] — Client component rendering a specific Drive folder: fetches files/folders via useFiles(folderId), wires upload/create/rename/delete/favorite handlers (calling /api/files and /api/folders) and renders FileGrid, DropZone, FilePreview, and CreateFolderDialog.
- [[app.drive.page]] — Client component for the Drive root (no folderId): fetches root-level files/folders via useFiles(null), handles upload/create/rename/delete/favorite actions against /api/files and /api/folders, and renders FileGrid/FilePreview.
- [[app.favorites.page]] — Client component listing starred files via useFavorites(), letting users toggle favorite status or delete a file (PATCH/DELETE to /api/files/[id]) and preview it in FilePreview.
- [[app.photos.page]] — Client component showing image-type Files grouped by date-taken (via usePhotos()), rendering a lazy-loaded thumbnail grid (/api/files/[id]/thumbnail) with FilePreview on click.
- [[app.search.page]] — Client component providing debounced file search UI (name query + type filter) that calls GET /api/search, renders results as FileCards, and supports favorite/delete/preview actions.
- [[components.files.file-card]] — Renders a single FileItem tile (thumbnail via /api/files/[id]/thumbnail, size, favorite star, dropdown menu for download/rename/favorite/delete) in the file grid.
- [[components.files.file-grid]] — Lays out FolderCard and FileCard grids for a directory view, showing an empty-state illustration when no files or folders exist and wiring click/rename/delete/favorite callbacks.
- [[components.files.file-preview]] — Full-screen lightbox overlay that streams a file from /api/files/[id]/download (image/video preview), supports keyboard/arrow prev-next navigation, favoriting, and download.
- [[components.files.folder-card]] — Renders a FolderItem as a clickable card linking to /drive/[folderId], showing child file/folder counts and a rename/delete dropdown menu.
- [[hooks.use-files]] — Client SWR hooks (useFiles, usePhotos, useFavorites) that GET /api/files with folderId/photosOnly/favoritesOnly query params, returning FileItem/FolderItem arrays plus mutate.
- [[stores.upload-store]] — Zustand store (useUploadStore) tracking in-flight UploadProgress entries with addUpload/updateUpload/removeUpload/clearCompleted actions for the upload UI.
