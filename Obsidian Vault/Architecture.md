---
tags: [home]
---

# Architecture

## Request flow

1. **Browser** renders a page under [[app.layout]] (e.g. [[app.drive.page]], [[app.photos.page]], [[app.search.page]]), gated by [[middleware]] and [[lib.auth.session]].
2. Pages call **hooks** ([[hooks.use-files]], [[hooks.use-upload]], [[hooks.use-session]]) which hit **API routes** under [[MOC.API-Routes]].
3. API routes authenticate via [[lib.auth.session]], then read/write the **Prisma** models ([[User]], [[Folder]], [[File]], [[Tag]], [[FileTag]]) through [[lib.db]].
4. File bytes never touch the app's own disk: uploads go straight to a private Telegram channel via [[lib.telegram.upload]] (small files, Bot API) or [[lib.telegram.mtproto]] (files over 50 MB); downloads/thumbnails are streamed back via [[lib.telegram.download]] and [[lib.telegram.bot]].
5. Upload progress is tracked client-side in [[stores.upload-store]] and rendered by [[components.upload.upload-progress]].

## Auth flow

Telegram Login widget ([[components.auth.telegram-login]]) → `POST /api/auth/telegram` ([[app.api.auth.telegram.route]]) → validated by [[lib.auth.validate]] → session created by [[lib.auth.session]] → iron-session cookie checked on every request by [[middleware]].

## Data model

See [[prisma.schema]] for the full ER graph ([[User]] → [[Folder]] → [[File]] → [[FileTag]] ↔ [[Tag]]).
