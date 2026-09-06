---
tags: [page]
---

# [folderId]/page

`src/app/drive/[folderId]/page.tsx`

Client component rendering a specific Drive folder: fetches files/folders via useFiles(folderId), wires upload/create/rename/delete/favorite handlers (calling /api/files and /api/folders) and renders FileGrid, DropZone, FilePreview, and CreateFolderDialog.

## Depends on

- [[components.layout.topbar]] — Header bar with a search form (navigates to /search?q=...), New Folder button, and hidden multi-file input wired to onUpload/onCreateFolder callback props for drive pages.
- [[components.layout.breadcrumbs]] — Renders a folder path trail (Home + Link items per BreadcrumbItem) linking to /drive/[id] for navigating up the Folder hierarchy.
- [[components.files.file-grid]] — Lays out FolderCard and FileCard grids for a directory view, showing an empty-state illustration when no files or folders exist and wiring click/rename/delete/favorite callbacks.
- [[components.files.file-preview]] — Full-screen lightbox overlay that streams a file from /api/files/[id]/download (image/video preview), supports keyboard/arrow prev-next navigation, favoriting, and download.
- [[components.files.create-folder-dialog]] — Modal dialog component with a name input that calls an onSubmit callback to create a new Folder, resetting state and closing on submit.
- [[components.upload.drop-zone]] — Wraps children in a drag-and-drop target that tracks dragenter/leave counters and invokes an onDrop(FileList) callback to kick off uploads.
- [[hooks.use-files]] — Client SWR hooks (useFiles, usePhotos, useFavorites) that GET /api/files with folderId/photosOnly/favoritesOnly query params, returning FileItem/FolderItem arrays plus mutate.
- [[hooks.use-upload]] — useUpload hook validates files (2GB Telegram limit, 20-file batch cap), then XHR-POSTs each to /api/files with progress events, syncing status into the Zustand upload store.
- [[types.index]] — Shared TypeScript types (FileItem, FolderItem, UploadProgress, SearchParams) mirroring the Prisma File/Folder/Tag models for client-side use.

## Used by

*Not imported elsewhere in `src/`.*
