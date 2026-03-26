# Unlimitade Storage — Architecture Plan

This document explores all possible approaches to building a free unlimited cloud storage system using Telegram as the backend. Each approach is evaluated for complexity, performance, scalability, and trade-offs.

---

## Table of Contents

1. [Approach 1: Next.js Monolith (Current)](#approach-1-nextjs-monolith-current)
2. [Approach 2: Separate Frontend + Backend API](#approach-2-separate-frontend--backend-api)
3. [Approach 3: Desktop App (Electron)](#approach-3-desktop-app-electron)
4. [Approach 4: Mobile App (React Native)](#approach-4-mobile-app-react-native)
5. [Approach 5: CLI Tool](#approach-5-cli-tool)
6. [Approach 6: Browser Extension](#approach-6-browser-extension)
7. [Approach 7: Telegram Mini App](#approach-7-telegram-mini-app)
8. [Approach 8: Peer-to-Peer with Telegram Relay](#approach-8-peer-to-peer-with-telegram-relay)
9. [Comparison Matrix](#comparison-matrix)
10. [Database Options](#database-options)
11. [Authentication Options](#authentication-options)
12. [Storage Strategy Options](#storage-strategy-options)
13. [Recommended Evolution Path](#recommended-evolution-path)

---

## Approach 1: Next.js Monolith (Current)

**What:** Single Next.js app handling both frontend and backend (API routes).

```
┌─────────────────────────────────────────────────────┐
│                    BROWSER                           │
│  ┌───────────────────────────────────────────────┐  │
│  │              React Frontend                    │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐         │  │
│  │  │  Drive   │ │ Photos  │ │ Search  │         │  │
│  │  │  Page    │ │  Page   │ │  Page   │         │  │
│  │  └────┬────┘ └────┬────┘ └────┬────┘         │  │
│  │       │           │           │                │  │
│  │       └───────────┴───────────┘                │  │
│  │                   │                            │  │
│  │            SWR / Zustand                       │  │
│  └───────────────────┬───────────────────────────┘  │
│                      │ HTTP                          │
└──────────────────────┼──────────────────────────────┘
                       │
┌──────────────────────┼──────────────────────────────┐
│              NEXT.JS SERVER                          │
│                      │                               │
│  ┌───────────────────▼───────────────────────────┐  │
│  │              API Routes                        │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐      │  │
│  │  │/api/files│ │/api/auth │ │/api/search│      │  │
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘      │  │
│  │       │            │             │             │  │
│  │       └────────────┼─────────────┘             │  │
│  └────────────────────┼──────────────────────────┘  │
│                       │                              │
│  ┌────────────────────┼──────────────────────────┐  │
│  │            Service Layer                       │  │
│  │  ┌──────────┐ ┌───▼──────┐ ┌──────────┐      │  │
│  │  │ Prisma   │ │ Telegram │ │  Sharp   │      │  │
│  │  │ (SQLite) │ │ Bot API  │ │(Thumbs)  │      │  │
│  │  └────┬─────┘ └────┬─────┘ └──────────┘      │  │
│  └───────┼─────────────┼────────────────────────┘  │
└──────────┼─────────────┼────────────────────────────┘
           │             │
     ┌─────▼─────┐ ┌─────▼──────────────┐
     │  SQLite   │ │  Telegram Private  │
     │  dev.db   │ │  Channel (Files)   │
     │ (metadata)│ │  (actual storage)  │
     └───────────┘ └────────────────────┘
```

**Pros:**
- Simple deployment (single app)
- Shared types between frontend and backend
- Fast development cycle
- Free hosting on Vercel

**Cons:**
- API routes share resources with frontend
- SQLite doesn't scale horizontally
- Tightly coupled — hard to add mobile app later

**Best for:** Solo developer, MVP, small user base

---

## Approach 2: Separate Frontend + Backend API

**What:** React SPA (or Next.js) frontend + standalone Node.js/Express/Fastify API server.

```
┌──────────────────────┐         ┌──────────────────────────┐
│      FRONTEND        │         │      BACKEND API          │
│   (React / Next.js)  │         │   (Node.js + Express)     │
│                      │         │                           │
│  ┌────────────────┐  │  REST   │  ┌─────────────────────┐ │
│  │   React App    │  │  or     │  │   Express Router     │ │
│  │                │──┼─GraphQL─┼─▶│                     │ │
│  │  - Drive View  │  │         │  │  POST /api/upload   │ │
│  │  - Photos View │  │         │  │  GET  /api/files    │ │
│  │  - Search      │  │         │  │  GET  /api/download │ │
│  │  - Auth        │  │         │  │  POST /api/folders  │ │
│  └────────────────┘  │         │  └──────────┬──────────┘ │
│                      │         │             │             │
│  Hosted on:          │         │  ┌──────────▼──────────┐ │
│  Vercel / Netlify    │         │  │   Service Layer      │ │
│  / S3 + CloudFront   │         │  │                     │ │
│                      │         │  │  ┌───────┐ ┌──────┐ │ │
└──────────────────────┘         │  │  │Prisma │ │Grammy│ │ │
                                 │  │  │       │ │      │ │ │
                                 │  │  └───┬───┘ └──┬───┘ │ │
                                 │  └──────┼────────┼─────┘ │
                                 │         │        │        │
                                 │  ┌──────▼──┐ ┌───▼─────┐ │
                                 │  │PostgreSQL│ │Telegram │ │
                                 │  │/ Turso   │ │Channel  │ │
                                 │  └─────────┘ └─────────┘ │
                                 │                           │
                                 │  Hosted on:               │
                                 │  Railway / Fly.io / VPS   │
                                 └──────────────────────────┘
```

**Pros:**
- Clean separation of concerns
- Backend can serve multiple clients (web, mobile, CLI)
- Can scale frontend and backend independently
- Better for teams

**Cons:**
- More infrastructure to manage
- CORS configuration needed
- Two deployments to maintain
- Higher complexity

**Best for:** Multi-platform app, team development, production at scale

---

## Approach 3: Desktop App (Electron)

**What:** Cross-platform desktop app with direct Telegram API access.

```
┌───────────────────────────────────────────────┐
│              ELECTRON APP                      │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │           Renderer Process                │ │
│  │           (React + Tailwind)              │ │
│  │                                           │ │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐    │ │
│  │  │  Drive   │ │ Photos  │ │Settings │    │ │
│  │  └────┬────┘ └────┬────┘ └────┬────┘    │ │
│  └───────┼───────────┼───────────┼──────────┘ │
│          │    IPC Bridge         │             │
│  ┌───────▼───────────▼───────────▼──────────┐ │
│  │           Main Process                    │ │
│  │                                           │ │
│  │  ┌───────────┐  ┌────────────────────┐   │ │
│  │  │  SQLite   │  │  Telegram MTProto  │   │ │
│  │  │  (local)  │  │  (direct connect)  │   │ │
│  │  └─────┬─────┘  └────────┬───────────┘   │ │
│  └────────┼─────────────────┼───────────────┘ │
└───────────┼─────────────────┼─────────────────┘
            │                 │
      ┌─────▼─────┐    ┌─────▼──────────────┐
      │  Local DB  │    │  Telegram Cloud    │
      │  (SQLite)  │    │  (Private Channel) │
      └───────────┘    └────────────────────┘
```

**Pros:**
- No server needed — runs entirely on user's machine
- Direct MTProto connection (faster uploads, no 50 MB bot limit)
- Works offline (metadata available locally)
- Native file system integration (drag from desktop)
- No hosting costs

**Cons:**
- Users must install the app
- No web access
- Harder to update (no instant deploy)
- Must handle Telegram session management locally
- Cross-platform testing (Windows, Mac, Linux)

**Best for:** Power users, privacy-focused users, large file uploads

---

## Approach 4: Mobile App (React Native)

**What:** Native mobile app for iOS and Android.

```
┌──────────────────────────────────┐
│         MOBILE APP               │
│     (React Native / Expo)        │
│                                  │
│  ┌────────────────────────────┐  │
│  │        UI Layer            │  │
│  │  ┌──────┐ ┌──────┐        │  │
│  │  │Drive │ │Photos│ Camera │  │
│  │  │View  │ │Grid  │ Upload │  │
│  │  └──┬───┘ └──┬───┘        │  │
│  └─────┼────────┼────────────┘  │
│        │        │                │
│  ┌─────▼────────▼────────────┐  │
│  │      API Client           │  │
│  │  (Axios / React Query)    │  │
│  └───────────┬───────────────┘  │
└──────────────┼──────────────────┘
               │ HTTPS
               │
┌──────────────▼──────────────────┐
│        BACKEND API              │
│    (Same as Approach 2)         │
│                                 │
│  Node.js → Telegram Bot API    │
│         → PostgreSQL            │
└─────────────────────────────────┘
```

**Pros:**
- Native mobile experience (camera upload, share sheet, notifications)
- Auto-upload photos from camera roll
- Push notifications for upload completion
- Works alongside the web app (shared backend)

**Cons:**
- Requires separate backend API (Approach 2)
- App store approval process
- Two codebases to maintain (or use Expo for cross-platform)
- More complex development

**Best for:** Photo backup, mobile-first users, Google Photos replacement

---

## Approach 5: CLI Tool

**What:** Command-line tool for uploading and managing files.

```
┌─────────────────────────────────────────────┐
│                 TERMINAL                     │
│                                              │
│  $ unlimitade upload ./photos/               │
│  Uploading 142 files...                      │
│  [████████████████████░░░░] 78% (111/142)    │
│                                              │
│  $ unlimitade ls /photos/vacation            │
│  IMG_001.jpg  IMG_002.jpg  IMG_003.jpg       │
│                                              │
│  $ unlimitade download IMG_001.jpg           │
│  Downloaded to ./IMG_001.jpg (4.2 MB)        │
│                                              │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│              CLI APPLICATION                 │
│           (Node.js / Go / Rust)              │
│                                              │
│  ┌─────────────┐  ┌──────────────────────┐  │
│  │  Commander   │  │  Telegram MTProto    │  │
│  │  (CLI args)  │  │  (direct upload)     │  │
│  └──────┬──────┘  └──────────┬───────────┘  │
│         │                    │               │
│  ┌──────▼──────┐  ┌─────────▼───────────┐  │
│  │  Local JSON  │  │  Telegram Channel   │  │
│  │  / SQLite    │  │  (file storage)     │  │
│  └─────────────┘  └─────────────────────┘  │
└──────────────────────────────────────────────┘
```

**Pros:**
- Extremely lightweight
- Great for bulk uploads and scripting
- Can be piped with other CLI tools
- Works over SSH (manage files on remote servers)
- No browser needed

**Cons:**
- No visual file preview
- Not user-friendly for non-technical users
- No drag & drop
- Limited search capabilities

**Best for:** Developers, server backups, automated uploads, CI/CD pipelines

---

## Approach 6: Browser Extension

**What:** Chrome/Firefox extension that adds "Save to Unlimitade" to any webpage.

```
┌─────────────────────────────────────────────────────┐
│                    BROWSER                           │
│                                                      │
│  ┌──────────────────────────────┐                   │
│  │       Any Webpage            │                   │
│  │                              │                   │
│  │  [Right-click on image]      │                   │
│  │  ┌─────────────────────┐    │                   │
│  │  │ Save to Unlimitade  │────┼──┐                │
│  │  └─────────────────────┘    │  │                │
│  └──────────────────────────────┘  │                │
│                                     │                │
│  ┌──────────────────────────────────▼─────────────┐ │
│  │            BROWSER EXTENSION                    │ │
│  │                                                 │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐ │ │
│  │  │ Popup UI │  │ Context  │  │ Background   │ │ │
│  │  │ (React)  │  │ Menu     │  │ Worker       │ │ │
│  │  └──────────┘  └──────────┘  └──────┬───────┘ │ │
│  └──────────────────────────────────────┼─────────┘ │
└─────────────────────────────────────────┼───────────┘
                                          │ HTTPS
                                          │
                                ┌─────────▼─────────┐
                                │   Backend API     │
                                │   → Telegram      │
                                └───────────────────┘
```

**Pros:**
- Save files from any webpage instantly
- Right-click "Save to Unlimitade" context menu
- Screenshot capture → auto upload
- No separate app to open

**Cons:**
- Browser-only (no mobile)
- Limited UI for file management
- Needs backend API
- Extension store approval

**Best for:** Quick file saving, web clipping, screenshot backup

---

## Approach 7: Telegram Mini App

**What:** Build the file manager directly inside Telegram as a Mini App (Web App).

```
┌─────────────────────────────────────────────┐
│              TELEGRAM APP                    │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │         Telegram Mini App              │  │
│  │         (Web App inside Telegram)      │  │
│  │                                        │  │
│  │  ┌──────────────────────────────────┐  │  │
│  │  │     React SPA (Vite)             │  │  │
│  │  │                                  │  │  │
│  │  │  ┌────────┐  ┌────────┐         │  │  │
│  │  │  │ Drive  │  │ Photos │         │  │  │
│  │  │  │ View   │  │ Grid   │         │  │  │
│  │  │  └───┬────┘  └───┬────┘         │  │  │
│  │  │      │            │              │  │  │
│  │  │      └─────┬──────┘              │  │  │
│  │  └────────────┼─────────────────────┘  │  │
│  │               │                        │  │
│  │    Telegram WebApp API                 │  │
│  │    (auth, theme, haptics)              │  │
│  └───────────────┬────────────────────────┘  │
│                  │                            │
└──────────────────┼────────────────────────────┘
                   │ HTTPS
                   │
         ┌─────────▼─────────┐
         │   Backend API     │
         │   → Bot API       │
         │   → Database      │
         └───────────────────┘
```

**Pros:**
- No separate app download — runs inside Telegram
- **Authentication is automatic** (Telegram provides user data)
- Native Telegram theme (light/dark matches Telegram)
- 900M+ Telegram users can access instantly
- Haptic feedback, native share, inline mode
- Can be launched from a bot button

**Cons:**
- Limited screen size and capabilities
- Must follow Telegram's Mini App guidelines
- Can't work outside Telegram
- Limited file picker access
- Dependent on Telegram platform

**Best for:** Telegram-native experience, widest distribution, zero-friction onboarding

---

## Approach 8: Peer-to-Peer with Telegram Relay

**What:** No central server. Each user runs a local agent that syncs files via Telegram.

```
┌──────────────────┐                    ┌──────────────────┐
│   DEVICE A       │                    │   DEVICE B       │
│   (Laptop)       │                    │   (Phone)        │
│                  │                    │                  │
│  ┌────────────┐  │                    │  ┌────────────┐  │
│  │ Local App  │  │                    │  │ Local App  │  │
│  │            │  │                    │  │            │  │
│  │ SQLite DB  │  │                    │  │ SQLite DB  │  │
│  │ File Index │  │                    │  │ File Index │  │
│  └─────┬──────┘  │                    │  └─────┬──────┘  │
└────────┼─────────┘                    └────────┼─────────┘
         │                                       │
         │         ┌────────────────────┐        │
         │         │                    │        │
         └────────▶│  Telegram Channel  │◀───────┘
                   │  (Sync Relay)      │
          Upload   │                    │  Download
          & Sync   │  Messages contain: │  & Sync
                   │  - File data       │
                   │  - Metadata JSON   │
                   │  - Sync commands   │
                   └────────────────────┘
```

**Pros:**
- No central server needed
- Files sync across all devices automatically
- Each device has a local copy of the index
- Works offline, syncs when online
- Maximum privacy

**Cons:**
- Complex sync logic (conflict resolution)
- No web access without a running device
- Each device needs the app running
- Harder to build and debug

**Best for:** Privacy maximalists, multi-device sync, offline-first usage

---

## Comparison Matrix

```
┌──────────────────┬────────┬────────┬─────────┬──────────┬─────────┐
│    Approach       │ Effort │ Scale  │  UX     │ Cost     │ Offline │
├──────────────────┼────────┼────────┼─────────┼──────────┼─────────┤
│ 1. Next.js Mono  │ ★☆☆☆☆ │ ★★☆☆☆ │ ★★★★☆  │ Free     │ No      │
│ 2. FE + API      │ ★★★☆☆ │ ★★★★☆ │ ★★★★☆  │ ~$5/mo   │ No      │
│ 3. Electron      │ ★★★☆☆ │ ★☆☆☆☆ │ ★★★★★  │ Free     │ Yes     │
│ 4. React Native  │ ★★★★☆ │ ★★★★☆ │ ★★★★★  │ ~$5/mo   │ Partial │
│ 5. CLI Tool      │ ★★☆☆☆ │ ★☆☆☆☆ │ ★★☆☆☆  │ Free     │ No      │
│ 6. Extension     │ ★★★☆☆ │ ★★★☆☆ │ ★★★☆☆  │ ~$5/mo   │ No      │
│ 7. Mini App      │ ★★☆☆☆ │ ★★★★★ │ ★★★☆☆  │ ~$5/mo   │ No      │
│ 8. P2P Sync      │ ★★★★★ │ ★★★★★ │ ★★★☆☆  │ Free     │ Yes     │
└──────────────────┴────────┴────────┴─────────┴──────────┴─────────┘

★ = Low/Poor    ★★★★★ = High/Excellent
```

---

## Database Options

```
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE CHOICES                          │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐│
│  │   SQLite    │  │  PostgreSQL │  │  Turso (LibSQL)     ││
│  │             │  │             │  │                     ││
│  │  Local file │  │  Hosted     │  │  Edge-distributed   ││
│  │  Zero setup │  │  Full SQL   │  │  SQLite protocol    ││
│  │  Free       │  │  Scalable   │  │  Free tier          ││
│  │             │  │             │  │                     ││
│  │  Best for:  │  │  Best for:  │  │  Best for:          ││
│  │  Dev/Single │  │  Multi-user │  │  Serverless/Edge    ││
│  │  user       │  │  production │  │  deployment         ││
│  └─────────────┘  └─────────────┘  └─────────────────────┘│
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐│
│  │  MongoDB    │  │  Redis      │  │  Telegram itself    ││
│  │             │  │  (Cache)    │  │  (No external DB)   ││
│  │  Document   │  │             │  │                     ││
│  │  store      │  │  Session    │  │  Store metadata as  ││
│  │  Flexible   │  │  cache +    │  │  message captions   ││
│  │  schema     │  │  rate limit │  │  in the channel     ││
│  │             │  │             │  │                     ││
│  │  Best for:  │  │  Best for:  │  │  Best for:          ││
│  │  Complex    │  │  Alongside  │  │  Zero-dependency    ││
│  │  metadata   │  │  any DB     │  │  setup              ││
│  └─────────────┘  └─────────────┘  └─────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### Zero-Database Approach (Telegram as DB)

An interesting alternative: **use Telegram messages themselves as the database**.

```
Channel Message Format:
┌──────────────────────────────────────────┐
│  📎 Document: vacation_photo.jpg         │
│                                          │
│  Caption (JSON metadata):                │
│  {                                       │
│    "folder": "/photos/vacation",         │
│    "tags": ["travel", "2024"],           │
│    "favorite": true,                     │
│    "uploaded": "2024-03-15T10:30:00Z"    │
│  }                                       │
└──────────────────────────────────────────┘
```

**Pros:** No database to manage, everything lives in Telegram
**Cons:** Slow search (must scan all messages), no complex queries, rate limits

---

## Authentication Options

```
┌──────────────────────────────────────────────────────────────────┐
│                   AUTHENTICATION STRATEGIES                       │
│                                                                   │
│  Option A: Telegram Login Widget (Current)                       │
│  ┌────────┐     ┌──────────┐     ┌─────────┐                    │
│  │ User   │────▶│ Telegram │────▶│ Server  │                    │
│  │ clicks │     │ OAuth    │     │validates│                    │
│  │ widget │     │ popup    │     │ HMAC    │                    │
│  └────────┘     └──────────┘     └─────────┘                    │
│  ✅ Secure  ✅ No passwords  ❌ Needs real domain               │
│                                                                   │
│  Option B: Telegram Bot /start Command                           │
│  ┌────────┐     ┌──────────┐     ┌─────────┐                    │
│  │ User   │────▶│ Bot sends│────▶│ Server  │                    │
│  │ sends  │     │ one-time │     │ verifies│                    │
│  │/start  │     │ code     │     │ code    │                    │
│  └────────┘     └──────────┘     └─────────┘                    │
│  ✅ Works on localhost  ✅ Simple  ❌ Extra step                 │
│                                                                   │
│  Option C: QR Code Login                                         │
│  ┌────────┐     ┌──────────┐     ┌─────────┐                    │
│  │ Web    │────▶│ User     │────▶│ Bot     │                    │
│  │ shows  │     │ scans QR │     │confirms │                    │
│  │ QR code│     │ in TG app│     │ login   │                    │
│  └────────┘     └──────────┘     └─────────┘                    │
│  ✅ Works on localhost  ✅ Cool UX  ❌ Complex implementation   │
│                                                                   │
│  Option D: Phone Number + OTP                                    │
│  ┌────────┐     ┌──────────┐     ┌─────────┐                    │
│  │ User   │────▶│ Bot sends│────▶│ Server  │                    │
│  │ enters │     │ OTP via  │     │ verifies│                    │
│  │ phone  │     │ Telegram │     │ OTP     │                    │
│  └────────┘     └──────────┘     └─────────┘                    │
│  ✅ Familiar UX  ✅ Localhost  ❌ Need to store phone numbers   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Storage Strategy Options

```
┌──────────────────────────────────────────────────────────────┐
│              FILE STORAGE STRATEGIES                          │
│                                                              │
│  Strategy 1: One File Per Message (Current)                  │
│  ┌──────────────────────────────────────┐                   │
│  │  Message 1: photo.jpg               │                   │
│  │  Message 2: document.pdf            │                   │
│  │  Message 3: video.mp4              │                   │
│  └──────────────────────────────────────┘                   │
│  ✅ Simple  ✅ Easy download  ❌ 2GB limit per file         │
│                                                              │
│                                                              │
│  Strategy 2: File Chunking (For files > 2 GB)               │
│  ┌──────────────────────────────────────┐                   │
│  │  large_video.mp4 (5 GB total)       │                   │
│  │                                      │                   │
│  │  Message 1: chunk_001 (2 GB)        │                   │
│  │  Message 2: chunk_002 (2 GB)        │                   │
│  │  Message 3: chunk_003 (1 GB)        │                   │
│  │  Message 4: manifest.json           │                   │
│  └──────────────────────────────────────┘                   │
│  ✅ No size limit  ❌ Complex reassembly  ❌ Slow download  │
│                                                              │
│                                                              │
│  Strategy 3: Compression Before Upload                       │
│  ┌──────────────────────────────────────┐                   │
│  │  Original: 800 MB video             │                   │
│  │      │                               │                   │
│  │      ▼ gzip / zstd                  │                   │
│  │                                      │                   │
│  │  Compressed: 400 MB                  │                   │
│  │      │                               │                   │
│  │      ▼ Upload to Telegram           │                   │
│  └──────────────────────────────────────┘                   │
│  ✅ Saves space  ❌ CPU overhead  ❌ Not useful for media   │
│                                                              │
│                                                              │
│  Strategy 4: Encryption Before Upload                        │
│  ┌──────────────────────────────────────┐                   │
│  │  file.pdf                            │                   │
│  │      │                               │                   │
│  │      ▼ AES-256-GCM encrypt          │                   │
│  │                                      │                   │
│  │  file.pdf.enc                        │                   │
│  │      │                               │                   │
│  │      ▼ Upload to Telegram           │                   │
│  │                                      │                   │
│  │  Key stored locally / derived from  │                   │
│  │  user password                       │                   │
│  └──────────────────────────────────────┘                   │
│  ✅ End-to-end privacy  ❌ Can't preview  ❌ Key management │
│                                                              │
│                                                              │
│  Strategy 5: Multiple Channels (Sharding)                    │
│  ┌──────────────────────────────────────┐                   │
│  │  Channel A: Images                   │                   │
│  │  Channel B: Videos                   │                   │
│  │  Channel C: Documents                │                   │
│  │  Channel D: Other                    │                   │
│  └──────────────────────────────────────┘                   │
│  ✅ Organized  ✅ Parallel uploads  ❌ Complex routing      │
└──────────────────────────────────────────────────────────────┘
```

---

## Why Approach 1 (Next.js Monolith) Is the Best Starting Choice

```
┌──────────────────────────────────────────────────────────────────┐
│                WHY THIS PATTERN WINS FOR V1                      │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  1. SPEED TO MARKET                                        │  │
│  │     ─────────────────                                      │  │
│  │     One codebase, one deployment, one language.             │  │
│  │     Go from idea → working product in days, not months.    │  │
│  │                                                             │  │
│  │     ❌ Approach 2: Need to build + deploy 2 apps           │  │
│  │     ❌ Approach 3: Need to learn Electron + packaging      │  │
│  │     ❌ Approach 4: Need app store approval (weeks)         │  │
│  │     ✅ Approach 1: Deploy to Vercel in 5 minutes           │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  2. ZERO COST                                              │  │
│  │     ─────────                                              │  │
│  │     Vercel free tier + SQLite + Telegram = $0/month        │  │
│  │                                                             │  │
│  │     ❌ Approach 2: Need paid hosting for API server        │  │
│  │     ❌ Approach 4: Apple Developer Account = $99/year      │  │
│  │     ✅ Approach 1: Completely free to host                 │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  3. FULL-STACK TYPE SAFETY                                 │  │
│  │     ─────────────────────                                  │  │
│  │     TypeScript everywhere. Prisma types flow from DB       │  │
│  │     → API → Frontend. One change updates everything.       │  │
│  │                                                             │  │
│  │     ❌ Approach 2: API contract can drift from frontend    │  │
│  │     ❌ Approach 5: No frontend types at all                │  │
│  │     ✅ Approach 1: Single source of truth                  │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  4. SEO + SSR + PERFORMANCE                                │  │
│  │     ──────────────────────                                 │  │
│  │     Next.js gives server-side rendering for free.          │  │
│  │     Pages load fast. Login page is pre-rendered.           │  │
│  │                                                             │  │
│  │     ❌ Approach 3: Desktop only, no web access             │  │
│  │     ❌ Approach 7: Limited to Telegram's WebView           │  │
│  │     ✅ Approach 1: Full web experience with SSR            │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  5. EASY TO EVOLVE                                         │  │
│  │     ──────────────                                         │  │
│  │     The monolith can be split later when needed:           │  │
│  │                                                             │  │
│  │     Next.js Monolith                                       │  │
│  │         │                                                   │  │
│  │         ├──▶ Extract API → Approach 2 (add mobile app)    │  │
│  │         ├──▶ Add Mini App → Approach 7 (Telegram users)   │  │
│  │         └──▶ Add CLI     → Approach 5 (developer tools)   │  │
│  │                                                             │  │
│  │     Starting with a monolith doesn't lock you in.          │  │
│  │     Starting with microservices wastes time upfront.       │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  6. GOOGLE DRIVE PROVED THIS UX WORKS                      │  │
│  │     ────────────────────────────────                       │  │
│  │     Google Drive's web interface is the most used cloud    │  │
│  │     storage UI in the world. By building a web app with    │  │
│  │     the same patterns (sidebar, grid, preview, search),    │  │
│  │     users already know how to use it.                      │  │
│  │                                                             │  │
│  │     A CLI tool (Approach 5) is powerful but unfamiliar.    │  │
│  │     A desktop app (Approach 3) requires installation.      │  │
│  │     A web app just works — open a URL and go.              │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  VERDICT: Approach 1 gives the best ratio of                     │
│           effort-to-value for a solo developer MVP.              │
└──────────────────────────────────────────────────────────────────┘
```

---

## Recommended Evolution Path

The best approach is to **start simple and evolve** based on actual needs:

```
Phase 1 (NOW)                Phase 2                    Phase 3
─────────────                ─────────                  ─────────

┌──────────────┐      ┌──────────────────┐      ┌──────────────────┐
│  Next.js     │      │  Next.js Frontend│      │  Next.js Frontend│
│  Monolith    │ ───▶ │  +               │ ───▶ │  +               │
│  + SQLite    │      │  Separate API    │      │  Separate API    │
│              │      │  + PostgreSQL    │      │  + PostgreSQL    │
│  (Current)   │      │  + Turso         │      │  + Redis Cache   │
└──────────────┘      └──────────────────┘      │  +               │
                                                 │  React Native    │
                              │                  │  Mobile App      │
                              │                  │  +               │
                              ▼                  │  Telegram Mini   │
                      Add these features:        │  App             │
                      - File sharing             │  +               │
                      - Multi-user               │  CLI Tool        │
                      - Better search            └──────────────────┘
                      - File chunking

Timeline:      MVP (1-2 weeks)    V2 (1-2 months)      V3 (3-6 months)
Users:         1 (you)            10-100                1000+
```

### Phase 1: MVP (Current) ✅
- [x] Next.js monolith with SQLite
- [x] Basic file upload/download via Telegram Bot API
- [x] Folder management
- [x] Image thumbnails
- [x] Search and favorites
- [x] Dark/light theme
- [x] Telegram login + dev login

### Phase 2: Production Ready
- [ ] Migrate to PostgreSQL or Turso
- [ ] Add file sharing with public links
- [ ] File chunking for > 2 GB files
- [ ] Bulk operations (select multiple, delete, move)
- [ ] Trash / recycle bin
- [ ] Separate backend API for multi-client support
- [ ] Deploy to Vercel + Railway

### Phase 3: Multi-Platform
- [ ] React Native mobile app
- [ ] Telegram Mini App
- [ ] CLI tool for developers
- [ ] Auto-upload from mobile camera roll
- [ ] End-to-end encryption option
- [ ] Multi-user with access controls

---

<p align="center">
  <em>Start with what works. Scale when you need to.</em>
</p>
