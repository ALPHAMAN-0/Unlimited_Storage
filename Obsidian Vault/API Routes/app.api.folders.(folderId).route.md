---
tags: [api]
---

# [folderId]/route

`src/app/api/folders/[folderId]/route.ts`

PATCH renames/reparents a user-owned Folder; DELETE removes it after reparenting its child Files and Folders to the deleted folder's parent (no Telegram interaction).

## Depends on

- [[lib.db]] — Instantiates and exports a singleton PrismaClient using the PrismaLibSql adapter against a local SQLite file (dev.db), caching it on globalThis in non-production to avoid connection exhaustion during hot reloads.
- [[lib.auth.session]] — Defines the iron-session SessionData shape (userId, telegramId, firstName, photoUrl) and exports getSession()/getCurrentUser() to read the encrypted 'unlimitade-session' cookie in server code.

## Used by

*Not imported elsewhere in `src/`.*
