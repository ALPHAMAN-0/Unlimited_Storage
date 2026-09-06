---
tags: [page]
---

# app/page

`src/app/page.tsx`

Server component root route that reads the iron-session via getCurrentUser() and redirects to /drive if authenticated or /login otherwise.

## Depends on

- [[lib.auth.session]] — Defines the iron-session SessionData shape (userId, telegramId, firstName, photoUrl) and exports getSession()/getCurrentUser() to read the encrypted 'unlimitade-session' cookie in server code.

## Used by

*Not imported elsewhere in `src/`.*
