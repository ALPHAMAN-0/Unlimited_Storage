---
tags: [component-files]
---

# create-folder-dialog

`src/components/files/create-folder-dialog.tsx`

Modal dialog component with a name input that calls an onSubmit callback to create a new Folder, resetting state and closing on submit.

## Depends on

- [[components.ui.dialog]] — Wraps @base-ui/react/dialog into Dialog/DialogTrigger/Content/Header/Footer/Title/Description for modal dialogs (e.g. rename, create-folder, confirm-delete prompts) with a Button-based close icon.
- [[components.ui.input]] — Exports a styled Input wrapping @base-ui/react/input, a single text/file input control used across forms (rename, search, login) with focus/invalid/disabled styling.
- [[components.ui.button]] — Exports Button and buttonVariants wrapping @base-ui/react/button with cva variants (default/outline/secondary/ghost/destructive/link) and size options (xs-lg, icon) used app-wide for actions like upload/delete/share.

## Used by

- [[app.drive.(folderId).page]] — Client component rendering a specific Drive folder: fetches files/folders via useFiles(folderId), wires upload/create/rename/delete/favorite handlers (calling /api/files and /api/folders) and renders FileGrid, DropZone, FilePreview, and CreateFolderDialog.
- [[app.drive.page]] — Client component for the Drive root (no folderId): fetches root-level files/folders via useFiles(null), handles upload/create/rename/delete/favorite actions against /api/files and /api/folders, and renders FileGrid/FilePreview.
