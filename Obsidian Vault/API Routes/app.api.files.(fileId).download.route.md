---
tags: [api]
---

# download/route

`src/app/api/files/[fileId]/download/route.ts`

GET streams a user-owned File's bytes back from Telegram (via lib/telegram/download's downloadFile using telegramFileId) with Content-Disposition attachment headers, after session-auth and ownership checks.

## Depends on

- [[lib.db]] — Instantiates and exports a singleton PrismaClient using the PrismaLibSql adapter against a local SQLite file (dev.db), caching it on globalThis in non-production to avoid connection exhaustion during hot reloads.
- [[lib.auth.session]] — Defines the iron-session SessionData shape (userId, telegramId, firstName, photoUrl) and exports getSession()/getCurrentUser() to read the encrypted 'unlimitade-session' cookie in server code.
- [[lib.telegram.download]] — Exports downloadFile(telegramFileId), which calls bot.api.getFile then fetches the file from api.telegram.org and returns its body as a ReadableStream; limited to Bot API's 20MB cap.

## Used by

*Not imported elsewhere in `src/`.*
