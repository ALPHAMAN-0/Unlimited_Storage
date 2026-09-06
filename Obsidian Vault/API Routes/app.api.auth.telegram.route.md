---
tags: [api]
---

# telegram/route

`src/app/api/auth/telegram/route.ts`

POST handler validating Telegram Login Widget payload's HMAC signature, then upserts the User by telegramId in Prisma and establishes an iron-session.

## Depends on

- [[lib.auth.validate]] — Exports validateTelegramLogin(), which verifies the Telegram Login Widget payload's HMAC-SHA256 hash against BOT_TOKEN and rejects auth_date older than 24 hours.
- [[lib.auth.session]] — Defines the iron-session SessionData shape (userId, telegramId, firstName, photoUrl) and exports getSession()/getCurrentUser() to read the encrypted 'unlimitade-session' cookie in server code.
- [[lib.db]] — Instantiates and exports a singleton PrismaClient using the PrismaLibSql adapter against a local SQLite file (dev.db), caching it on globalThis in non-production to avoid connection exhaustion during hot reloads.

## Used by

*Not imported elsewhere in `src/`.*
