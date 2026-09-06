---
tags: [moc]
---

# Hooks & State

- [[types.index]] — Shared TypeScript types (FileItem, FolderItem, UploadProgress, SearchParams) mirroring the Prisma File/Folder/Tag models for client-side use.
- [[stores.upload-store]] — Zustand store (useUploadStore) tracking in-flight UploadProgress entries with addUpload/updateUpload/removeUpload/clearCompleted actions for the upload UI.
- [[hooks.use-files]] — Client SWR hooks (useFiles, usePhotos, useFavorites) that GET /api/files with folderId/photosOnly/favoritesOnly query params, returning FileItem/FolderItem arrays plus mutate.
- [[hooks.use-session]] — useSession SWR hook fetching /api/auth/session to expose the current Telegram-authenticated user (userId, telegramId, firstName, photoUrl) and isAuthenticated flag.
- [[hooks.use-upload]] — useUpload hook validates files (2GB Telegram limit, 20-file batch cap), then XHR-POSTs each to /api/files with progress events, syncing status into the Zustand upload store.
