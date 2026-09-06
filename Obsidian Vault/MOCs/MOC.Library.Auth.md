---
tags: [moc]
---

# Library/Auth

- [[lib.auth.session]] — Defines the iron-session SessionData shape (userId, telegramId, firstName, photoUrl) and exports getSession()/getCurrentUser() to read the encrypted 'unlimitade-session' cookie in server code.
- [[lib.auth.validate]] — Exports validateTelegramLogin(), which verifies the Telegram Login Widget payload's HMAC-SHA256 hash against BOT_TOKEN and rejects auth_date older than 24 hours.
