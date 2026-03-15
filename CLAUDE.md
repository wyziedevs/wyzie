# Wyzie — Project Guidelines

## Design Context

### Users

Startup founders and small business owners seeking a reliable development partner, alongside enterprise teams evaluating consulting or infrastructure services. They arrive with a project in mind and need to quickly assess competence, credibility, and fit. Secondary audience: developers discovering Wyzie's open source tools (Wyzie Subs, Wyzie Lib, i6.shark) who may convert into clients or community contributors.

### Brand Personality

**Modern, Trustworthy, Inventive.** The voice is confident and direct—never salesy or corporate. Copy is concise and technically grounded. The brand radiates engineering excellence: every detail signals that the team behind it builds things properly.

Emotional goals: visitors should feel **confidence** ("these people know what they're doing") and **excitement** ("I want to build something with them").

### Aesthetic Direction

- **Visual tone**: Dark, immersive, and technically refined. Deep navy-black backgrounds with luminous blue and violet accents that feel alive—glow effects, light bars, and subtle motion create depth without clutter.
- **Reference**: sudo-flix/smov UI — its deep dark palette (#0A0A12 backgrounds), purple/blue accent system, and clean immersive feel. Apply that cinematic, polished darkness to a professional services context.
- **Anti-references**: Cluttered dashboards, brutalist/raw unpolished sites, generic SaaS templates.
- **Theme**: Dark mode only. Base background `#050508`, surface `#0a0a14`, elevated `#10101c`.
- **Color system**: Blue brand (#2563eb primary, #3b82f6 light, #60a5fa pale), violet (#8b5cf6), amber (#f59e0b), emerald (#10b981) as semantic accents. Gradient text runs blue → violet.
- **Typography**: Geist Sans (body) + Geist Mono (code/tags). Extrabold headings, relaxed body copy.
- **Spacing & layout**: `max-w-6xl` container, generous section padding (`py-28`), 2-column card grids on desktop.

### Design Principles

1. **Precision over decoration** — Every visual element must earn its place. Glow effects, gradients, and animations exist to communicate hierarchy and interactivity, not to fill space. When in doubt, remove.

2. **Dark-first immersion** — The deep dark canvas is the brand. Treat darkness as a design material: let content and accents emerge from it with purpose. Bright elements should feel like light sources, not stickers on a dark background.

3. **Motion with intent** — Framer Motion animations guide attention and signal interactivity. Entrances are smooth and staggered, hovers provide immediate feedback (glow cards, underline reveals), and rotating text creates energy. Never animate for spectacle alone.

4. **Engineering credibility** — Design choices should reinforce that this is a team of builders. Monospace tags, technical copy, stats with real numbers, and open source links create trust through transparency.

5. **Accessible by default** — Follow best practices: visible focus rings (`focus-visible` outlines), semantic HTML, proper color contrast against dark backgrounds, and mobile-responsive layouts. No WCAG level mandated, but aim for AA where practical.

### Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 with `@theme inline` design tokens
- **Animation**: Framer Motion (via `Motion.tsx` wrappers: `Reveal`, `StaggerContainer`, `StaggerItem`)
- **Components**: Radix UI primitives (Accordion, Dialog, NavigationMenu, Separator, Tooltip)
- **Icons**: Lucide React
- **Utilities**: `clsx` + `tailwind-merge` via `cn()` helper in `lib/utils.ts`
