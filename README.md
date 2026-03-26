<p align="center">
  <img src="unlimitade-storage/public/logo.png" alt="Unlimitade Storage" width="120" height="120" style="border-radius: 20px;" />
</p>

<h1 align="center">Unlimitade Storage</h1>

<p align="center">
  <strong>Unlimited cloud storage powered by Telegram.</strong><br />
  Upload, organize, and access your files from anywhere — for free.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Telegram-Bot%20API-26A5E4?logo=telegram" alt="Telegram" />
  <img src="https://img.shields.io/badge/Prisma-7.5-2D3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</p>

---

## The Problem

Cloud storage is expensive. Services like Google Drive, Dropbox, and OneDrive offer limited free tiers (15 GB, 2 GB, 5 GB respectively), and scaling beyond that requires a monthly subscription.

| Service | Free Storage | Paid Plans |
|---------|-------------|------------|
| Google Drive | 15 GB | $1.99/mo for 100 GB |
| Dropbox | 2 GB | $11.99/mo for 2 TB |
| OneDrive | 5 GB | $1.99/mo for 100 GB |
| **Unlimitade Storage** | **Unlimited** | **Free** |

For individuals, students, and developers who need to store large amounts of files — photos, videos, documents, backups — paying for cloud storage adds up quickly.

## The Idea

**What if we could use Telegram as a free, unlimited cloud storage backend?**

Telegram offers:
- **Unlimited cloud storage** for messages and files
- **Up to 2 GB per file** (4 GB for premium users)
- **No storage limits** on total files stored
- **Free API access** via the Bot API and MTProto
- **End-to-end infrastructure** maintained by Telegram

The idea is simple: build a **Google Drive-like web interface** on top of Telegram's storage infrastructure. Files are uploaded to a private Telegram channel via a bot, and a local database tracks metadata (file names, folders, thumbnails, etc.).

### Inspiration

This project draws inspiration from two products:

