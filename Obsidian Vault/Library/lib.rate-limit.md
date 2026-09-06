---
tags: [lib]
---

# rate-limit

`src/lib/rate-limit.ts`

Exports checkUploadRateLimit(userId), an in-memory Map-based sliding-window limiter (default 30 uploads/60s) used to throttle a user's file upload requests.

## Depends on

*No local dependencies — leaf module.*

## Used by

- [[app.api.files.route]] — GET lists/filters a user's Files and Folders (by folderId, photosOnly, favoritesOnly) from Prisma; POST validates and rate-limits uploads, sanitizes name/mimeType, sends the file (and an image thumbnail) to the Telegram channel via uploadFile, then creates the File record.
