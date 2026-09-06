---
tags: [page]
---

# photos/page

`src/app/photos/page.tsx`

Client component showing image-type Files grouped by date-taken (via usePhotos()), rendering a lazy-loaded thumbnail grid (/api/files/[id]/thumbnail) with FilePreview on click.

## Depends on

- [[hooks.use-files]] — Client SWR hooks (useFiles, usePhotos, useFavorites) that GET /api/files with folderId/photosOnly/favoritesOnly query params, returning FileItem/FolderItem arrays plus mutate.
- [[components.files.file-preview]] — Full-screen lightbox overlay that streams a file from /api/files/[id]/download (image/video preview), supports keyboard/arrow prev-next navigation, favoriting, and download.
- [[components.layout.topbar]] — Header bar with a search form (navigates to /search?q=...), New Folder button, and hidden multi-file input wired to onUpload/onCreateFolder callback props for drive pages.
- [[components.ui.skeleton]] — Exports a single Skeleton div with a pulsing muted-background animation, used as a loading placeholder while file/folder lists fetch data.
- [[types.index]] — Shared TypeScript types (FileItem, FolderItem, UploadProgress, SearchParams) mirroring the Prisma File/Folder/Tag models for client-side use.

## Used by

*Not imported elsewhere in `src/`.*
