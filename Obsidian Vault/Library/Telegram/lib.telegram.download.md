---
tags: [telegram]
---

# download

`src/lib/telegram/download.ts`

Exports downloadFile(telegramFileId), which calls bot.api.getFile then fetches the file from api.telegram.org and returns its body as a ReadableStream; limited to Bot API's 20MB cap.

## Depends on

- [[lib.telegram.bot]] — Creates and memoizes (via globalThis) a grammy Bot singleton from BOT_TOKEN, and exports CHANNEL_ID plus InputFile for reuse across upload/download modules.

## Used by

- [[app.api.files.(fileId).download.route]] — GET streams a user-owned File's bytes back from Telegram (via lib/telegram/download's downloadFile using telegramFileId) with Content-Disposition attachment headers, after session-auth and ownership checks.
