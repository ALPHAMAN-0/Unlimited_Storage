---
tags: [data-model]
---

# Tag

Prisma model defined in [[prisma.schema]] → `Tag`.

## Fields

- `id: String @id`
- `name: String @unique`

## Relations

- `files: FileTag[]` → [[File]], [[FileTag]]

## Referenced by

*No direct API-layer references (joined through other models).*
