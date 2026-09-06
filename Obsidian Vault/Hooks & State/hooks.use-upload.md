---
tags: [hook]
---

# use-upload

`src/hooks/use-upload.ts`

useUpload hook validates files (2GB Telegram limit, 20-file batch cap), then XHR-POSTs each to /api/files with progress events, syncing status into the Zustand upload store.

## Depends on

- [[stores.upload-store]] — Zustand store (useUploadStore) tracking in-flight UploadProgress entries with addUpload/updateUpload/removeUpload/clearCompleted actions for the upload UI.

## Used by

- [[app.drive.(folderId).page]] — Client component rendering a specific Drive folder: fetches files/folders via useFiles(folderId), wires upload/create/rename/delete/favorite handlers (calling /api/files and /api/folders) and renders FileGrid, DropZone, FilePreview, and CreateFolderDialog.
- [[app.drive.page]] — Client component for the Drive root (no folderId): fetches root-level files/folders via useFiles(null), handles upload/create/rename/delete/favorite actions against /api/files and /api/folders, and renders FileGrid/FilePreview.
