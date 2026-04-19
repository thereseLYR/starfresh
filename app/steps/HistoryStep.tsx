import CardDeck, { DeckCard } from '@/app/components/CardDeck'
import StepIntro from '@/app/components/StepIntro'
import { useCharacter } from '@/app/context/CharacterContext'
import { useGameData } from '@/app/context/GameDataContext'
import { SingleCardData } from '@/app/lib/gameData'

function toCard({ name, flavourText, symbol, body }: SingleCardData): DeckCard {
  return { name, flavourText, symbol, body }
}

export default function HistoryStep() {
  const { data, update } = useCharacter()
  const { histories } = useGameData()
  const cards = histories.map(toCard)

  return (
    <>
      <StepIntro>
        Your history defines where you came from and the skills you carry into
        the unknown. The past is never truly behind you.
      </StepIntro>
      <CardDeck
        cards={cards}
        selected={data.history}
        onSelect={(v) => update({ history: v ?? '' })}
      />
    </>
  )
}
