---
tags: [api]
---

# thumbnail/route

`src/app/api/files/[fileId]/thumbnail/route.ts`

GET proxies a user-owned File's thumbnailFileId through the Telegram Bot API's getFile/file endpoint, streaming back the WebP image with a long-lived Cache-Control header.

## Depends on

- [[lib.db]] — Instantiates and exports a singleton PrismaClient using the PrismaLibSql adapter against a local SQLite file (dev.db), caching it on globalThis in non-production to avoid connection exhaustion during hot reloads.
- [[lib.auth.session]] — Defines the iron-session SessionData shape (userId, telegramId, firstName, photoUrl) and exports getSession()/getCurrentUser() to read the encrypted 'unlimitade-session' cookie in server code.
- [[lib.telegram.bot]] — Creates and memoizes (via globalThis) a grammy Bot singleton from BOT_TOKEN, and exports CHANNEL_ID plus InputFile for reuse across upload/download modules.

## Used by

*Not imported elsewhere in `src/`.*
