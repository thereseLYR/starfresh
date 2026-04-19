# Starfresh

A fan-made character creation tool for [Starot](https://starotrpg.com), the first made-in-Singapore TTRPG.

Built with Next.js 16 (App Router), Tailwind CSS v4, React Context, and Sanity CMS.

This tool is a work-in-progress and will be updated with more detailed game rules and features as they are released. The official launch for Starot is currently 9 May 2026 — the current character details, such as modifiers and career options, are reverse-engineered from the official LOOM tool — an archived version of which is available here: [loom.starotrpg.com/create](https://web.archive.org/web/20260411191640/https://loom.starotrpg.com/create)

---

## Features

- 7-step guided character creation wizard
- Card-based selection UI for Constellation, Species, History, and Career
- Species grouped by faction (January Conglomerate, Wyertian Caliphate, Wurefon Empire) + Newsoul status
- Stat allocation via Standard Array or Random Array (3d6 drop lowest × 9)
- Collapsible stat reference with constellation affinity highlighting
- Step completion gating — optionally enforce completion before advancing
- Export as PDF, shareable URL, or JSON file
- Import a character from a share URL or JSON file
- Fully responsive layout for mobile and desktop
- Dedicated information panels instead of hover tooltips, so content is always visible on touchscreens
- Light / dark mode toggle
- Animated step transitions (directional sweep)
- Drawer navigation menu

## Routes

| Route               | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `/`                 | Landing page                                           |
| `/character`        | Character creation wizard                              |
| `/character/import` | Import a character from a share URL or JSON file       |
| `/about`            | About the project                                      |
| `/studio`           | Embedded Sanity Studio (content editor, auth required) |

## Steps

| #   | Step           | Description                                         |
| --- | -------------- | --------------------------------------------------- |
| 0   | Character Info | Name, pronouns, age, appearance                     |
| 1   | Constellation  | 22 Major Arcana — innate gifts and cosmic alignment |
| 2   | Species        | 9 playable species grouped by faction               |
| 3   | History        | Background origin and formative experience          |
| 4   | Career         | Occupation and skill focus                          |
| 5   | Stats          | Attribute allocation (Standard or Random Array)     |
| 6   | Review         | Summary and export                                  |

## Project Structure

```
app/
├── page.tsx                      Landing page (/)
├── about/
│   └── page.tsx                  About page (/about)
├── character/
│   ├── layout.tsx                CharacterProvider — scoped to /character/*
│   ├── page.tsx                  Character creation wizard (/character)
│   └── import/
│       ├── page.tsx              Import page metadata (/character/import)
│       └── ImportScreen.tsx      Import UI — reads directly from CharacterContext
├── studio/
│   └── [[...tool]]/
│       └── page.tsx              Embedded Sanity Studio (/studio)
├── character-creator.tsx         Wizard shell — stepper, navigation, sweep animation
├── landing.tsx                   Landing screen (/)
├── lib/
│   ├── types.ts                  Domain types, step constants, stat helpers, validation
│   └── gameData.ts               Static game data fallback — CONSTELLATIONS, SPECIES, HISTORIES, CAREERS
├── context/
│   ├── CharacterContext.tsx      React Context — character state and updater
│   ├── GameDataContext.tsx       React Context — game data from Sanity (with static fallback)
│   └── ThemeContext.tsx          Light/dark theme provider
├── components/
│   ├── CardDeck.tsx              Playing-card selection component
│   ├── SelectionGrid.tsx         Grid selection component
│   ├── StatReference.tsx         Collapsible stat reference with affinity highlighting
│   ├── DrawerMenu.tsx            Slide-in navigation drawer
│   ├── SiteNav.tsx               Global drawer + theme toggle (mounted in root layout)
│   ├── CreatorFooter.tsx         Sticky footer with Back/Next and step indicator
│   ├── ThemeToggle.tsx           Light/dark mode toggle button
│   ├── GoldDivider.tsx           Decorative divider
│   ├── StepIntro.tsx             Step description text
│   └── FieldLabel.tsx            Form field label primitive
└── steps/
    ├── CharacterInfoStep.tsx
    ├── ConstellationStep.tsx
    ├── SpeciesStep.tsx
    ├── HistoryStep.tsx
    ├── CareerStep.tsx
    ├── StatsStep.tsx
    └── ReviewStep.tsx

sanity/
├── schemaTypes/                  Content schemas (constellation, species, history, career)
├── lib/
│   ├── client.ts                 Sanity client
│   ├── queries.ts                GROQ queries + fetch helpers with static fallback
│   └── image.ts                  Image URL builder
├── env.ts                        Sanity env var helpers
└── structure.ts                  Studio structure config
```

## Configuration

Copy `env.example` to `.env.local` and set:

```env
# Set to "true" to require each step to be complete before advancing
NEXT_PUBLIC_ENFORCE_VALIDATION=true

# Sanity CMS — see sanity/README.md for setup details
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-04-19
```

Game data is fetched from Sanity at runtime with a 1-hour ISR cache. If Sanity is not configured or unreachable, the app falls back to the static data in `app/lib/gameData.ts`. See [sanity/README.md](sanity/README.md) for full CMS setup and schema details.

---

## Getting Started

**1. Install dependencies**

```bash
npm install
```

**2. Configure environment variables**

Copy `.env.local.example` to `.env.local` and fill in your values (see the [Configuration](#configuration) section above).

**3. Set up Sanity**

If you're using Sanity CMS, create a project at [sanity.io](https://sanity.io) and add your project ID and dataset to `.env.local`. Then push the schema to your project:

```bash
npx sanity deploy
```

The app works without Sanity configured — it falls back to static game data, though this may be outdated.

**4. Run the dev server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app, and [http://localhost:3000/studio](http://localhost:3000/studio) to access the Sanity Studio, which will allow you to add and edit content. For additional information about how to use Sanity Studio in the context of this project, see [sanity/README.md](sanity/README.md).
