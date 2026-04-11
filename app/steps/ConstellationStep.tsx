import CardDeck, { DeckCard } from "@/app/components/CardDeck";
import StepIntro from "@/app/components/StepIntro";
import { useCharacter } from "@/app/context/CharacterContext";
import { CONSTELLATIONS, SingleCardData } from "../lib/gameData";

// ── Card transform ────────────────────────────────────────────────────────────

function toCard({ name, flavourText, symbol, body }: SingleCardData): DeckCard {
  return { name, flavourText, symbol, body };
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
