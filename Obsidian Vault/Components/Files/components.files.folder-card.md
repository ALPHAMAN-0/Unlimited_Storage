---
tags: [component-files]
---

# folder-card

`src/components/files/folder-card.tsx`

Renders a FolderItem as a clickable card linking to /drive/[folderId], showing child file/folder counts and a rename/delete dropdown menu.

## Depends on

- [[components.ui.dropdown-menu]] — Wraps @base-ui/react/menu into DropdownMenu/Trigger/Content/Item/Checkbox/Radio/Sub components for dropdown action menus (e.g. per-file/folder options menu) with Tailwind animations.
- [[types.index]] — Shared TypeScript types (FileItem, FolderItem, UploadProgress, SearchParams) mirroring the Prisma File/Folder/Tag models for client-side use.

## Used by

- [[components.files.file-grid]] — Lays out FolderCard and FileCard grids for a directory view, showing an empty-state illustration when no files or folders exist and wiring click/rename/delete/favorite callbacks.
