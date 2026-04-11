import CardDeck, { DeckCard } from '@/app/components/CardDeck'
import StepIntro from '@/app/components/StepIntro'
import { useCharacter } from '@/app/context/CharacterContext'
import { HISTORIES, SingleCardData } from '@/app/lib/gameData'

// ── Card transform ────────────────────────────────────────────────────────────

function toCard({ name, flavourText, symbol, body }: SingleCardData): DeckCard {
  return { name, flavourText, symbol, body }
}

const DECK_CARDS: DeckCard[] = HISTORIES.map(toCard)

// ── Step component ────────────────────────────────────────────────────────────

export default function HistoryStep() {
  const { data, update } = useCharacter()

  return (
    <>
      <StepIntro>
        Your history defines where you came from and the skills you carry into
        the unknown. The past is never truly behind you.
      </StepIntro>
      <CardDeck
        cards={DECK_CARDS}
        selected={data.history}
        onSelect={(v) => update({ history: v ?? '' })}
      />
    </>
  )
}
