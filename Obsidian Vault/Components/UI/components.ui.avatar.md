---
tags: [ui-primitive]
---

# avatar

`src/components/ui/avatar.tsx`

Exports Avatar, AvatarImage, AvatarFallback, AvatarGroup(Count), AvatarBadge wrapping @base-ui/react/avatar for user profile pictures with sm/default/lg sizing and grouped/stacked avatar display.

## Depends on

- [[lib.utils]] — Exports the cn() helper that merges Tailwind class names via clsx and tailwind-merge, used throughout UI components for conditional styling.

## Used by

- [[components.layout.sidebar]] — App shell sidebar with nav links (Drive/Photos/Favorites/Search), theme toggle, and user avatar/logout button that DELETEs /api/auth/session to end the iron-session and redirect to /login.
