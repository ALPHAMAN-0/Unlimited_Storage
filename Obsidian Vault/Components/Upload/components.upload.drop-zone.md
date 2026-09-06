---
tags: [component-upload]
---

# drop-zone

`src/components/upload/drop-zone.tsx`

Wraps children in a drag-and-drop target that tracks dragenter/leave counters and invokes an onDrop(FileList) callback to kick off uploads.

## Depends on

*No local dependencies — leaf module.*

## Used by

- [[app.drive.(folderId).page]] — Client component rendering a specific Drive folder: fetches files/folders via useFiles(folderId), wires upload/create/rename/delete/favorite handlers (calling /api/files and /api/folders) and renders FileGrid, DropZone, FilePreview, and CreateFolderDialog.
- [[app.drive.page]] — Client component for the Drive root (no folderId): fetches root-level files/folders via useFiles(null), handles upload/create/rename/delete/favorite actions against /api/files and /api/folders, and renders FileGrid/FilePreview.
