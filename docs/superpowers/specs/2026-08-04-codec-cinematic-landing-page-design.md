# Codec Cinematic Landing Page

## Goal

Rebuild the Codec landing page using the supplied Prisma page as a structural and motion reference while preserving Codec's product, content, assets, and brand identity. The result should feel dark, focused, and cinematic without becoming a literal studio-template copy.

## Visual direction

- Keep Codec's Sansation typeface, charcoal surfaces, warm white text, and restrained orange accent.
- Use large-scale typography, inset dark stages, subtle texture, and deliberate whitespace.
- Use Codec screenshots and the shrimp mascot as the only prominent imagery. Do not use the Prisma videos, copy, fonts, cream palette, or remote artwork.
- Avoid generic glass panels, ornamental badges, excessive rounding, gradients, and decorative motion.

## Page structure

### Hero

- Fill the first viewport with an inset product stage.
- Place a compact navigation at the top with links to Product, Features, GitHub, and Download.
- Use a very large `CODEC` wordmark as the visual anchor.
- Pair it with a concise explanation, Windows download action, GitHub action, and platform/open-source metadata.
- Feature the existing library screenshot as the primary visual and the mascot as a restrained brand detail.

### About

- Explain Codec's purpose in a centered, editorial composition: games from multiple launchers become one calm library.
- Use animated multi-style text for emphasis while retaining Sansation and Codec's existing voice.
- Follow with a short progressive-reveal paragraph covering automatic discovery, launchability, and local ownership.

### Features

- Present four product truths: automatic discovery, one library, quick launching, and local/private data.
- Use a responsive one-, two-, and four-column layout.
- Combine existing screenshots and concise feature content; cards enter with a staggered scale-and-fade motion.
- End with a clear Windows download action rather than adding a separate marketing footer section.

## Motion and interaction

- Reuse Framer Motion, which is already installed.
- Add shared word pull-up primitives for headings and restrained fade/scale entrances for supporting content.
- Respect `prefers-reduced-motion` and keep every reveal readable without animation.
- Preserve keyboard focus states, semantic navigation, useful image alt text, and accessible mobile navigation.

## Technical approach

- Keep React, Vite, TypeScript, existing CSS, existing icons, and current assets.
- Do not introduce Tailwind or Lucide solely to imitate implementation details from the reference prompt.
- Preserve the current GitHub release lookup, fallback installer URL, root-route behavior, and 404 page.
- Replace the current landing-page composition with three primary sections and remove superseded presentation code where safe.

## Responsive behavior

- Desktop uses the full cinematic composition and wide card grid.
- Tablet reduces wordmark scale and changes cards to two columns.
- Mobile uses a compact navigation, stacked hero content, full-width actions, and one-column features without horizontal overflow.

## Validation

- Run the production build and lint command.
- Inspect the finished page at desktop and mobile widths in the browser.
- Fix visible overflow, hierarchy, contrast, focus, and motion issues found in that bounded review.

