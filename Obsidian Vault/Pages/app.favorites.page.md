---
tags: [page]
---

# favorites/page

`src/app/favorites/page.tsx`

Client component listing starred files via useFavorites(), letting users toggle favorite status or delete a file (PATCH/DELETE to /api/files/[id]) and preview it in FilePreview.

## Depends on

- [[hooks.use-files]] — Client SWR hooks (useFiles, usePhotos, useFavorites) that GET /api/files with folderId/photosOnly/favoritesOnly query params, returning FileItem/FolderItem arrays plus mutate.
- [[components.files.file-card]] — Renders a single FileItem tile (thumbnail via /api/files/[id]/thumbnail, size, favorite star, dropdown menu for download/rename/favorite/delete) in the file grid.
- [[components.files.file-preview]] — Full-screen lightbox overlay that streams a file from /api/files/[id]/download (image/video preview), supports keyboard/arrow prev-next navigation, favoriting, and download.
- [[components.layout.topbar]] — Header bar with a search form (navigates to /search?q=...), New Folder button, and hidden multi-file input wired to onUpload/onCreateFolder callback props for drive pages.
- [[types.index]] — Shared TypeScript types (FileItem, FolderItem, UploadProgress, SearchParams) mirroring the Prisma File/Folder/Tag models for client-side use.

## Used by

*Not imported elsewhere in `src/`.*
