# Wyzie - Project Guidelines

## Design Context

PRODUCT.md is the brief: who the site is for (people hiring Wyzie for bespoke
software), the voice, the anti-references and the principles. Read it before
any design change.

The look follows kilter.work (a Wyzie LLC product): flat near-black neutral
surfaces, hairline rules, Open Sans set semibold and tight, one Wyzie blue for
actions and one full-bleed blue band (the contact section). On top of that the
site is meant to feel good to use: the light bar over the hero, a pointer
light, tactile sounds, pressable controls. The owner asked for these; do not
strip them for "restraint". Still out: violet glow, gradient text, rotating
hero words, animated stat counters, icon card grids, eyebrow labels over every
heading, numbered 01/02 rows.

- **Tokens**: `src/app/globals.css` `@theme` only. Colors are OKLCH; `page`,
  `panel`, `raised`, `line`, `ink`, `ink-muted`, `ink-subtle`, `blue`,
  `blue-ink`, `blue-deep`, and `glow` (light only: rims, beams, blooms,
  never text); surfaces are night blue, not gray. Display sizes are `text-display-xl/lg/md`, `text-lead`,
  `text-standfirst`, `text-overline`. A new size must also be added to the
  tailwind-merge config in `src/lib/utils.ts`, or `cn()` drops it.
- **Components**: `src/components/ui.tsx` (`Reveal`, `Headline`,
  `ButtonLink`). Lists are ruled rows (`.ruled`), not cards.
- **Motion**: CSS entrances in globals.css, triggered by `MotionObserver`
  (`.reveal`, and `.sweep` for a section rule that catches the light once).
  `instant` on `Reveal`/`Headline` for anything above the fold. Everything is
  visible without JavaScript and under reduced motion. Page changes use
  cross-document view transitions. Nothing snaps, in or out: a glint left
  early fades where it is, the lamp fades out, the phone menu drops and
  folds back, the edge flare glides. A light's box always reaches past the
  light itself, so no glow ends on a hard line. A transition never starts
  from a value an animation was holding; use an animation for that exit.
- **Light**: `Lightbar.tsx` is the hero lamp (tube, cone, glare, and canvas
  dust that falls the height of the hero; the dust must never react to the
  pointer). Every mote comes off the tube: a puff on the first strike, then
  one for each that falls out; switching off and on keeps the dust in the
  air. The glare streak is only as wide as the glow. L or its pull cord
  toggles it; the cord is a simulated string (links that only pull, a ball
  on the end), so it can be taken anywhere, swings, drapes when slack and
  bobs on release. `broken` is the 404's lamp.
  `Tactile.tsx` (mounted once in the layout) runs the pointer: `.spot` panels
  light in their own border (so the light bends round corners) with a glow
  leaning out past the lit side, `.row-light` rows warm (faded at every
  edge), and inside a `[data-field]` the `.tilt` panels turn to face it.
  Buttons and text never move with the pointer. The pointer's numbers are
  `@property` registered as not inherited, written only when they change,
  so a move restyles just the element that uses them; a layer further down
  that reads one takes it with `--x: inherit`. Keep it that way: an
  inherited variable written every frame restyles the whole section. The
  Live Now panel's glow follows the lamp (`--lamp` on `.stage-3d`): dim
  while it is off, full once the tube has caught. Behind the
  hero (and in the contact band) is `.light-wall`, a dot panel seen only
  where the beam or the pointer falls. The Live Now panel is 3D
  (`stage-3d`/`float-3d`/`tilt-3d`/`panel-3d` in globals.css): it floats
  at an angle, and its layers sit at different depths over a soft light
  with no edge. The beam is broad from the tube down (apex 30rem above it;
  the dust and the wall's lit dots use the same shape), never a stem under
  a bar. `sparks()` (`src/lib/sparks.ts`) throws light off a
  point: lit-button presses, the tube striking, a ping landing, a copy.
  `Motes.tsx` is the band's rising dust. No particle ever reacts to the
  pointer.
- **Scroll**: scroll-driven CSS only (`@supports (animation-timeline:
view())`, motion on): the `.scroll-beam` under the header fills with the
  page, `.hero-exit` falls away, `.frame-in` frames tip up as they arrive,
  `.shine` crosses a screenshot, `.scan` lights a row's rule mid-screen
  (the last row lights the list's closing rule too).
- **Sound**: `src/lib/sound.ts` synthesizes every sound with Web Audio (no
  files). `Tactile.tsx` plays `tap` on any link or button press by
  delegation; `data-sound="<name>|none"` overrides, `data-tick` makes a row
  or button tick on hover. Hover and result sounds (`tick`, `blip`) never
  wake the audio. `SoundToggle` in the header mutes it (localStorage).
- **Browser chrome**: one focus ring (`:focus-visible` in `@layer base`, so
  utilities can override it); text fields use `.field` (their own lit
  focus, autofill and resize handled); the contact form validates inline
  (`noValidate`, `aria-invalid`, `error` sound, `.shake`), never with the
  browser's bubble. `main` clips sideways overflow, since blooms reach past
  panels.
- **Projects**: every project on the site lives in `src/lib/projects.ts`.
  Screenshots are pre-sized WebP in `public/work/` (`-800` and `-1600`). Only
  figures that trace to a repo or a live page.

### Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 with `@theme` design tokens
- **Animation**: CSS keyframes in globals.css (Framer Motion is no longer used)
- **Icons**: Lucide React
- **Utilities**: `clsx` + `tailwind-merge` via `cn()` helper in `lib/utils.ts`
