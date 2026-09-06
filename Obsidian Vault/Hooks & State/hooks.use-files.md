---
tags: [hook]
---

# use-files

`src/hooks/use-files.ts`

Client SWR hooks (useFiles, usePhotos, useFavorites) that GET /api/files with folderId/photosOnly/favoritesOnly query params, returning FileItem/FolderItem arrays plus mutate.

## Depends on

- [[types.index]] — Shared TypeScript types (FileItem, FolderItem, UploadProgress, SearchParams) mirroring the Prisma File/Folder/Tag models for client-side use.

## Used by

- [[app.drive.(folderId).page]] — Client component rendering a specific Drive folder: fetches files/folders via useFiles(folderId), wires upload/create/rename/delete/favorite handlers (calling /api/files and /api/folders) and renders FileGrid, DropZone, FilePreview, and CreateFolderDialog.
- [[app.drive.page]] — Client component for the Drive root (no folderId): fetches root-level files/folders via useFiles(null), handles upload/create/rename/delete/favorite actions against /api/files and /api/folders, and renders FileGrid/FilePreview.
- [[app.favorites.page]] — Client component listing starred files via useFavorites(), letting users toggle favorite status or delete a file (PATCH/DELETE to /api/files/[id]) and preview it in FilePreview.
- [[app.photos.page]] — Client component showing image-type Files grouped by date-taken (via usePhotos()), rendering a lazy-loaded thumbnail grid (/api/files/[id]/thumbnail) with FilePreview on click.
