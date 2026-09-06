---
tags: [component-layout]
---

# breadcrumbs

`src/components/layout/breadcrumbs.tsx`

Renders a folder path trail (Home + Link items per BreadcrumbItem) linking to /drive/[id] for navigating up the Folder hierarchy.

## Depends on

*No local dependencies — leaf module.*

## Used by

- [[app.drive.(folderId).page]] — Client component rendering a specific Drive folder: fetches files/folders via useFiles(folderId), wires upload/create/rename/delete/favorite handlers (calling /api/files and /api/folders) and renders FileGrid, DropZone, FilePreview, and CreateFolderDialog.
