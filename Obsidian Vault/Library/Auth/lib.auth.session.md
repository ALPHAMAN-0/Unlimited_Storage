---
tags: [auth]
---

# session

`src/lib/auth/session.ts`

Defines the iron-session SessionData shape (userId, telegramId, firstName, photoUrl) and exports getSession()/getCurrentUser() to read the encrypted 'unlimitade-session' cookie in server code.

## Depends on

*No local dependencies — leaf module.*

## Used by

- [[app.api.auth.dev.route]] — Dev-only POST endpoint (403 outside NODE_ENV=development) that upserts a fake telegramId=1 User via Prisma and saves an iron-session, bypassing real Telegram login for local testing.
- [[app.api.auth.session.route]] — GET returns the current authenticated user from the iron-session (401 if none) via getCurrentUser; DELETE destroys the session to log out.
- [[app.api.auth.telegram.route]] — POST handler validating Telegram Login Widget payload's HMAC signature, then upserts the User by telegramId in Prisma and establishes an iron-session.
- [[app.api.files.(fileId).download.route]] — GET streams a user-owned File's bytes back from Telegram (via lib/telegram/download's downloadFile using telegramFileId) with Content-Disposition attachment headers, after session-auth and ownership checks.
- [[app.api.files.(fileId).route]] — GET fetches a single File (with tags) by id/owner; PATCH updates name/folderId/isFavorite and adds/removes Tag/FileTag associations; DELETE removes the file's Telegram messages (bot.api.deleteMessage) and the Prisma File row.
- [[app.api.files.(fileId).thumbnail.route]] — GET proxies a user-owned File's thumbnailFileId through the Telegram Bot API's getFile/file endpoint, streaming back the WebP image with a long-lived Cache-Control header.
- [[app.api.files.route]] — GET lists/filters a user's Files and Folders (by folderId, photosOnly, favoritesOnly) from Prisma; POST validates and rate-limits uploads, sanitizes name/mimeType, sends the file (and an image thumbnail) to the Telegram channel via uploadFile, then creates the File record.
- [[app.api.folders.(folderId).route]] — PATCH renames/reparents a user-owned Folder; DELETE removes it after reparenting its child Files and Folders to the deleted folder's parent (no Telegram interaction).
- [[app.api.folders.route]] — GET lists a user's Folders under a given parentId with file/subfolder counts; POST creates a new Folder, returning 409 on a unique-name constraint violation.
- [[app.api.search.route]] — GET queries a user's Files by name substring, mime/type, and createdAt date range via Prisma, returning up to 100 serialized results with tags.
- [[app.page]] — Server component root route that reads the iron-session via getCurrentUser() and redirects to /drive if authenticated or /login otherwise.
