---
tags: [api]
---

# folders/route

`src/app/api/folders/route.ts`

GET lists a user's Folders under a given parentId with file/subfolder counts; POST creates a new Folder, returning 409 on a unique-name constraint violation.

## Depends on

- [[lib.db]] — Instantiates and exports a singleton PrismaClient using the PrismaLibSql adapter against a local SQLite file (dev.db), caching it on globalThis in non-production to avoid connection exhaustion during hot reloads.
- [[lib.auth.session]] — Defines the iron-session SessionData shape (userId, telegramId, firstName, photoUrl) and exports getSession()/getCurrentUser() to read the encrypted 'unlimitade-session' cookie in server code.

## Used by

*Not imported elsewhere in `src/`.*
