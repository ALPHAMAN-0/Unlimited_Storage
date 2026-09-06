---
tags: [api]
---

# dev/route

`src/app/api/auth/dev/route.ts`

Dev-only POST endpoint (403 outside NODE_ENV=development) that upserts a fake telegramId=1 User via Prisma and saves an iron-session, bypassing real Telegram login for local testing.

## Depends on

- [[lib.auth.session]] — Defines the iron-session SessionData shape (userId, telegramId, firstName, photoUrl) and exports getSession()/getCurrentUser() to read the encrypted 'unlimitade-session' cookie in server code.
- [[lib.db]] — Instantiates and exports a singleton PrismaClient using the PrismaLibSql adapter against a local SQLite file (dev.db), caching it on globalThis in non-production to avoid connection exhaustion during hot reloads.

## Used by

*Not imported elsewhere in `src/`.*
