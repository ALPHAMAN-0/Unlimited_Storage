---
tags: [component-auth]
---

# telegram-login

`src/components/auth/telegram-login.tsx`

Renders the Telegram Login Widget (loads telegram-widget.js, skips on localhost), and on auth POSTs the returned user payload to /api/auth/telegram before redirecting to /drive.

## Depends on

*No local dependencies — leaf module.*

## Used by

- [[app.login.page]] — Login screen rendering the TelegramLogin widget, a DevLogin fallback, and a theme toggle, styled with the app logo and branding.
