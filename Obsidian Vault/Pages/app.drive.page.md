---
tags: [page]
---

# drive/page

`src/app/drive/page.tsx`

Client component for the Drive root (no folderId): fetches root-level files/folders via useFiles(null), handles upload/create/rename/delete/favorite actions against /api/files and /api/folders, and renders FileGrid/FilePreview.

## Depends on

- [[components.layout.topbar]] — Header bar with a search form (navigates to /search?q=...), New Folder button, and hidden multi-file input wired to onUpload/onCreateFolder callback props for drive pages.
- [[components.files.file-grid]] — Lays out FolderCard and FileCard grids for a directory view, showing an empty-state illustration when no files or folders exist and wiring click/rename/delete/favorite callbacks.
- [[components.files.file-preview]] — Full-screen lightbox overlay that streams a file from /api/files/[id]/download (image/video preview), supports keyboard/arrow prev-next navigation, favoriting, and download.
- [[components.files.create-folder-dialog]] — Modal dialog component with a name input that calls an onSubmit callback to create a new Folder, resetting state and closing on submit.
- [[components.upload.drop-zone]] — Wraps children in a drag-and-drop target that tracks dragenter/leave counters and invokes an onDrop(FileList) callback to kick off uploads.
- [[hooks.use-files]] — Client SWR hooks (useFiles, usePhotos, useFavorites) that GET /api/files with folderId/photosOnly/favoritesOnly query params, returning FileItem/FolderItem arrays plus mutate.
- [[hooks.use-upload]] — useUpload hook validates files (2GB Telegram limit, 20-file batch cap), then XHR-POSTs each to /api/files with progress events, syncing status into the Zustand upload store.
- [[types.index]] — Shared TypeScript types (FileItem, FolderItem, UploadProgress, SearchParams) mirroring the Prisma File/Folder/Tag models for client-side use.

## Used by

*Not imported elsewhere in `src/`.*
