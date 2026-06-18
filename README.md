# AKRA — Coastal Residences on the Athenian Riviera

A brand-forward luxury real-estate site for a fictional firm on the Vouliagmeni
coast, built in a **"Dark Deco"** language: the *Batman: The Animated Series*
mood (inky near-black, Art-Deco geometry, a single warm sodium-amber light
source) applied to Athenian-Riviera property.

## Stack

- **Next.js 15** (App Router, React Server Components)
- **React 19**
- **Tailwind CSS v4** (tokens in `app/globals.css`)
- **Motion** (`motion/react`) for the quiet scroll reveals
- Fonts via `next/font`: **Jost** (geometric Deco display) + **Manrope** (body)

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000

Build for production:

```bash
npm run build && npm start
```

## Design system (locked)

| Token | Value | Use |
| --- | --- | --- |
| `--color-ink` | `#08090c` | base page (the dark sky) |
| `--color-surface` | `#13161d` | inputs, tiles |
| `--color-platinum` | `#e7eaef` | primary text |
| `--color-stone` | `#9aa0ab` | secondary text |
| `--color-amber` | `#d09a4f` | the ONE accent — "light": CTAs, focus, hover, monogram, hero glow |

- **Whole site is dark**, locked. No section inverts.
- **One accent** (amber), one **CTA intent** ("Private Enquiry"), **all-sharp corners**.
- Motion honors `prefers-reduced-motion`; grain/vignette are fixed,
  `pointer-events-none` overlays.

## Images

All photography is **placeholder** (`picsum.photos` seeds) held in a consistent
noir grade via the `.cine` filter. Every slot is marked with a `TODO` comment
describing the real shot needed (dusk villas, the coastline, interiors). Swap in
real assets and, for production, move the hero to `next/image` with `priority`.
