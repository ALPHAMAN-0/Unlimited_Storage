---
tags: [component-files]
---

# file-card

`src/components/files/file-card.tsx`

Renders a single FileItem tile (thumbnail via /api/files/[id]/thumbnail, size, favorite star, dropdown menu for download/rename/favorite/delete) in the file grid.

## Depends on

- [[components.ui.dropdown-menu]] — Wraps @base-ui/react/menu into DropdownMenu/Trigger/Content/Item/Checkbox/Radio/Sub components for dropdown action menus (e.g. per-file/folder options menu) with Tailwind animations.
- [[components.files.file-icon]] — Maps a MIME type to a lucide-react icon and Tailwind color class, exporting getFileIcon/getFileColor helpers and a FileIconDisplay component.
- [[types.index]] — Shared TypeScript types (FileItem, FolderItem, UploadProgress, SearchParams) mirroring the Prisma File/Folder/Tag models for client-side use.

## Used by

- [[app.favorites.page]] — Client component listing starred files via useFavorites(), letting users toggle favorite status or delete a file (PATCH/DELETE to /api/files/[id]) and preview it in FilePreview.
- [[app.search.page]] — Client component providing debounced file search UI (name query + type filter) that calls GET /api/search, renders results as FileCards, and supports favorite/delete/preview actions.
- [[components.files.file-grid]] — Lays out FolderCard and FileCard grids for a directory view, showing an empty-state illustration when no files or folders exist and wiring click/rename/delete/favorite callbacks.
