---
tags: [home]
---

# Unlimitade Storage — Project Map

**Unlimited cloud storage powered by Telegram.** A Next.js 16 app that gives Telegram's free, effectively-unlimited file storage a Google-Drive-style web UI. Files are uploaded to a private Telegram channel via a bot (and MTProto for files over 50 MB); a Prisma/SQLite database tracks metadata (names, folders, thumbnails, favorites, tags).

Open this vault in Obsidian and use **Graph View** to explore how the app is wired together — every note below is a real source file or data model, and every link is a real import or relation.

## Start here

- [[Architecture]] — how a request flows from browser to Telegram and back
- [[MOC.API-Routes]]
- [[MOC.Pages]]
- [[MOC.Components.Auth]]
- [[MOC.Components.Layout]]
- [[MOC.Components.Files]]
- [[MOC.Components.Upload]]
- [[MOC.Components.UI]]
- [[MOC.Library]]
- [[MOC.Library.Telegram]]
- [[MOC.Library.Auth]]
- [[MOC.Hooks-&-State]]
- [[MOC.Data-Model]]

## Stack

- **Frontend:** Next.js 16 (React 19) App Router, Tailwind v4, shadcn/ui (Base UI primitives), Zustand, SWR-style hooks
- **Backend:** Next.js API routes, iron-session, Telegram Bot API (`grammy`) + raw MTProto (`telegram` / gramjs) for large files
- **Data:** Prisma 7 + `@libsql/client` (SQLite), see [[prisma.schema]]
- **Auth:** Telegram Login widget → `/api/auth/telegram` → iron-session cookie
