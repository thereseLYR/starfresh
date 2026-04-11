import CardDeck, { DeckCard } from "@/app/components/CardDeck";
import StepIntro from "@/app/components/StepIntro";
import { useCharacter } from "@/app/context/CharacterContext";
import { ConstellationData, CONSTELLATIONS } from "../lib/gameData";

// ── Card transform ────────────────────────────────────────────────────────────

function toCard({
  name,
  flavourText,
  symbol,
  body,
}: ConstellationData): DeckCard {
  return {
    name,
    flavourText,
    symbol,
    detail: (
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-4">
          <span className="text-3xl text-gold/60 shrink-0 mt-0.5">
            {symbol}
          </span>
          <div>
            <p className="text-gold font-semibold text-sm">{name}</p>
            <p className="text-gold/55 text-sm italic">{flavourText}</p>
          </div>
        </div>
        {body && (
          <p className="text-gold/55 text-xs leading-relaxed whitespace-pre-line border-t border-gold/15 pt-3">
            {body}
          </p>
        )}
      </div>
    ),
  };
}

const DECK_CARDS: DeckCard[] = CONSTELLATIONS.map(toCard);

// ── Step component ────────────────────────────────────────────────────────────

export default function ConstellationStep() {
  const { data, update } = useCharacter();

  return (
    <>
      <StepIntro>
        Your birth constellation shapes your innate gifts and the cosmic forces
        aligned with your destiny. Choose the star pattern that resonates with
        your soul.
      </StepIntro>

      <CardDeck
        cards={DECK_CARDS}
        selected={data.constellation}
        onSelect={(v) => update({ constellation: v ?? "" })}
      />
    </>
  );
}
