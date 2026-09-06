---
tags: [component-layout]
---

# sidebar

`src/components/layout/sidebar.tsx`

App shell sidebar with nav links (Drive/Photos/Favorites/Search), theme toggle, and user avatar/logout button that DELETEs /api/auth/session to end the iron-session and redirect to /login.

## Depends on

- [[lib.utils]] — Exports the cn() helper that merges Tailwind class names via clsx and tailwind-merge, used throughout UI components for conditional styling.
- [[components.ui.avatar]] — Exports Avatar, AvatarImage, AvatarFallback, AvatarGroup(Count), AvatarBadge wrapping @base-ui/react/avatar for user profile pictures with sm/default/lg sizing and grouped/stacked avatar display.
- [[hooks.use-session]] — useSession SWR hook fetching /api/auth/session to expose the current Telegram-authenticated user (userId, telegramId, firstName, photoUrl) and isAuthenticated flag.
- [[components.layout.theme-toggle]] — Client button using next-themes' useTheme to flip between light/dark mode, guarding against hydration mismatch with a mounted flag.

## Used by

- [[app.drive.layout]] — Shared layout for /drive routes rendering the Sidebar, a flex main content area, and the floating UploadProgress indicator.
- [[app.favorites.layout]] — Shared layout for the /favorites route rendering the Sidebar, main content area, and UploadProgress indicator.
- [[app.photos.layout]] — Shared layout for the /photos route rendering the Sidebar, main content area, and UploadProgress indicator.
- [[app.search.layout]] — Shared layout for the /search route rendering the Sidebar and a main content area (no UploadProgress).
