---
tags: [telegram]
---

# upload

`src/lib/telegram/upload.ts`

Exports uploadFile(buffer, filename, mimeType), routing to Bot API sendDocument for buffers <=50MB or MTProto client.sendFile for larger ones (forwarding+deleting via bot API to recover a file_id), returning {telegramFileId, telegramMessageId}.

## Depends on

- [[lib.telegram.bot]] — Creates and memoizes (via globalThis) a grammy Bot singleton from BOT_TOKEN, and exports CHANNEL_ID plus InputFile for reuse across upload/download modules.
- [[lib.telegram.mtproto]] — Exports getMtprotoClient(), lazily creating/memoizing a gram.js TelegramClient (StringSession) authenticated via botAuthToken, used to bypass the Bot API's 50MB upload limit for large files.

## Used by

- [[app.api.files.route]] — GET lists/filters a user's Files and Folders (by folderId, photosOnly, favoritesOnly) from Prisma; POST validates and rate-limits uploads, sanitizes name/mimeType, sends the file (and an image thumbnail) to the Telegram channel via uploadFile, then creates the File record.
