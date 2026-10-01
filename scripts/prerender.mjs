// Renders <App /> to static HTML after `vite build` so crawlers without JS
// get the full page text. The client still mounts with createRoot and
// replaces this markup, so there is no hydration contract to keep in sync.
import { readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "dist", "index.html");
const ssrDir = path.join(root, "dist-ssr");

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const template = await readFile(htmlPath, "utf8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error("prerender: #root marker not found in dist/index.html");

const appHtml = render();
const html = template.replace(marker, `<div id="root">${appHtml}</div>`);

await writeFile(htmlPath, html);
await rm(ssrDir, { recursive: true, force: true });
console.log(`prerender: wrote ${appHtml.length} chars of HTML into dist/index.html`);
