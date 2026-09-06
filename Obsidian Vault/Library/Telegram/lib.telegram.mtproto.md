---
tags: [telegram]
---

# mtproto

`src/lib/telegram/mtproto.ts`

Exports getMtprotoClient(), lazily creating/memoizing a gram.js TelegramClient (StringSession) authenticated via botAuthToken, used to bypass the Bot API's 50MB upload limit for large files.

## Depends on

*No local dependencies — leaf module.*

## Used by

- [[lib.telegram.upload]] — Exports uploadFile(buffer, filename, mimeType), routing to Bot API sendDocument for buffers <=50MB or MTProto client.sendFile for larger ones (forwarding+deleting via bot API to recover a file_id), returning {telegramFileId, telegramMessageId}.
