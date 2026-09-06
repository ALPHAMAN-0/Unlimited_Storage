---
tags: [ui-primitive]
---

# dialog

`src/components/ui/dialog.tsx`

Wraps @base-ui/react/dialog into Dialog/DialogTrigger/Content/Header/Footer/Title/Description for modal dialogs (e.g. rename, create-folder, confirm-delete prompts) with a Button-based close icon.

## Depends on

- [[lib.utils]] — Exports the cn() helper that merges Tailwind class names via clsx and tailwind-merge, used throughout UI components for conditional styling.
- [[components.ui.button]] — Exports Button and buttonVariants wrapping @base-ui/react/button with cva variants (default/outline/secondary/ghost/destructive/link) and size options (xs-lg, icon) used app-wide for actions like upload/delete/share.

## Used by

- [[components.files.create-folder-dialog]] — Modal dialog component with a name input that calls an onSubmit callback to create a new Folder, resetting state and closing on submit.
