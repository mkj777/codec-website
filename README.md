# Codec Website

This repository holds the landing page for Codec, a free and open source game launcher for Windows. The site is live at https://codeclibrary.dev.

## About Codec

Codec is a desktop app for Windows 10 and Windows 11 that gathers a scattered PC game collection into one clean library. It scans your drives and launcher libraries, finds games installed through Steam, Epic Games and Riot Games, and also picks up games in the usual install folders of GOG Galaxy, Ubisoft Connect, the EA app, Xbox and Rockstar Games. Any other game can be added by pointing Codec at its executable.

Each game gets covers, artwork and details from Steam, SteamGridDB, IGDB, RAWG and HowLongToBeat. Signing in to Steam is optional and adds the Steam games you own and syncs achievements. Games launch directly, through the launcher they belong to, or through a custom launch script. The library lives on your PC and no account is required.

Codec is written in C# with .NET 9 and Avalonia UI, is MIT licensed and is in pre-release. The app source and the Windows installer live at https://github.com/mkj777/codec.

## About this site

The site is a single page built with React 19, TypeScript, Vite, Tailwind CSS 4 and framer-motion. It has a hero with the download button. Vercel Web Analytics and Speed Insights are loaded on the page.

Search engines and AI crawlers that do not run JavaScript still see the full page. After the normal client build, `pnpm build` renders `<App />` once on the server (`src/entry-server.tsx`, run by `scripts/prerender.mjs`) and writes the resulting HTML into `dist/index.html`. In the browser, `src/main.tsx` mounts the app with `createRoot`, which replaces the prerendered markup, so there is no hydration step to keep in sync.

`index.html` carries the title, description, Open Graph and Twitter tags and the JSON-LD graph (WebSite, SoftwareApplication, Person). When a new Codec version ships, update `softwareVersion` there. `public/` contains `robots.txt`, `sitemap.xml`, `llms.txt` and the social preview image `og.png`.

The download button points to the latest `Codec-win-Setup.exe` on GitHub Releases and is refreshed at runtime through the GitHub API (`src/lib/github.ts`).

## Development

You need Node.js and pnpm.

```sh
pnpm install
pnpm dev      # local dev server
pnpm lint     # ESLint
pnpm build    # type check, client build, prerender into dist/
pnpm preview  # serve the production build
```

## Deployment

The site is hosted on Vercel. Every push to `main` triggers a production deploy of https://codeclibrary.dev that runs `pnpm build` and serves `dist/`. Static files in `dist/` are served as they are, and all other paths fall back to the single page (see `vercel.json`), where unknown paths show the 404 view.
