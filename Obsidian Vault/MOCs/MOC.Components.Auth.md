---
tags: [moc]
---

# Components/Auth

- [[components.auth.dev-login]] — Dev-only client button (hidden unless NODE_ENV=development) that POSTs to /api/auth/dev to create a session cookie and redirects to /drive, bypassing Telegram OAuth.
- [[components.auth.login-theme-toggle]] — Thin wrapper component that re-exports ThemeToggle for use on the login page.
- [[components.auth.telegram-login]] — Renders the Telegram Login Widget (loads telegram-widget.js, skips on localhost), and on auth POSTs the returned user payload to /api/auth/telegram before redirecting to /drive.
