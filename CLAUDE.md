- App lives in `unlimitade-storage/` — repo root has no manifest; run all commands from there
- Dev: `npm run dev` (`next dev`) — unlimitade-storage/package.json
- Build: `npm run build` (`next build`) — unlimitade-storage/package.json
- Start: `npm run start` (`next start`) — unlimitade-storage/package.json
- Lint: `npm run lint` (`eslint`) — unlimitade-storage/package.json
- DB schema change: `npx prisma generate` then `npx prisma db push` — README.md Getting Started
- No test script is defined in package.json — do not assume one
- This Next.js version has breaking API/convention changes vs. training data: read `node_modules/next/dist/docs/` before writing framework code, and heed deprecation notices — unlimitade-storage/AGENTS.md
- unlimitade-storage/CLAUDE.md itself just pulls in AGENTS.md (`@AGENTS.md`) — check both

Files worth reading first:
- README.md (root) — full architecture, data model, upload/download/auth flows
- unlimitade-storage/AGENTS.md — Next.js breaking-changes warning
- unlimitade-storage/PLAN.md — detailed build plan for this app

Architecture: see ARCHITECTURE.md — read before structural changes
