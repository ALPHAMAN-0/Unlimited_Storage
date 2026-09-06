---
tags: [hook]
---

# use-session

`src/hooks/use-session.ts`

useSession SWR hook fetching /api/auth/session to expose the current Telegram-authenticated user (userId, telegramId, firstName, photoUrl) and isAuthenticated flag.

## Depends on

*No local dependencies — leaf module.*

## Used by

- [[components.layout.sidebar]] — App shell sidebar with nav links (Drive/Photos/Favorites/Search), theme toggle, and user avatar/logout button that DELETEs /api/auth/session to end the iron-session and redirect to /login.
