---
tags: [api]
---

# session/route

`src/app/api/auth/session/route.ts`

GET returns the current authenticated user from the iron-session (401 if none) via getCurrentUser; DELETE destroys the session to log out.

## Depends on

- [[lib.auth.session]] — Defines the iron-session SessionData shape (userId, telegramId, firstName, photoUrl) and exports getSession()/getCurrentUser() to read the encrypted 'unlimitade-session' cookie in server code.

## Used by

*Not imported elsewhere in `src/`.*
