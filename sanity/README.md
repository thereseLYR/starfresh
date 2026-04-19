# Sanity CMS Integration

Game data (constellations, species, histories, careers) is fetched from a [Sanity](https://sanity.io) project at build/request time, with static fallback to the hardcoded values in `app/lib/gameData.ts` if Sanity is unavailable or unconfigured.

## Environment variables

Add to `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-04-19
```

Without these, the app falls back to static game data and the Studio route will throw on load.

## Routes

| Route     | Description                        |
| --------- | ---------------------------------- |
| `/studio` | Embedded Sanity Studio (editor UI) |

## Schema types

Defined in `sanity/schemaTypes/`:

| Type            | Fields                                                               |
| --------------- | -------------------------------------------------------------------- |
| `constellation` | `name`, `symbol`, `flavourText`, `modifiers`, `displayOrder`         |
| `species`       | `name`, `flavourText`, `image`, `faction`, `effects`, `displayOrder` |
| `history`       | `name`, `symbol`, `flavourText`, `effects`, `displayOrder`           |
| `career`        | `name`, `symbol`, `flavourText`, `effects`, `displayOrder`           |

## Data flow

1. `sanity/lib/queries.ts` defines GROQ queries and `fetch*` helpers.
2. Each helper calls `safeFetch`, which catches errors and returns the static fallback.
3. `fetchAllGameData()` runs all four queries in parallel.
4. The result is passed as props into `GameDataProvider` (a React Context defined in `app/context/GameDataContext.tsx`).
5. Step components call `useGameData()` to read game data instead of importing from `gameData.ts` directly.

Data is cached with ISR (`revalidate: 3600`) — content updates in Sanity propagate to the app within an hour without a redeploy.

## Editing content

Open `/studio` in the running dev server (or deployed app) to access the embedded Sanity Studio. Changes saved there are reflected in the app after the ISR cache expires.
