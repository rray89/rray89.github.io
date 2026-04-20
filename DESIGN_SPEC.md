# Portfolio Design Spec

## Purpose

This repo is exploring the visual direction for a personal portfolio site for an
Android engineer. The current implementation is intentionally using fake copy so
the design can be discussed without mixing in real biography details too early.

The goal is a one-page personal homepage that feels calm, direct, modern, and a
little alive, without reading like a startup landing page or a consultant
brochure.

## Core Direction

- Personal homepage, not business website
- Minimal structure, but not empty for the sake of empty
- Editorial typography first
- White or near-white canvas in light mode
- Quiet dark mode that preserves the same tone
- One subtle interactive accent only: cursor-reactive soft color bloom
- Very small amount of glassy UI treatment, mostly in header controls
- Real content should always be visible without requiring interaction

## Reference Synthesis

### steipete.me

This is the strongest reference for tone.

Borrow:

- directness
- narrow, readable rhythm
- personal voice
- low-BS presentation

Do not borrow literally:

- article-heavy homepage structure

### toukoum.fr

This is the strongest reference for interaction feel.

Borrow:

- centered calm
- soft cursor-reactive color bloom
- restrained AI-native feel
- glassy control language in small doses

Do not borrow literally:

- chat-first homepage
- template feeling
- overreliance on generated Q&A

### meetprajapati.com

This is useful for polish and spacing, but should be simplified.

Borrow:

- clean hierarchy
- strong first screen
- editorial confidence

Do not borrow literally:

- too many sections
- accordion-heavy experience treatment
- consultant-brand energy

### mahatosunil.com.np

Useful mostly as a warning about overcommitting to decorative ideas.

Borrow:

- willingness to have one memorable motif

Avoid:

- fake OS/device chrome
- multiple novelty elements competing at once
- desktop UI that feels like a blown-up mobile component

## Information Architecture

The target structure is:

1. Intro
2. Selected work
3. Short notes / philosophy
4. Contact

No blog section is required.
No explicit experience timeline is required unless later needed.

## Visual Language

### Typography

- Large, confident headline
- Smaller mono eyebrow/kicker text
- Body copy should stay compact and readable
- Typography should do more work than containers

### Surfaces

- Most sections should be plain or lightly bordered
- Avoid putting every text block inside a translucent card
- Glass treatment should be rare and intentional
- Current guidance: header controls may use glass; content areas mostly should not

### Color

- Light theme should feel airy, soft, and slightly warm-neutral
- Dark theme should feel quiet, not neon or cyberpunk
- Accent color should mostly come from the cursor bloom, not from loud buttons

### Motion

- Cursor bloom should feel like soft watercolor or diffused ink
- It should fade away naturally
- It should never overpower reading
- No particle field, no floating decorations, no gimmicky motion loops

## Interaction Rules

- The page must stand on its own without interaction
- Interaction should enhance, not explain
- Theme toggle should be simple and obvious
- Anchor navigation is enough for this concept

## Content Rules

- Fake content is acceptable during design exploration
- Keep copy short, calm, and believable
- Show a few strong projects instead of many weak ones
- The site should feel personal first, professional second

## Things To Avoid

- “Agency” or “startup” homepage energy
- too many floating cards
- too much glass
- fake mobile UI
- fake status bars
- decorative dashboards
- empty whitespace without hierarchy benefit
- AI gimmicks that replace visible content

## Current Review Questions

Another reviewer or agent should specifically look at:

1. Whether the page still has more glass than it needs
2. Whether the portrait helps or whether the design is stronger text-first
3. Whether the cursor bloom is subtle enough in both light and dark themes
4. Whether the information architecture can be simplified even further
5. Whether the visual tone still feels personal rather than commercial

## Implementation Note

The current version is a static HTML/CSS/JS concept meant to settle direction
before any Next.js refactor. Review the design intent first; implementation
technology is secondary at this stage.
