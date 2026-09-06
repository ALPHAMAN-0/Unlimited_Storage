---
tags: [moc]
---

# Library

- [[lib.db]] — Instantiates and exports a singleton PrismaClient using the PrismaLibSql adapter against a local SQLite file (dev.db), caching it on globalThis in non-production to avoid connection exhaustion during hot reloads.
- [[lib.rate-limit]] — Exports checkUploadRateLimit(userId), an in-memory Map-based sliding-window limiter (default 30 uploads/60s) used to throttle a user's file upload requests.
- [[lib.thumbnails]] — Uses sharp to generate a resized WebP thumbnail buffer and extract image width/height for image-mime-type file uploads; extractExifDate is an unimplemented stub returning null.
- [[lib.utils]] — Exports the cn() helper that merges Tailwind class names via clsx and tailwind-merge, used throughout UI components for conditional styling.
