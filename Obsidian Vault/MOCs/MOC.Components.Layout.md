---
tags: [moc]
---

# Components/Layout

- [[components.layout.breadcrumbs]] — Renders a folder path trail (Home + Link items per BreadcrumbItem) linking to /drive/[id] for navigating up the Folder hierarchy.
- [[components.layout.sidebar]] — App shell sidebar with nav links (Drive/Photos/Favorites/Search), theme toggle, and user avatar/logout button that DELETEs /api/auth/session to end the iron-session and redirect to /login.
- [[components.layout.theme-toggle]] — Client button using next-themes' useTheme to flip between light/dark mode, guarding against hydration mismatch with a mounted flag.
- [[components.layout.topbar]] — Header bar with a search form (navigates to /search?q=...), New Folder button, and hidden multi-file input wired to onUpload/onCreateFolder callback props for drive pages.
