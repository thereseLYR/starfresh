import CardDeck, { DeckCard } from '@/app/components/CardDeck'
import StepIntro from '@/app/components/StepIntro'
import { useCharacter } from '@/app/context/CharacterContext'
import { SingleCardData, SPECIES } from '@/app/lib/gameData'

// ── Card transform ────────────────────────────────────────────────────────────

function toCard({ name, flavourText, imageUrl, body }: SingleCardData): DeckCard {
  return { name, flavourText, imageUrl, body };
}

const DECK_CARDS: DeckCard[] = SPECIES.map(toCard)

// ── Step component ────────────────────────────────────────────────────────────

export default function SpeciesStep() {
  const { data, update } = useCharacter()

  return (
    <>
      <StepIntro>
        Each species carries unique traits, histories, and strengths that define
        your place in the world. Who are you among the peoples of this age?
      </StepIntro>
      <CardDeck
        cards={DECK_CARDS}
        selected={data.species}
        onSelect={(v) => update({ species: v ?? '' })}
      />
    </>
  )
}
