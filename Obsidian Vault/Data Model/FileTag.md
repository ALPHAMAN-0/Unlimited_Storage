---
tags: [data-model]
---

# FileTag

Prisma model defined in [[prisma.schema]] → `FileTag`.

## Fields

- `fileId: String`
- `tagId: String`
- `@@id([fileId, tagId]) — composite primary key`

## Relations

- `file: File` → [[File]]
- `tag: Tag` → [[Tag]]

## Referenced by

*No direct API-layer references (joined through other models).*
