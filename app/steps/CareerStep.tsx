import CardDeck, { DeckCard } from '@/app/components/CardDeck'
import StepIntro from '@/app/components/StepIntro'
import { useCharacter } from '@/app/context/CharacterContext'
import { CAREERS, SingleCardData } from '@/app/lib/gameData'

// ── Card transform ────────────────────────────────────────────────────────────

function toCard({ name, flavourText, symbol, body }: SingleCardData): DeckCard {
  return { name, flavourText, symbol, body }
}

const DECK_CARDS: DeckCard[] = CAREERS.map(toCard)

// ── Step component ────────────────────────────────────────────────────────────

export default function CareerStep() {
  const { data, update } = useCharacter()

  return (
    <>
      <StepIntro>
        Your career determines the techniques, abilities, and power you bring to
        every encounter. What path have you walked?
      </StepIntro>
      <CardDeck
        cards={DECK_CARDS}
        selected={data.career}
        onSelect={(v) => update({ career: v ?? '' })}
      />
    </>
  )
}
