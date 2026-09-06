---
tags: [auth]
---

# validate

`src/lib/auth/validate.ts`

Exports validateTelegramLogin(), which verifies the Telegram Login Widget payload's HMAC-SHA256 hash against BOT_TOKEN and rejects auth_date older than 24 hours.

## Depends on

*No local dependencies — leaf module.*

## Used by

- [[app.api.auth.telegram.route]] — POST handler validating Telegram Login Widget payload's HMAC signature, then upserts the User by telegramId in Prisma and establishes an iron-session.
