---
tags: [data-model]
---

# User

Prisma model defined in [[prisma.schema]] → `User`.

## Fields

- `id: String @id`
- `telegramId: BigInt @unique`
- `firstName, lastName?, username?, photoUrl?`
- `authDate: Int`
- `channelId?: String — the private Telegram channel used as this user's storage backend`

## Relations

- `files: File[]` → [[File]]
- `folders: Folder[]` → [[Folder]]

## Referenced by

- [[lib.auth.session]] — Defines the iron-session SessionData shape (userId, telegramId, firstName, photoUrl) and exports getSession()/getCurrentUser() to read the encrypted 'unlimitade-session' cookie in server code.
- [[lib.auth.validate]] — Exports validateTelegramLogin(), which verifies the Telegram Login Widget payload's HMAC-SHA256 hash against BOT_TOKEN and rejects auth_date older than 24 hours.
- [[app.api.auth.telegram.route]] — POST handler validating Telegram Login Widget payload's HMAC signature, then upserts the User by telegramId in Prisma and establishes an iron-session.
- [[app.api.auth.dev.route]] — Dev-only POST endpoint (403 outside NODE_ENV=development) that upserts a fake telegramId=1 User via Prisma and saves an iron-session, bypassing real Telegram login for local testing.
