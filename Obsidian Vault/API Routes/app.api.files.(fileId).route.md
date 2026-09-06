---
tags: [api]
---

# [fileId]/route

`src/app/api/files/[fileId]/route.ts`

GET fetches a single File (with tags) by id/owner; PATCH updates name/folderId/isFavorite and adds/removes Tag/FileTag associations; DELETE removes the file's Telegram messages (bot.api.deleteMessage) and the Prisma File row.

## Depends on

- [[lib.db]] — Instantiates and exports a singleton PrismaClient using the PrismaLibSql adapter against a local SQLite file (dev.db), caching it on globalThis in non-production to avoid connection exhaustion during hot reloads.
- [[lib.auth.session]] — Defines the iron-session SessionData shape (userId, telegramId, firstName, photoUrl) and exports getSession()/getCurrentUser() to read the encrypted 'unlimitade-session' cookie in server code.
- [[lib.telegram.bot]] — Creates and memoizes (via globalThis) a grammy Bot singleton from BOT_TOKEN, and exports CHANNEL_ID plus InputFile for reuse across upload/download modules.

## Used by

*Not imported elsewhere in `src/`.*
