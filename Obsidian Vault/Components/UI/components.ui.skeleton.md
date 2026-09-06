---
tags: [ui-primitive]
---

# skeleton

`src/components/ui/skeleton.tsx`

Exports a single Skeleton div with a pulsing muted-background animation, used as a loading placeholder while file/folder lists fetch data.

## Depends on

- [[lib.utils]] — Exports the cn() helper that merges Tailwind class names via clsx and tailwind-merge, used throughout UI components for conditional styling.

## Used by

- [[app.photos.page]] — Client component showing image-type Files grouped by date-taken (via usePhotos()), rendering a lazy-loaded thumbnail grid (/api/files/[id]/thumbnail) with FilePreview on click.
