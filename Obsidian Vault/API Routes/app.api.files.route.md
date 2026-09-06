---
tags: [api]
---

# files/route

`src/app/api/files/route.ts`

GET lists/filters a user's Files and Folders (by folderId, photosOnly, favoritesOnly) from Prisma; POST validates and rate-limits uploads, sanitizes name/mimeType, sends the file (and an image thumbnail) to the Telegram channel via uploadFile, then creates the File record.

## Depends on

- [[lib.db]] — Instantiates and exports a singleton PrismaClient using the PrismaLibSql adapter against a local SQLite file (dev.db), caching it on globalThis in non-production to avoid connection exhaustion during hot reloads.
- [[lib.auth.session]] — Defines the iron-session SessionData shape (userId, telegramId, firstName, photoUrl) and exports getSession()/getCurrentUser() to read the encrypted 'unlimitade-session' cookie in server code.
- [[lib.telegram.upload]] — Exports uploadFile(buffer, filename, mimeType), routing to Bot API sendDocument for buffers <=50MB or MTProto client.sendFile for larger ones (forwarding+deleting via bot API to recover a file_id), returning {telegramFileId, telegramMessageId}.
- [[lib.thumbnails]] — Uses sharp to generate a resized WebP thumbnail buffer and extract image width/height for image-mime-type file uploads; extractExifDate is an unimplemented stub returning null.
- [[lib.telegram.bot]] — Creates and memoizes (via globalThis) a grammy Bot singleton from BOT_TOKEN, and exports CHANNEL_ID plus InputFile for reuse across upload/download modules.
- [[lib.rate-limit]] — Exports checkUploadRateLimit(userId), an in-memory Map-based sliding-window limiter (default 30 uploads/60s) used to throttle a user's file upload requests.

## Used by

*Not imported elsewhere in `src/`.*
