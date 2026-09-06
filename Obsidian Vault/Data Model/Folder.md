---
tags: [data-model]
---

# Folder

Prisma model defined in [[prisma.schema]] → `Folder`.

## Fields

- `id: String @id`
- `name: String`
- `parentId?: String — self-relation for nesting`
- `userId: String`

## Relations

- `parent/children: Folder? / Folder[] (self-relation "FolderTree")`
- `user: User` → [[User]]
- `files: File[]` → [[File]]

## Referenced by

- [[app.api.folders.route]] — GET lists a user's Folders under a given parentId with file/subfolder counts; POST creates a new Folder, returning 409 on a unique-name constraint violation.
- [[app.api.folders.(folderId).route]] — PATCH renames/reparents a user-owned Folder; DELETE removes it after reparenting its child Files and Folders to the deleted folder's parent (no Telegram interaction).
