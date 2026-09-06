---
tags: [telegram]
---

# bot

`src/lib/telegram/bot.ts`

Creates and memoizes (via globalThis) a grammy Bot singleton from BOT_TOKEN, and exports CHANNEL_ID plus InputFile for reuse across upload/download modules.

## Depends on

*No local dependencies — leaf module.*

## Used by

- [[app.api.files.(fileId).route]] — GET fetches a single File (with tags) by id/owner; PATCH updates name/folderId/isFavorite and adds/removes Tag/FileTag associations; DELETE removes the file's Telegram messages (bot.api.deleteMessage) and the Prisma File row.
- [[app.api.files.(fileId).thumbnail.route]] — GET proxies a user-owned File's thumbnailFileId through the Telegram Bot API's getFile/file endpoint, streaming back the WebP image with a long-lived Cache-Control header.
- [[app.api.files.route]] — GET lists/filters a user's Files and Folders (by folderId, photosOnly, favoritesOnly) from Prisma; POST validates and rate-limits uploads, sanitizes name/mimeType, sends the file (and an image thumbnail) to the Telegram channel via uploadFile, then creates the File record.
- [[lib.telegram.download]] — Exports downloadFile(telegramFileId), which calls bot.api.getFile then fetches the file from api.telegram.org and returns its body as a ReadableStream; limited to Bot API's 20MB cap.
- [[lib.telegram.upload]] — Exports uploadFile(buffer, filename, mimeType), routing to Bot API sendDocument for buffers <=50MB or MTProto client.sendFile for larger ones (forwarding+deleting via bot API to recover a file_id), returning {telegramFileId, telegramMessageId}.
