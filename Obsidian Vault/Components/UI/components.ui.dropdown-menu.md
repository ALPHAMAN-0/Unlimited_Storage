---
tags: [ui-primitive]
---

# dropdown-menu

`src/components/ui/dropdown-menu.tsx`

Wraps @base-ui/react/menu into DropdownMenu/Trigger/Content/Item/Checkbox/Radio/Sub components for dropdown action menus (e.g. per-file/folder options menu) with Tailwind animations.

## Depends on

- [[lib.utils]] — Exports the cn() helper that merges Tailwind class names via clsx and tailwind-merge, used throughout UI components for conditional styling.

## Used by

- [[components.files.file-card]] — Renders a single FileItem tile (thumbnail via /api/files/[id]/thumbnail, size, favorite star, dropdown menu for download/rename/favorite/delete) in the file grid.
- [[components.files.folder-card]] — Renders a FolderItem as a clickable card linking to /drive/[folderId], showing child file/folder counts and a rename/delete dropdown menu.
