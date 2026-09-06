---
tags: [moc]
---

# Library/Telegram

- [[lib.telegram.bot]] — Creates and memoizes (via globalThis) a grammy Bot singleton from BOT_TOKEN, and exports CHANNEL_ID plus InputFile for reuse across upload/download modules.
- [[lib.telegram.download]] — Exports downloadFile(telegramFileId), which calls bot.api.getFile then fetches the file from api.telegram.org and returns its body as a ReadableStream; limited to Bot API's 20MB cap.
- [[lib.telegram.mtproto]] — Exports getMtprotoClient(), lazily creating/memoizing a gram.js TelegramClient (StringSession) authenticated via botAuthToken, used to bypass the Bot API's 50MB upload limit for large files.
- [[lib.telegram.upload]] — Exports uploadFile(buffer, filename, mimeType), routing to Bot API sendDocument for buffers <=50MB or MTProto client.sendFile for larger ones (forwarding+deleting via bot API to recover a file_id), returning {telegramFileId, telegramMessageId}.
