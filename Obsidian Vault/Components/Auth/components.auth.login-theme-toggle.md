---
tags: [component-auth]
---

# login-theme-toggle

`src/components/auth/login-theme-toggle.tsx`

Thin wrapper component that re-exports ThemeToggle for use on the login page.

## Depends on

- [[components.layout.theme-toggle]] — Client button using next-themes' useTheme to flip between light/dark mode, guarding against hydration mismatch with a mounted flag.

## Used by

- [[app.login.page]] — Login screen rendering the TelegramLogin widget, a DevLogin fallback, and a theme toggle, styled with the app logo and branding.
