---
tags: [store]
---

# upload-store

`src/stores/upload-store.ts`

Zustand store (useUploadStore) tracking in-flight UploadProgress entries with addUpload/updateUpload/removeUpload/clearCompleted actions for the upload UI.

## Depends on

- [[types.index]] — Shared TypeScript types (FileItem, FolderItem, UploadProgress, SearchParams) mirroring the Prisma File/Folder/Tag models for client-side use.

## Used by

- [[components.upload.upload-progress]] — Fixed-position panel reading the Zustand useUploadStore to list in-flight uploads with per-file progress bars, status icons, remove/clear-completed actions.
- [[hooks.use-upload]] — useUpload hook validates files (2GB Telegram limit, 20-file batch cap), then XHR-POSTs each to /api/files with progress events, syncing status into the Zustand upload store.
