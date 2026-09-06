---
tags: [moc]
---

# Pages

- [[app.drive.(folderId).page]] — Client component rendering a specific Drive folder: fetches files/folders via useFiles(folderId), wires upload/create/rename/delete/favorite handlers (calling /api/files and /api/folders) and renders FileGrid, DropZone, FilePreview, and CreateFolderDialog.
- [[app.layout]] — Root Next.js layout: loads Geist fonts, wraps the app in next-themes ThemeProvider (class-based, system default) and renders the global Toaster and page metadata.
- [[app.page]] — Server component root route that reads the iron-session via getCurrentUser() and redirects to /drive if authenticated or /login otherwise.
- [[app.drive.layout]] — Shared layout for /drive routes rendering the Sidebar, a flex main content area, and the floating UploadProgress indicator.
- [[app.drive.page]] — Client component for the Drive root (no folderId): fetches root-level files/folders via useFiles(null), handles upload/create/rename/delete/favorite actions against /api/files and /api/folders, and renders FileGrid/FilePreview.
- [[app.favorites.layout]] — Shared layout for the /favorites route rendering the Sidebar, main content area, and UploadProgress indicator.
- [[app.favorites.page]] — Client component listing starred files via useFavorites(), letting users toggle favorite status or delete a file (PATCH/DELETE to /api/files/[id]) and preview it in FilePreview.
- [[app.login.page]] — Login screen rendering the TelegramLogin widget, a DevLogin fallback, and a theme toggle, styled with the app logo and branding.
- [[middleware]] — Next.js edge middleware guarding all non-public routes by checking for the 'unlimitade-session' iron-session cookie and redirecting unauthenticated requests to /login.
- [[app.photos.layout]] — Shared layout for the /photos route rendering the Sidebar, main content area, and UploadProgress indicator.
- [[app.photos.page]] — Client component showing image-type Files grouped by date-taken (via usePhotos()), rendering a lazy-loaded thumbnail grid (/api/files/[id]/thumbnail) with FilePreview on click.
- [[app.search.layout]] — Shared layout for the /search route rendering the Sidebar and a main content area (no UploadProgress).
- [[app.search.page]] — Client component providing debounced file search UI (name query + type filter) that calls GET /api/search, renders results as FileCards, and supports favorite/delete/preview actions.
