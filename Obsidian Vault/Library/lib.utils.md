---
tags: [lib]
---

# utils

`src/lib/utils.ts`

Exports the cn() helper that merges Tailwind class names via clsx and tailwind-merge, used throughout UI components for conditional styling.

## Depends on

*No local dependencies — leaf module.*

## Used by

- [[components.layout.sidebar]] — App shell sidebar with nav links (Drive/Photos/Favorites/Search), theme toggle, and user avatar/logout button that DELETEs /api/auth/session to end the iron-session and redirect to /login.
- [[components.ui.avatar]] — Exports Avatar, AvatarImage, AvatarFallback, AvatarGroup(Count), AvatarBadge wrapping @base-ui/react/avatar for user profile pictures with sm/default/lg sizing and grouped/stacked avatar display.
- [[components.ui.badge]] — Exports Badge and badgeVariants (cva-driven default/secondary/destructive/outline/ghost/link styles) as a small pill-shaped label component used for tags/status indicators.
- [[components.ui.button]] — Exports Button and buttonVariants wrapping @base-ui/react/button with cva variants (default/outline/secondary/ghost/destructive/link) and size options (xs-lg, icon) used app-wide for actions like upload/delete/share.
- [[components.ui.context-menu]] — Wraps @base-ui/react/context-menu into ContextMenu/Trigger/Content/Item/Checkbox/Radio/Sub components, providing right-click menus (e.g. file/folder actions) with Tailwind styling.
- [[components.ui.dialog]] — Wraps @base-ui/react/dialog into Dialog/DialogTrigger/Content/Header/Footer/Title/Description for modal dialogs (e.g. rename, create-folder, confirm-delete prompts) with a Button-based close icon.
- [[components.ui.dropdown-menu]] — Wraps @base-ui/react/menu into DropdownMenu/Trigger/Content/Item/Checkbox/Radio/Sub components for dropdown action menus (e.g. per-file/folder options menu) with Tailwind animations.
- [[components.ui.input]] — Exports a styled Input wrapping @base-ui/react/input, a single text/file input control used across forms (rename, search, login) with focus/invalid/disabled styling.
- [[components.ui.progress]] — Wraps @base-ui/react/progress into Progress/Track/Indicator/Label/Value, rendering an upload/download progress bar with numeric value display.
- [[components.ui.scroll-area]] — Wraps @base-ui/react/scroll-area into ScrollArea and ScrollBar, providing a custom-styled scrollable viewport (e.g. for the file list or sidebar) with themed scrollbar thumb.
- [[components.ui.separator]] — Exports a single Separator component wrapping @base-ui/react/separator, a thin horizontal/vertical divider line used to visually split UI sections.
- [[components.ui.sheet]] — Wraps @base-ui/react/dialog (aliased as SheetPrimitive) into Sheet/Trigger/Content/Header/Footer/Title/Description implementing a slide-in side panel (top/right/bottom/left) e.g. for file details or filters.
- [[components.ui.skeleton]] — Exports a single Skeleton div with a pulsing muted-background animation, used as a loading placeholder while file/folder lists fetch data.
- [[components.ui.tooltip]] — Wraps @base-ui/react/tooltip into TooltipProvider/Tooltip/Trigger/Content, rendering hover tooltips with a positioned arrow for icon buttons throughout the UI.
