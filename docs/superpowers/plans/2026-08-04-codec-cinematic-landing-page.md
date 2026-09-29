# Codec Cinematic Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Codec homepage as a responsive, three-section cinematic landing page using Codec's existing content, assets, and brand.

**Architecture:** Keep the existing React route and download lookup intact. Replace the landing composition with focused `Hero`, `About`, and `Features` components, backed by shared word-reveal primitives and one cohesive CSS file.

**Tech Stack:** React 19, TypeScript, Vite, Framer Motion, CSS, existing SVG icon components

## Global Constraints

- Keep Sansation, charcoal surfaces, warm white text, and the Codec orange accent.
- Use only local Codec screenshots, icon, and mascot as prominent imagery.
- Do not add Tailwind, Lucide, remote Prisma media, or another dependency.
- Preserve GitHub release lookup, installer fallback, root-route behavior, and the 404 page.
- Respect reduced motion, keyboard focus, semantic navigation, and useful alt text.

---

### Task 1: Shared motion typography and page composition

**Files:**
- Create: `src/components/RevealText.tsx`
- Create: `src/components/About.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `WordsPullUp({ text, className?, as? })` and `WordsPullUpMultiStyle({ segments, className? })`.
- Produces: `About()` with section anchor `about`.
- Consumes: existing `Hero({ downloadUrl })`, `Features({ downloadUrl })`, and `NotFound`.

- [ ] **Step 1: Add shared word reveal components**

Split text into keyed words, wrap each word in an overflow-hidden inline container, and animate the inner `motion.span` from `y: "115%"` to `y: 0` with an 0.06-second stagger and `useInView({ once: true })`.

- [ ] **Step 2: Build the About section**

Add the Codec purpose statement, mascot artwork, and a concise supporting paragraph. Animate the heading through `WordsPullUpMultiStyle` and reveal the paragraph with a scroll-linked opacity transform.

- [ ] **Step 3: Recompose the homepage**

Render only `Hero`, `About`, and `Features` inside `main`. Keep the existing download URL state and root/404 routing unchanged.

- [ ] **Step 4: Type-check the composition**

Run: `pnpm exec tsc -b`
Expected: exit code 0.

### Task 2: Cinematic hero

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Header.tsx`

**Interfaces:**
- Consumes: `WordsPullUp`, `downloadUrl`, `GITHUB_REPO_URL`, `Codec_LibraryView.png`, `shrimpSleep.png`, and existing icon components.
- Produces: `Hero({ downloadUrl: string })` containing the homepage navigation and hero stage.

- [ ] **Step 1: Fold navigation into the inset hero stage**

Use semantic anchor links for About, Features, GitHub, and Download. Keep a compact mobile menu button with `aria-expanded` and close the menu after an internal navigation choice.

- [ ] **Step 2: Build the hero content**

Add the large animated `CODEC` wordmark, concise product statement, Windows download action, GitHub action, and Windows/open-source metadata.

- [ ] **Step 3: Build the product artwork composition**

Use the existing library screenshot as the full visual field with a dark gradient treatment and position the mascot as a small brand signature.

- [ ] **Step 4: Type-check the hero**

Run: `pnpm exec tsc -b`
Expected: exit code 0.

### Task 3: Product-led feature grid and final CTA

**Files:**
- Modify: `src/components/Features.tsx`

**Interfaces:**
- Consumes: `downloadUrl`, local Codec screenshots, and existing icon components.
- Produces: `Features({ downloadUrl: string })` with four product cards and the final download action.

- [ ] **Step 1: Define the four feature cards**

Use automatic discovery, unified library, quick launching, and local/private data as the four concise feature truths.

- [ ] **Step 2: Add staggered viewport entrances**

Animate cards from opacity 0 and scale 0.96 using `whileInView`, `once: true`, a 0.12-second stagger, and the shared smooth ease curve.

- [ ] **Step 3: Add the closing action**

Finish the section with the Windows download action and restrained copyright/GitHub metadata.

- [ ] **Step 4: Type-check the feature grid**

Run: `pnpm exec tsc -b`
Expected: exit code 0.

### Task 4: Responsive visual system

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/components.css`
- Modify: `index.html`

**Interfaces:**
- Consumes: class names produced by Tasks 1-3.
- Produces: responsive layout and styling from 320px through wide desktop.

- [ ] **Step 1: Consolidate global tokens and texture**

Keep local Sansation font faces and define Codec background, surface, orange, warm-white, muted-text, border, and easing tokens. Add one subtle inline SVG noise texture and global reduced-motion behavior.

- [ ] **Step 2: Style the three sections**

Create the inset hero stage, editorial About layout, four-column feature composition, actions, and focus states without glass, oversized rounding, or decorative gradients.

- [ ] **Step 3: Add responsive rules**

At tablet widths use a two-column feature grid and reduced wordmark scale. At mobile widths stack hero content, expose the compact menu, use one feature column, preserve full-width actions, and prevent horizontal overflow.

- [ ] **Step 4: Keep document metadata aligned**

Preserve the Codec description, theme color, canonical URL, favicon, and local critical-font preload.

### Task 5: Verification and bounded visual review

**Files:**
- Modify only files from Tasks 1-4 if verification exposes defects.

**Interfaces:**
- Consumes: completed landing page.
- Produces: production-ready verified build.

- [ ] **Step 1: Run static verification**

Run: `pnpm run lint`
Expected: exit code 0.

Run: `pnpm run build`
Expected: exit code 0 and Vite production assets emitted.

- [ ] **Step 2: Inspect desktop and mobile together**

Run the Vite dev server and capture the root page at approximately 1440x1000 and 390x844. Check hierarchy, overflow, card rhythm, navigation, contrast, screenshot cropping, and action visibility.

- [ ] **Step 3: Apply one bounded correction pass**

Fix all defects from the first inspection in one edit pass, then capture desktop and mobile once more only if material visual corrections were required.

- [ ] **Step 4: Re-run final verification**

Run: `pnpm run lint`
Expected: exit code 0.

Run: `pnpm run build`
Expected: exit code 0.

