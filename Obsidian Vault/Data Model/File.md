---
tags: [data-model]
---

# File

Prisma model defined in [[prisma.schema]] → `File`.

## Fields

- `id: String @id`
- `originalName, mimeType, size: BigInt`
- `telegramFileId, telegramMessageId — pointer to the Telegram message storing the file bytes`
- `thumbnailFileId?, thumbnailMessageId?`
- `isImage, isVideo, width?, height?, duration?`
- `isFavorite: Boolean`
- `folderId?: String, userId: String`
- `dateTaken?: DateTime — EXIF capture date for Photos view`

## Relations

- `folder: Folder?` → [[Folder]]
- `user: User` → [[User]]
- `tags: FileTag[]` → [[Tag]], [[FileTag]]

## Referenced by

- [[app.api.files.route]] — GET lists/filters a user's Files and Folders (by folderId, photosOnly, favoritesOnly) from Prisma; POST validates and rate-limits uploads, sanitizes name/mimeType, sends the file (and an image thumbnail) to the Telegram channel via uploadFile, then creates the File record.
- [[app.api.files.(fileId).route]] — GET fetches a single File (with tags) by id/owner; PATCH updates name/folderId/isFavorite and adds/removes Tag/FileTag associations; DELETE removes the file's Telegram messages (bot.api.deleteMessage) and the Prisma File row.
- [[app.api.files.(fileId).download.route]] — GET streams a user-owned File's bytes back from Telegram (via lib/telegram/download's downloadFile using telegramFileId) with Content-Disposition attachment headers, after session-auth and ownership checks.
- [[app.api.files.(fileId).thumbnail.route]] — GET proxies a user-owned File's thumbnailFileId through the Telegram Bot API's getFile/file endpoint, streaming back the WebP image with a long-lived Cache-Control header.
- [[app.api.search.route]] — GET queries a user's Files by name substring, mime/type, and createdAt date range via Prisma, returning up to 100 serialized results with tags.
- [[lib.thumbnails]] — Uses sharp to generate a resized WebP thumbnail buffer and extract image width/height for image-mime-type file uploads; extractExifDate is an unimplemented stub returning null.
- [[lib.telegram.upload]] — Exports uploadFile(buffer, filename, mimeType), routing to Bot API sendDocument for buffers <=50MB or MTProto client.sendFile for larger ones (forwarding+deleting via bot API to recover a file_id), returning {telegramFileId, telegramMessageId}.
- [[lib.telegram.download]] — Exports downloadFile(telegramFileId), which calls bot.api.getFile then fetches the file from api.telegram.org and returns its body as a ReadableStream; limited to Bot API's 20MB cap.
