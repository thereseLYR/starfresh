import CardDeck, { DeckCard } from "@/app/components/CardDeck";
import GoldDivider from "@/app/components/GoldDivider";
import StepIntro from "@/app/components/StepIntro";
import { useCharacter } from "@/app/context/CharacterContext";
import { SingleCardData, SPECIES } from "@/app/lib/gameData";
import { NewSoulStatus } from "@/app/lib/types";

// ── Card transform ────────────────────────────────────────────────────────────

function toCard({
  name,
  flavourText,
  imageUrl,
  body,
}: SingleCardData): DeckCard {
  return { name, flavourText, imageUrl, body };
}

// ── Faction groupings ─────────────────────────────────────────────────────────

const FACTIONS: { name: string; species: string[] }[] = [
  {
    name: "January Conglomerate",
    species: ["Terau", "Ranau", "Kilerau", "Yvetrau"],
  },
  {
    name: "Wyertian Caliphate",
    species: ["Gilean"],
  },
  {
    name: "Wurefon Empire",
    species: ["Wurefon", "Qutalon", "Seeledon"],
  },
];

const speciesByName = Object.fromEntries(SPECIES.map((s) => [s.name, s]));

const FACTION_DECKS = FACTIONS.map((f) => ({
  ...f,
  cards: f.species.map((n) => toCard(speciesByName[n])).filter(Boolean),
}));

// ── Newsoul info ──────────────────────────────────────────────────────────────

const STATUS_INFO: Record<
  "organic" | "newsoul",
  {
    label: string;
    flavour: string;
    advantages?: string[];
    limitations?: string[];
  }
> = {
  organic: {
    label: "Organic",
    flavour: "Born of flesh and blood, bound to the natural world.",
    advantages: [
      "Full access to psychic abilities and all career paths",
      "Natural healing without reduction",
      "Unrestricted in biological and social spaces",
    ],
  },
  newsoul: {
    label: "Newsoul",
    flavour:
      "Consciousness transferred to a synthetic body — power and limitation in equal measure.",
    advantages: [
      "No need for EVA suits in hazardous environments",
      "Immunity to biological hazards and extreme temperatures",
      "No need for food, water, or air",
    ],
    limitations: [
      "Cannot access psychic abilities or Revoker career paths",
      "Risk of cognito-corporeal dysphoria with extensive modifications",
      "May face social prejudice in certain situations",
      "Healing from medical intervention is halved",
    ],
  },
};

// ── Status detail panel ───────────────────────────────────────────────────────

function StatusDetail({ status }: { status: "organic" | "newsoul" }) {
  const info = STATUS_INFO[status];
  return (
    <div className="my-1 p-5 rounded-lg border border-gold/30 bg-panel/70 animate-expand-down">
      <p className="text-gold font-semibold text-sm mb-1">{info.label}</p>
      <p className="text-gold/65 text-sm italic mb-4">{info.flavour}</p>
      <div className={`grid gap-4 ${info.limitations ? "sm:grid-cols-2" : ""}`}>
        {info.advantages && (
          <div>
            <p className="text-gold/50 text-[10px] tracking-widest uppercase mb-2">
              Advantages
            </p>
            <ul className="space-y-1">
              {info.advantages.map((a) => (
                <li key={a} className="text-gold/70 text-xs flex gap-2">
                  <span className="text-gold/40 shrink-0">◆</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        )}
        {info.limitations && (
          <div>
            <p className="text-gold/50 text-[10px] tracking-widest uppercase mb-2">
              Limitations
            </p>
            <ul className="space-y-1">
              {info.limitations.map((l) => (
                <li key={l} className="text-gold/70 text-xs flex gap-2">
                  <span className="text-gold/40 shrink-0">◆</span>
                  {l}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Step component ────────────────────────────────────────────────────────────

export default function SpeciesStep() {
  const { data, update } = useCharacter();

  return (
    <>
      <StepIntro>
        Each species carries unique traits, histories, and strengths that define
        your place in the world. Who are you among the peoples of this age?
      </StepIntro>

      <div className="mt-8">
        <p className="text-gold/50 text-[10px] tracking-[0.3em] uppercase mb-4">
          Organic or Newsoul?
        </p>
        <div className="flex gap-3">
          {(["organic", "newsoul"] as const).map((status) => {
            const isSelected = data.newsoul === status;
            return (
              <button
                key={status}
                onClick={() =>
                  update({
                    newsoul: isSelected ? ("" as NewSoulStatus) : status,
                  })
                }
                className={`flex-1 py-3 px-4 rounded-lg border text-sm font-semibold transition-[border-color,color,box-shadow] duration-200 ${
                  isSelected
                    ? "border-gold text-gold shadow-[0_0_14px_rgba(224,199,135,0.15)]"
                    : "border-gold/20 text-gold/50 hover:border-gold/45 hover:text-gold/75"
                }`}
              >
                {STATUS_INFO[status].label}
              </button>
            );
          })}
        </div>

        {(data.newsoul === "organic" || data.newsoul === "newsoul") && (
          <StatusDetail status={data.newsoul} />
        )}
      </div>

      <div className="my-8 space-y-8">
        {FACTION_DECKS.map((faction) => (
          <div key={faction.name}>
            <p className="text-gold/50 text-[10px] tracking-[0.3em] uppercase mb-3">
              {faction.name}
            </p>
            <CardDeck
              cards={faction.cards}
              selected={data.species}
              onSelect={(v) => update({ species: v ?? "" })}
            />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <GoldDivider muted />
      </div>
    </>
  );
}
