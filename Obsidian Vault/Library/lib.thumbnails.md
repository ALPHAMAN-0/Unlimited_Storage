---
tags: [lib]
---

# thumbnails

`src/lib/thumbnails.ts`

Uses sharp to generate a resized WebP thumbnail buffer and extract image width/height for image-mime-type file uploads; extractExifDate is an unimplemented stub returning null.

## Depends on

*No local dependencies — leaf module.*

## Used by

- [[app.api.files.route]] — GET lists/filters a user's Files and Folders (by folderId, photosOnly, favoritesOnly) from Prisma; POST validates and rate-limits uploads, sanitizes name/mimeType, sends the file (and an image thumbnail) to the Telegram channel via uploadFile, then creates the File record.
