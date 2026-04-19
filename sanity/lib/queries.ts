import { defineQuery } from "next-sanity";
import { SingleCardData, CONSTELLATIONS, SPECIES, HISTORIES, CAREERS } from "@/app/lib/gameData";
import { client } from "./client";

// ── GROQ ──────────────────────────────────────────────────────────────────────

const constellationsQuery = defineQuery(`
  *[_type == "constellation"] | order(displayOrder asc) {
    name,
    symbol,
    flavourText,
    "body": modifiers
  }
`);

const speciesQuery = defineQuery(`
  *[_type == "species"] | order(displayOrder asc) {
    name,
    flavourText,
    "imageUrl": image.asset->url,
    "body": "Faction: " + faction + "\nEffects: " + effects
  }
`);

const historiesQuery = defineQuery(`
  *[_type == "history"] | order(displayOrder asc) {
    name,
    symbol,
    flavourText,
    "body": effects
  }
`);

const careersQuery = defineQuery(`
  *[_type == "career"] | order(displayOrder asc) {
    name,
    symbol,
    flavourText,
    "body": effects
  }
`);

// ── Fetch helpers (with static fallback) ─────────────────────────────────────

async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  try {
    const result = await client.fetch<T>(query, {}, { next: { revalidate: 3600 } });
    if (!result || (Array.isArray(result) && result.length === 0)) return fallback;
    return result;
  } catch {
    return fallback;
  }
}

export async function fetchConstellations(): Promise<SingleCardData[]> {
  return safeFetch(constellationsQuery, CONSTELLATIONS);
}

export async function fetchSpecies(): Promise<SingleCardData[]> {
  return safeFetch(speciesQuery, SPECIES);
}

export async function fetchHistories(): Promise<SingleCardData[]> {
  return safeFetch(historiesQuery, HISTORIES);
}

export async function fetchCareers(): Promise<SingleCardData[]> {
  return safeFetch(careersQuery, CAREERS);
}

export async function fetchAllGameData() {
  const [constellations, species, histories, careers] = await Promise.all([
    fetchConstellations(),
    fetchSpecies(),
    fetchHistories(),
    fetchCareers(),
  ]);
  return { constellations, species, histories, careers };
}
