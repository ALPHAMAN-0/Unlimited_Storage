---
tags: [api]
---

# search/route

`src/app/api/search/route.ts`

GET queries a user's Files by name substring, mime/type, and createdAt date range via Prisma, returning up to 100 serialized results with tags.

## Depends on

- [[lib.db]] — Instantiates and exports a singleton PrismaClient using the PrismaLibSql adapter against a local SQLite file (dev.db), caching it on globalThis in non-production to avoid connection exhaustion during hot reloads.
- [[lib.auth.session]] — Defines the iron-session SessionData shape (userId, telegramId, firstName, photoUrl) and exports getSession()/getCurrentUser() to read the encrypted 'unlimitade-session' cookie in server code.

## Used by

*Not imported elsewhere in `src/`.*
