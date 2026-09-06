---
tags: [page]
---

# photos/layout

`src/app/photos/layout.tsx`

Shared layout for the /photos route rendering the Sidebar, main content area, and UploadProgress indicator.

## Depends on

- [[components.layout.sidebar]] — App shell sidebar with nav links (Drive/Photos/Favorites/Search), theme toggle, and user avatar/logout button that DELETEs /api/auth/session to end the iron-session and redirect to /login.
- [[components.upload.upload-progress]] — Fixed-position panel reading the Zustand useUploadStore to list in-flight uploads with per-file progress bars, status icons, remove/clear-completed actions.

## Used by

*Not imported elsewhere in `src/`.*