1. **[Google Drive](https://drive.google.com)** — The user experience. Google Drive pioneered the modern cloud file manager with folder hierarchies, search, file preview, and sharing. Unlimitade Storage replicates this familiar UX so users feel at home.

2. **[Telegram](https://telegram.org)** — The infrastructure. Telegram's generous file storage, reliable CDN, and open Bot API make it an ideal backend for storing files at scale — without the cost.

By combining **Google Drive's UX** with **Telegram's free storage**, Unlimitade Storage gives users the best of both worlds.

## Features

### Core Features
- **Unlimited file storage** — Files stored in a private Telegram channel, no storage limits
- **File upload** — Drag & drop or click to upload, with real-time progress tracking
- **Folder management** — Create, rename, delete, and nest folders (like Google Drive)
- **File preview** — Fullscreen preview for images and videos with keyboard navigation
- **Thumbnails** — Auto-generated thumbnails for image files
- **Search** — Search files by name, filter by type (image, video, audio, PDF) and date range
- **Favorites** — Star important files for quick access
- **Photos view** — Gallery view for all images and videos, grouped by date (like Google Photos)

### Technical Features
- **Telegram Login** — Secure authentication via Telegram OAuth (no passwords needed)
- **Dark/Light mode** — System-aware theme with manual toggle
- **Large file support** — Files over 50 MB uploaded via Telegram MTProto protocol
- **Responsive UI** — Works on desktop and mobile browsers
- **Real-time progress** — XHR-based upload tracking with floating progress panel

## How It Works

```
                                    +------------------+
                                    |   Telegram Bot   |
                                    |   (Bot API /     |
                                    |    MTProto)      |
                                    +--------+---------+
                                             |
+----------+     +-----------+     +---------v---------+
|  Browser |---->| Next.js   |---->| Private Telegram  |
|  (React) |<----| API Routes|<----| Channel (Storage) |
+----------+     +-----+-----+     +-------------------+
                       |
                +------v------+
                |   SQLite    |
                |  (Metadata) |
                +-------------+
```

### Upload Flow
1. User selects files in the browser (drag & drop or file picker)
2. Files are sent to `/api/files` via XHR with progress tracking
3. Server uploads the file to a **private Telegram channel** using the Bot API
4. For images, a thumbnail is generated (400x400 WebP) and also uploaded
5. File metadata (name, size, type, Telegram file ID) is saved to **SQLite**
6. File appears in the user's drive

### Download Flow
1. User clicks download on a file
2. Server fetches the file from Telegram using the stored `file_id`
3. File is streamed back to the browser

### Authentication Flow
1. User clicks the Telegram Login Widget
2. Telegram authenticates the user and returns signed data
3. Server validates the data using HMAC-SHA256
4. An encrypted session cookie is created (iron-session)

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19, Tailwind CSS, shadcn/ui | User interface |
| **Framework** | Next.js 16 (App Router) | Full-stack framework |
| **State** | SWR, Zustand | Data fetching, upload progress |
| **Auth** | Telegram Login Widget, iron-session | Authentication |
| **Database** | Prisma 7 + SQLite (LibSQL) | File/folder metadata |
| **Storage** | Telegram Bot API + MTProto | Actual file storage |
| **Thumbnails** | Sharp | Image thumbnail generation |
| **Language** | TypeScript | Type safety |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with theme provider
│   ├── page.tsx                # Redirects to /drive or /login
│   ├── middleware.ts           # Auth guard for protected routes
│   ├── login/page.tsx          # Login page with Telegram OAuth
│   ├── drive/
│   │   ├── page.tsx            # Root drive view
│   │   ├── [folderId]/page.tsx # Folder view with breadcrumbs
│   │   └── layout.tsx          # Sidebar + topbar + upload zone
│   ├── photos/page.tsx         # Photo gallery grouped by date
│   ├── favorites/page.tsx      # Starred files
│   ├── search/page.tsx         # Search with filters
│   └── api/
│       ├── auth/               # Login, session, dev auth
│       ├── files/              # CRUD, upload, download, thumbnails
│       ├── folders/            # CRUD for folders
│       └── search/             # File search endpoint
├── components/
│   ├── auth/                   # Telegram login, dev login
│   ├── layout/                 # Sidebar, topbar, theme toggle
│   ├── files/                  # File grid, cards, preview, folders
│   ├── upload/                 # Drop zone, upload progress
│   └── ui/                     # shadcn/ui components
├── hooks/
│   ├── use-files.ts            # SWR hook for file/folder data
│   ├── use-upload.ts           # XHR upload with progress
│   └── use-session.ts          # User session hook
├── lib/
│   ├── db.ts                   # Prisma client setup
│   ├── thumbnails.ts           # Image thumbnail generation
│   ├── auth/                   # Session config, Telegram validation
│   └── telegram/               # Bot, upload, download, MTProto
├── stores/
│   └── upload-store.ts         # Zustand store for upload progress
└── types/
    └── index.ts                # TypeScript type definitions
```

## Database Schema

```
User
├── id, telegramId, firstName, lastName, username, photoUrl
├── File[]     → originalName, mimeType, size, telegramFileId,
│                telegramMessageId, thumbnailFileId, isImage,
│                isVideo, isFavorite, folderId, dateTaken
├── Folder[]   → name, parentId (self-referencing for nesting)
└── Tag[]      → name (many-to-many with files via FileTag)
```

## Getting Started

### Prerequisites
- **Node.js** 18+
- A **Telegram account**
- A **Telegram Bot** (create via [@BotFather](https://t.me/BotFather))
- A **private Telegram channel** with the bot added as admin

### 1. Clone and install

```bash
git clone https://github.com/your-username/unlimitade-storage.git
cd unlimitade-storage
npm install
```

### 2. Create a Telegram Bot

1. Open Telegram and message [@BotFather](https://t.me/BotFather)
2. Send `/newbot` and follow the prompts
3. Save the **bot token** you receive
4. Send `/setdomain` to BotFather and set your domain (e.g., `yourdomain.com`)

### 3. Create a Private Channel

1. Create a new **private channel** in Telegram
2. Add your bot as an **administrator** with permission to post messages
3. Get the channel ID (send a message in the channel, then use the Bot API `getUpdates` to find it — it starts with `-100`)

### 4. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Database
DATABASE_URL="file:./dev.db"

# Telegram Bot (from @BotFather)
BOT_TOKEN="your-bot-token"
BOT_USERNAME="your_bot_username"
NEXT_PUBLIC_BOT_USERNAME="your_bot_username"

# Private Telegram Channel
CHANNEL_ID="-100xxxxxxxxxx"

# Telegram MTProto (optional, for files > 50 MB)
# Get from https://my.telegram.org
TELEGRAM_API_ID="your-api-id"
TELEGRAM_API_HASH="your-api-hash"
TELEGRAM_SESSION=""

# Session Secret (generate a random 32+ char string)
SESSION_SECRET="your-random-secret-at-least-32-chars"
```

### 5. Set up the database and run

```bash
npx prisma generate
npx prisma db push
npm run dev
```

- `prisma generate` — creates the database client code (needed after first clone)
- `prisma db push` — creates/updates the database tables
- `npm run dev` — starts the app

Open [http://localhost:3000](http://localhost:3000)

> Every time you stop and restart the server, just run:
> ```bash
> npx prisma db push
> npm run dev
> ```

> **Note:** The Telegram Login Widget requires a real domain. For local development, use the "Dev Login" button or set up a tunnel with `cloudflared tunnel --url http://localhost:3000`.

## User Manual

### Setting Up Telegram Connection (One-Time Setup)

Before using the app, you need to connect it to Telegram. This takes about 5 minutes.

#### Step 1: Create a Telegram Bot

1. Open Telegram on your phone or desktop
2. Search for **@BotFather** and start a chat
3. Send `/newbot`
4. BotFather will ask for a **name** — type anything (e.g., `My Storage Bot`)
5. Then it asks for a **username** — must end with `bot` (e.g., `mystorage_bot`)
6. BotFather gives you a **bot token** — looks like `123456789:ABCdefGHIjklMNO`. Copy it.
7. Send `/setdomain` to BotFather, select your bot, and enter your domain (needed for Telegram Login on production)

#### Step 2: Create a Private Channel

1. Open Telegram and create a **New Channel**
2. Name it anything (e.g., `My File Storage`)
3. Set it to **Private**
4. After creating, go to **Channel Settings > Administrators > Add Admin**
5. Search for your bot username and add it as admin
6. Give it permission to **Post Messages** and **Delete Messages**

#### Step 3: Get the Channel ID

Send any message in your channel, then open this URL in your browser (replace `YOUR_BOT_TOKEN`):

```
https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
```

Look for `"chat":{"id":-100xxxxxxxxxx}` in the response. That number starting with `-100` is your **Channel ID**.

#### Step 4: Fill in `.env`

```bash
cp .env.example .env
```

Open `.env` and paste your values:

```
BOT_TOKEN="your-bot-token-from-step-1"
BOT_USERNAME="your_bot_username"
NEXT_PUBLIC_BOT_USERNAME="your_bot_username"
CHANNEL_ID="-100xxxxxxxxxx"
```

#### Step 5 (Optional): Enable Large File Upload (up to 2 GB)

By default, the app supports files up to 50 MB via Bot API. To upload files up to 2 GB:

1. Go to https://my.telegram.org and log in with your phone number
2. Go to **API Development Tools**
3. Create an app — you'll get an **API ID** and **API Hash**
4. Add them to `.env`:
   ```
   TELEGRAM_API_ID="your-api-id"
   TELEGRAM_API_HASH="your-api-hash"
   ```
5. Generate a session string:
   ```bash
   node scripts/generate-session.mjs
   ```
   It will ask for your phone number and a code from Telegram. Paste the output into `.env`:
   ```
   TELEGRAM_SESSION="the-long-session-string"
   ```

This is completely free. Telegram provides these API credentials at no cost.

---

### Using the App

#### Login

- **On a real domain**: Click the Telegram Login button. Telegram will verify your identity.
- **On localhost**: Click the **Dev Login** button (only appears in development mode).

#### My Drive

This is your main file manager. Here you can:

- **Upload files** — Click the "Upload" button or drag & drop files anywhere on the page
- **Create folders** — Click "New Folder" to organize your files
- **Open folders** — Click on any folder to go inside it. Breadcrumbs at the top show your path.
- **Rename** — Right-click (or click the three dots) on any file or folder to rename it
- **Delete** — Right-click and select delete. The file is removed from both the database and Telegram.
- **Download** — Right-click and select download. The file is fetched from Telegram and downloaded to your computer.
- **Favorite** — Click the star icon to mark a file as favorite

#### Photos

Shows all your images and videos in a gallery view, grouped by date — similar to Google Photos. Click any photo to open a fullscreen preview. Use arrow keys to navigate between photos.

#### Favorites

Quick access to all files you've starred. Same actions as My Drive (download, delete, rename).

#### Search

Search your files by name. You can filter by:
- **Type**: All, Images, Videos, Audio, PDFs
- **Date range**: From and To date pickers

#### Dark / Light Mode

Click the sun/moon icon in the sidebar header to switch between dark and light themes. It also follows your system preference by default.

#### Upload Progress

When uploading files, a floating panel appears at the bottom-right showing:
- File name and upload percentage
- Progress bar for each file
- Files upload in the background — you can keep browsing while uploading

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Set all environment variables in the Vercel dashboard
4. Update the `DATABASE_URL` to use a hosted database (e.g., [Turso](https://turso.tech))
5. Set your Vercel domain in BotFather via `/setdomain`

### Production Checklist

- [ ] Replace SQLite with a hosted database (Turso, PlanetScale, etc.)
- [ ] Set `SESSION_SECRET` to a strong random value
- [ ] Set your production domain in BotFather via `/setdomain`
- [ ] Configure `TELEGRAM_API_ID` and `TELEGRAM_API_HASH` for large file support
- [ ] Set up proper backup for your database

## Comparison with Google Drive

| Feature | Google Drive | Unlimitade Storage |
|---------|-------------|-------------------|
| Free storage | 15 GB | Unlimited |
| Max file size | 5 TB | 2 GB (4 GB with Telegram Premium) |
| File sharing | Yes | Not yet |
| Collaboration | Yes (Docs, Sheets) | No |
| Search | Full-text + AI | Filename + type filter |
| Authentication | Google Account | Telegram Account |
| Privacy | Google has access | Files in your private channel |
| Cost | Free → $1.99+/mo | Free forever |
| Hosting | Google Cloud | Self-hosted / Vercel |

### When to use Unlimitade Storage
- You need **free unlimited storage** for personal files
- You want files stored in **your own Telegram channel** (you control the data)
- You're comfortable with a **2 GB per file limit**
- You don't need real-time collaboration features

### When to use Google Drive
- You need **file sharing and collaboration**
- You need **full-text search inside documents**
- You need **Google Workspace integration**
- You need files larger than 2 GB

## Roadmap

- [ ] File sharing with links
- [ ] Bulk file operations (select, delete, move)
- [ ] Drag & drop to move files between folders
- [ ] File tagging and labels
- [ ] Storage analytics dashboard
- [ ] Mobile-optimized PWA
- [ ] Multi-user support with access controls
- [ ] File versioning
- [ ] Trash / recycle bin

## Security

- **Authentication**: Telegram OAuth with HMAC-SHA256 signature verification
- **Sessions**: Encrypted cookies via iron-session (30-day expiry)
- **Authorization**: All API routes verify session and scope queries to the authenticated user
- **Middleware**: Protected routes redirect unauthenticated users to login
- **Data isolation**: Users can only access their own files and folders

## License

MIT License — feel free to use, modify, and distribute.

---

<p align="center">
  Built with Next.js, Telegram Bot API, and the idea that cloud storage should be free.
</p>
