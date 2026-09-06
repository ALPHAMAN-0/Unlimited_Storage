---
tags: [component-auth]
---

# dev-login

`src/components/auth/dev-login.tsx`

Dev-only client button (hidden unless NODE_ENV=development) that POSTs to /api/auth/dev to create a session cookie and redirects to /drive, bypassing Telegram OAuth.

## Depends on

*No local dependencies — leaf module.*

## Used by

- [[app.login.page]] — Login screen rendering the TelegramLogin widget, a DevLogin fallback, and a theme toggle, styled with the app logo and branding.
