---
tags: [moc]
---

# Components/Files

- [[components.files.create-folder-dialog]] — Modal dialog component with a name input that calls an onSubmit callback to create a new Folder, resetting state and closing on submit.
- [[components.files.file-card]] — Renders a single FileItem tile (thumbnail via /api/files/[id]/thumbnail, size, favorite star, dropdown menu for download/rename/favorite/delete) in the file grid.
- [[components.files.file-grid]] — Lays out FolderCard and FileCard grids for a directory view, showing an empty-state illustration when no files or folders exist and wiring click/rename/delete/favorite callbacks.
- [[components.files.file-icon]] — Maps a MIME type to a lucide-react icon and Tailwind color class, exporting getFileIcon/getFileColor helpers and a FileIconDisplay component.
- [[components.files.file-preview]] — Full-screen lightbox overlay that streams a file from /api/files/[id]/download (image/video preview), supports keyboard/arrow prev-next navigation, favoriting, and download.
- [[components.files.folder-card]] — Renders a FolderItem as a clickable card linking to /drive/[folderId], showing child file/folder counts and a rename/delete dropdown menu.
