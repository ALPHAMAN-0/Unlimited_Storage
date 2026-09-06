---
tags: [component-layout]
---

# theme-toggle

`src/components/layout/theme-toggle.tsx`

Client button using next-themes' useTheme to flip between light/dark mode, guarding against hydration mismatch with a mounted flag.

## Depends on

*No local dependencies — leaf module.*

## Used by

- [[components.auth.login-theme-toggle]] — Thin wrapper component that re-exports ThemeToggle for use on the login page.
- [[components.layout.sidebar]] — App shell sidebar with nav links (Drive/Photos/Favorites/Search), theme toggle, and user avatar/logout button that DELETEs /api/auth/session to end the iron-session and redirect to /login.
