---
tags: [component-upload]
---

# upload-progress

`src/components/upload/upload-progress.tsx`

Fixed-position panel reading the Zustand useUploadStore to list in-flight uploads with per-file progress bars, status icons, remove/clear-completed actions.

## Depends on

- [[components.ui.progress]] — Wraps @base-ui/react/progress into Progress/Track/Indicator/Label/Value, rendering an upload/download progress bar with numeric value display.
- [[stores.upload-store]] — Zustand store (useUploadStore) tracking in-flight UploadProgress entries with addUpload/updateUpload/removeUpload/clearCompleted actions for the upload UI.

## Used by

- [[app.drive.layout]] — Shared layout for /drive routes rendering the Sidebar, a flex main content area, and the floating UploadProgress indicator.
- [[app.favorites.layout]] — Shared layout for the /favorites route rendering the Sidebar, main content area, and UploadProgress indicator.
- [[app.photos.layout]] — Shared layout for the /photos route rendering the Sidebar, main content area, and UploadProgress indicator.
