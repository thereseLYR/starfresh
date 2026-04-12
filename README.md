# Starfresh

A fan-made character creation tool for [Starot](https://starotrpg.com), the first made-in-Singapore TTRPG.

Built with Next.js 16 (App Router), Tailwind CSS v4, and React Context.

This tool is a work-in-progress and will be updated with more detailed game rules and features as they are released. The official launch for Starot is currently 9 May 2026 - the current character details, such as modifiers and career options, are reverse-engineered from the official LOOM tool - an archived version of which is available here: [loom.starotrpg.com/create](https://web.archive.org/web/20260411191640/https://loom.starotrpg.com/create)

---

## Features

- 7-step guided character creation wizard
- Card-based selection UI for Constellation, Species, History, and Career
- Navigation gating — optionally enforce step completion before advancing
- PDF export of the completed character sheet
- Fully responsive layout, for both mobile and desktop views
- Improved information display, so that content is viewable in plaintext in a dedicated component instead of a small hover bubble

## Steps

| #   | Step           | Description                                         |
| --- | -------------- | --------------------------------------------------- |
| 0   | Character Info | Name, pronouns, age, appearance                     |
| 1   | Constellation  | 22 Major Arcana — innate gifts and cosmic alignment |
| 2   | Species        | 8 playable species with unique traits and abilities |
| 3   | History        | Background origin and formative experience          |
| 4   | Career         | Occupation and skill focus                          |
| 5   | Stats          | Attribute point allocation                          |
| 6   | Review         | Summary of all choices with PDF export              |

## Project Structure

```
app/
├── character-creator.tsx     Wizard shell — layout, stepper, navigation
├── landing.tsx               Landing screen shown before the wizard
├── lib/
│   ├── types.ts              Domain types, step constants, stat helpers
│   └── gameData.ts           Game data — CONSTELLATIONS, SPECIES, HISTORIES, CAREERS
├── context/
│   └── CharacterContext.tsx  React Context — character state and updater
├── components/
│   ├── CardDeck.tsx          Playing-card selection component
│   ├── SelectionGrid.tsx     Grid selection component
│   ├── StepIntro.tsx         Step description text
│   └── FieldLabel.tsx        Form field label primitive
└── steps/
    ├── CharacterInfoStep.tsx
    ├── ConstellationStep.tsx
    ├── SpeciesStep.tsx
    ├── HistoryStep.tsx
    ├── CareerStep.tsx
    ├── StatsStep.tsx
    └── ReviewStep.tsx
```

## Configuration

Copy `.env.local.example` to `.env.local` and set:

```env
# Set to "true" to require each step to be complete before advancing
NEXT_PUBLIC_ENFORCE_VALIDATION=true
```

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
