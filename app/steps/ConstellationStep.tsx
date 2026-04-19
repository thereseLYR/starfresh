import CardDeck, { DeckCard } from "@/app/components/CardDeck";
import StepIntro from "@/app/components/StepIntro";
import { useCharacter } from "@/app/context/CharacterContext";
import { useGameData } from "@/app/context/GameDataContext";
import { SingleCardData } from "../lib/gameData";

function toCard({ name, flavourText, symbol, body }: SingleCardData): DeckCard {
  return { name, flavourText, symbol, body };
}

export default function ConstellationStep() {
  const { data, update } = useCharacter();
  const { constellations } = useGameData();
  const cards = constellations.map(toCard);

  return (
    <>
      <StepIntro>
        Your birth constellation shapes your innate gifts and the cosmic forces
        aligned with your destiny. Choose the star pattern that resonates with
        your soul.
      </StepIntro>

      <CardDeck
        cards={cards}
        selected={data.constellation}
        onSelect={(v) => update({ constellation: v ?? "" })}
      />
    </>
  );
}
